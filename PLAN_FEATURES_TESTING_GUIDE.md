# Plan Features Testing Guide

**Date**: November 18, 2025  
**Version**: 1.0  
**Status**: Ready for QA Testing

---

## 🎬 Test Environment Setup

### Prerequisites
- Development environment running (`npm run dev` or `bun run dev`)
- Demo user accounts created (see USUARIOS_DEMO.md)
- Database synchronized with latest migration

### Test User Accounts

```
Admin (Santuario Premium - Full Features):
  Email: demo@memorias-eternas.local
  Password: Demo123!
  Plan: santuario-premium
  Features: All unlocked

User 1 (Cielo Estrellas - Premium):
  Email: user@example.com
  Password: User123!
  Plan: cielo-estrellas
  Features: 5 memorials, 2 photos, 6 tribute types, grid visible

User 2 (Huella Eterna - Free):
  Email: free@example.com
  Password: Free123!
  Plan: huella-eterna
  Features: 1 memorial, 1 photo, 2 tribute types, grid hidden
```

---

## ✅ Feature 1: Database Migration

### Test 1.1: isPublic Field Exists
```sql
-- Run in Neon console
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name='AnimalProfile' 
AND column_name='isPublic';

-- Expected: Boolean (uuid), NOT NULL, DEFAULT false
```

### Test 1.2: ProfileHighlight Table Exists
```sql
-- Run in Neon console
SELECT * FROM information_schema.tables 
WHERE table_name = 'ProfileHighlight';

-- Expected: Table found with columns:
-- id, profileId, weekStartDate, isActive
```

### Test 1.3: Unique Constraint Works
```sql
-- Try to insert duplicate
INSERT INTO "ProfileHighlight" (id, "profileId", "weekStartDate", "isActive")
VALUES (cuid(), 'profile1', NOW(), true);

INSERT INTO "ProfileHighlight" (id, "profileId", "weekStartDate", "isActive")
VALUES (cuid(), 'profile1', NOW(), true);

-- Expected: Second insert fails with unique constraint error
```

---

## ✅ Feature 2: Tributes Selector Component

### Test 2.1: Component Renders
**Steps**:
1. Navigate to memorial creation form
2. Look for tribute type selector with grid layout
3. See 5 tribute options: Vela Blanca, Corazón, Flores, Mensaje, Oración

**Expected**:
- ✅ All 5 tribute options visible
- ✅ Grid layout responsive (2 cols mobile, 5 cols desktop)
- ✅ No errors in console

### Test 2.2: Free Tier Shows Limited Options
**Setup**: Login as free user (huella-eterna)
**Steps**:
1. View tribute selector component
2. Look for lock icons on unavailable tributes

**Expected**:
- ✅ Only 2 options unlocked: Vela Blanca, Corazón
- ✅ 3 options locked: Flores, Mensaje, Oración
- ✅ Upgrade prompt visible

### Test 2.3: Premium Tier Shows More Options
**Setup**: Login as premium user (cielo-estrellas)
**Steps**:
1. View tribute selector component
2. Count available options

**Expected**:
- ✅ 6 options visible and available
- ✅ No lock icons
- ✅ No upgrade prompt

### Test 2.4: Pro Tier Shows All Options
**Setup**: Login as pro user (santuario-premium)
**Steps**:
1. View tribute selector component
2. Count available options

**Expected**:
- ✅ 7 options visible and available
- ✅ No lock icons
- ✅ Confirmation message visible

### Test 2.5: Selection Works
**Steps**:
1. Click on "Flores" tribute
2. Verify selection state changes
3. Click on another tribute
4. Verify selection switches

**Expected**:
- ✅ Selected tribute highlighted in blue
- ✅ Previous selection deselected
- ✅ Selected tribute info box shows

### Test 2.6: Quota Message Updates
**Steps**:
1. For free user: Check message shows "1/1"
2. For premium: Check message shows "6 available"
3. For pro: Check message shows "7 available"

**Expected**:
- ✅ Messages accurate for each plan
- ✅ Updates when selection changes

---

## ✅ Feature 3: Map Styling by Plan

### Test 3.1: Marker Size - Free Tier
**Setup**: Login as free user, view map
**Steps**:
1. Check memorial markers on map
2. Compare size to premium markers
3. Measure marker diameter (inspect element)

**Expected**:
- ✅ Markers noticeably smaller than premium
- ✅ Size ~25px (0.8x multiplier)
- ✅ No red background

### Test 3.2: Marker Size - Premium Tier
**Setup**: Create memorial on premium account, view map
**Steps**:
1. Locate memorial marker
2. Compare size to free markers
3. Measure marker diameter

**Expected**:
- ✅ Markers medium size (~32px)
- ✅ Clearly larger than free tier
- ✅ No red background

