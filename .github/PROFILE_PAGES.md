# User Profile & Management Pages - Memorias Eternas

## Overview
Complete user profile and management system with multiple dedicated pages for profile viewing, memorial management, settings, and subscription management. All pages require authentication and include responsive design.

## Pages Implemented

### 1. Profile Page (`/profile/page.tsx`)
Main user dashboard with tabbed interface.

**Tabs:**
- **Info Tab**: User information display, subscription status, profile stats
- **Memorials Tab**: Created memorials + favorite memorials in separate sections
- **Tributes Tab**: All tributes received with tribute type badges
- **Activity Tab**: Chronological activity log with emojis and timestamps
- **Settings Tab**: Access to privacy, notifications, and subscription controls

**Features:**
- Editable profile (name, picture) with inline edit mode
- Profile picture upload with file input
- Real-time stats: memorials count, tributes count, favorites count
- Memorial cards with: photo, name, breed, birth/death dates, epitaph, tribute count
- Tribute cards with visitor name, tribute type, timestamp
- Activity entries with action emoji and full description
- Privacy toggles (public profile, show memorials, anonymous tributes, public stats, search indexing)
- Email notification preferences (tributes, visits, comments, messages, newsletter, anniversaries)
- Subscription info box with plan name and renewal date
- Danger zone with account deletion and data export options

**Mock Data:**
- `myMemorials`: 2 memorials (Max the dog, Luna the cat)
- `favoriteMemorials`: 1 favorite (Rocky the dog)
- `tributes`: 3 tributes with different types
- `activityLog`: 4 activity entries

---

### 2. My Memorials Page (`/my-memorials/page.tsx`)
Dedicated memorial management interface.

**Features:**
- **Search bar**: Real-time search by memorial name
- **Filters**: 
  - Animal type dropdown (all animals, perro, gato, ave, roedor, reptil, otro)
- **Sort options**: Newest, oldest, most tributes, alphabetical (A-Z)
- **Memorial cards** display:
  - Photo (covers top of card)
  - Name and breed
  - Birth date and age calculation
  - Epitaph text (centered, golden color)
  - Badges: tribute count, visitor count
  - Action buttons: View, Edit (pencil icon), Delete (trash icon)
- **Stats dashboard** (bottom):
  - Total memorials
  - Total tributes received (across all)
  - Total visitors (across all)
  - Average tributes per memorial

**Mock Data:**
- 3 memorials with different animal types and tribute counts

**Layout:**
- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 3 columns

---

### 3. Settings Page (`/settings/page.tsx`)
Comprehensive settings with 4 tabs.

**Profile Tab:**
- Full name input (editable)
- Email display (disabled, read-only)
- Email verification badge (green ✅)
- Bio/biography textarea (optional, 500 char max)
- Profile picture upload area (drag-and-drop visual)
- Save changes button

**Privacy Tab:**
- Toggle switches for:
  1. Profile Public (public/private visibility)
  2. Show My Memorials (let others see memorial list)
  3. Receive Anonymous Tributes (allow guests to leave tributes)
  4. Show Public Statistics (display visit/tribute counts)
  5. Allow Search Engine Indexing (allow Google/Bing to index)
- Block users section with add user button
- Save configuration button

**Notifications Tab:**
- Email preferences toggles:
  1. New Tributes notifications
  2. New Visitors weekly summary
  3. New Comments alerts
  4. Direct Messages alerts
  5. Newsletter/updates
  6. Anniversary reminders (checked by default)
- Push notification toggle (mobile notifications)
- Save preferences button

**Security Tab:**
- Change password form:
  - Current password field
  - New password field with strength requirements display
  - Confirm password field
- Password requirements list (8 chars, upper, lower, number, special)
- Active sessions dashboard:
  - Session cards showing device type, IP, last activity
  - Terminate button for individual sessions
- Two-factor authentication setup button

---

### 4. Subscription Page (`/subscription/page.tsx`)
Complete billing and subscription management.

**Current Plan Info Card:**
- Displays current plan name
- Shows next renewal date
- Styled with gradient background

**Plan Comparison Cards** (4 plans):

1. **Free Plan** ($0/forever)
   - ✅ Up to 3 memorials
   - ✅ Basic gallery (20 photos)
   - ✅ Limited tributes
   - ❌ Advanced analytics
   - ❌ Priority support
   - ❌ Full customization
   - ❌ API access
   - Button: "Change to Free" (if already purchased)

2. **Premium Monthly** ($4.99/month)
   - ✅ Unlimited memorials
   - ✅ Premium gallery (500 photos)
   - ✅ Unlimited tributes
   - ✅ Advanced analytics
   - ✅ Priority email support
   - ❌ Full customization
   - ❌ API access
   - Button: "Upgrade Now"

