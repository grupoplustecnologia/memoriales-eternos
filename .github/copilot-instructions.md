# AI Copilot Instructions - Forever Pet Friend (Memorias Eternas)

## 🎯 Project Overview

**Forever Pet Friend** is a production-ready Next.js 15 full-stack pet memorial platform (v1.0, Nov 2025). Users create digital memorials for deceased pets, place them on an interactive world map, and engage through rich social features: likes, emoji reactions, comments, tributes, tags, and search/discovery.

**Core Value**: Combines commemoration (memorials + tributes) with community (social features + discovery).

### Stack
- **Frontend**: Next.js 15.5+ (App Router, Turbopack), React 18, TypeScript 5, Tailwind CSS, shadcn/ui, Leaflet maps
- **Backend**: API routes (`src/app/api/*`), Prisma ORM v6.19+
- **Database**: Neon PostgreSQL (`prisma/schema.prisma`)
- **Auth**: Password-based (bcryptjs) + JWT tokens stored in `Session` table, localStorage
- **Build**: Bun (preferred), npm fallback; Biome formatter, ESLint, Turbopack
- **Deployment**: Netlify-ready (tested in production)

---

## 🏗️ Architecture: Layered Service Pattern

### Request Flow
```
React Component ('use client' hook or form)
  ↓
fetch('/api/{resource}', { headers: { Authorization: 'Bearer {token}' } })
  ↓
API Route (src/app/api/{resource}/route.ts)
  ├─ Extract & verify auth token → get user.id
  ├─ Check plan permissions via PlanPermissionsService
  └─ Call service function
     ↓
Service Layer (src/lib/*Service.ts)
  ├─ Business logic + validation
  ├─ Prisma queries + transforms
  └─ Throw errors with messages
     ↓
Neon PostgreSQL
```

### Key Services (src/lib/)
1. **profilesService.ts** - Memorials: CRUD, collaboration, visibility, slug generation
2. **tributesService.ts** - Tributes: create, list, expire after duration
3. **likesService.ts** - Toggle likes, counts, user checks
4. **reactionsService.ts** - 8 emoji reactions (❤️ 😢 🙏 😊 🌹 ⭐ 🕊️ 💐)
5. **commentsService.ts** - Comments with moderation flags
6. **tagsService.ts** - Predefined + custom tags by pet type + character traits
7. **tributeLikesService.ts** - Likes on tributes
8. **tributeReplyService.ts** - Nested replies on tributes
9. **tributeReportService.ts** - Flag inappropriate content
10. **auth.ts** - Register, login, token generation + verification
11. **authorization.ts** - Role-based permission checks
12. **planPermissions.ts** - Subscription tier limits (memorials, tributes, photos)

---

## 💳 Subscription Plans & Permissions

**Key File**: `src/lib/planPermissions.ts`

### Three Tiers (src/types/index.ts)
```typescript
type SubscriptionTier = 'huella-eterna' | 'cielo-estrellas' | 'santuario-premium';
```

| Feature | Free | Premium | Pro |
|---------|------|---------|-----|
| **Max Memorials** | 1 | 5 | ∞ |
| **Photos per Memorial** | 1 | 2 | ∞ |
| **Tribute Types** | 2 (vela, corazón) | 6 | All 7 |
| **Max Tributes** | 1 | ∞ | ∞ |
| **Public Profile** | ✅ | ✅ | ✅ |
| **Marker Size** | small | medium | xlarge |
| **Highlights/Week** | 0 | 0 | 5 |
| **Guest Tributes** | ✅ | ✅ | ✅ |

**Check plan limits in API routes**:
```typescript
const userPlan = user.subscriptionTier; // 'huella-eterna' etc
const permissions = PlanPermissionsService.getPermissions(userPlan);
if (!PlanPermissionsService.canCreateMemorial(userPlan, existingCount)) {
  return NextResponse.json({ error: 'Limit reached' }, { status: 403 });
}
```

---

## 🗄️ Database Schema (Prisma) - Key Models

### User (Authentication)
```prisma
model User {
  id                String @id @default(cuid())
  email             String @unique
  name              String
  passwordHash      String (bcryptjs)
  
  // Subscription
  subscriptionTier  String // huella-eterna | cielo-estrellas | santuario-premium
  subscriptionStatus String // active | inactive | expired
  subscriptionEndDate DateTime?
  stripeCustomerId  String?
  
  // Relations
  profiles          AnimalProfile[] // Memorials created
  tributes          Tribute[]       // Tributes left
  likes             Like[]
  reactions         Reaction[]
  comments          Comment[]
  sessions          Session[]
  privacySettings   PrivacySettings?
  
  createdAt         DateTime @default(now())
}

model Session {
  id        String @id @default(cuid())
  userId    String
  token     String @unique  // Verification key in DB
  expiresAt DateTime
}
```

