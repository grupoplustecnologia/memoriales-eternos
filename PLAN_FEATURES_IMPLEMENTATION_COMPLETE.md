# Plan-Based Features Implementation Complete ✅

**Date**: November 18, 2025
**Status**: All 6 features implemented and integrated

---

## 📋 Summary of Implementation

This document describes the complete implementation of plan-based feature restrictions for the **Memorias Eternas** platform. All three subscription tiers (Huella Eterna, Cielo de Estrellas, Santuario Premium) now have fully enforced permission systems with UI and API-level validations.

---

## ✅ Completed Tasks

### 1. **Database Migration** ✅ COMPLETE
**File**: `prisma/schema.prisma` + migration `20251118105702_add_plan_features`
- Added `isPublic` Boolean field to AnimalProfile (default: false)
- Created ProfileHighlight model for weekly memorial highlights
- Migration successfully applied to Neon PostgreSQL database

**Changes**:
```prisma
model AnimalProfile {
  // ... existing fields ...
  isPublic      Boolean   @default(false)  // Set by plan on creation
  highlights    ProfileHighlight[]
}

model ProfileHighlight {
  id            String    @id @default(cuid())
  profileId     String
  profile       AnimalProfile @relation(fields: [profileId], references: [id], onDelete: Cascade)
  weekStartDate DateTime
  isActive      Boolean   @default(true)
  
  @@unique([profileId, weekStartDate])
}
```

---

### 2. **TributesSelector Component** ✅ COMPLETE
**File**: `src/components/TributesSelector.tsx` (127 lines)

**Features**:
- Displays 5 tribute types: Vela Blanca, Corazón, Flores, Mensaje, Oración
- Filters available options based on user's subscription tier
- Shows lock icons for unavailable tribute types
- Displays upgrade prompt for plan-limited users
- Responsive grid layout (2-3-5 columns)
- Selected tribute indicator with visual feedback

**Plan Availability**:
- **Huella Eterna (Free)**: vela-blanca, corazon (2 types)
- **Cielo Estrellas (€2.99)**: 6 types (all basic + vela-dorada, flor, flor-celestial, angel)
- **Santuario Premium (€6.99)**: 7 types (all) + corona-flores

**Usage**:
```tsx
<TributesSelector
  userPlan={user.subscriptionTier}
  onSelectTribute={(type) => setSelectedType(type)}
  selectedTribute={selectedType}
/>
```

---

### 3. **InteractiveMap Plan-Based Styling** ✅ COMPLETE
**Files**: 
- `src/components/MapContent.tsx` (updated with plan styling)
- `src/components/InteractiveMap.tsx` (accepts userPlan prop)

**Features**:
- Marker size scales by plan (small/medium/large/xlarge)
- Red highlight circles for Premium users' special memorials
- Dynamic emoji sizing (16-56px range)
- Smooth animations and transitions
- Respects selected profile highlighting

**Size Multipliers**:
- **Huella Eterna**: 0.8x (small - 25px)
- **Cielo Estrellas**: 1.0x (medium - 32px)
- **Santuario Premium**: 1.6x (xlarge - 51px) + red background

**Implementation**:
```tsx
const markerSize = PlanPermissionsService.getMapMarkerSize(userPlan);
const baseSizeMultiplier = sizeMap[markerSize] || 1;
const finalSize = Math.round(baseSize * baseSizeMultiplier);
```

---

### 4. **Grid Visibility Filtering** ✅ COMPLETE
**Files**:
- `src/lib/profilesService.ts` (added publicOnly parameter)
- `src/app/api/profiles/route.ts` (added ?public=true query param)
- `src/app/map/page.tsx` (updated to fetch public profiles only)

**Features**:
- `/map` now displays only public memorials
- Non-public memorials hidden from grid view (Huella Eterna users)
- Premium users' memorials automatically visible on grid
- Query parameter: `?public=true`

**API Usage**:
```typescript
// Server-side filtering
const response = await fetch('/api/profiles?public=true');

// Or manually filter in components
const publicProfiles = profiles.filter(p => p.isPublic === true);
```

**Plan Rules**:
- **Huella Eterna**: isPublic = false (NOT visible in grid)
- **Cielo Estrellas**: isPublic = true (visible in grid)
- **Santuario Premium**: isPublic = true (visible in grid, with highlight option)

---

### 5. **HighlightsManager Component** ✅ COMPLETE
**File**: `src/components/HighlightsManager.tsx` (276 lines)

