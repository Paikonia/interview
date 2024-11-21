FROM node:20

RUN apt-get update && apt-get install -y curl

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm install

COPY . .

RUN pnpm build

EXPOSE 4041
    
CMD [ "pnpm", "start"]
