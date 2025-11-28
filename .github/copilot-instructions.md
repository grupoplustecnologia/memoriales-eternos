# AI Copilot Instructions - Forever Pet Friend

## 🎯 Project Overview
**Forever Pet Friend** is a production-ready Next.js 15 full-stack pet memorial platform (v1.0, Nov 2025). Users create digital memorials for deceased pets, place them on an interactive world map, and engage through a rich social layer: likes, emoji reactions, comments, tributes, tags, and search/discovery.

**Core Value**: Combines commemoration (memorials + tributes) with community (social features + discovery).

### Stack
- **Frontend**: Next.js 15.5+ (App Router, Turbopack), TypeScript, React 18, Tailwind CSS, shadcn/ui, Leaflet maps
- **Backend**: API routes (`src/app/api/*`), Prisma ORM v6.19+
- **Database**: Neon PostgreSQL (defined in `prisma/schema.prisma`)
- **Auth**: Local password-based authentication + JWT tokens in Session table, localStorage
- **Build**: Bun (preferred), npm fallback; Biome formatter + ESLint, Next.js Turbopack
- **Deployment**: Ready for production (tested on Netlify)

---

## 📊 Architecture: Layered Service Pattern

### Core Request Flow
```
React Component
  ↓ (useProfiles(), useLikes(), useComments(), etc.)
fetch('/api/{resource}', { headers: { 'Authorization': 'Bearer token' } })
  ↓
API Route (src/app/api/{resource}/route.ts)
  ├─ Extract & verify auth token → get user.id
  ├─ Validate role/permissions via AuthorizationService
  └─ Call service function
     ↓
Service Layer (src/lib/*Service.ts)
  ├─ Business logic + validation
  ├─ Prisma queries
  └─ Error handling
     ↓
Neon PostgreSQL
```

### Key Service Layers (src/lib/)
1. **profilesService.ts** - Memorials (CRUD, collaboration, visibility)
2. **tributesService.ts** - Tribute interactions (create, expire, list)
3. **likesService.ts** - Like toggle, counts, user checks
4. **reactionsService.ts** - Emoji reactions (8 types: ❤️, 😢, 🙏, 😊, 🌹, ⭐, 🕊️, 💐)
5. **commentsService.ts** - Comments with moderation flags
6. **tagsService.ts** - Predefined + custom tags (type-based, character-based)
7. **tributeLikesService.ts** - Likes on tribute tributes
8. **tributeReplyService.ts** - Nested replies on tributes
9. **tributeReportService.ts** - Flag inappropriate tributes
10. **auth.ts** - Login, register, token verification
11. **authorization.ts** - Role checks and permissions

### Critical Patterns

#### Pattern 1: Data Fetching with Hooks
- **Examples**: `useProfiles()`, `useLikes()`, `useComments()`
- **Behavior**: 
  - Calls corresponding `GET /api/{resource}` 
  - Caches in component state
  - Auto-refetch after mutations (e.g., after `toggleLike()`)
- **Key pattern**: Mutations call refetch function to sync state

#### Pattern 2: API Route Structure (Protected)
```typescript
// src/app/api/{resource}/route.ts - Example: POST likes
import { verifySessionToken } from '@/lib/auth';
import { toggleLike } from '@/lib/likesService';

export async function POST(req: NextRequest) {
  // 1. Extract token
  const token = req.headers.get('authorization')?.replace('Bearer ', '');
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  
  // 2. Verify token & get user
  const { valid, user } = await verifySessionToken(token);
  if (!valid) return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  
  // 3. Check permissions (role-based)
  if (!user.role.includes('admin')) {
    // Check subscription tier limits via planPermissions.ts
  }
  
  // 4. Call service
  const { profileId } = await req.json();
  const result = await toggleLike(user.id, profileId);
  
  return NextResponse.json({ success: true, data: result });
}
```

#### Pattern 3: Role-Based Authorization
```typescript
// src/lib/authorization.ts
const hasPermission = (role: UserRole, permission: Permission) => {
  return ROLE_PERMISSIONS[role]?.includes(permission) || false;
};
```
- **Roles**: `basic` | `premium` | `pro` | `admin` | `moderator`
- **Permissions**: `create_memorial`, `edit_memorial`, `manage_tributes`, `manage_users`, `moderate_comments`
- **Source**: `src/types/roles.ts` (ROLE_PERMISSIONS map)

