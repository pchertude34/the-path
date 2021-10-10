FROM node:14-alpine

RUN apk add --no-cache libc6-compat

ENV NEXT_TELEMETRY_DISABLED 1

WORKDIR /app
COPY . .
RUN npm install

ENV NODE_ENV production

EXPOSE 3000

CMD ["npm", "start"]