This is an **AI Component Generator** built with Next.js App Router, Tailwind CSS, TypeScript, Gemini, Monaco, and a sandboxed live preview.

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Environment variables

Create/update `.env.local`:

```env
GOOGLE_AI_API_KEY=YOUR_KEY_HERE
```

Then restart the dev server (env vars are read on process start).

### Generate a component

- Type a prompt (e.g. “Create a modern glassmorphism pricing section”)
- Click **Generate**
- Edit the returned code in the **Monaco editor**
- See it rendered in the **sandboxed iframe preview**

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

### Steps

- Push this repo to GitHub
- Import the repo in Vercel
- Set **Environment Variables** in Vercel:
  - `GOOGLE_AI_API_KEY`
- Deploy

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
