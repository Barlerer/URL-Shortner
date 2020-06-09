FROM node:alpine
COPY ./ ./
RUN npm install
RUN npm run build
RUN ls
ENTRYPOINT [ "npm" ]
CMD [ "run","start" ]