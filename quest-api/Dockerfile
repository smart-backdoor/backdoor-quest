FROM eclipse-temurin:21-jdk-alpine AS base

ENV GOOGLE_APPLICATION_CREDENTIALS=.google/google-auth.json

WORKDIR /app
ADD ${GOOGLE_APPLICATION_CREDENTIALS} ${GOOGLE_APPLICATION_CREDENTIALS}
COPY pom.xml pom.xml
COPY src src

FROM base AS build
RUN apk add --no-cache maven \
    && mvn clean package -DskipTests

FROM eclipse-temurin:21-jre-alpine

COPY --from=build /app/target/*.jar quest-api.jar
COPY --from=build /app/${GOOGLE_APPLICATION_CREDENTIALS} ${GOOGLE_APPLICATION_CREDENTIALS}

EXPOSE 8080
ENTRYPOINT ["java", "-Dspring.main.banner-mode=off", "-jar", "/quest-api.jar"]