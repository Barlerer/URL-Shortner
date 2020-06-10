FROM node:12.18-alpine
WORKDIR /app
COPY ./ ./
RUN npm install
RUN npm run build
ENTRYPOINT [ "npm" ]
CMD [ "run","start" ]
