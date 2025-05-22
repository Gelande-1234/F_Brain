FROM python:3.11-slim

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de dépendances
COPY pyproject.toml poetry.lock ./

# Installer Poetry
RUN pip install poetry

# Installer les dépendances sans installer le projet lui-même
RUN poetry install --no-root

# Copier le code source
COPY . .

# Rendre le script exécutable
RUN chmod +x entrypoint.sh

# Utiliser le script comme point d'entrée
CMD ["./entrypoint.sh"]
