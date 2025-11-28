@echo off
REM Script para ejecutar pruebas de endpoints
REM Haz doble click o ejecuta: test-endpoints.bat

cls
echo ========================================
echo   PRUEBAS DE ENDPOINTS - Forever Pet
echo ========================================
echo.

REM Verificar si PowerShell está disponible
powershell -Command "Write-Host 'PowerShell disponible'"

if %ERRORLEVEL% NEQ 0 (
    echo Error: PowerShell no está disponible
    pause
    exit /b 1
)

echo.
echo Iniciando pruebas...
echo.

REM Ejecutar el script PowerShell
powershell -ExecutionPolicy Bypass -File "test-endpoints.ps1"

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo   ✓ Pruebas completadas
    echo ========================================
) else (
    echo.
    echo ========================================
    echo   ✗ Error durante las pruebas
    echo ========================================
)

echo.
pause
