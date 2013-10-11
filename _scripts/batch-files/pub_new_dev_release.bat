@ECHO off
::This script is to publish new Sherpa releases for Dell UI nuget


::Figure out all needed paths

SET BIN=%~dp0
SET ROOT=%BIN:\_scripts\batch-files\=%
SET TEMPLATES=%BIN:batch-files\=templates%
SET LOG=%BIN:batch-files\=log-file.txt%
SET STARTER_KIT=%BIN:_scripts\batch-files\=starter-kit%
SET STARTER_KIT_CORE=%STARTER_KIT%\_sherpa
SET BLANK=%BIN:_scripts\batch-files\=_blank%
SET EXAMPLES=%BIN:_scripts\batch-files\=examples%

SET RELEASE=%BIN:_scripts\batch-files\=_dev-releases%
SET SITE=%BIN:_scripts\batch-files\=documentation%
SET SITE_CORE=%SITE%\_sherpa
SET CORE=%BIN:_scripts\batch-files\=_sherpa%
SET SOURCELESS=%CORE%\css-source\themes\dell-308
SET SOURCEIMAGES=%CORE%\images
SET SOURCETHEME=%CORE%\css\themes
SET SOURCEFONTS=%CORE%\fonts
::RMDIR %SITECORE% /s /q
::MKDIR %SITECORE% 
::XCOPY %CORE% %SITECORE% /e




for /f "tokens=2-4 delims=/ " %%a in ('date /T') do set year=%%c
for /f "tokens=2-4 delims=/ " %%a in ('date /T') do set month=%%a
for /f "tokens=2-4 delims=/ " %%a in ('date /T') do set day=%%b
set TODAY=%day%-%month%-%year%
for /f "tokens=1 delims=: " %%h in ('time /T') do set hour=%%h
for /f "tokens=2 delims=: " %%m in ('time /T') do set minutes=%%m
for /f "tokens=3 delims=: " %%a in ('time /T') do set ampm=%%a
set NOW=%hour%-%minutes%


SET RELEASEID=dell-ui-release-%TODAY%-%NOW%


::Copy files for dev
MKDIR %RELEASE%\%RELEASEID%
MKDIR %RELEASE%\%RELEASEID%\images
MKDIR %RELEASE%\%RELEASEID%\fonts
MKDIR %RELEASE%\%RELEASEID%\css
MKDIR %RELEASE%\%RELEASEID%\css\themes
MKDIR %RELEASE%\%RELEASEID%\sherpa
MKDIR %RELEASE%\%RELEASEID%\sherpa\dell-308

XCOPY %SOURCEIMAGES% %RELEASE%\%RELEASEID%\images /e /y
XCOPY %SOURCETHEME% %RELEASE%\%RELEASEID%\css\themes /e /y
XCOPY %SOURCEFONTS% %RELEASE%\%RELEASEID%\fonts /e /y
XCOPY %SOURCELESS% %RELEASE%\%RELEASEID%\sherpa\dell-308 /e /y



echo %TODAY% - %hour%:%minutes% %ampm% - New Dev Release >> %LOG%

echo ---------------------------------
echo Completed Updating all files
echo ---------------------------------

START mailto:Raj_Kaimal@Dell.com?subject=Sherpa%%20Release%%20-%%20%RELEASEID%