---

## 🗄️ Database Schema (Prisma) - Key Models

### User (Authentication)
```prisma
model User {
  id                String
  email             String @unique
  name              String
  passwordHash      String
  role              String // "user" | "admin"
  subscriptionTier  String // "huella-eterna", "cielo-estrellas", "santuario-premium"
  
  profiles          AnimalProfile[] // Memorials created by user
  tributes          Tribute[]       // Tributes placed by user
  likes             Like[]          // Likes given by user
  reactions         Reaction[]      // Emoji reactions by user
  comments          Comment[]       // Comments by user
  sessions          Session[]       // Auth tokens
  createdAt         DateTime @default(now())
}
```

### AnimalProfile (Memorials)
```prisma
model AnimalProfile {
  id                String @id @default(cuid())
  userId            String  // Owner
  name              String
  animalType        String  // "perro", "gato", "ave", etc.
  birthDate         DateTime
  deathDate         DateTime
  
  latitude          Float   // Map placement
  longitude         Float
  photoUrl          String  // Main memorial photo
  story             String  // Pet's story
  epitaph           String  // Memorial inscription
  gallery           String[] // Additional photos
  
  isPublic          Boolean @default(false)
  viewCount         Int     @default(0)
  
  // Social features
  tributes          Tribute[]
  likes             Like[]
  reactions         Reaction[]
  comments          Comment[]
  tags              ProfileTag[]
  
  isCollaborative   Boolean @default(false)
  collaborators     MemorialCollaborator[]
  
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
}
```

### Tribute (Visitor Interactions)
```prisma
model Tribute {
  id                String @id @default(cuid())
  profileId         String  // Which memorial
  visitorId         String? // If authenticated
  visitorName       String
  tributeType       String  // "flower", "candle", "message"
  message           String?
  durationDays      Int?    // How long displayed
  expiresAt         DateTime?
  
  // Nested social
  likes             TributeLike[]
  replies           TributeReply[]
  reports           TributeReport[]
  
  createdAt         DateTime @default(now())
}
```

### Social Models
- **Like**: `{ userId, profileId }` - Memorial likes
- **Reaction**: `{ userId, profileId, emoji }` - Emoji reactions (8 types)
- **Comment**: `{ userId, profileId, message, isApproved? }` - Comments with moderation
- **Tag** + **ProfileTag**: Predefined tags linked to memorials
- **TributeLike**: Likes on individual tributes
- **TributeReply**: Replies to tributes
- **TributeReport**: Flag inappropriate tributes

### Key Schema Rules
- All IDs use CUID (auto-generated)
- Timestamps: `createdAt`, `updatedAt` (auto)
- DB names: snake_case (`animal_type`, `death_date`)
- API responses: camelCase (Prisma handles via serialization)
- **Never query Prisma from components** → always use service layer + API routes

---

## 🔐 Authentication & Authorization

### Flow
1. **Register/Login**: `POST /api/auth/register` or `POST /api/auth/login`
2. Returns: `{ user, session }` with `session.token` (JWT-like, stored in Session table)
3. **Frontend**: Stores token in localStorage via `AuthContext`
4. **API calls**: Include `Authorization: Bearer {token}` header
5. **Verification**: `verifySessionToken(token)` → returns `{ valid: boolean, user?: User }`

