# Welcome to Spotifire 

Spotifire is an app that allowed you to semantically search for spotify content. This was achieved by parsing a user's query using a custom embeddings model trained on descriptions of various music genres. 
The project relied on Spotify's recommendations API to receive songs, but this has been shut down as of November 2024 (People were using it to train AI models). So unfortunately the backend for Spotifire
no longer works :( 

You can use Spotifire as an inspiration for some of your front-end design, or if you have an idea for a backend implementation, hmu :)

![alt text](https://github.com/wehttqm/spotifire/blob/master/Spotifire.png?raw=true)

I'm working on a spinoff of Spotifire - a wrapper for the Spotify Web Playback SDK, so you can easily play songs from Spotify in your project. Stay tuned for that!

_______________________________________________________________________________________________

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