**Features**:
- Only available for Santuario Premium tier (5 weekly highlights)
- Visual grid of user's memorials
- Selection with star animation
- Real-time slot counter (X/5)
- Lock indicator for non-premium users
- Save/cancel actions with confirmation
- Success/error messaging
- Info tooltip about weekly reset

**Permission Enforcement**:
```typescript
const canHighlight = PlanPermissionsService.canHighlightProfiles(userPlan);
const maxHighlights = PlanPermissionsService.getWeeklyHighlightLimit(userPlan);

// huella-eterna: 0 highlights (hidden)
// cielo-estrellas: 0 highlights (hidden)
// santuario-premium: 5 highlights (visible)
```

**UI States**:
- **Locked (Free/Premium)**: Shows upgrade prompt
- **Available (Pro)**: Full feature with selections
- **Changed**: Shows save/cancel buttons
- **Saved**: Shows success message

**Usage**:
```tsx
<HighlightsManager
  profiles={userProfiles}
  userPlan={user.subscriptionTier}
  currentHighlightIds={weeklyHighlights}
  onSaveHighlights={handleSave}
/>
```

---

### 6. **Photo Upload Validation** ✅ COMPLETE
**File**: `src/lib/photoValidation.ts` (108 lines)

**Features**:
- Validates file size (max 5MB)
- Checks allowed file types (JPEG, PNG, WebP, GIF)
- Enforces plan-based photo limits
- Provides helpful error messages
- Returns remaining slots
- Formats file sizes for display

**Photo Limits by Plan**:
- **Huella Eterna**: 1 photo (main only)
- **Cielo Estrellas**: 2 photos (main + 1 additional)
- **Santuario Premium**: Unlimited photos

**Validation Logic**:
```typescript
const result = validatePhotoUpload({
  userPlan: 'cielo-estrellas',
  currentPhotoCount: 1,
  fileSize: 2_097_152, // 2MB
  fileName: 'memorial.jpg'
});

if (result.valid) {
  // Proceed with upload
} else {
  console.error(result.error); // Show error to user
}
```

**Helper Functions**:
- `validatePhotoUpload()` - Main validation function
- `formatFileSize()` - Human-readable size display
- `getMaxPhotosForPlan()` - Get limit for plan
- `getRemainingPhotoSlots()` - Calculate remaining capacity
- `getPhotoLimitMessage()` - User-friendly status message

---

## 🔐 Permission System Architecture

### Core Service: `PlanPermissionsService`

**Location**: `src/lib/planPermissions.ts`

**Methods**:
```typescript
// Check individual permissions
canCreateMemorial(tier, count) → boolean
canAddPhoto(tier, count) → boolean
canCreateTribute(tier) → boolean
isTributeTypeAllowed(tier, type) → boolean
canHighlightProfiles(tier) → boolean
canAppearInGrid(tier) → boolean

// Get plan data
getPermissions(tier) → PlanPermissions
getAllowedTributeTypes(tier) → string[]
getMapMarkerSize(tier) → 'small'|'medium'|'large'|'xlarge'
getMapMarkerHighlight(tier) → 'none'|'normal'|'red'
getWeeklyHighlightLimit(tier) → number
```

### Permission Definitions

```typescript
PLAN_PERMISSIONS: {
  'huella-eterna': {
    maxMemorials: 1,
    maxPhotosPerMemorial: 1,
    maxTributes: 1,
    allowedTributeTypes: ['vela-blanca', 'corazon'],
    canCreatePublicProfiles: false,
    mapMarkerSize: 'small',
    mapMarkerHighlight: 'none',
    weeklyHighlights: 0,
    canHighlightProfiles: false,
    guestTributeAllowed: true
  },
  'cielo-estrellas': {
    maxMemorials: 5,
    maxPhotosPerMemorial: 2,
    maxTributes: -1, // unlimited
    allowedTributeTypes: [6 types],
    canCreatePublicProfiles: true,
    mapMarkerSize: 'medium',
    mapMarkerHighlight: 'normal',
    weeklyHighlights: 0,
    canHighlightProfiles: false,
    guestTributeAllowed: true
  },
  'santuario-premium': {
    maxMemorials: -1, // unlimited
    maxPhotosPerMemorial: -1,
    maxTributes: -1,
    allowedTributeTypes: [7 types],
    canCreatePublicProfiles: true,
    mapMarkerSize: 'xlarge',
    mapMarkerHighlight: 'red',
    weeklyHighlights: 5,
    canHighlightProfiles: true,
    guestTributeAllowed: true
  }
}
```