### Component Usage
```typescript
'use client';
import { useAuth } from '@/contexts/AuthContext';

export function MyComponent() {
  const { user, isAuthenticated, session } = useAuth();
  
  if (!isAuthenticated) return <p>Login required</p>;
  if (user?.role === 'admin') return <AdminPanel />;
  
  // Make authenticated request
  const response = await fetch('/api/likes', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${session?.token}` },
    body: JSON.stringify({ profileId })
  });
}
```

### Demo Credentials
```
admin@forever.local / Demo123!  (role: admin, full access)
demo@forever.local / Demo123!   (role: user, basic tier)
```

### Roles & Permissions (src/types/roles.ts)
| Role | Can Create | Can Edit Own | Can Manage Tributes | Can Moderate | Can Manage Users |
|------|-----------|-------------|-------------------|-------------|-----------------|
| basic | ✅ 3 memorials | ✅ | ✅ Own | ❌ | ❌ |
| premium | ✅ 10 memorials | ✅ | ✅ Own | ❌ | ❌ |
| pro | ✅ Unlimited | ✅ | ✅ Own | ✅ Own tributes | ❌ |
| admin | ✅ Unlimited | ✅ All | ✅ All | ✅ All | ✅ |
| moderator | ✅ Unlimited | ✅ Own | ✅ All | ✅ All | ❌ |

---

## 📱 Social Features - Implementation Details

### 1. Likes System
- **File**: `src/lib/likesService.ts` + `POST/GET /api/likes`
- **Functions**: `toggleLike()`, `getLikeCount()`, `hasUserLiked()`, `getLikesForProfile()`
- **Usage**: Button shows count, toggles on click, requires auth

### 2. Reactions (Emoji)
- **File**: `src/lib/reactionsService.ts` + `POST/GET /api/reactions`
- **8 Emojis**: ❤️, 😢, 🙏, 😊, 🌹, ⭐, 🕊️, 💐
- **Functions**: `toggleReaction()`, `getReactionCounts()`, `getReactionsForProfile()`
- **UI**: ReactionsPanel.tsx shows emoji selector + counts

### 3. Comments
- **File**: `src/lib/commentsService.ts` + `POST/GET/DELETE /api/comments`
- **Features**: Create (auth optional), list, delete (owner/admin), approve (moderator)
- **Fields**: message, visitorName, visitorEmail, isApproved
- **Usage**: CommentsSection.tsx with form + list

### 4. Tags
- **File**: `src/lib/tagsService.ts` + `GET/POST/DELETE /api/tags`
- **Types**: Predefined tags (by pet type, by character: Heroico, Amado, Aventurero, Travieso, Guardián)
- **Functions**: `createOrGetTag()`, `addTagToProfile()`, `getPopularTags()`, `getProfilesByTag()`
- **API query params**: `?action=list|popular|preset|search|profiles`

### 5. Tributes (Flowers/Candles/Messages)
- **File**: `src/lib/tributesService.ts` + `POST/GET /api/tributes`
- **Types**: flower, candle, message
- **Duration**: 7/14/30 days (auto-expire)
- **Nested social**: Likes, replies, reports

### 6. Search & Discovery
- **File**: `GET /api/search?q={query}&type=all|memorial|animal|location&limit=20`
- **Searches**: Name, story, epitaph, animal type
- **Location search**: Lat,long → finds nearby memorials
- **Results**: Return paginated profiles with meta

---

## 🎨 UI Conventions & Components

### Component Organization
- **Client Components** (`'use client'`): Forms, interactive elements, state management, hooks usage
- **Server Components**: Layouts, static content, initial data fetching
- **UI Library**: shadcn/ui in `src/components/ui/` (use `bunx shadcn@latest add {name}`)

### Common Patterns

#### Maps (Leaflet)
```typescript
// src/components/InteractiveMap.tsx
const [mounted, setMounted] = useState(false);
useEffect(() => setMounted(true), []);
if (!mounted) return null; // Prevent SSR hydration errors

return (
  <MapContainer center={[lat, lng]} zoom={13}>
    <TileLayer url="https://.../tile" />
    {profiles.map(p => (
      <Marker key={p.id} position={[p.latitude, p.longitude]} 
              color={getColorByAnimalType(p.animalType)} />
    ))}
  </MapContainer>
);
```

#### Forms with File Upload
```typescript
const formData = new FormData();
formData.append('name', name);
formData.append('photo', photoFile); // Binary file

