#FROM node:14.16.0-alpine3.13 as buildfrontend
#WORKDIR /app
#COPY . .
#RUN npm install
#RUN npm run build

#FROM nginx:alpine
#COPY --from=buildfrontend /app/dist/ /usr/share/nginx/html
#COPY default.conf /etc/nginx/conf.d/default.conf
#EXPOSE 80

FROM nginx
WORKDIR /usr/share/nginx/html
COPY ./dist/ .
WORKDIR /etc/nginx/conf.d
COPY ./default.conf .
EXPOSE 80