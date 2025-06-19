#!/bin/bash

# This script deploys a site to Netlify using the Netlify API
# It requires the following environment variables:
# - NETLIFY_AUTH_TOKEN: Your Netlify personal access token
# - NETLIFY_SITE_ID: The ID of your Netlify site

echo "Deploying to Netlify..."
echo "Using deployment package: netlify-deploy-20250619-173741.zip"

# Check if the required environment variables are set
if [ -z "$NETLIFY_AUTH_TOKEN" ]; then
  echo "Error: NETLIFY_AUTH_TOKEN environment variable is not set"
  exit 1
fi

if [ -z "$NETLIFY_SITE_ID" ]; then
  echo "Error: NETLIFY_SITE_ID environment variable is not set"
  exit 1
fi

# Deploy to Netlify
curl -H "Content-Type: application/zip" \
     -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN" \
     --data-binary "@netlify-deploy-20250619-173741.zip" \
     https://api.netlify.com/api/v1/sites/$NETLIFY_SITE_ID/deploys

echo "Deployment complete!"
