INSTALLED_APPS = [
    # autres apps
    'core',
]
CELERY_BROKER_URL = 'amqp://rabbitmq'
CELERY_RESULT_BACKEND = 'rpc://'

