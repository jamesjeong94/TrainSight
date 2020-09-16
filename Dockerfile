
FROM mhart/alpine-node:14 as client
MAINTAINER james jeong <jamesjeong94@gmail.com>

COPY . /src/
WORKDIR /src/frontend
RUN npm i
RUN npm run build


FROM maven:3.6.3-jdk-14 AS package
COPY --from=client  . .
WORKDIR /src
ARG mta
ENV mta=${mta}
RUN mvn clean install
CMD ["java", "-jar","target/demo-0.0.1-SNAPSHOT.jar"]


#FROM openjdk:14-alpine
#COPY --from=package . .
#WORKDIR /src
#ENV mta=${mta}

