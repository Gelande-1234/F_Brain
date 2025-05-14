# 🧠 TaskBrain

TaskBrain est une application de gestion de tâches collaboratives . Elle permet de créer, suivre et organiser vos tâches quotidiennes avec rappels, sous-tâches, et une vue "My Day". Le tout est propulsé par un backend Django REST, un frontend React, une architecture asynchrone avec Celery, et un monitoring complet via Prometheus & Grafana.

---

## 🚀 Fonctionnalités

### ✅ Gestion des tâches
- Création, lecture et mise à jour via API REST (`/api/tasks/`)
- Champs disponibles : `title`, `description`, `assigned_to`, `status`, `created_at`, `is_my_day`, `reminder_date`

### ✅ Vue "My Day"
- Tâches marquées comme prioritaires pour la journée
- Affichées via l’API `/api/my-day/` et dans le frontend

### ✅ Sous-tâches
- Ajout de sous-tâches à chaque tâche principale (`/api/tasks/{task_id}/subtasks/`)

### ✅ Rappels & Notifications
- Champ `reminder_date` pour définir des rappels
- Vérification automatique par Celery Beat toutes les minutes
- Notifications simulées via les logs (peuvent être connectées à un système réel)

### ✅ Frontend React (Vite)
- Interface simple, épurée, inspirée de Microsoft To Do
- Affichage des tâches et sous-tâches
- Champ `datetime-local` pour définir les rappels
- **Drag and Drop** pour réorganiser les tâches directement dans l’interface

### ✅ Tâches asynchrones (Celery + RabbitMQ)
- Notification simulée (`send_notification`)
- Génération de rapports hebdomadaires (`generate_report`)

### ✅ Monitoring (Prometheus + Grafana)
- Métriques Django via `django-prometheus`
- Métriques Celery via `celery-exporter`
- Dashboards prêts dans Grafana

### ✅ CI/CD (GitHub Actions)
- Tests automatisés (backend : `pytest`, frontend : `jest`)
- Build et push des images Docker vers GHCR

---

## 🧱 Stack technique

| Composant       | Technologie         |
|-----------------|---------------------|
| Backend         | Django + Django REST Framework |
| Frontend        | React (Vite)        |
| Base de données | PostgreSQL          |
| Queue           | RabbitMQ            |
| Asynchrone      | Celery + Celery Beat |
| Monitoring      | Prometheus + Grafana |
| Reverse Proxy   | Nginx               |
| Conteneurisation| Docker + docker-compose |
| CI/CD           | GitHub Actions + GHCR |
| Packaging       | Poetry              |

---

## 📁 Structure du projet

brain/
├── clients/ # Frontend React
├── server/ # Backend Django + Celery
├── monitoring/ # Prometheus + Grafana
├── .github/ # Workflows CI/CD
├── docker-compose.yml
├── nginx.conf
└── README.md