### Test 3.3: Marker Size & Highlight - Pro Tier
**Setup**: Create memorial on pro account, view map
**Steps**:
1. Locate pro memorial marker
2. Measure diameter
3. Check for red highlight background

**Expected**:
- ✅ Markers extra large (~51px)
- ✅ Significantly larger than other tiers
- ✅ Red circle background visible around marker
- ✅ Pulsing animation on red background

### Test 3.4: Selected Profile Animation
**Steps**:
1. Click memorial marker
2. Watch animation
3. Check marker highlights with gold border

**Expected**:
- ✅ Marker bounces animation
- ✅ Gold border appears
- ✅ Popup opens without errors

### Test 3.5: Responsive Sizing
**Steps**:
1. Zoom in on map (2-3 levels)
2. Check marker proportions maintained
3. Zoom out (2-3 levels)
4. Check markers still visible

**Expected**:
- ✅ Markers scale smoothly
- ✅ Size differences between tiers maintained
- ✅ No distortion at any zoom level

---

## ✅ Feature 4: Grid Visibility Filtering

### Test 4.1: Free Tier Not on Map Grid
**Setup**: Create memorial as free user
**Steps**:
1. Create memorial
2. Go to /map page
3. Search for memorial by name

**Expected**:
- ✅ Memorial NOT visible in grid
- ✅ Memorial NOT shown in carousel
- ✅ No error messages

### Test 4.2: Premium Tier Visible on Map Grid
**Setup**: Create memorial as premium user
**Steps**:
1. Create memorial
2. Go to /map page
3. Search for memorial by name
4. Check carousel

**Expected**:
- ✅ Memorial visible in carousel
- ✅ Memorial shown on map
- ✅ Can click marker to view

### Test 4.3: Pro Tier Visible on Map Grid
**Setup**: Create memorial as pro user
**Steps**:
1. Create memorial
2. Go to /map page
3. Search for memorial by name

**Expected**:
- ✅ Memorial visible in carousel
- ✅ Memorial shown on map with extra-large marker
- ✅ Red highlight visible

### Test 4.4: API Filter Works
**Steps**:
1. Open browser dev tools → Network tab
2. Go to /map page
3. Look for GET /api/profiles?public=true request
4. Check response

**Expected**:
- ✅ API called with ?public=true
- ✅ Response only includes public memorials
- ✅ Status code 200

### Test 4.5: User's Own Private Memorial Visible in Settings
**Setup**: Free user with 1 memorial
**Steps**:
1. Go to "My Memorials" page
2. Check own memorial visible

**Expected**:
- ✅ Own memorial visible (even if not public)
- ✅ Can edit/delete own memorial
- ✅ Shows "Private" indicator

---

## ✅ Feature 5: Highlights Manager Component

### Test 5.1: Component Hidden for Free/Premium
**Setup**: Login as free or premium user
**Steps**:
1. Navigate to highlights section (if exists)
2. Check component visibility

**Expected**:
- ✅ Component not visible or shows "Locked" state
- ✅ Upgrade prompt displayed
- ✅ Link to pricing/upgrade available

### Test 5.2: Component Visible for Pro Users
**Setup**: Login as pro user
**Steps**:
1. Navigate to highlights section
2. Check component renders

**Expected**:
- ✅ Full component visible
- ✅ User's memorials displayed in grid
- ✅ Selection controls available

### Test 5.3: Selection Limit (5 per week)
**Setup**: Pro user, multiple memorials
**Steps**:
1. Select 4 memorials (should work)
2. Select 5th memorial (should work)
3. Try to select 6th memorial

**Expected**:
- ✅ First 5 selectable
- ✅ 6th memorial disabled with "Limit reached"
- ✅ Counter shows "5/5"
- ✅ Save button still clickable (for 5)

### Test 5.4: Selection Persistence
**Steps**:
1. Select 3 highlights
2. Refresh page
3. Check selections still there (if not saved)
4. Check counter

**Expected**:
- ✅ Selections persist during session
- ✅ Counter shows 3/5
- ✅ Save prompt appears if changed

### Test 5.5: Save Functionality
**Steps**:
1. Select 3 highlights
2. Click "Guardar Destacados"
3. Check success message
4. Wait for response

**Expected**:
- ✅ Save button shows "Guardando..."
- ✅ Success message appears
- ✅ Message shows "3 memorial(es) destacado(s)"
- ✅ ProfileHighlight records created in DB

### Test 5.6: Cancel Functionality
**Steps**:
1. Select 3 highlights
2. Click "Cancelar"
3. Check selections reset

**Expected**:
- ✅ Selections revert to previous state
- ✅ Save prompt disappears
- ✅ No changes saved

### Test 5.7: Visual Feedback
**Steps**:
1. Hover over unselected memorial
2. Click to select
3. Check visual changes
4. Look for star animation

