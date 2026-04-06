@echo off
REM AgriConnect Frontend Setup & Verification Script
REM For Windows

echo.
echo AgriConnect Frontend Backend Integration Setup
echo =============================================
echo.

REM Check Node.js
where node >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
    echo [OK] Node.js installed: %NODE_VERSION%
) else (
    echo [ERROR] Node.js not found. Please install Node.js
    exit /b 1
)

REM Check npm
where npm >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    for /f "tokens=*" %%i in ('npm -v') do set NPM_VERSION=%%i
    echo [OK] npm installed: %NPM_VERSION%
) else (
    echo [ERROR] npm not found. Please install npm
    exit /b 1
)

REM Check .env file
if exist ".env" (
    echo [OK] .env file exists
    for /f "delims== tokens=2" %%i in ('findstr "VITE_API_URL" .env') do set API_URL=%%i
    if defined API_URL (
        echo Backend URL: %API_URL%
    )
) else (
    echo [WARNING] .env file not found
    echo Create .env file based on the template in INTEGRATION_GUIDE.md
)

echo.
echo Dependencies Check:

REM Check if node_modules exists
if exist "node_modules\" (
    echo [OK] Dependencies installed
) else (
    echo [INFO] Installing dependencies...
    call npm install
)

echo.
echo Setup verification complete!
echo.
echo Next steps:
echo 1. Ensure your Spring backend is running on http://localhost:8080
echo 2. Run: npm run dev
echo 3. Visit: http://localhost:3000
echo.
echo For more details, see INTEGRATION_GUIDE.md
echo.
pause
