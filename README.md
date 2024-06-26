# DJango+Angular

## Prima installazione

```bash
mkdir backend && cd backend
source env/bin/activate
pip install django djangorestframework django-cors-headers requests whitenoise djangorestframework-simplejwt
pip freeze > requirements.txt
```

Creazione progetto DJango
```bash
django-admin startproject config .
django-admin startapp accounts
./manage.py makemigrations
./manage.py migrate

./manage.py createsuperuser --username admin --email admin@example.com

./manage.py runserver
```

## Utilizzo

```bash
cd backend
source env/bin/activate
pip -r requirements.txt
```
Se è il primo utilizzo, occorre importare le dipendenze
```bash
pip -r requirements.txt
```

## Creazione certificati
```bash
mkdir cert && cd cert
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes
```
ad esempio
```Country Name (2 letter code) [AU]:IT
State or Province Name (full name) [Some-State]:Italy
Locality Name (eg, city) []:Rome
Organization Name (eg, company) [Internet Widgits Pty Ltd]:
Organizational Unit Name (eg, section) []:
Common Name (e.g. server FQDN or YOUR name) []:localhost
Email Address []:
```

## Avvio
Development

```bash
cd backend
source env/bin/activate
./manage.py runserver
```

Production
```bash
cd backend
source env/bin/activate
gunicorn --certfile cert/cert.pem --keyfile cert/key.pem --bind 0.0.0.0:8443 -w 4 config.wsgi
```
