
FROM maven:3.6.3-jdk-14 AS build

RUN echo "Building docker image"
MAINTAINER james jeong <jamesjeong94@gmail.com>

COPY ./ ./
ARG mta
ENV mta=${mta}
RUN mvn clean package


FROM openjdk:14-alpine
ENV mta=${mta}
CMD ["java", "-jar","target/demo-0.0.1-SNAPSHOT.jar"]