const response = await fetch('/api/profiles', {
  method: 'POST',
  headers: { 'Authorization': `Bearer ${token}` },
  body: formData // NOT JSON
});
```

#### API Error Handling
```typescript
try {
  const res = await fetch('/api/{resource}', { headers });
  if (!res.ok) throw new Error(await res.text());
  const data = await res.json();
  setData(data);
} catch (err) {
  setError(err.message);
}
```

---

## 🛠️ Development Workflow

### Setup & Commands
```bash
# Installation
bun install
# or
npm install

# Development
bun run dev          # http://localhost:3000 with Turbopack
bun run lint         # TypeScript + ESLint
bunx biome format --write src/  # Format code

# Database
npx prisma studio         # GUI to view/edit DB
npx prisma migrate dev     # Create & run migrations
npx prisma generate       # Regenerate types (auto after migrate)

# Build & Deploy
bun run build        # Production build
bun run start        # Production server
```

### Database Workflow
1. **Add model** to `prisma/schema.prisma`
2. **Run migration**: `npx prisma migrate dev --name descriptive_name`
3. **Types auto-generate** (Prisma handles it)
4. **Update service** with new queries
5. **Create API route** if exposing endpoint

### Common Debugging
```bash
# Check what migrations need running
npx prisma migrate status

# Reset database (destructive)
npx prisma migrate reset

# Inspect generated Prisma types
cat node_modules/.prisma/client/index.d.ts
```

---

## 📋 Project-Specific Conventions

### Code Organization
```
src/
  app/
    api/
      {resource}/route.ts     # Always POST/GET handlers
    (routes)/
      [page]/page.tsx         # App Router pages
  components/
    {Feature}*.tsx            # Feature-specific UI
    ui/                       # shadcn/ui components
  lib/
    {resource}Service.ts      # Business logic (likes, comments, etc.)
    auth.ts                   # Auth + token verification
    authorization.ts          # Role checks
    prisma.ts                 # Prisma singleton
  types/
    index.ts                  # Global types
    roles.ts                  # Role/permission definitions
  hooks/
    use{Feature}.ts           # React hooks for features
  contexts/
    AuthContext.tsx           # Global auth state
```

### Naming Conventions
- **Files**: camelCase (userService.ts, useProfiles.ts)
- **Exports**: PascalCase (components), camelCase (functions)
- **DB fields**: snake_case (`animal_type`, `created_at`)
- **API responses**: camelCase (`animalType`, `createdAt`)
- **API routes**: plural/resource names (`/api/profiles`, `/api/tributes`)

### Error Handling Pattern
```typescript
// Service layer always throws with message
export async function createProfile(userId: string, data: any) {
  if (!data.name) throw new Error('Name required');
  try {
    return await prisma.animalProfile.create({ data });
  } catch (err: any) {
    throw new Error(`Failed to create profile: ${err.message}`);
  }
}

