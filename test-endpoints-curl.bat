@echo off
REM Script de Prueba de Endpoints - Forever Pet Friend
REM Usa CURL en lugar de PowerShell

setlocal enabledelayedexpansion

set BASE_URL=http://localhost:3000
set TOKEN=
set OK_COUNT=0
set ERROR_COUNT=0

echo.
echo ================================================================
echo  PRUEBAS DE ENDPOINTS - Forever Pet Friend
echo ================================================================
echo.
echo Base URL: %BASE_URL%
echo Hora: %date% %time%
echo.

REM ====== 1. LOGIN ADMIN ======
echo ================================================================
echo 1. AUTENTICACION
echo ================================================================
echo.
echo 1.1 Login Admin
echo    POST /api/auth/login
echo.

curl -s -X POST %BASE_URL%/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"admin@forever-pet-friend.local\",\"password\":\"Demo123!\"}" > temp_response.txt

type temp_response.txt | find "token" >nul
if %ERRORLEVEL% EQU 0 (
    echo    [OK] Login exitoso
    set /A OK_COUNT+=1
    REM Extraer token (simplificado)
    for /f "tokens=2 delims=:," %%a in ('type temp_response.txt ^| find "token"') do (
        set TOKEN=%%a
        set TOKEN=!TOKEN:"=!
        set TOKEN=!TOKEN: =!
    )
) else (
    echo    [ERROR] Login fallo
    set /A ERROR_COUNT+=1
    type temp_response.txt
)
echo.

REM ====== 2. MEMORIALES ======
echo ================================================================
echo 2. ENDPOINTS PUBLICOS
echo ================================================================
echo.
echo 2.1 GET Todos los memoriales
echo    GET /api/profiles?public=true
echo.

curl -s -X GET "%BASE_URL%/api/profiles?public=true" > temp_response.txt

type temp_response.txt | find "success" >nul
if %ERRORLEVEL% EQU 0 (
    echo    [OK] Memoriales obtenidos
    set /A OK_COUNT+=1
) else (
    echo    [ERROR] Fallo en GET memoriales
    set /A ERROR_COUNT+=1
)
echo.

REM ====== 3. TRENDING ======
echo ================================================================
echo 3. TRENDING
echo ================================================================
echo.
echo 3.1 GET Trending Popular
echo    GET /api/trending
echo.

curl -s -X GET "%BASE_URL%/api/trending?type=popular&limit=5" > temp_response.txt

type temp_response.txt | find "success" >nul
if %ERRORLEVEL% EQU 0 (
    echo    [OK] Trending obtenido
    set /A OK_COUNT+=1
) else (
    echo    [ERROR] Fallo en GET trending
    set /A ERROR_COUNT+=1
)
echo.

REM ====== RESUMEN ======
echo ================================================================
echo RESUMEN
echo ================================================================
echo.
set /A TOTAL=%OK_COUNT%+%ERROR_COUNT%

echo Total de Pruebas: %TOTAL%
echo [OK] Exitosas: %OK_COUNT%
echo [ERROR] Fallidas: %ERROR_COUNT%
echo.

if %ERROR_COUNT% EQU 0 (
    if %OK_COUNT% GTR 0 (
        echo TODAS LAS PRUEBAS PASARON!
    )
) else (
    echo Hay %ERROR_COUNT% pruebas fallidas
)

echo.
echo Fin: %date% %time%
echo.

REM Limpiar
del temp_response.txt 2>nul

pause
