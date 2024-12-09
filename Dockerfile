# Stage 1: Build React App
FROM node:current-slim as build

WORKDIR /usr/app/

# 필요한 패키지 설치
RUN apt-get update \
	&& apt-get install -y dumb-init \
	&& npm install -g pnpm

# Package 설치
COPY package.json pnpm-lock.yaml ./
RUN pnpm install 

# 소스 코드 복사
COPY . .

# 환경 변수로 .env 파일 선택
ARG ENV=dev
RUN echo "Building React App with REACT_ENV=$ENV" \
	&& if [ -f ".env.$ENV" ]; then cp .env.$ENV .env; else echo "Missing .env.$ENV file"; exit 1; fi \
	&& pnpm build

#-------------------

FROM nginx

COPY --from=build /usr/app/out /usr/share/nginx/html

COPY nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf

# Certbot 및 필요한 패키지 설치
RUN    apt-get update && \
	apt-get install -y certbot python3-certbot-nginx

CMD    ["nginx", "-g", "daemon off;"]