# FROM  node:16.14.2-alpine3.15

# WORKDIR /app

# COPY ./package.json .
# COPY ./yarn.lock .
# ADD . /app
# RUN yarn install --frozen-lockfile && yarn cache clean
# EXPOSE 3000
# CMD [ "yarn", "start" ]

# Builder image
FROM node:16.14.2-alpine3.15 as builder

WORKDIR /app

# Copy only necessary files to install dependencies
COPY ./package.json .
COPY ./yarn.lock .
RUN yarn install --frozen-lockfile && yarn cache clean
# Up til this point should get cached and only re-run if dependencies change

# Copy necessary files to build
COPY . /app
COPY ./public/index.html /app/public

RUN yarn build


# Production Installer image
FROM node:16.14.2-alpine3.15

WORKDIR /app

# Copy only necessary files to install prod deps
COPY --from=builder /app/ /app/
RUN yarn install --frozen-lockfile && yarn cache clean
# Up til this point should get cached and only re-run if dependencies change

# USER 50000:50000

EXPOSE 3000

CMD [ "yarn", "start" ]