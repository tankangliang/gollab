FROM golang:1.14.6-alpine3.12 as server
WORKDIR /app
COPY ./ ./
RUN GOOS=linux go build -o app .

FROM node:14-alpine as webapp
WORKDIR /app
COPY ./webapp/package.json ./
RUN yarn install 
COPY ./webapp/ ./
RUN yarn build

FROM golang:1.14.6-alpine3.12
WORKDIR /app
COPY --from=server /app/app ./
COPY --from=webapp /app/build ./public
RUN mkdir tmp
ENTRYPOINT ["./app"]
