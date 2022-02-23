FROM registry.access.redhat.com/ubi8/nodejs-10

WORKDIR /opt/app-root

USER root

RUN wget https://bitbucket.org/ariya/phantomjs/downloads/phantomjs-2.1.1-linux-x86_64.tar.bz2
RUN tar xvjf phantomjs-2.1.1-linux-x86_64.tar.bz2 -C /usr/local/share/
RUN ln -sf /usr/local/share/phantomjs-2.1.1-linux-x86_64/bin/phantomjs /usr/local/bin

COPY package*.json ./

RUN npm set registry http://npm.seamfix.com:4873
RUN npm i -g yarn

RUN yarn install
RUN yarn add react
RUN yarn add react-dom
RUN yarn add react-icons
RUN yarn add styled-components
RUN yarn add react-router-dom
#RUN yarn add eslint-config-react-app

COPY . ./

RUN ls -a

EXPOSE 5000 3000

CMD ["yarn", "start:prod"]