// API route catches and returns JSON
try {
  const result = await createProfile(user.id, body);
  return NextResponse.json({ success: true, data: result });
} catch (err: any) {
  return NextResponse.json({ error: err.message }, { status: 400 });
}
```

---

## 🚨 Common Gotchas

### Gotcha 1: Auth Token Missing or Expired
- **Problem**: API returns 401
- **Solution**: Verify `useAuth()` returns token, check token not expired in Session table
- **Debug**: Log token in browser console: `localStorage.getItem('authToken')`

### Gotcha 2: Prisma Type Errors with Dates
- **Problem**: `birthDate` is string, Prisma expects Date
- **Solution**: Always parse: `new Date(birthDateStr)`
- **Pattern**: Service layer handles this transformation

### Gotcha 3: Stale UI After Mutation
- **Problem**: Add like, but count doesn't update
- **Solution**: Call refetch function after mutation (already in hooks)
- **Verify**: Hook has `await fetchLikes()` after `toggleLike()`

### Gotcha 4: SSR Hydration Mismatch
- **Problem**: "window is not defined" on maps/interactive elements
- **Solution**: Use `'use client'` + `mounted` state check
```typescript
'use client';
const [mounted, setMounted] = useState(false);
useEffect(() => setMounted(true), []);
if (!mounted) return null;
return <MapContainer>...</MapContainer>;
```

### Gotcha 5: FormData Loses Content-Type
- **Problem**: Sending FormData, API doesn't parse
- **Solution**: Don't set `Content-Type` header (browser auto-sets multipart/form-data)
- **Good**: `fetch(url, { body: formData })` NOT `headers: {'Content-Type': 'application/json'}`

---

## 🔄 Deployment Checklist

### Pre-Deployment
- [ ] All tests pass: `bun run lint`
- [ ] No TypeScript errors
- [ ] Database migrations tested locally
- [ ] Demo credentials work
- [ ] Admin panel accessible to admin role
- [ ] Social features (likes, comments, reactions) functional

### Environment Variables
```
DATABASE_URL=postgresql://... (Neon production instance)
NODE_ENV=production
```

### Post-Deployment
- [ ] Run migrations: `npx prisma migrate deploy`
- [ ] Verify database connection
- [ ] Test auth flow with production DB
- [ ] Check API responses (no dev console logs)
- [ ] Monitor error logs

---

## 🎯 Quick Reference: Adding a New Social Feature

Example: Add "Bookmark Memorial" feature.

1. **Schema** (`prisma/schema.prisma`):
```prisma
model Bookmark {
  id        String @id @default(cuid())
  userId    String
  profileId String
  user      User @relation(fields: [userId], references: [id], onDelete: Cascade)
  profile   AnimalProfile @relation(fields: [profileId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())
  @@unique([userId, profileId])
}
```

2. **Migrate**: `npx prisma migrate dev --name add_bookmarks`

3. **Service** (`src/lib/bookmarksService.ts`):
```typescript
export async function toggleBookmark(userId: string, profileId: string) {
  const existing = await prisma.bookmark.findUnique({
    where: { userId_profileId: { userId, profileId } }
  });
  if (existing) {
    return await prisma.bookmark.delete({ where: { id: existing.id } });
  }
  return await prisma.bookmark.create({ data: { userId, profileId } });
}
```

4. **API** (`src/app/api/bookmarks/route.ts`):
```typescript
export async function POST(req: NextRequest) {
  const token = req.headers.get('authorization')?.replace('Bearer ', '');
  const { valid, user } = await verifySessionToken(token);
  if (!valid) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { profileId } = await req.json();
  const result = await toggleBookmark(user.id, profileId);
  return NextResponse.json({ success: true, data: result });
}
```

5. **Hook** (`src/hooks/useBookmarks.ts`):
```typescript
export function useBookmarks() {
  const { session } = useAuth();
  async function toggleBookmark(profileId: string) {
    const response = await fetch('/api/bookmarks', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${session?.token}` },
      body: JSON.stringify({ profileId })
    });
    return response.json();
  }
  return { toggleBookmark };
}
```

6. **Component**: Import `useBookmarks()` and add button.

---

## 📚 Key Files by Feature

| Feature | Files |
|---------|-------|
| **Memorials** | `src/lib/profilesService.ts`, `src/app/api/profiles/route.ts`, `/create` page |
| **Tributes** | `src/lib/tributesService.ts`, `src/app/api/tributes/route.ts` |
| **Likes** | `src/lib/likesService.ts`, `src/app/api/likes/route.ts` |
| **Reactions** | `src/lib/reactionsService.ts`, `src/app/api/reactions/route.ts` |
| **Comments** | `src/lib/commentsService.ts`, `src/app/api/comments/route.ts` |
| **Tags** | `src/lib/tagsService.ts`, `src/app/api/tags/route.ts` |
| **Auth** | `src/lib/auth.ts`, `src/contexts/AuthContext.tsx`, `src/app/api/auth/*` |
| **Search** | `src/app/api/search/route.ts` |
| **Admin** | `src/app/api/admin/*`, `/admin` page |

---

## ✅ Implementation Checklist Before Pushing

- [ ] Service function written + error handling
- [ ] API route created with auth verification
- [ ] Hook created for component usage
- [ ] Component client-side logic implemented
- [ ] Types added to `src/types/index.ts` if needed
- [ ] Test in dev locally (create, read, update, delete)
- [ ] Test with both authenticated and guest users
- [ ] Check role permissions if applicable
- [ ] Format code: `bunx biome format --write src/`
- [ ] No TypeScript errors: `bun run lint`
