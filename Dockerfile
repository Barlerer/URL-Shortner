FROM node:12.18-alpine
COPY ./ ./
RUN npm install
RUN npm run build
RUN ls
ENTRYPOINT [ "npm" ]
CMD [ "run","start" ]