3. **Premium Yearly** ($39.99/year - 40% savings)
   - All Premium Monthly features
   - ✅ Extended gallery (1000 photos)
   - ✅ Live chat support
   - ✅ Full customization
   - ❌ API access
   - Badge: "👑 Most Popular"
   - Button: "Upgrade Now"

4. **Family Plan** ($59.99/year)
   - ✅ Up to 6 user profiles
   - ✅ Unlimited memorials per profile
   - ✅ Shared gallery (3000 photos)
   - ✅ Unlimited tributes
   - ✅ Advanced analytics
   - ✅ 24/7 priority support
   - ✅ API integration access
   - Badge: "🎁 Best for Families"
   - Button: "Upgrade Now"

**Billing Management Section:**
- Billing history table/list:
  - Transaction description
  - Date
  - Amount ($)
- Payment method card display:
  - Card type and last 4 digits
  - Expiration date
  - Change payment method button
  - Request receipt button

**FAQ Section:**
1. Difference between plans
2. Can I change plans anytime?
3. Free trial availability
4. What happens if I cancel?
5. Refund policy (14 days)
6. Accepted payment methods

**Support Section:**
- Contact support button
- Help center/FAQ link

---

## Data Structure

### Memorial Interface
```typescript
interface Memorial {
  id: string;
  name: string;
  animalType: 'perro' | 'gato' | 'ave' | 'roedor' | 'reptil' | 'otro';
  breed: string;
  birthDate: string; // YYYY-MM-DD
  deathDate: string;
  photoUrl: string;
  story: string;
  epitaph: string;
  latitude: number;
  longitude: number;
  createdAt: string; // ISO string
  tributes: number;
  visits: number;
}
```

### Tribute Interface
```typescript
interface Tribute {
  id: string;
  memorialName: string;
  tributeType: 'flower' | 'candle' | 'message';
  visitorName: string;
  message?: string;
  createdAt: string;
}
```

### Activity Log Interface
```typescript
interface ActivityLog {
  id: string;
  action: string; // 'memorial_created' | 'tribute_received' | 'profile_updated' | 'shared'
  description: string;
  timestamp: string;
}
```

---

## Navigation Links

All links are integrated into NavbarClient dropdown:
```
👤 Mi Perfil → /profile
🐾 Mis Memoriales → /my-memorials
👑 Mi Suscripción → /subscription
⚙️ Configuración → /settings
🚪 Cerrar Sesión → logout
```

---

## Authentication

All pages include authentication check:
```typescript
if (!isAuthenticated) {
  return <redirect to="/auth/login" />;
}
```

Only authenticated users can access these routes.

---

## Responsive Design

### Mobile (< 768px)
- Single column layout
- Stacked tabs (icon-only tab labels)
- Full-width cards and buttons
- Simplified navigation

### Tablet (768px - 1024px)
- 2-column grids
- Tab labels with icons
- Wider spacing
- Optimized card sizing

### Desktop (> 1024px)
- 3-column memorial grid
- Full tab names
- Expanded dropdowns
- Maximum container width (max-w-6xl)

---

## Styling & Colors

Uses Tailwind CSS with nature color scheme:
- Primary: `nature-600` / `nature-700` (buttons, active states)
- Background: `nature-50` / `nature-100` (hover states)
- Secondary: `sky-600` (info/stats)
- Accent: `golden-600` (epitaph, favorites)
- Destructive: Red for delete/logout actions
- Success: Green for verified/active status

### Cards & Containers
- Base: `bg-white border-nature-200 rounded-lg shadow`
- Hover: `hover:shadow-lg transition-all`
- Selected: `border-nature-600 shadow-lg`

### Badges
- Status: `bg-green-100 text-green-800` (verified)
- Info: `bg-nature-600 text-white` (metrics)
- Highlight: `bg-gradient-to-r from-nature-600 to-sky-600` (plan badges)

---

## Mock Data Notes

All pages currently use hardcoded mock data arrays. To integrate with real data:

1. Replace memorial arrays with `useProfiles()` hook:
```typescript
const { profiles, loading, error } = useProfiles();
```

2. Replace tribute arrays with `useTributes()` hook:
```typescript
const { tributes, loading } = useTributes(userId);
```

3. Implement filters using Supabase queries or client-side filtering

4. Add loading skeleton screens during data fetch

5. Add error handling and empty states

---

## Future Enhancements

- [ ] Real data integration with Supabase
- [ ] Email notifications
- [ ] Password reset functionality
- [ ] Two-factor authentication
- [ ] Social sharing of memorials
- [ ] Memorial templates/themes
- [ ] Advanced analytics dashboard
- [ ] Backup and recovery options
- [ ] Memorial collaborators (family)
- [ ] Birthday reminders
- [ ] Memorial photo carousel
- [ ] Export memorial as PDF
