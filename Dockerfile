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

CMD	["nginx", "-g", "daemon off;"]
