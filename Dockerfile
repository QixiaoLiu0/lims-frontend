FROM node:22-alpine AS builder

WORKDIR /app

# 2. 先复制 package.json 和 lock 文件
COPY package.json package-lock.json ./

# 3. 安装依赖（Node 22 下不会再报 Unsupported engine）
RUN npm ci

# 4. 复制项目所有文件
COPY . .

# 5. 执行构建
RUN npm run build

# --- 构建运行阶段 ---

FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD ["npm", "start"]