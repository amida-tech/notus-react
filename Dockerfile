# Builder image
FROM node:18.19.1-alpine3.19 as builder

WORKDIR /app

# Copy only necessary files to install dependencies
COPY ./package.json .
COPY ./yarn.lock .
RUN yarn install --frozen-lockfile && yarn cache clean
# Up til this point should get cached and only re-run if dependencies change

# Update browser list
RUN npx browserslist@latest --update-db

# Copy necessary files to build
COPY . /app
COPY ./public/index.html /app/public

RUN yarn build

# Production Installer image
FROM nginx:1.25.4-bookworm

WORKDIR /app

# Copy only necessary files to install prod deps
COPY --from=builder /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]