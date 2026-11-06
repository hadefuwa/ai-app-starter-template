@echo off
setlocal
cd /d "%~dp0"
node server.mjs
if errorlevel 1 pause
endlocal