FROM lepatrick714/samdontspam:latest

# Run updates and install deps
RUN apt-get update

# Install needed deps and clean up after
RUN apt-get install -y -q --no-install-recommends \
    apt-transport-https \
    build-essential \
    ca-certificates \
    curl \
    g++ \
    gcc \
    git \
    make \
    nginx \
    sudo \
    wget \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get -y autoclean

RUN curl -sL https://deb.nodesource.com/setup_7.x | bash
RUN apt-get install -y nodejs

RUN mkdir ./src
COPY ./package.json ./src/package.json 
COPY ./server.js ./src/server.js
RUN cd ./src
CMD npm install --ignore-engines 

COPY . /src

EXPOSE 8080

CMD ["node", "/src/server.js" "samdontspam@gmail.com" "hackpoly2017ucr2017"]
