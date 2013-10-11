'Get command-line arguments. 
Set objArgs = WScript.Arguments 
InputFolder = objArgs(0) 
ZipFile = objArgs(1) 
'Create empty ZIP file. 
Set objShell = CreateObject("Shell.Application") 
Set source = objShell.NameSpace(InputFolder).Items 
Set target = objShell.NameSpace(zipfile) 
target.CopyHere(source) 
'Required! 
wScript.Sleep 2000 
