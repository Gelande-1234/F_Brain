from __future__ import absolute_import, unicode_literals
import os
from celery import Celery

# Définir le paramètre par défaut pour le settings de Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

# Crée une instance de Celery
app = Celery('backend')

# Utilisation du broker RabbitMQ
app.config_from_object('django.conf:settings', namespace='CELERY')

# Autodiscover les tâches dans les apps Django
app.autodiscover_tasks()

@app.task(bind=True)
def debug_task(self):
    print('Request: {0!r}'.format(self.request))

