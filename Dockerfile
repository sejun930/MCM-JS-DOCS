# FROM ubuntu:22.04

# RUN curl -sL https://rpm.nodesource.com/setup_16.x | sudo bash
# RUN sudo apt install -y nodejs
# RUN sudo npm install -g yarn

FROM node:16

COPY ./package.json /mcm_js_doc/
COPY ./yarn.lock /mcm_js_doc/
WORKDIR /mcm_js_doc/
RUN yarn install

# RUN mkdir mcm_js_doc => COPY 명령어가 자동으로 폴더를 생성
COPY . /mcm_js_doc/

RUN yarn build
# 윗 단계까지의 모든 과정을 이미지에 저장
CMD yarn start
# CMD yarn start : 1번만 실행하며, 최종 단계에서 실행
# CMD 명령어가 위에 저장된 이미지를 실행만 시켜준다.