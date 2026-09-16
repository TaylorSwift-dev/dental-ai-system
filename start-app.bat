@echo off
title AuraDental AI - Dental Management System
echo ====================================================
echo Starting AuraDental AI Development Server...
echo ====================================================
cd /d "%~dp0"
start http://localhost:5173
npm run dev -- --host 0.0.0.0 --port 5173
pause
