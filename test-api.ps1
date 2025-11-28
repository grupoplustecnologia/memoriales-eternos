# PowerShell Script for Testing Social Features
# Ejecutar con: powershell -File test-api.ps1

$BaseUrl = "http://localhost:3000"
$ApiBase = "$BaseUrl/api"
$TestResults = @()

function Test-Endpoint {
    param(
        [string]$Name,
        [string]$Url,
        [string]$Method = "GET",
        [hashtable]$Headers = @{}
    )
    
    try {
        Write-Host "Testing: $Name" -ForegroundColor Cyan
        $response = Invoke-WebRequest -Uri $Url -Method $Method -Headers $Headers -UseBasicParsing -TimeoutSec 5
        
        if ($response.StatusCode -eq 200 -or $response.StatusCode -eq 201) {
            Write-Host "✅ PASS - Status: $($response.StatusCode)" -ForegroundColor Green
            $TestResults += @{
                Name = $Name
                Status = "✅ PASS"
                Code = $response.StatusCode
            }
            return $true
        } else {
            Write-Host "❌ FAIL - Status: $($response.StatusCode)" -ForegroundColor Red
            $TestResults += @{
                Name = $Name
                Status = "❌ FAIL"
                Code = $response.StatusCode
            }
            return $false
        }
    } catch {
        Write-Host "❌ ERROR - $($_.Exception.Message)" -ForegroundColor Red
        $TestResults += @{
            Name = $Name
            Status = "❌ ERROR"
            Code = "N/A"
        }
        return $false
    }
}

Write-Host "`n🧪 TESTING SOCIAL FEATURES API`n" -ForegroundColor Yellow
Write-Host "=" * 60

# Test 1: Server availability
Write-Host "`n[1] SERVER AVAILABILITY" -ForegroundColor Magenta
Test-Endpoint -Name "Home Page" -Url "$BaseUrl/"

# Test 2: API Trending Endpoints
Write-Host "`n[2] TRENDING ENDPOINTS" -ForegroundColor Magenta
Test-Endpoint -Name "Trending - Popular" -Url "$ApiBase/trending?type=popular&limit=5"
Test-Endpoint -Name "Trending - Recent" -Url "$ApiBase/trending?type=recent&limit=5"
Test-Endpoint -Name "Trending - Most Liked" -Url "$ApiBase/trending?type=mostLiked&limit=5"
Test-Endpoint -Name "Trending - Most Commented" -Url "$ApiBase/trending?type=mostCommented&limit=5"
Test-Endpoint -Name "Trending - Stats" -Url "$ApiBase/trending?type=stats"

# Test 3: Search Endpoints
Write-Host "`n[3] SEARCH ENDPOINTS" -ForegroundColor Magenta
Test-Endpoint -Name "Search - All" -Url "$ApiBase/search?q=memorial&limit=5"
Test-Endpoint -Name "Search - By Type" -Url "$ApiBase/search?q=&type=perro&limit=5"

# Test 4: Tags Endpoints
Write-Host "`n[4] TAGS ENDPOINTS" -ForegroundColor Magenta
Test-Endpoint -Name "Tags - List All" -Url "$ApiBase/tags"
Test-Endpoint -Name "Tags - Popular" -Url "$ApiBase/tags?action=popular&limit=10"
Test-Endpoint -Name "Tags - Preset" -Url "$ApiBase/tags?action=preset"
Test-Endpoint -Name "Tags - Search" -Url "$ApiBase/tags?action=search&q=perro"

# Test 5: Likes Endpoints
Write-Host "`n[5] LIKES ENDPOINTS" -ForegroundColor Magenta
Test-Endpoint -Name "Likes - Get Count" -Url "$ApiBase/likes?profileId=cmi4ifytq0008myz0vy6mb9fx"

# Test 6: Reactions Endpoints
Write-Host "`n[6] REACTIONS ENDPOINTS" -ForegroundColor Magenta
Test-Endpoint -Name "Reactions - Get All" -Url "$ApiBase/reactions?profileId=cmi4ifytq0008myz0vy6mb9fx"

# Test 7: Comments Endpoints
Write-Host "`n[7] COMMENTS ENDPOINTS" -ForegroundColor Magenta
Test-Endpoint -Name "Comments - Get Comments" -Url "$ApiBase/comments?profileId=cmi4ifytq0008myz0vy6mb9fx"

# Test 8: Profile Pages
Write-Host "`n[8] PAGES" -ForegroundColor Magenta
Test-Endpoint -Name "Page - Search" -Url "$BaseUrl/search"
Test-Endpoint -Name "Page - Trending" -Url "$BaseUrl/trending"
Test-Endpoint -Name "Page - Profile" -Url "$BaseUrl/profile/cmi4ifytq0008myz0vy6mb9fx"

# Summary
Write-Host "`n" + "=" * 60 -ForegroundColor Yellow
$passed = ($TestResults | Where-Object { $_.Status -match "✅" } | Measure-Object).Count
$failed = ($TestResults | Where-Object { $_.Status -match "❌" } | Measure-Object).Count
$total = $TestResults.Count

Write-Host "`n📊 TEST RESULTS SUMMARY" -ForegroundColor Yellow
Write-Host "✅ Passed: $passed" -ForegroundColor Green
Write-Host "❌ Failed: $failed" -ForegroundColor Red
Write-Host "📊 Total:  $total" -ForegroundColor Cyan

if ($failed -eq 0) {
    Write-Host "`n🎉 ALL TESTS PASSED!`n" -ForegroundColor Green
} else {
    Write-Host "`n⚠️  $failed test(s) failed - Review output above`n" -ForegroundColor Yellow
}

# Detailed Results Table
Write-Host "`n📋 DETAILED RESULTS" -ForegroundColor Yellow
$TestResults | Format-Table -Property @{Label="Test"; Expression={$_.Name}}, @{Label="Status"; Expression={$_.Status}}, @{Label="Code"; Expression={$_.Code}} -AutoSize
