@ECHO off
::This script is to publish new Sherpa releases for Dell UI nuget


::Figure out all needed paths

SET BIN=%~dp0
SET KIT=%BIN:bin\batch-files=starter-kit%
SET RELEASE=%BIN:bin\batch-files=dell-ui-releases%
SET SITE=%BIN:bin\batch-files=site%
SET SITECORE=%BIN:bin\batch-files=site%_sherpa
SET CORE=%KIT%_sherpa
SET SOURCELESS=%CORE%\css-source\themes\dell-308
SET SOURCEIMAGES=%CORE%\images
SET SOURCETHEME=%CORE%\css\themes
SET SOURCEFONTS=%CORE%\fonts

RMDIR %SITECORE% /s /q
MKDIR %SITECORE%
XCOPY %CORE% %SITECORE% /s /y


::RMDIR %TEMPDIR% /s /q
::DEL %SCRIPT%
