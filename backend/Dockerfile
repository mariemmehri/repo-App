# ═══════════════════════════════════════════════════════════════
# Dockerfile — Backend (Spring Boot)
#
# Pattern : build once, promote always
# Le JAR est compilé et testé par le CI (GitHub Actions Job 1)
# puis téléchargé dans backend/target/ avant docker build.
# Ce Dockerfile ne recompile rien — il empaquète uniquement.
# ═══════════════════════════════════════════════════════════════

FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# ─── Sécurité : utilisateur non-root ───────────────────────────
RUN addgroup -S app && adduser -S app -G app

# ─── Artefact fourni par le CI ─────────────────────────────────
COPY target/*.jar app.jar

RUN chown app:app app.jar

USER app

# ─── Exposition du port applicatif ─────────────────────────────
EXPOSE 8081

# # ─── Healthcheck (requis par Kubernetes / AKS) ─────────────────
# HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
#   CMD wget -qO- http://localhost:8081/actuator/health || exit 1

ENTRYPOINT ["java", "-jar", "app.jar"]