### AnimalProfile (Memorials)
```prisma
model AnimalProfile {
  id          String @id @default(cuid())
  slug        String @unique  // Generated from name, used in URLs
  userId      String
  
  name        String
  animalType  String // perro, gato, ave, roedor, reptil, otro
  breed       String?
  birthDate   DateTime
  deathDate   DateTime
  
  latitude    Float   // Map location
  longitude   Float
  photoUrl    String  // Main photo (must fit tier limits)
  story       String  // Full memorial text
  epitaph     String  // Memorial inscription
  gallery     String[] // Extra photos (tier-dependent)
  
  isPublic    Boolean @default(false) // Shown on /map
  viewCount   Int @default(0)
  
  // Social features
  tributes    Tribute[]
  likes       Like[]
  reactions   Reaction[]
  comments    Comment[]
  tags        ProfileTag[]
  
  // Collaboration
  isCollaborative Boolean @default(false)
  collaborators MemorialCollaborator[]
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Tribute {
  id          String @id @default(cuid())
  profileId   String
  
  visitorName String
  visitorId   String?  // null = guest
  tributeType String  // vela-blanca | flor | etc
  message     String?
  
  durationDays Int?    // Auto-expire after N days
  expiresAt   DateTime?
  
  likes       TributeLike[]
  replies     TributeReply[]
  reports     TributeReport[]
  
  createdAt   DateTime @default(now())
}

model Like {
  id        String @id @default(cuid())
  userId    String
  profileId String
  createdAt DateTime @default(now())
  @@unique([userId, profileId])
}

model Reaction {
  id        String @id @default(cuid())
  userId    String
  profileId String
  emoji     String  // ❤️, 😢, 🙏, etc
  createdAt DateTime @default(now())
  @@unique([userId, profileId, emoji])
}

model Comment {
  id        String @id @default(cuid())
  profileId String
  userId    String?
  
  message   String
  visitorName String?
  visitorEmail String?
  isApproved Boolean @default(false)
  
  createdAt DateTime @default(now())
}
```

### Key Schema Rules
- All IDs: CUID (auto-generated, URL-safe)
- Timestamps: `createdAt`, `updatedAt` auto-managed
- DB column names: snake_case (`animal_type`, `death_date`)
- API responses: camelCase (Prisma transforms on read)
- **Never** query Prisma directly from components → always use service layer + API route

---

## 🔐 Authentication & Authorization

### Flow
1. `POST /api/auth/register` or `POST /api/auth/login` with email + password
2. Returns: `{ user: User, session: { token, expiresAt } }`
3. Frontend stores `token` in localStorage via `AuthContext`
4. All API calls include: `Authorization: Bearer {token}` header
5. Backend verifies: `const result = await verifySessionToken(token)`

### Verification Pattern
```typescript
import { verifySessionToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const token = req.cookies.get('auth_token')?.value 
    || req.headers.get('authorization')?.replace('Bearer ', '');
  
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  
  const { valid, user } = await verifySessionToken(token);
  if (!valid) return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  
  // token is valid, user is populated
  // ... proceed with business logic
}
```

### Component Usage
```typescript
'use client';
import { useAuth } from '@/contexts/AuthContext';

export function MyComponent() {
  const { user, isAuthenticated, session } = useAuth();
  
  if (!isAuthenticated) return <p>Login required</p>;
  
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
admin@forever.local / Demo123!  → admin role, full access
demo@forever.local / Demo123!   → user role, basic tier
```

---

## 📱 Social Features - Implementation Details

### 1. Likes (src/lib/likesService.ts)
- **Functions**: `toggleLike()`, `getLikeCount()`, `hasUserLiked()`, `getLikesForProfile()`
- **API**: `POST /api/likes` (toggle), `GET /api/likes?profileId={id}` (fetch)
- **Pattern**: Button shows count, toggles on click, refetch after mutation

### 2. Emoji Reactions (src/lib/reactionsService.ts)
- **8 Emojis**: ❤️ 😢 🙏 😊 🌹 ⭐ 🕊️ 💐
- **Functions**: `toggleReaction()`, `getReactionCounts()`, `getReactionsForProfile()`
- **API**: `POST /api/reactions`, `GET /api/reactions?profileId={id}`
- **Unique constraint**: One emoji per user per profile

