FROM node:21.0.0 AS build
WORKDIR /app

COPY package.json package.json

RUN npm install 

FROM node:21.0.0 AS builder
WORKDIR /app

COPY --from=build /app/node_modules ./node_modules

COPY . .
RUN npm run build 



# segunda etapa  ingx

FROM nginx:1.23.3
EXPOSE 80
COPY --from=builder app/dist/test/browser /usr/share/nginx/html
RUN rm etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
CMD [ "nginx","-g","daemon off;" ]


#pasos manuales 

