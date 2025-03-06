
# Deployment Guide

## Secure API Key Handling

This project uses environment variables to securely handle API keys. The Google Maps API key is injected at build time and not exposed in the client-side code.

### Local Development

1. Create a `.env` file in the root directory with your API key:
```
VITE_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
```

2. Run the development server:
```
npm run dev
```

### Production Deployment on cPanel

#### Method 1: Using cPanel Environment Variables

1. In cPanel, set up an environment variable named `GOOGLE_MAPS_API_KEY` with your actual API key.

2. When building for production, use:
```
npm run build:prod
```

3. Upload the contents of the `dist` folder to your cPanel hosting.

#### Method 2: Manual Build with Environment Variable

1. Build locally with the API key:
```
VITE_GOOGLE_MAPS_API_KEY=your_actual_api_key npm run build
```

2. Upload the contents of the `dist` folder to your cPanel hosting.

### Security Notes

- The `.env` file should NEVER be committed to version control.
- The API key is only included in the build output as part of the static HTML/JS, not as a separate configuration file.
- This approach ensures the API key is not visible in browser developer tools as a separate variable.