**Expected**:
- ✅ Border changes to purple on select
- ✅ Star animation appears
- ✅ Checkmark visible in checkbox
- ✅ Image shows slight overlay effect

---

## ✅ Feature 6: Photo Upload Validation

### Test 6.1: File Size Validation
**Setup**: Memorial creation form
**Steps**:
1. Try to upload file > 5MB
2. Check error message

**Expected**:
- ✅ Upload blocked
- ✅ Error shows: "El archivo es demasiado grande. Máximo 5MB"
- ✅ Shows actual file size

### Test 6.2: File Type Validation
**Steps**:
1. Try to upload .txt file
2. Try to upload .pdf file
3. Try to upload .jpg file

**Expected**:
- ✅ .txt blocked with error
- ✅ .pdf blocked with error
- ✅ .jpg accepted

### Test 6.3: Plan Limit - Free Tier (1 photo)
**Setup**: Free user memorial form
**Steps**:
1. Upload first photo (succeeds)
2. Try to upload second photo

**Expected**:
- ✅ First photo uploads
- ✅ Second photo blocked
- ✅ Error shows: "Has alcanzado el límite de 1 foto"
- ✅ Form shows "1/1 usada"

### Test 6.4: Plan Limit - Premium Tier (2 photos)
**Setup**: Premium user memorial form
**Steps**:
1. Upload photo 1 (succeeds)
2. Upload photo 2 (succeeds)
3. Try to upload photo 3

**Expected**:
- ✅ First 2 photos upload
- ✅ Third photo blocked
- ✅ Error shows: "Has alcanzado el límite de 2 fotos"
- ✅ Form shows "2/2 usadas"

### Test 6.5: Plan Limit - Pro Tier (unlimited)
**Setup**: Pro user memorial form
**Steps**:
1. Upload 10 photos sequentially
2. Check no limit errors

**Expected**:
- ✅ All photos upload successfully
- ✅ Form shows "Fotos ilimitadas"
- ✅ No upload blocks

### Test 6.6: Warning Before Last Slot
**Setup**: User with 1 photo used on 2-photo plan
**Steps**:
1. Select second photo
2. Check warning message

**Expected**:
- ✅ Warning shown: "⚠️ Esta será tu última foto disponible"
- ✅ Upload still succeeds
- ✅ Next upload blocked with limit error

### Test 6.7: API-Level Validation
**Steps**:
1. Open developer tools → Network tab
2. Upload photo that should be blocked
3. Check API response

**Expected**:
- ✅ API call goes through
- ✅ Server returns 403 or error status
- ✅ Error message from server displayed
- ✅ Not just client-side block

---

## 🔄 Integration Tests

### Test I1: Full Memorial Creation Flow - Free User
**Steps**:
1. Login as free user
2. Create memorial
   - Enter name, animal type, dates
   - Choose location
   - Upload photo (succeeds)
   - Try 2nd photo (blocked)
   - Choose tribute type (only 2 available)
3. Submit memorial

**Expected**:
- ✅ Memorial created
- ✅ isPublic = false in DB
- ✅ Memorial NOT on /map grid
- ✅ Visible in "My Memorials"

### Test I2: Full Memorial Creation Flow - Premium User
**Steps**:
1. Login as premium user
2. Create memorial
   - Enter name, animal type, dates
   - Upload 2 photos (both succeed)
   - Select from 6 tribute types
3. Submit memorial

**Expected**:
- ✅ Memorial created
- ✅ isPublic = true in DB
- ✅ Memorial appears on /map grid
- ✅ Marker size medium
- ✅ No red highlight

### Test I3: Full Memorial Creation Flow - Pro User
**Steps**:
1. Login as pro user
2. Create 2 memorials
3. Go to highlights manager
4. Set 1 memorial as highlight

**Expected**:
- ✅ Both memorials created with isPublic = true
- ✅ Both visible on /map
- ✅ Can select 1 as highlight
- ✅ Pro memorial marker shows red circle + large emoji

### Test I4: Cross-Plan Visibility
**Steps**:
1. Create memorials on 3 accounts (free, premium, pro)
2. Login as different users
3. Check /map view from each account

**Expected**:
- ✅ Free users see: premium + pro memorials (not own)
- ✅ Premium users see: premium + pro memorials
- ✅ Pro users see: all pro memorials, other pro + premium
- ✅ No free tier memorials visible to anyone on /map

### Test I5: Tribute Creation with Plan Restriction
**Steps**:
1. Create memorial on free plan
2. Try to create "Flores" tribute
3. Create "Vela Blanca" tribute
4. Switch to premium plan
5. Try same tributes

**Expected**:
- ✅ Free: "Flores" blocked, "Vela Blanca" allowed
- ✅ Premium: Both allowed
- ✅ Error message clear and helpful

---

