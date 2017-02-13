FROM lepatrick714/samdontspam

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
RUN sudo apt-get update && sudo apt-get install yarn

RUN yarn install --ignore-engines 
RUN node server.js samdontspam@gmail.com hackpoly2017ucr2017
