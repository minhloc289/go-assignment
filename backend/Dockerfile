FROM php:8.2-cli

# Install dependencies
RUN apt-get update && apt-get install -y \
    git curl libpng-dev libonig-dev libxml2-dev zip unzip && \
    docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

# Copy toàn bộ code, bao gồm file CSV
COPY . .

# Install Laravel dependencies
RUN composer install 

# Set quyền cho storage và bootstrap
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

EXPOSE 8000

# Chạy các lệnh Artisan khi container khởi động
CMD ["sh", "-c", "\
    php artisan config:clear && \
    php artisan migrate --force && \
    php artisan db:seed && \
    php artisan serve --host=0.0.0.0 --port=8000 \
"]