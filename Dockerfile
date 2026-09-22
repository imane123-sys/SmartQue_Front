FROM node:20-alpine AS build
WORKDIR /app
COPY . .
RUN npm install && npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
# docker build -t smartqueue-frontend .
# docker run -d -p 3000:80 --name smartqueue-frontend smartqueue-frontend