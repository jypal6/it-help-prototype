# Netlify Deployment Instructions

This document provides instructions for deploying the application to Netlify.

## Option 1: Manual Deployment (Recommended)

1. Run the manual deployment script:
   ```
   .\netlify-manual-deploy.ps1
   ```

2. Go to [Netlify Dashboard](https://app.netlify.com/)

3. Log in to your Netlify account

4. Drag and drop the `netlify-deploy.zip` file onto the Netlify dashboard

5. Wait for the deployment to complete

## Option 2: API Deployment

If you have a Netlify account and API access, you can use the API deployment script:

1. Set the required environment variables:
   ```
   $env:NETLIFY_AUTH_TOKEN="your-netlify-auth-token"
   $env:NETLIFY_SITE_ID="your-netlify-site-id"
   ```

2. Run the API deployment script:
   ```
   .\netlify-deploy.ps1
   ```

## Option 3: Netlify CLI Deployment

If you have the Netlify CLI installed, you can use it to deploy:

1. Log in to Netlify:
   ```
   netlify login
   ```

2. Deploy the site:
   ```
   netlify deploy --prod --dir=dist
   ```

## Important Configuration Files

- `netlify.toml`: Contains the build configuration for Netlify
- `dist/`: The build output directory that gets deployed
- `netlify-deploy.zip`: The deployment package ready for manual upload

## Troubleshooting

If you encounter any issues with the deployment:

1. Make sure you've built the site successfully (`npm run build`)
2. Check the Netlify logs for any errors
3. Verify the `netlify.toml` configuration
4. Ensure all files are included in the deployment package
