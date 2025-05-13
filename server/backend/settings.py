DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'mydb',
        'USER': 'user',
        'PASSWORD': 'password',
        'HOST': 'db',
        'PORT': '5432',
    }
}
# Celery Configuration
CELERY_BROKER_URL = 'amqp://guest:guest@rabbitmq//'
CELERY_RESULT_BACKEND = 'rpc://'
ALLOWED_HOSTS = ['localhost', '127.0.0.1', 'ton_domaine.com']
