@ECHO off
:: This script is to copy the _sherpa folder into documentation/_sherpa
TASKKILL /F /IM mongoose.exe
TASKKILL /F /IM WinLess.exe

SET BIN=%~dp0
SET SITECORE=%BIN:_scripts\batch-files=documentation%_sherpa
SET CORE=%BIN:_scripts\batch-files\=_sherpa%
echo %SITECORE%
echo %CORE%

RMDIR %SITECORE% /s /q
MKDIR %SITECORE%
XCOPY %CORE% %SITECORE% /e /y


cd %~dp0..\..\
start _sherpa\bin\mongoose.exe
echo "You need to restart WinLess if you need it."