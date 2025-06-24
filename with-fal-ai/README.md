# fal.ai Avatar Generator Shop Mini

This Shop Mini demonstrates how to integrate [fal.ai](https://fal.ai) AI models into a Shop Mini. The app generates personalized AI avatars based on product recommendations using fal.ai's FLUX.1 [dev] model.

## What it does

The mini app:
1. Fetches popular product recommendations using the Shop Minis SDK
2. Creates an AI prompt based on the product titles
3. Generates a unique avatar image using fal.ai's FLUX.1 [dev] model
4. Displays the generated avatar in a mobile-optimized interface

## Getting Started

### Prerequisites

1. **fal.ai Account**: Sign up at [fal.ai](https://fal.ai) to get your API key
2. **Node.js**: Make sure you have Node.js installed
3. **Shop Minis CLI**: Install the Shop Minis development tools

### Installation

1. Clone this repository
2. Get into `with-fal-ai` folder
   ```bash
   cd with-fal-ai
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Setting up your API Key

1. Get your API key from the [fal.ai dashboard](https://fal.ai)
2. Add your API key to `src/App.tsx`:
   ```typescript
   fal.config({
     credentials: "YOUR_FAL_KEY_HERE"
   });
   ```

## API Key Security

> ⚠️ **Important Security Notice**

When running code on the client-side (e.g. in a browser, mobile app or GUI applications), make sure to not expose your `FAL_KEY`. 

### Development

For development, you can: use the fal.config() method as shown above (only for development/testing)

### Production Recommendations

**Never expose your API key in production client-side code!** Instead:

1. **Use a server-side proxy**: Create a backend service that makes requests to fal.ai on behalf of your client
2. **Implement proper authentication**: Ensure only authorized users can trigger API calls
3. **Set up environment variables**: Store your API key securely on the server

For more information about authentication and security, check out fal.ai's [server-side integration guide](https://fal.ai/docs).


## Running the App

Start the development server:
```bash
npx shop-minis dev
```

The mini app will be available in your local Shop development environment.

## How it Works

The app uses two main components from the fal.ai ecosystem:

1. **@fal-ai/client**: The official JavaScript client for interacting with fal.ai models
2. **FLUX.1 [dev]**: A powerful 12 billion parameter image generation model

When users click "Generate My Avatar", the app:
- Collects product titles from the recommendations
- Creates a descriptive prompt incorporating these interests
- Sends the prompt to fal.ai's FLUX.1 [dev] model
- Displays the generated avatar image

## Resources

- [fal.ai Documentation](https://fal.ai/docs)
- [FLUX.1 [dev] Model API](https://fal.ai/models/fal-ai/flux/dev)
- [fal.ai Client Library](https://www.npmjs.com/package/@fal-ai/client)
- [Shop Minis Documentation](https://shopify.dev/docs/apps/minis)

## Models Available

fal.ai provides access to various AI models. This example uses FLUX.1 [dev], but you can explore other models:
- Text-to-image generation
- Image editing and enhancement
- Large language models
- And more at [fal.ai/models](https://fal.ai/models)

## License

This example is provided as-is for educational purposes. Make sure to review fal.ai's terms of service and pricing before using it in production.
