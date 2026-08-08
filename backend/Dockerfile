FROM php:8.3-cli-alpine

# Install system dependencies and PHP extensions Laravel needs
RUN apk add --no-cache \
    postgresql-dev \
    libzip-dev \
    zip \
    unzip \
    git \
    && docker-php-ext-install pdo pdo_pgsql pgsql bcmath zip

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /app

# Copy composer files first for better layer caching
COPY composer.json composer.lock ./
RUN composer install --no-dev --no-scripts --no-interaction --prefer-dist --optimize-autoloader

# Copy the rest of the application
COPY . .

# Finish autoload setup now that all app files are present
RUN composer dump-autoload --optimize --no-dev

# Render provides $PORT at runtime; Laravel's built-in server will bind to it
EXPOSE 8000

CMD php artisan config:cache && \
    php artisan route:cache && \
    php artisan migrate --force && \
    php artisan serve --host=0.0.0.0 --port=${PORT:-8000}
