FROM node:current-slim as build

WORKDIR /usr/app/

RUN	apt-get update \
	&& apt-get install -y dumb-init \
	&& npm install -g pnpm

COPY package.json pnpm-lock.yaml ./

RUN pnpm install 

COPY . .

RUN pnpm build

#-------------------

FROM nginx

COPY --from=build /usr/app/out /usr/share/nginx/html

COPY nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf

# Certbot 및 필요한 패키지 설치
RUN	apt-get update && \
	apt-get install -y certbot python3-certbot-nginx

CMD	["nginx", "-g", "daemon off;"]
