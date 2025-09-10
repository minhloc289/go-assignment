FROM php:8.2-cli

# Install dependencies
RUN apt-get update && apt-get install -y \
    git curl libpng-dev libonig-dev libxml2-dev zip unzip && \
    docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Install Composer
COPY --from=composer:2.6 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

# Copy toàn bộ code
COPY . .

# Copy file CSV vào thư mục storage
COPY ./storage/app/public/diem_thi_thpt_2024.csv /var/www/html/storage/app/public/diem_thi_thpt_2024.csv

# Install Laravel dependencies
RUN composer install

# Set quyền cho storage và bootstrap
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

EXPOSE 8000

# Chạy Laravel bằng artisan serve
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
