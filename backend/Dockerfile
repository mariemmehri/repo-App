# ─── Stage 1 : Build ───────────────────────────────────────────
FROM maven:3.9-eclipse-temurin-17 AS builder

WORKDIR /app

# Copier pom.xml en premier pour profiter du cache Docker
COPY pom.xml .
RUN mvn dependency:go-offline -q

# Copier le code source et builder
COPY src ./src
RUN mvn package -DskipTests -q

# ─── Stage 2 : Run ─────────────────────────────────────────────
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Copier uniquement le JAR depuis le stage builder
COPY --from=builder /app/target/*.jar app.jar

EXPOSE 8081

ENTRYPOINT ["java", "-jar", "app.jar"]