### 3. Comments (src/lib/commentsService.ts)
- **API**: `POST /api/comments` (create), `GET /api/comments?profileId={id}` (list), `DELETE /api/comments/{id}` (delete)
- **Fields**: message, visitorName, visitorEmail, isApproved
- **Permissions**: Owner/admin delete, moderator approves

### 4. Tags (src/lib/tagsService.ts)
- **Types**: Predefined by pet type (perro, gato, etc) + character traits (Heroico, Amado, Aventurero, Travieso, Guardián)
- **API query params**: `?action=list|popular|preset|search|profiles`
- **Functions**: `createOrGetTag()`, `addTagToProfile()`, `getPopularTags()`, `getProfilesByTag()`

### 5. Tributes (src/lib/tributesService.ts)
- **Types**: vela-blanca, vela-dorada, flor, flor-celestial, corona-flores, corazon
- **Duration**: 7/14/30 days (auto-expire via `expiresAt`)
- **Nested**: Likes on tributes, replies to tributes, flag reports
- **Guests**: Can leave tributes anonymously (visitorId = null)

### 6. Search (src/app/api/search/route.ts)
- **Query**: `GET /api/search?q={query}&type=all|memorial|animal|location&limit=20`
- **Searches**: Memorial name, story, epitaph, animal type
- **Location**: Pass `lat,long` to find nearby memorials
- **Results**: Paginated profiles with metadata

---

## 🎨 UI & Component Patterns

### Component Structure
- **Server Components**: Layouts, static content, initial page loads
- **Client Components** (`'use client'`): Forms, interactive features, state, hooks
- **UI Library**: shadcn/ui in `src/components/ui/`
  - Install new: `bunx shadcn@latest add {name}`

### Leaflet Maps (SSR Hydration Issue)
```typescript
'use client';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';

export function MyMap() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  
  if (!mounted) return null; // Prevent "window is not defined"
  
  return (
    <MapContainer center={[lat, lng]} zoom={13}>
      <TileLayer url="https://.../tile" />
      {profiles.map(p => (
        <Marker position={[p.latitude, p.longitude]} />
      ))}
    </MapContainer>
  );
}
```

### File Upload (FormData)
```typescript
const formData = new FormData();
formData.append('name', 'Fluffy');
formData.append('photo', photoFile); // Binary blob

const response = await fetch('/api/profiles', {
  method: 'POST',
  headers: { 'Authorization': `Bearer ${token}` },
  body: formData  // NOT JSON - browser handles multipart
});
// Don't set Content-Type header - browser auto-detects
```

### Error Handling
```typescript
try {
  const res = await fetch('/api/{resource}', { headers });
  if (!res.ok) throw new Error(await res.text());
  const data = await res.json();
  setData(data);
} catch (err) {
  console.error(err);
  setError(err.message);
}
```

---

## 🛠️ Development Workflow

### Setup & Build
```bash
# Install dependencies
bun install
# or: npm install

# Start dev server (http://localhost:3000, Turbopack)
bun run dev

# Check types & linting
bun run lint

# Format code
bunx biome format --write src/

# Production build
bun run build
bun run start
```

### Database Commands
```bash
# GUI database browser (modify data directly)
npx prisma studio

# Create & apply new migration
npx prisma migrate dev --name descriptive_name

# Reset database (⚠️ destructive)
npx prisma migrate reset

# Check pending migrations
npx prisma migrate status

# Generate/regenerate Prisma types (auto after migrate)
npx prisma generate
```

### Common Debugging
```bash
# Check generated types
cat node_modules/.prisma/client/index.d.ts

# Read token from browser (dev)
localStorage.getItem('authToken')

# View database schema
cat prisma/schema.prisma
```

---

## 📋 Project Conventions

### File Structure
```
src/
  app/
    api/
      {resource}/route.ts           # Handler: GET, POST, DELETE
    {routes}/
      [dynamic]/page.tsx            # App Router page
  components/
    {Feature}*.tsx                  # Feature UI
    ui/                             # shadcn/ui library
  lib/
    {resource}Service.ts            # Business logic
    auth.ts, authorization.ts       # Auth functions
    prisma.ts                       # Prisma singleton
  types/
    index.ts                        # Global types
    roles.ts                        # Role definitions
  hooks/
    use{Feature}.ts                 # React hooks
  contexts/
    AuthContext.tsx                 # Global auth state
```

