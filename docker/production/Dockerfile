#######################################
#                PROD                 #
#######################################
FROM node:20-bullseye-slim AS base

# 1. Install dependencies only when needed
FROM base AS deps

# Instala o git
# RUN apk --update --no-cache add git openssh
RUN apt-get update \
    && apt-get install -y --no-install-recommends git openssh-server \
    && apt-get purge -y --auto-remove

# Importa as configurações do Git
RUN git config --global safe.directory '*'

# Cria um diretório de trabalho
WORKDIR /usr/src/app

# Instala as dependencias de acordo com o package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i; \
  else echo "Lockfile not found." && exit 1; \
  fi

#######################################
#              BUILDER                #
#######################################

# 2. Rebuilda o código fonte apenas se necessário
FROM base AS builder

# Cria um diretório de trabalho
WORKDIR /usr/src/app

COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY . .

# Copiar `env.production.example` para `.env`
COPY .env.production.example .env

RUN npm run build


#######################################
#               RUNNER                #
#######################################

# 3. Production image, copy all the files and run next
FROM base AS runner

# Cria um diretório de trabalho
WORKDIR /usr/src/app

ENV NODE_ENV production

RUN groupadd -g 1001 nodejs
RUN useradd -m -s /bin/bash -u 1001 -g nodejs nextjs

COPY --from=builder /usr/src/app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /usr/src/app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /usr/src/app/.next/static ./.next/static

USER nextjs

# Exposição da porta
EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME localhost

CMD ["node", "server.js"]