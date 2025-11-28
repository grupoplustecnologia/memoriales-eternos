# Forever Pet Friend - Script de Prueba de Endpoints
# PowerShell Script para Windows
# Uso: .\test-all-endpoints.ps1

$BASE_URL = "http://localhost:3000"
$RESULTS = @()
$TOKEN = ""

# Funciones para output
function Show-Header([string]$Text) {
    Write-Host ""
    Write-Host "================================================================" -ForegroundColor Cyan
    Write-Host $Text -ForegroundColor Cyan
    Write-Host "================================================================" -ForegroundColor Cyan
    Write-Host ""
}

function Show-Test([string]$Number, [string]$Name, [string]$Method, [string]$Endpoint) {
    Write-Host "$Number $Name" -ForegroundColor Yellow
    Write-Host "   $Method $Endpoint" -ForegroundColor White
}

function Show-Success([string]$Message) {
    Write-Host "   [OK] $Message" -ForegroundColor Green
}

function Show-Error([string]$Message) {
    Write-Host "   [ERROR] $Message" -ForegroundColor Red
}

# Funcion para probar endpoints
function Test-API {
    param(
        [string]$Method,
        [string]$Endpoint,
        [object]$Body,
        [string]$Token
    )
    
    try {
        $Headers = @{ "Content-Type" = "application/json" }
        if ($Token) { $Headers["Authorization"] = "Bearer $Token" }
        
        $Params = @{
            Uri = "$BASE_URL$Endpoint"
            Method = $Method
            Headers = $Headers
            ErrorAction = "Stop"
            TimeoutSec = 10
        }
        
        if ($Body) {
            $Params["Body"] = ($Body | ConvertTo-Json -Depth 10)
        }
        
        $Response = Invoke-WebRequest @Params
        $Content = $Response.Content | ConvertFrom-Json -ErrorAction SilentlyContinue
        
        return @{ Success = $true; Content = $Content; Code = $Response.StatusCode }
    } catch {
        return @{ Success = $false; Error = $_.Exception.Message; Code = $_.Exception.Response.StatusCode }
    }
}

# INICIO
Show-Header "PRUEBAS DE ENDPOINTS - Forever Pet Friend"
Write-Host "Base URL: $BASE_URL" -ForegroundColor Cyan
Write-Host "Hora: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')" -ForegroundColor Cyan
Write-Host ""

# 1. LOGIN
Show-Header "1. AUTENTICACION"
Show-Test "1.1" "Login Admin" "POST" "/api/auth/login"

$LoginResult = Test-API "POST" "/api/auth/login" @{ 
    email = "admin@forever-pet-friend.local"
    password = "Demo123!" 
}

if ($LoginResult.Success) {
    Show-Success "Login exitoso"
    $TOKEN = $LoginResult.Content.token
    $RESULTS += "[OK] 1.1 - Login Admin"
} else {
    Show-Error "Error: $($LoginResult.Error)"
    $RESULTS += "[ERROR] 1.1 - Login Admin"
}

# 2. MEMORIALES PUBLICOS
Show-Header "2. ENDPOINTS PUBLICOS"

Show-Test "2.1" "GET Todos los memoriales" "GET" "/api/profiles?public=true"
$ProfilesResult = Test-API "GET" "/api/profiles?public=true"

if ($ProfilesResult.Success) {
    Show-Success "Memoriales obtenidos: $($ProfilesResult.Content.data.Count)"
    $RESULTS += "[OK] 2.1 - GET Memoriales"
} else {
    Show-Error "Error: $($ProfilesResult.Error)"
    $RESULTS += "[ERROR] 2.1 - GET Memoriales"
}

# 3. TRIBUTOS
Show-Header "3. TRIBUTOS"

if ($ProfilesResult.Success -and $ProfilesResult.Content.data.Count -gt 0) {
    $ProfileId = $ProfilesResult.Content.data[0].id
    $Slug = $ProfilesResult.Content.data[0].slug
    
    Show-Test "3.1" "GET Tributos" "GET" "/api/tributes"
    $TributesResult = Test-API "GET" "/api/tributes?profileId=$ProfileId&limit=5"
    
    if ($TributesResult.Success) {
        Show-Success "Tributos obtenidos"
        $RESULTS += "[OK] 3.1 - GET Tributos"
    } else {
        Show-Error "Error: $($TributesResult.Error)"
        $RESULTS += "[ERROR] 3.1 - GET Tributos"
    }
    
    Show-Test "3.2" "POST Crear Tributo" "POST" "/api/tributes"
    $NewTribute = Test-API "POST" "/api/tributes" @{
        profileId = $ProfileId
        visitorName = "Test User"
        message = "Hermoso memorial"
        tributeType = "flor"
    }
    
    if ($NewTribute.Success) {
        Show-Success "Tributo creado"
        $RESULTS += "[OK] 3.2 - POST Tributo"
    } else {
        Show-Error "Error: $($NewTribute.Error)"
        $RESULTS += "[ERROR] 3.2 - POST Tributo"
    }
} else {
    Write-Host "   No hay memoriales para probar" -ForegroundColor Yellow
}

# 4. LIKES
Show-Header "4. SOCIAL - LIKES"

