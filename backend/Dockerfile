FROM ubuntu:18.04

RUN apt-get update && apt-get install -y locales
RUN locale-gen ko_KR.UTF-8
ENV LC_ALL ko_KR.UTF-8

# Install wget and build-essential
RUN apt-get update && apt-get install -y --no-install-recommends build-essential openjdk-8-jdk gcc git-core wget linux-generic emacs-nox && \
    rm -rf /var/lib/apt/lists/*

# anaconda python
RUN apt-get update && \
    apt-get install -y --no-install-recommends bzip2 ca-certificates libmysqlclient-dev && \
    rm -rf /var/lib/apt/lists/* 

RUN wget --quiet https://repo.continuum.io/archive/Anaconda3-4.4.0-Linux-x86_64.sh && \
    /bin/bash Anaconda3-4.4.0-Linux-x86_64.sh -b -p /opt/conda && \                                 
    rm Anaconda3-4.4.0-Linux-x86_64.sh

ENV PATH /opt/conda/bin:$PATH
RUN conda update conda -y \
    && conda create -n nlp python=3.7

ENV PATH /opt/conda/envs/nlp/bin:$PATH

RUN conda env list \
    # install dependencies
    && pip install --upgrade pip

WORKDIR /usr/src/app

RUN git clone https://github.com/facebookresearch/fastText.git \
    && cd /usr/src/app/fastText && make \
    && pip install .

COPY ./requirements.txt /usr/src/app/requirements.txt
RUN pip install -r requirements.txt

# copy entrypoint.sh
COPY ./entrypoint.sh /usr/src/app/entrypoint.sh

# copy project
COPY . /usr/src/app/

# run entrypoint.sh
ENTRYPOINT ["/usr/src/app/entrypoint.sh"]