FROM node:16-slim as dependencies-dev
WORKDIR /app
COPY package*.json ./
RUN npm install

FROM node:16-slim as dependencies-prod
WORKDIR /app
COPY package*.json ./
RUN npm install --prod

FROM node:16-slim as dev
RUN npm i -g @loopback/cli
WORKDIR /app
COPY --from=dependencies-dev /app/node_modules/ ./node_modules/
COPY . .
ENV PORT=${PORT} HOST=${HOST} DB_HOST=${DB_HOST} MONGO_INITDB_ROOT_USERNAME=${MONGO_INITDB_ROOT_USERNAME} MONGO_INITDB_ROOT_PASSWORD=${MONGO_INITDB_ROOT_PASSWORD} DB_NAME=${DB_NAME} DB_PORT=${DB_PORT} DB_PROTOCOL=${DB_PROTOCOL} DB_URL=${DB_URL}
#RUN npm run build
EXPOSE ${PORT}
#RUN yarn run rebuild
#CMD [ "node","-r","source-map-support/register","."]
CMD ["tail","-f","/dev/null"]

FROM node:16-slim as prod
WORKDIR /app
COPY --from=dependencies-prod /app/node_modules/ ./node_modules/
COPY . .
ENV PORT=${PORT} HOST=${HOST} DB_HOST=${DB_HOST} MONGO_INITDB_ROOT_USERNAME=${MONGO_INITDB_ROOT_USERNAME} MONGO_INITDB_ROOT_PASSWORD=${MONGO_INITDB_ROOT_PASSWORD} DB_NAME=${DB_NAME} DB_PORT=${DB_PORT} DB_PROTOCOL=${DB_PROTOCOL} DB_URL=${DB_URL}
COPY --from=dev /app/dist/ ./dist/
EXPOSE ${PORT}
CMD [ "node","."]