@ECHO off
::This script is to publish new Sherpa releases for Dell UI nuget


::Figure out all needed paths

SET BIN=%~dp0
SET SITECORE=%BIN:_scripts\batch-files=documentation%_sherpa
SET CORE=%BIN:_scripts\batch-files\=_sherpa%
echo %SITECORE%
echo %CORE%

RMDIR %SITECORE% /s /q
MKDIR %SITECORE%
XCOPY %CORE% %SITECORE% /e /y


