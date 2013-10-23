@ECHO off
:: This script is to copy the documentation/_sherpa folder into _sherpa
:: Sometimes it is necessary to change core sherpa files while making changes to documentation.
TASKKILL /F /IM mongoose.exe
TASKKILL /F /IM WinLess.exe

SET BIN=%~dp0
SET SITECORE=%BIN:_scripts\batch-files=documentation%_sherpa
SET CORE=%BIN:_scripts\batch-files\=_sherpa%

RMDIR %CORE% /s /q
MKDIR %CORE%
XCOPY %SITECORE% %CORE% /e /y

cd %~dp0..\..\
start _sherpa\bin\mongoose.exe
echo "You need to restart WinLess if you need it."
