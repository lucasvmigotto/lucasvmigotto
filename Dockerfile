# syntax=docker/dockerfile:1

FROM dhi.io/bun:1-debian13-dev AS builder

WORKDIR /app

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=bun.lock,target=bun.lock \
    --mount=type=bind,source=src,target=src \
    --mount=type=bind,source=public,target=public \
    --mount=type=bind,source=biome.json,target=biome.json \
    --mount=type=bind,source=index.html,target=index.html \
    --mount=type=bind,source=vite.config.ts,target=vite.config.ts \
    --mount=type=bind,source=tsconfig.json,target=tsconfig.json \
    bun install --frozen-lockfile \
    && bun run build

FROM dhi.io/nginx:1-alpine

COPY --from=builder /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

USER nginx

EXPOSE 8080
