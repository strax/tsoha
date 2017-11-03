FROM node:9.0.0

WORKDIR /app
COPY ./ .

RUN yarn --production
CMD ["yarn", "run", "-s", "start"]