---

## 🔌 Integration Points

### 1. **API Route: POST /api/profiles** 
**File**: `src/app/api/profiles/route.ts`

```typescript
// Validates memorial creation against plan limits
if (!PlanPermissionsService.canCreateMemorial(userPlan, userMemorialCount)) {
  return NextResponse.json({ error: '...' }, { status: 403 });
}

// Sets isPublic based on plan capability
createProfile(userId, data, userPlan); // Now accepts plan
```

### 2. **API Route: POST /api/tributes**
**File**: `src/app/api/tributes/route.ts`

```typescript
// Validates tribute type against plan permissions
const allowedTypes = PlanPermissionsService.getAllowedTributeTypes(userPlan);
if (!allowedTypes.includes(tributeType)) {
  return NextResponse.json({ error: '...' }, { status: 403 });
}
```

### 3. **Service: profilesService.createProfile()**
**File**: `src/lib/profilesService.ts`

```typescript
export async function createProfile(
  userId: string,
  data: ProfileData,
  userSubscriptionTier: string = 'huella-eterna'
) {
  const canBePublic = PlanPermissionsService.canAppearInGrid(userSubscriptionTier);
  const profile = await prisma.animalProfile.create({
    data: {
      ...data,
      isPublic: canBePublic // Automatically set
    }
  });
}
```

### 4. **Page: /map**
**File**: `src/app/map/page.tsx`

```typescript
// Fetch only public memorials
const response = await fetch('/api/profiles?public=true');
```

---

## 📊 Feature Matrix by Plan

| Feature | Huella Eterna | Cielo Estrellas | Santuario Premium |
|---------|:---:|:---:|:---:|
| **Memorials** | 1 | 5 | Unlimited |
| **Photos/Memorial** | 1 | 2 | Unlimited |
| **Tributes/Memorial** | 1 | ∞ | ∞ |
| **Grid Visibility** | ❌ | ✅ | ✅ |
| **Map Marker Size** | Small | Medium | XLarge |
| **Red Highlight** | ❌ | ❌ | ✅ |
| **Weekly Highlights** | 0 | 0 | 5 |
| **Tribute Types** | 2 | 6 | 7 |

---

## 🧪 Testing Checklist

- [ ] Create memorial on Huella Eterna → verify isPublic = false
- [ ] Create memorial on Cielo Estrellas → verify isPublic = true
- [ ] Try adding 2nd photo on Huella Eterna → shows error
- [ ] Try adding 2nd photo on Cielo Estrellas → succeeds
- [ ] View /map → only public memorials shown
- [ ] Switch to Premium → map marker becomes XLarge
- [ ] Switch to Premium → red highlight visible on marker
- [ ] Try to add 2nd tribute type on Huella Eterna → error (only 2 allowed)
- [ ] Load HighlightsManager on non-Premium → shows locked state
- [ ] Load HighlightsManager on Premium → full interface available
- [ ] Select 5 highlights, save → success message
- [ ] Try to select 6th highlight → button disabled at limit

---

## 🚀 Usage Examples

### Example 1: Create Memorial with Plan Validation

```typescript
// In component
const createMemorial = async (formData) => {
  const response = await fetch('/api/profiles', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${session.token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  });
  
  if (response.status === 403) {
    // Show plan upgrade dialog
    showUpgradeDialog();
  }
};
```

### Example 2: Filter Tributes in Form

```tsx
import { TributesSelector } from '@/components/TributesSelector';
import { useAuth } from '@/contexts/AuthContext';

export function CreateTributeForm() {
  const { user } = useAuth();
  const [tributeType, setTributeType] = useState('');
  
  return (
    <TributesSelector
      userPlan={user.subscriptionTier}
      onSelectTribute={setTributeType}
      selectedTribute={tributeType}
    />
  );
}
```

### Example 3: Apply Map Styling

```tsx
import { InteractiveMap } from '@/components/InteractiveMap';
import { useAuth } from '@/contexts/AuthContext';

export function MapPage() {
  const { user } = useAuth();
  
  return (
    <InteractiveMap
      profiles={profiles}
      userPlan={user.subscriptionTier}
      onProfileSelect={handleSelect}
    />
  );
}
```

### Example 4: Validate Photo Upload

