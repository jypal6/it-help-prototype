# This script deploys a site to Netlify using the Netlify API
# It requires the following environment variables:
# - NETLIFY_AUTH_TOKEN: Your Netlify personal access token
# - NETLIFY_SITE_ID: The ID of your Netlify site

Write-Host "Deploying to Netlify..."
Write-Host "Using deployment package: netlify-deploy-20250619-173741.zip"

# Check if the required environment variables are set
if (-not $env:NETLIFY_AUTH_TOKEN) {
    Write-Host "Error: NETLIFY_AUTH_TOKEN environment variable is not set"
    exit 1
}

if (-not $env:NETLIFY_SITE_ID) {
    Write-Host "Error: NETLIFY_SITE_ID environment variable is not set"
    exit 1
}

# Deploy to Netlify
$headers = @{
    "Authorization" = "Bearer $env:NETLIFY_AUTH_TOKEN"
    "Content-Type" = "application/zip"
}

$filePath = ".\netlify-deploy-20250619-173741.zip"
$uri = "https://api.netlify.com/api/v1/sites/$env:NETLIFY_SITE_ID/deploys"

try {
    $fileBytes = [System.IO.File]::ReadAllBytes($filePath)
    $response = Invoke-RestMethod -Uri $uri -Method Post -Headers $headers -Body $fileBytes
    Write-Host "Deployment successful!"
    Write-Host "Site URL: $($response.deploy_url)"
} catch {
    Write-Host "Error deploying to Netlify: $_"
    exit 1
}
