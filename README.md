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

### Ollama setup

If it's the first time running ollama then you should pull your desired model:

```bash
ollama pull MODEL_NAME:TAG
```

After pulling the model, run the following command:

```bash
OLLAMA_ORIGINS=http://localhost:3000 OLLAMA_HOST=127.0.0.1:11435 ollama serve
```

The origin and host parameters can change based on your setup.