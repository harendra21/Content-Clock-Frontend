FROM node:16 AS build

WORKDIR /app

COPY ./package.json ./package-lock.json ./

RUN npm ci --prefer-offline --no-audit --progress=false --legacy-peer-deps

COPY . .

RUN npm run build

FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist/lms/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]