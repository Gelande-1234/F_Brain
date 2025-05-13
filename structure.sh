#!/bin/bash

mkdir -p Monitoring/{prometheus,grafana/provisioning/{datasources,dashboards}}
mkdir -p client/src
mkdir -p server/{server_project,core_app}
mkdir -p proxy

touch .env docker-compose.yml docker-compose.staging.yml README.md

# Client
touch client/{Dockerfile,package.json,yarn.lock,vite.config.ts}
touch client/src/{main.tsx,App.tsx}

# Server
touch server/{Dockerfile,pyproject.toml,poetry.lock,manage.py,celery_worker.sh,celery_beat.sh}
touch server/server_project/{__init__.py,settings.py,urls.py,wsgi.py,asgi.py,celery.py}
touch server/core_app/{__init__.py,models.py,views.py,tasks.py}

# Proxy
touch proxy/{default.conf,Dockerfile}

# Monitoring
touch Monitoring/prometheus/prometheus.yml
touch Monitoring/grafana/provisioning/datasources/datasource.yml
touch Monitoring/grafana/provisioning/dashboards/celery-dashboard.json

echo " Structure créée avec succès."

