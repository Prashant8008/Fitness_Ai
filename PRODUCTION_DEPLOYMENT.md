# 🚀 Production Deployment Guide

## Environment Variables

Create a `.env` file with the following variables:

```env
# Django Settings
SECRET_KEY=your-super-secret-key-here
DEBUG=False
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com

# Database Settings
DATABASE_URL=postgresql://username:password@localhost:5432/fitness_db

# AI Settings
GEMINI_API_KEY=your-gemini-api-key-here

# Email Settings
EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
```

## Production Settings

### 1. Security Settings
- Set `DEBUG = False`
- Use environment variables for sensitive data
- Enable HTTPS in production
- Set strong `SECRET_KEY`

### 2. Database Configuration
- Use PostgreSQL for production
- Set up proper database credentials
- Configure connection pooling

### 3. Static Files
- Configure `STATIC_ROOT` and `MEDIA_ROOT`
- Use a CDN for static files
- Set up proper file serving

### 4. Email Configuration
- Configure SMTP settings
- Set up email templates
- Enable email verification

## Deployment Steps

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Set Environment Variables
```bash
export SECRET_KEY="your-secret-key"
export DEBUG="False"
export ALLOWED_HOSTS="yourdomain.com"
```

### 3. Run Migrations
```bash
python manage.py migrate
```

### 4. Collect Static Files
```bash
python manage.py collectstatic
```

### 5. Create Superuser
```bash
python manage.py createsuperuser
```

### 6. Run Server
```bash
python manage.py runserver 0.0.0.0:8000
```

## Production Server Setup

### Using Gunicorn
```bash
pip install gunicorn
gunicorn fitness_ai_web.wsgi:application --bind 0.0.0.0:8000
```

### Using Nginx (Reverse Proxy)
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /static/ {
        alias /path/to/static/files/;
    }

    location /media/ {
        alias /path/to/media/files/;
    }
}
```

## Security Checklist

- [ ] Set `DEBUG = False`
- [ ] Use strong `SECRET_KEY`
- [ ] Enable HTTPS
- [ ] Set up proper CORS settings
- [ ] Configure database security
- [ ] Set up proper logging
- [ ] Enable CSRF protection
- [ ] Set up rate limiting
- [ ] Configure backup strategy

## Monitoring & Logging

### 1. Set up logging
```python
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'file': {
            'level': 'INFO',
            'class': 'logging.FileHandler',
            'filename': 'django.log',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['file'],
            'level': 'INFO',
            'propagate': True,
        },
    },
}
```

### 2. Set up monitoring
- Use tools like Sentry for error tracking
- Set up uptime monitoring
- Monitor database performance
- Track user analytics

## Performance Optimization

### 1. Database Optimization
- Use database indexes
- Optimize queries
- Set up connection pooling

### 2. Caching
- Use Redis for caching
- Set up database query caching
- Cache static content

### 3. CDN
- Use CloudFlare or AWS CloudFront
- Optimize images
- Minify CSS/JS

## Backup Strategy

### 1. Database Backups
```bash
pg_dump fitness_db > backup_$(date +%Y%m%d).sql
```

### 2. File Backups
- Backup media files
- Backup static files
- Backup configuration files

### 3. Automated Backups
- Set up cron jobs
- Use cloud storage
- Test restore procedures

## SSL Certificate

### Using Let's Encrypt
```bash
sudo certbot --nginx -d yourdomain.com
```

### Using CloudFlare
- Enable SSL/TLS encryption
- Set up proper SSL settings
- Configure security headers

## Domain Configuration

### 1. DNS Settings
- Point domain to server IP
- Set up CNAME records
- Configure subdomains

### 2. SSL Configuration
- Install SSL certificate
- Redirect HTTP to HTTPS
- Set up security headers

## Testing

### 1. Load Testing
- Use tools like Apache Bench
- Test with realistic data
- Monitor performance

### 2. Security Testing
- Run security scans
- Test authentication
- Check for vulnerabilities

## Maintenance

### 1. Regular Updates
- Update Django and dependencies
- Apply security patches
- Monitor for vulnerabilities

### 2. Database Maintenance
- Regular backups
- Monitor performance
- Clean up old data

### 3. Log Monitoring
- Check error logs
- Monitor access logs
- Set up alerts

---

**Your Fitness AI app is now production-ready! 🚀**
