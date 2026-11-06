$ErrorActionPreference = 'Stop'

$source = Join-Path $PSScriptRoot 'wildreach'
if (-not (Test-Path -LiteralPath (Join-Path $source 'server.mjs'))) {
  $source = $PSScriptRoot
}
if (-not (Test-Path -LiteralPath (Join-Path $source 'server.mjs'))) {
  throw 'Extract the Wildreach release ZIP, then run Install Wildreach.ps1 from the extracted folder.'
}

$node = Get-Command node -ErrorAction SilentlyContinue
if (-not $node) {
  throw 'Wildreach needs Node.js 22.5 or newer. Install it from https://nodejs.org/, then run this installer again.'
}
$nodeVersion = (& node --version).Trim().TrimStart('v')
if ([version]$nodeVersion -lt [version]'22.5') {
  throw "Wildreach needs Node.js 22.5 or newer. Your version is $nodeVersion. Update it from https://nodejs.org/."
}

$install = Join-Path $env:LOCALAPPDATA 'Programs\Wildreach'
New-Item -ItemType Directory -Path $install -Force | Out-Null
Get-ChildItem -LiteralPath $install -Force |
  Where-Object { $_.Name -ne 'data' } |
  Remove-Item -Recurse -Force
Get-ChildItem -LiteralPath $source -Force |
  Where-Object { $_.Name -ne 'data' } |
  Copy-Item -Destination $install -Recurse -Force
New-Item -ItemType Directory -Path (Join-Path $install 'data') -Force | Out-Null

$shortcutDirectory = Join-Path $env:APPDATA 'Microsoft\Windows\Start Menu\Programs'
New-Item -ItemType Directory -Path $shortcutDirectory -Force | Out-Null
$shell = New-Object -ComObject WScript.Shell
$shortcut = $shell.CreateShortcut((Join-Path $shortcutDirectory 'Wildreach.lnk'))
$shortcut.TargetPath = Join-Path $install 'Launch Wildreach.bat'
$shortcut.WorkingDirectory = $install
$shortcut.Description = 'Play Wildreach'
$shortcut.Save()

Write-Host "Wildreach is installed at $install"
Write-Host 'Launch it from the Windows Start menu. Keep the server window open while playing.'