## 🔒 Security Tests

### Test S1: Cannot Bypass Photo Limit via API
**Steps**:
1. Create API call with 5 photos for 1-photo plan
2. Send directly to POST /api/profiles

**Expected**:
- ✅ Request rejected
- ✅ Status code 403 or 400
- ✅ Error message returned
- ✅ Only 1 photo saved

### Test S2: Cannot Set isPublic = true Manually
**Steps**:
1. Create free user memorial
2. Manually update in DB: isPublic = true
3. Refresh /map

**Expected**:
- ✅ Memorial still NOT visible on /map
- ✅ isPublic reverted on next memorial edit
- ✅ System enforces permission

### Test S3: Cannot Create More Memorials Than Plan Allows
**Steps**:
1. Create 2 memorials on 1-memorial plan
2. Verify 2nd blocked at API

**Expected**:
- ✅ 1st memorial created
- ✅ 2nd memorial request returns 403
- ✅ Only 1 memorial in DB

### Test S4: Token Required for Mutation APIs
**Steps**:
1. Try POST /api/profiles without auth header
2. Try POST /api/tributes without auth header

**Expected**:
- ✅ Both return 401 Unauthorized
- ✅ No data created
- ✅ Error message clear

---

## 📊 Performance Tests

### Test P1: Map Load Time with 100+ Profiles
**Setup**: Create 100+ public memorials
**Steps**:
1. Navigate to /map
2. Check load time (Network tab)
3. Check marker rendering time

**Expected**:
- ✅ Page loads in < 2 seconds
- ✅ Markers all render within 3 seconds
- ✅ No freezing when zooming
- ✅ Scroll/interaction smooth

### Test P2: Highlights Selection with Large Profile Count
**Setup**: Pro user with 100+ memorials
**Steps**:
1. Open highlights manager
2. Check initial render time
3. Scroll through profiles
4. Select highlights

**Expected**:
- ✅ Initial render < 1 second
- ✅ Scrolling smooth (60fps)
- ✅ Selection changes instant
- ✅ No lag when reaching 5 selected

### Test P3: API Response Times
**Steps**:
1. Check GET /api/profiles response time
2. Check GET /api/profiles?public=true response time
3. Check POST /api/profiles response time

**Expected**:
- ✅ GET /profiles: < 500ms
- ✅ GET /profiles?public=true: < 500ms
- ✅ POST /profiles: < 1000ms

---

## 📋 Test Report Template

```
Test Session Report
====================
Date: ___________
Tester: ___________
Build: ___________

Feature 1: Database Migration
  [ ] Test 1.1 - isPublic field exists: ✅/❌
  [ ] Test 1.2 - ProfileHighlight table: ✅/❌
  [ ] Test 1.3 - Unique constraint: ✅/❌
  Status: ✅ PASS / ⚠️ PARTIAL / ❌ FAIL
  Notes: _________________________

Feature 2: Tributes Selector
  [ ] Test 2.1 - Component renders: ✅/❌
  [ ] Test 2.2 - Free tier limited: ✅/❌
  [ ] Test 2.3 - Premium shows more: ✅/❌
  [ ] Test 2.4 - Pro shows all: ✅/❌
  [ ] Test 2.5 - Selection works: ✅/❌
  [ ] Test 2.6 - Quota message: ✅/❌
  Status: ✅ PASS / ⚠️ PARTIAL / ❌ FAIL
  Notes: _________________________

[Continue for all features...]

Integration Tests
  [ ] Test I1 - Free user flow: ✅/❌
  [ ] Test I2 - Premium user flow: ✅/❌
  [ ] Test I3 - Pro user flow: ✅/❌
  [ ] Test I4 - Cross-plan visibility: ✅/❌
  [ ] Test I5 - Tribute restrictions: ✅/❌
  Status: ✅ PASS / ⚠️ PARTIAL / ❌ FAIL

Security Tests
  [ ] Test S1 - API limit bypass: ✅/❌
  [ ] Test S2 - Manual DB changes: ✅/❌
  [ ] Test S3 - Memorial limit: ✅/❌
  [ ] Test S4 - Auth required: ✅/❌
  Status: ✅ PASS / ⚠️ PARTIAL / ❌ FAIL

Performance Tests
  [ ] Test P1 - Map with 100+ profiles: ✅/❌
  [ ] Test P2 - Highlights large selection: ✅/❌
  [ ] Test P3 - API response times: ✅/❌
  Status: ✅ PASS / ⚠️ PARTIAL / ❌ FAIL

Overall Status: ✅ PASS / ⚠️ PARTIAL / ❌ FAIL
Blockers: _________________________
Nice-to-haves: _________________________
Sign-off: _________________________
```

---

**Test Plan Version**: 1.0  
**Last Updated**: November 18, 2025  
**Status**: Ready for QA Execution
