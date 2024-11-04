FROM node:current-slim

WORKDIR /usr/app/

RUN	apt-get update \
	&& apt-get install -y dumb-init \
	&& npm install -g pnpm

COPY package.json pnpm-lock.yaml ./

RUN pnpm install 

COPY . .

RUN pnpm build

# CMD ["npm", "serve"]