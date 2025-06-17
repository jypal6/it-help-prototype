# Create a deployment package for Netlify
$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$zipFilename = "netlify-deploy-$timestamp.zip"
Write-Host "Creating deployment package: $zipFilename"

# Ensure the dist folder exists
if (-not (Test-Path -Path .\dist)) {
    Write-Host "Error: dist folder not found. Run 'npm run build' first."
    exit 1
}

# Create the zip file
try {
    Compress-Archive -Path .\dist\* -DestinationPath .\$zipFilename -Force
    Write-Host "Deployment package created successfully: $zipFilename"
    Write-Host "Full path: $((Get-Item .\$zipFilename).FullName)"
} catch {
    Write-Host "Error creating deployment package: $_"
    exit 1
}
