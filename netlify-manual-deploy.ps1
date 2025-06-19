# This script prepares the site for manual upload to Netlify
# It builds the site and creates a deployment package ready for manual upload

Write-Host "Preparing site for manual upload to Netlify..."

# Build the site
Write-Host "Building the site..."
npm run build

# Check if the build was successful
if (-not (Test-Path -Path .\dist)) {
    Write-Host "Error: Build failed. The 'dist' directory does not exist."
    exit 1
}

# Create a deployment package
$zipFilename = "netlify-deploy.zip"
Write-Host "Creating deployment package: $zipFilename"

try {
    Compress-Archive -Path .\dist\* -DestinationPath .\$zipFilename -Force
    Write-Host "Deployment package created successfully: $zipFilename"
    Write-Host "Full path: $((Get-Item .\$zipFilename).FullName)"
    
    Write-Host "======================================================================================"
    Write-Host "MANUAL DEPLOYMENT INSTRUCTIONS:"
    Write-Host "1. Go to https://app.netlify.com/"
    Write-Host "2. Log in to your Netlify account"
    Write-Host "3. Drag and drop the '$zipFilename' file onto the Netlify dashboard"
    Write-Host "4. Wait for the deployment to complete"
    Write-Host "======================================================================================"
} catch {
    Write-Host "Error creating deployment package: $_"
    exit 1
}
