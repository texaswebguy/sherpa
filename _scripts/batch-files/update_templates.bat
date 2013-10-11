@ECHO off
::This script is to publish new Sherpa releases for Dell UI nuget


::Figure out all needed paths

SET BIN=%~dp0
SET ROOT=%BIN:\_scripts\batch-files\=%
SET TEMPLATES=%BIN:batch-files\=templates%
SET LOG=%BIN:batch-files\=log-file.txt%
SET STARTER_KIT=%BIN:_scripts\batch-files\=starter-kit%
SET STARTER_KIT_CORE=%STARTER_KIT%\_sherpa



for /f "tokens=2-4 delims=/ " %%a in ('date /T') do set year=%%c
for /f "tokens=2-4 delims=/ " %%a in ('date /T') do set month=%%a
for /f "tokens=2-4 delims=/ " %%a in ('date /T') do set day=%%b
set TODAY=%day%-%month%-%year%
for /f "tokens=1 delims=: " %%h in ('time /T') do set hour=%%h
for /f "tokens=2 delims=: " %%m in ('time /T') do set minutes=%%m
for /f "tokens=3 delims=: " %%a in ('time /T') do set ampm=%%a
set NOW=%hour%-%minutes%


COPY %TEMPLATES%\starter-kit-index.php %STARTER_KIT%\index.php /y

echo %TODAY% - %hour%:%minutes% %ampm% - Updated Templates >> %LOG%



echo ---------------------------------
echo Completed Updating all files
echo ---------------------------------
