FROM node:17.4


WORKDIR /app
COPY package.json /api/
COPY . /app
RUN mkdir -p node_modules/node-sass/vendor/linux_musl-x64-79
RUN curl -L https://github.com/sass/node-sass/releases/download/v7.0.1/linux_musl-x64-79_binding.node -o node_modules/node-sass/vendor/linux_musl-x64-79/binding.node
RUN npm install --silent
RUN npm rebuild node-sass

EXPOSE 8080
CMD ["npm", "start"]
