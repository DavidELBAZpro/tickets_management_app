# 1. Base image: use bun (fast JS runtime)
FROM oven/bun:1.1.13 as builder

WORKDIR /app

# 2. Copy project files
COPY . .

# 3. Install dependencies and build
RUN bun install 
RUN bun run build

# 4. Serve the app using vite preview
FROM oven/bun:1.1.13 as runner

WORKDIR /app

# Copy only the dist/ folder and preview config
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json .
COPY --from=builder /app/bun.lockb .
COPY --from=builder /app/node_modules ./node_modules

# Vite preview runs on port 4173 by default
EXPOSE 8080

CMD ["bun", "run", "preview"]