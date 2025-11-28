# Plan Features - Quick Reference Guide

## 🚀 Quick Start Integration

### Step 1: Add Plan Prop to Component

```tsx
import { useAuth } from '@/contexts/AuthContext';

export function MyComponent() {
  const { user } = useAuth();
  
  return <ChildComponent userPlan={user.subscriptionTier} />;
}
```

### Step 2: Use Appropriate Component

```tsx
// For tribute selection
import { TributesSelector } from '@/components/TributesSelector';
<TributesSelector userPlan={userPlan} onSelectTribute={handler} />

// For map display
import { InteractiveMap } from '@/components/InteractiveMap';
<InteractiveMap profiles={data} userPlan={userPlan} />

// For highlights management
import { HighlightsManager } from '@/components/HighlightsManager';
<HighlightsManager profiles={userProfiles} userPlan={userPlan} onSaveHighlights={handler} />
```

### Step 3: Validate in API Routes

```typescript
import { PlanPermissionsService } from '@/lib/planPermissions';

const userPlan = user.subscriptionTier;

// Check permission
if (!PlanPermissionsService.canCreateMemorial(userPlan as any, count)) {
  return NextResponse.json({ error: 'Plan limit reached' }, { status: 403 });
}

// Get allowed options
const allowedTributes = PlanPermissionsService.getAllowedTributeTypes(userPlan as any);
```

---

## 📋 Common Patterns

### Check if Feature is Available
```typescript
const canHighlight = PlanPermissionsService.canHighlightProfiles(userPlan);
if (!canHighlight) {
  // Show upgrade prompt
}
```

### Get Remaining Capacity
```typescript
import { getRemainingPhotoSlots } from '@/lib/photoValidation';

const remaining = getRemainingPhotoSlots(userPlan, currentCount);
const message = remaining === -1 ? 'Unlimited' : `${remaining} remaining`;
```

### Validate Before Action
```typescript
import { validatePhotoUpload } from '@/lib/photoValidation';

const result = validatePhotoUpload({
  userPlan,
  currentPhotoCount: photos.length,
  fileSize: file.size,
  fileName: file.name
});

if (!result.valid) {
  // Show error: result.error
} else if (result.warning) {
  // Show warning: result.warning
}
```

### Filter Data by Plan
```typescript
// Public profiles only
const response = await fetch('/api/profiles?public=true');

// Or manually
const publicProfiles = profiles.filter(p => p.isPublic);
const highlightLimit = PlanPermissionsService.getWeeklyHighlightLimit(plan);
```

---

## 🎨 Component Props Reference

### TributesSelector
```tsx
interface TributesSelectorProps {
  userPlan: string;                          // Required
  onSelectTribute: (tributeType: string) => void;
  selectedTribute?: string;
  disabled?: boolean;
}
```

### InteractiveMap
```tsx
interface InteractiveMapProps {
  profiles: AnimalProfile[];
  selectedTypes?: string[];
  selectedProfile?: string | null;
  onProfileSelect?: (id: string | null) => void;
  userPlan?: string;  // NEW: optional but affects marker styling
}
```

### HighlightsManager
```tsx
interface HighlightsManagerProps {
  profiles: AnimalProfile[];
  userPlan: string;
  currentHighlightIds?: string[];
  onSaveHighlights?: (profileIds: string[]) => Promise<void>;
}
```

---

## 🔍 Debugging Tips

### Check What Tributes User Can Create
```typescript
const allowed = PlanPermissionsService.getAllowedTributeTypes(userPlan);
console.log(`Allowed tributes: ${allowed.join(', ')}`);
```

### Check Photo Limit
```typescript
const perms = PlanPermissionsService.getPermissions(userPlan);
console.log(`Max photos: ${perms.maxPhotosPerMemorial}`);
```

### Check Grid Visibility
```typescript
const isPublic = PlanPermissionsService.canAppearInGrid(userPlan);
console.log(`Shows in map grid: ${isPublic}`);
```

### Check Highlight Capacity
```typescript
const max = PlanPermissionsService.getWeeklyHighlightLimit(userPlan);
console.log(`Weekly highlights allowed: ${max}`);
```

---

## 📊 Plan Comparison Table

