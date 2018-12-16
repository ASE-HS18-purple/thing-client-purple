FROM tiangolo/node-frontend:10 as build-stage

WORKDIR /usr/deployment/thing-client-purple
COPY . .
RUN npm install
RUN npm run build -- --output-path=./dist/out --configuration production

FROM nginx

COPY --from=build-stage /thing-client-purple/dist/out/ /usr/share/nginx/html
copy --from=build-stage /nginx.conf /etc/nginx/conf.d/default.conf


