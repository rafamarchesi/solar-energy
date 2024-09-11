# Use a imagem base do PHP com Apache
FROM php:8.2-apache

# Instale o driver MySQL
RUN docker-php-ext-install pdo pdo_mysql

# Copie o arquivo de configuração do Apache (se necessário)
# COPY apache-config.conf /etc/apache2/sites-available/000-default.conf
