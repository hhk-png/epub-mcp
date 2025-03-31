FROM node:22.12-alpine AS builder

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY ./ /app
COPY tsconfig.json /tsconfig.json
COPY pnpm-lock.yaml /app/pnpm-lock.yaml

WORKDIR /app

RUN --mount=type=cache,target=/root/.pnpm-store pnpm install --frozen-lockfile

FROM node:22-alpine AS release

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/package.json /app/package.json
COPY --from=builder /app/package-lock.json /app/package-lock.json

ENV NODE_ENV=production

RUN pnpm install --frozen-lockfile --prod

CMD ["node", "dist/index.js"]