```typescript
import { validatePhotoUpload, getPhotoLimitMessage } from '@/lib/photoValidation';

const handlePhotoChange = (file: File) => {
  const validation = validatePhotoUpload({
    userPlan: user.subscriptionTier,
    currentPhotoCount: gallery.length,
    fileSize: file.size,
    fileName: file.name
  });
  
  if (validation.valid) {
    uploadPhoto(file);
  } else {
    showError(validation.error);
  }
  
  // Show remaining slots
  const message = getPhotoLimitMessage(user.subscriptionTier, gallery.length);
  console.log(message); // "📷 1 photo disponible (1/2)"
};
```

---

## 📁 File Structure Summary

```
src/
  ├── lib/
  │   ├── planPermissions.ts ........................ Core permission service
  │   ├── photoValidation.ts ........................ Photo upload validation
  │   └── profilesService.ts ........................ Updated with plan support
  ├── components/
  │   ├── TributesSelector.tsx ...................... Tribute type selector
  │   ├── HighlightsManager.tsx ..................... Weekly highlights manager
  │   ├── InteractiveMap.tsx ........................ Updated with userPlan prop
  │   └── MapContent.tsx ............................ Updated with plan styling
  └── app/
      ├── api/
      │   ├── profiles/route.ts ..................... Updated with plan validation
      │   └── tributes/route.ts ..................... Updated with plan validation
      └── map/
          └── page.tsx .............................. Updated to filter public profiles

prisma/
  └── migrations/
      └── 20251118105702_add_plan_features/ ....... Database schema changes
```

---

## 🔄 Data Flow Diagrams

### Feature: Create Memorial

```
User Form (CreateMemorial)
    ↓
POST /api/profiles (with auth)
    ↓
Verify token → Get user plan
    ↓
Check: Can user create another memorial?
  ├─ YES → Continue
  └─ NO → Return 403 error
    ↓
createProfile(userId, data, userPlan)
    ↓
Set isPublic = canAppearInGrid(userPlan)
    ↓
Save to Prisma DB
    ↓
Return profile with isPublic flag
```

### Feature: View Map

```
/map page loads
    ↓
fetch('/api/profiles?public=true')
    ↓
API returns profiles where isPublic = true
    ↓
Filter by animal type, search, etc.
    ↓
<InteractiveMap userPlan={currentUser.tier}>
    ↓
MapContent receives userPlan
    ↓
For each profile:
  ├─ Get marker size from PlanPermissionsService
  ├─ Get highlight color from PlanPermissionsService
  └─ Create marker with applied styling
    ↓
Map rendered with plan-appropriate sizing
```

### Feature: Select Highlights

```
Premium user opens HighlightsManager
    ↓
canHighlightProfiles(userPlan) → true
    ↓
getWeeklyHighlightLimit(userPlan) → 5
    ↓
Fetch current highlights for this week
    ↓
Display profile grid with selections
    ↓
User selects up to 5 memorials
    ↓
Click "Guardar Destacados"
    ↓
POST /api/highlights with selected IDs
    ↓
Create ProfileHighlight records
    ↓
Show success message
```

---

## 🎯 Future Enhancements

1. **Admin Panel**: Analytics on plan feature usage
2. **A/B Testing**: Track which highlights convert to upgrades
3. **Auto-expire Highlights**: Reset weekly on Monday midnight
4. **Highlight Notifications**: Alert other users about featured memorials
5. **Photo Storage Limits**: Track total storage per plan (vs per memorial)
6. **Collaborative Features**: Shared memorial permissions by plan tier
7. **Advanced Styling**: Custom colors/fonts for Premium users
8. **Priority Support**: Response time SLAs by plan tier

---

## 📞 Support & Troubleshooting

### Issue: Memorial not appearing on map
- **Check 1**: Is memorial's `isPublic` field true?
- **Check 2**: Is user's plan >= Cielo Estrellas?
- **Check 3**: Are tributes being added (needed for visibility)?

### Issue: Photo upload fails with "limit reached"
- **Check 1**: Run `getMaxPhotosForPlan(userPlan)`
- **Check 2**: Count current photos: `gallery.length`
- **Check 3**: Verify plan in database user record

### Issue: Highlights not saving
- **Check 1**: Ensure user plan is 'santuario-premium'
- **Check 2**: Verify ProfileHighlight table exists
- **Check 3**: Check for unique constraint violations (same profileId + weekStartDate)

---

**Implementation Completed**: November 18, 2025 10:07 UTC
**Next Phase**: Component integration testing and UI refinement