| Feature | Huella Eterna | Cielo Estrellas | Santuario Premium |
|---------|:---:|:---:|:---:|
| Memorials | 1 | 5 | ∞ |
| Photos | 1 | 2 | ∞ |
| Tributes | 1 | ∞ | ∞ |
| Tribute Types | 2 | 6 | 7 |
| Grid Visibility | No | Yes | Yes |
| Map Size | Small | Medium | XLarge |
| Red Highlight | No | No | Yes |
| Weekly Highlights | 0 | 0 | 5 |

---

## 🛡️ Error Handling

### API Error Responses

**403 Forbidden - Plan Limit**
```json
{
  "success": false,
  "error": "You have reached the limit of 1 memorials for your plan. Upgrade your plan to create more."
}
```

**403 Forbidden - Invalid Tribute Type**
```json
{
  "success": false,
  "error": "Tribute type 'flores' not allowed for your plan. Allowed: vela-blanca, corazon"
}
```

**400 Bad Request - Photo Validation**
```json
{
  "error": "File too large. Maximum 5MB. Current: 8.2MB"
}
```

### Client-Side Handling
```typescript
if (response.status === 403) {
  // Check if it's a plan limit
  const data = await response.json();
  if (data.error.includes('limit')) {
    // Show upgrade prompt
    showUpgradePath();
  } else if (data.error.includes('not allowed')) {
    // Show feature unavailable message
    showFeatureLockedMsg();
  }
}
```

---

## 🔌 API Endpoints Reference

### GET /api/profiles
```typescript
// Get all profiles
fetch('/api/profiles')

// Get only public profiles (for map)
fetch('/api/profiles?public=true')
```

### POST /api/profiles
Requires auth header: `Authorization: Bearer {token}`
```typescript
// Creates memorial with isPublic based on user's plan
// Validates memorial count against plan limit
```

### POST /api/tributes
Requires auth header: `Authorization: Bearer {token}`
```typescript
// Creates tribute
// Validates tribute type is allowed for user's plan
```

---

## 📱 Mobile Considerations

### TributesSelector on Mobile
- 2-column grid on mobile (vs 5-column on desktop)
- Lock icons visible and tappable
- Sufficient touch target sizes (44x44px minimum)

### InteractiveMap on Mobile
- Marker sizes scale proportionally
- Responsive touch interactions
- Red highlight visible at smaller sizes

### HighlightsManager on Mobile
- Single column layout
- Full-screen selection interface
- Swipe to browse memorials option

---

## ⚡ Performance Tips

1. **Memoize Plan Checks**: Cache results of `PlanPermissionsService` calls in components
2. **Filter Early**: Use `?public=true` in API calls rather than filtering in JS
3. **Lazy Load**: Only load HighlightsManager when user has Premium plan
4. **Batch Validations**: Validate multiple files at once rather than one-by-one

---

## 🧪 Testing Plan Features

### Unit Tests for PlanPermissionsService
```typescript
describe('PlanPermissionsService', () => {
  it('limits memorials per plan', () => {
    expect(canCreateMemorial('huella-eterna', 1)).toBe(false);
    expect(canCreateMemorial('cielo-estrellas', 5)).toBe(false);
    expect(canCreateMemorial('santuario-premium', 999)).toBe(true);
  });

  it('filters tribute types', () => {
    const allowed = getAllowedTributeTypes('huella-eterna');
    expect(allowed).toEqual(['vela-blanca', 'corazon']);
  });
});
```

### Integration Tests
```typescript
it('creates memorial with isPublic based on plan', async () => {
  const memorial = await createProfile(userId, data, 'huella-eterna');
  expect(memorial.isPublic).toBe(false);
});
```

---

## 💾 Database Queries Reference

### Find public memorials for map
```sql
SELECT * FROM "AnimalProfile" WHERE "isPublic" = true;
```

### Find this week's highlights
```sql
SELECT * FROM "ProfileHighlight" 
WHERE "weekStartDate" >= NOW() - INTERVAL '7 days'
  AND "isActive" = true;
```

### Count user's memorials
```sql
SELECT COUNT(*) FROM "AnimalProfile" WHERE "userId" = $1;
```

---

## 🔐 Security Checklist

- [x] API validates user has permission before creating/updating
- [x] Photo upload limits enforced on server (not just client)
- [x] isPublic flag set automatically (user can't bypass)
- [x] Tribute types validated against plan
- [x] Memorial count checked before creation
- [x] All permission checks use PlanPermissionsService (centralized)

---

**Last Updated**: November 18, 2025  
**Version**: 1.0  
**Status**: Ready for Integration
