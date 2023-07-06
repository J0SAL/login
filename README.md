This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Production Server

```bash
npm run build
npm run start
```

## Docker

1. Build the image

```bash
docker build -t j0sal/nextjs-13-login .
```

2. Run the image

```
docker-compose -f docker-compose.yaml -d
```
