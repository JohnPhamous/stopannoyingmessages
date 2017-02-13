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

# Installing yarn from the local .tgz
RUN mkdir -p /opt
ADD latest.tar.gz /opt/
RUN mv /opt/dist /opt/yarn 
ENV PATH "$PATH:/opt/yarn/bin"

# Install packages using Yarn 
ADD package.json /tmp/package.json
RUN cd /tmp && yarn 
RUN mkdir -p /opt/app && cd /opt/app && ln -s /tmp/node_modules



RUN yarn install --ignore-engines 
RUN node server.js samdontspam@gmail.com hackpoly2017ucr2017
