[CmdletBinding(PositionalBinding = $false)]
param(
    [Parameter(Mandatory = $true, Position = 0)]
    [string]$Command,
    [int]$Port = 4000,
    [string]$Version = '3.8.6')

docker run `
    -it --rm `
    -v "$($PSScriptRoot):/srv/jekyll" `
    -p "$($port):$($port)" "jekyll/jekyll:$version" `
    bash -c "./drjekyll.sh $command"
