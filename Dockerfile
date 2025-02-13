FROM node as base-stage
WORKDIR /app
COPY ./package.json .
RUN npm install
COPY . . 

# Build Stage
FROM node as build-stage
WORKDIR /app
COPY --from=base-stage /app .
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /mnt/uanalyze-ng/deploy
COPY ./nginx.conf /etc/nginx/nginx.conf
RUN chmod 777 -R /mnt/
EXPOSE 80

COPY ./entryPoint.sh /
RUN chmod +x entryPoint.sh

ENTRYPOINT ["sh","/entryPoint.sh"]

CMD ["nginx", "-g", "daemon off;"]