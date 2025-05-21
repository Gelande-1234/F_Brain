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

# Appliquer les migrations automatiquement au démarrage (optionnel)
CMD ["poetry", "run", "python", "manage.py", "migrate", "--noinput"] && \
    ["poetry", "run", "gunicorn", "server.wsgi:application", "--bind", "0.0.0.0:8000"]