if ($ProfilesResult.Success -and $ProfilesResult.Content.data.Count -gt 0) {
    $ProfileId = $ProfilesResult.Content.data[0].id
    
    Show-Test "4.1" "POST Dar Like" "POST" "/api/likes"
    $LikeResult = Test-API "POST" "/api/likes" @{
        profileId = $ProfileId
        userId = "test-user-001"
    }
    
    if ($LikeResult.Success) {
        Show-Success "Like agregado"
        $RESULTS += "[OK] 4.1 - POST Like"
    } else {
        Show-Error "Error: $($LikeResult.Error)"
        $RESULTS += "[ERROR] 4.1 - POST Like"
    }
}

# 5. REACCIONES
Show-Header "5. REACCIONES"

if ($ProfilesResult.Success -and $ProfilesResult.Content.data.Count -gt 0) {
    $ProfileId = $ProfilesResult.Content.data[0].id
    
    Show-Test "5.1" "POST Agregar Reaccion" "POST" "/api/reactions"
    $ReactionResult = Test-API "POST" "/api/reactions" @{
        profileId = $ProfileId
        userId = "test-user-001"
        emoji = "love"
    }
    
    if ($ReactionResult.Success) {
        Show-Success "Reaccion agregada"
        $RESULTS += "[OK] 5.1 - POST Reaccion"
    } else {
        Show-Error "Error: $($ReactionResult.Error)"
        $RESULTS += "[ERROR] 5.1 - POST Reaccion"
    }
}

# 6. COMENTARIOS
Show-Header "6. COMENTARIOS"

if ($ProfilesResult.Success -and $ProfilesResult.Content.data.Count -gt 0) {
    $ProfileId = $ProfilesResult.Content.data[0].id
    
    Show-Test "6.1" "POST Crear Comentario" "POST" "/api/comments"
    $CommentResult = Test-API "POST" "/api/comments" @{
        profileId = $ProfileId
        visitorName = "Juan"
        message = "Hermoso memorial para esta mascota especial"
    }
    
    if ($CommentResult.Success) {
        Show-Success "Comentario creado"
        $RESULTS += "[OK] 6.1 - POST Comentario"
    } else {
        Show-Error "Error: $($CommentResult.Error)"
        $RESULTS += "[ERROR] 6.1 - POST Comentario"
    }
}

# 7. TRENDING
Show-Header "7. TRENDING"

Show-Test "7.1" "GET Trending Popular" "GET" "/api/trending"
$TrendingResult = Test-API "GET" "/api/trending?type=popular&limit=5"

if ($TrendingResult.Success) {
    Show-Success "Trending obtenido"
    $RESULTS += "[OK] 7.1 - GET Trending"
} else {
    Show-Error "Error: $($TrendingResult.Error)"
    $RESULTS += "[ERROR] 7.1 - GET Trending"
}

# 8. ADMIN
Show-Header "8. ENDPOINTS ADMIN"

if ($TOKEN) {
    Show-Test "8.1" "GET Dashboard Admin" "GET" "/api/admin/dashboard"
    $DashboardResult = Test-API "GET" "/api/admin/dashboard" $null $TOKEN
    
    if ($DashboardResult.Success) {
        Show-Success "Dashboard obtenido"
        $RESULTS += "[OK] 8.1 - Dashboard"
    } else {
        Show-Error "Error: $($DashboardResult.Error)"
        $RESULTS += "[ERROR] 8.1 - Dashboard"
    }
    
    Show-Test "8.2" "GET Usuarios" "GET" "/api/admin/users"
    $UsersResult = Test-API "GET" "/api/admin/users" $null $TOKEN
    
    if ($UsersResult.Success) {
        Show-Success "Usuarios obtenidos: $($UsersResult.Content.data.Count)"
        $RESULTS += "[OK] 8.2 - Usuarios"
    } else {
        Show-Error "Error: $($UsersResult.Error)"
        $RESULTS += "[ERROR] 8.2 - Usuarios"
    }
} else {
    Write-Host "   No hay token de admin disponible" -ForegroundColor Yellow
}

# RESUMEN
Show-Header "RESUMEN"

$OKCount = ($RESULTS | Where-Object { $_ -match "^\[OK\]" }).Count
$FailCount = ($RESULTS | Where-Object { $_ -match "^\[ERROR\]" }).Count
$TOTAL = $RESULTS.Count

Write-Host "Total de Pruebas: $TOTAL" -ForegroundColor Cyan
Write-Host "[OK] Exitosas: $OKCount" -ForegroundColor Green
Write-Host "[ERROR] Fallidas: $FailCount" -ForegroundColor Red
Write-Host ""

foreach ($result in $RESULTS) {
    if ($result -match "^\[OK\]") {
        Write-Host $result -ForegroundColor Green
    } else {
        Write-Host $result -ForegroundColor Red
    }
}

Write-Host ""
if ($FailCount -eq 0 -and $OKCount -gt 0) {
    Write-Host "TODAS LAS PRUEBAS PASARON!" -ForegroundColor Green
} else {
    Write-Host "Hay $FailCount pruebas fallidas" -ForegroundColor Red
}

Write-Host ""
Write-Host "Fin: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')" -ForegroundColor Cyan
Write-Host ""
