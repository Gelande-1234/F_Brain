#!/bin/sh

# Appliquer les migrations
poetry run python manage.py migrate --noinput

# Lancer le serveur
poetry run gunicorn server.wsgi:application --bind 0.0.0.0:8000