### Naming
- **Files**: camelCase (`profilesService.ts`, `useProfile.ts`)
- **Functions**: camelCase (`toggleLike`, `getProfiles`)
- **Components**: PascalCase (`InteractiveMap`, `ProfileCard`)
- **DB columns**: snake_case (`animal_type`, `birth_date`)
- **API responses**: camelCase (`{ animalType, birthDate }`)
- **API routes**: plural/resource names (`/api/profiles`, `/api/tributes`)

### Error Handling Pattern
```typescript
// Service: throw with descriptive message
export async function createProfile(userId: string, data: any) {
  if (!data.name) throw new Error('Name is required');
  try {
    return await prisma.animalProfile.create({ data });
  } catch (err: any) {
    throw new Error(`Failed to create profile: ${err.message}`);
  }
}

// API route: catch and return JSON
try {
  const result = await createProfile(user.id, body);
  return NextResponse.json({ success: true, data: result });
} catch (err: any) {
  return NextResponse.json({ error: err.message }, { status: 400 });
}
```

### Service Response Pattern
```typescript
// Services return success/error objects:
{
  success: true,
  data: { ... }
}
// or
{
  success: false,
  error: 'Description of what went wrong'
}
```

---

## 🚨 Gotchas & Solutions

| Gotcha | Cause | Fix |
|--------|-------|-----|
| **401 Unauthorized** | Token missing/expired | Verify `useAuth()` returns token; check Session table expiry |
| **Prisma type error** | DateTime sent as string | Always parse: `new Date(dateStr)` in service |
| **UI not updating** | State stale after mutation | Call refetch hook after mutation (already in hooks) |
| **"window is not defined"** | SSR hydration on maps | Use `'use client'` + `mounted` state check |
| **FormData not parsing** | Wrong Content-Type header | Don't set header; let browser handle multipart |
| **Empty profile list** | All profiles private | Set `isPublic: true` when creating for `/map` visibility |
| **Token in cookies missing** | Not set on login | Login API must set `auth_token` cookie + return token |

---

## 🔄 Deployment & Production

### Pre-Deployment Checklist
- [ ] `bun run lint` passes (no TS errors)
- [ ] Database migrations tested locally
- [ ] Demo credentials (`admin@forever.local`, `demo@forever.local`) work
- [ ] Auth flow tested (register → login → create profile)
- [ ] Social features tested (like, comment, tribute)
- [ ] Admin panel accessible to admin role
- [ ] `/map` page loads public profiles correctly
- [ ] File uploads work (profile photos)

### Environment Setup
```bash
# Production .env
DATABASE_URL=postgresql://user:pass@neon.tech/db  # Neon PostgreSQL
NODE_ENV=production
```

### Post-Deployment
- [ ] Run migrations: `npx prisma migrate deploy`
- [ ] Verify DB connection
- [ ] Test auth flow against production DB
- [ ] Check API response headers (no dev logs)
- [ ] Monitor error logs

---

## 📚 Key Files by Feature

| Feature | Service | API Route | Page |
|---------|---------|-----------|------|
| **Memorials** | `profilesService.ts` | `/api/profiles/route.ts` | `/create`, `/memorial/[slug]` |
| **Tributes** | `tributesService.ts` | `/api/tributes/route.ts` | (widget) |
| **Likes** | `likesService.ts` | `/api/likes/route.ts` | (button) |
| **Reactions** | `reactionsService.ts` | `/api/reactions/route.ts` | (panel) |
| **Comments** | `commentsService.ts` | `/api/comments/route.ts` | (section) |
| **Tags** | `tagsService.ts` | `/api/tags/route.ts` | `/trending`, search |
| **Auth** | `auth.ts` | `/api/auth/[...]/route.ts` | `/auth/login`, `/auth/register` |
| **Search** | - | `/api/search/route.ts` | `/search` |
| **Admin** | - | `/api/admin/*/route.ts` | `/admin` |

---

## ✅ Feature Implementation Checklist

When adding a new feature (e.g., bookmarks):

- [ ] Add schema to `prisma/schema.prisma`
- [ ] Run: `npx prisma migrate dev --name add_bookmarks`
- [ ] Create `src/lib/bookmarksService.ts` with functions
- [ ] Create `src/app/api/bookmarks/route.ts` with auth + permissions
- [ ] Create `src/hooks/useBookmarks.ts` for component usage
- [ ] Add types to `src/types/index.ts`
- [ ] Test locally (CRUD, auth, permissions)
- [ ] Format: `bunx biome format --write src/`
- [ ] Verify: `bun run lint` (no TS errors)
- [ ] Push to git
