This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy with Docker

The `Dockerfile` builds a small production image from Next.js [standalone output](https://nextjs.org/docs/app/api-reference/config/next-config-js/output). It runs as a non-root user on port 3000 and includes a health check.

Build the image. `NEXT_PUBLIC_APP_URL` is the public origin used in quiz result QR links:

```bash
docker build -t bio-ai --build-arg NEXT_PUBLIC_APP_URL=https://bio-ai.example.com .
```

Run it, passing secrets at runtime from an env file:

```bash
docker run -d -p 3000:3000 --env-file .env.production bio-ai
```

Runtime environment variables (never pass these as `--build-arg`, which would store them in the image history):

| Variable | Purpose |
| --- | --- |
| `QUIZ_SESSION_SECRET` | Required for the kiosk quiz. Random string of 32+ characters. |
| `SUPABASE_URL`, `SUPABASE_SECRET_KEY` | Kiosk registration storage. |
| `GEMINI_API_KEY` (or `GOOGLE_API_KEY`) | Ayurveda guide chat. |
| `RESEND_API_KEY`, `EMAIL_FROM` | Quiz result emails. |

Build-time arguments (Next.js compiles these into the bundle, so changing them needs a rebuild):

| Build arg | Default | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_APP_URL` | empty | Public origin for QR result links. |
| `KIOSK_MODE` | `false` | `true` redirects `/` to `/kiosk`. |
| `NEXT_PUBLIC_IS_KIOSK` | `false` | Same effect as `KIOSK_MODE`. |
| `NODE_VERSION` | `22` | Node.js major version of the Alpine base image. |

For a kiosk deployment, build a separate image. Setting `KIOSK_MODE` only at runtime has no effect.

```bash
docker build -t bio-ai-kiosk --build-arg KIOSK_MODE=true --build-arg NEXT_PUBLIC_APP_URL=https://kiosk.example.com .
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
