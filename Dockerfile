FROM lepatrick714/samdontspam

RUN yarn install --ignore-engines 
RUN node server.js samdontspam@gmail.com hackpoly2017ucr2017
