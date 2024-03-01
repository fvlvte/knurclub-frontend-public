FROM nginx:1.17.1-alpine

COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY dist /usr/share/nginx/html
