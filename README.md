<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>


# Painel de Cadastro de Projetos de Energia Solar

## Descrição

Este projeto é um painel de controle para o gerenciamento de projetos de energia solar. Ele permite o cadastro e gerenciamento de projetos, clientes e equipamentos associados.

## Requisitos

- **Docker:** Usado para rodar o MySQL.
- **PHP:** Requer PHP para rodar o Laravel.
- **Node.js e npm:** Usados para o desenvolvimento e construção dos assets frontend.

## Configuração e Execução


### 1. Rodar o Servidor Laravel
Para iniciar o servidor Laravel, use o comando e acesse a URL gerada:
```bash
php artisan serve
 ```

### 2. Rodar os Assets Frontend
Para compilar e rodar os assets frontend:
```bash
npm run dev
 ```

### 3. Configurar e Rodar o MySQL com Docker
Certifique-se de que o Docker está instalado e configurado. Para iniciar o MySQL, use os seguintes comandos:
```bash
docker-compose ps # Verifica o status dos containers
docker-compose exec mysql # Acessa o container do MySQL
docker-compose exec mysql mysql -u root -p # Acessa o prompt do MySQL `
 ```

### 4. Rodar as Migrations e Seeders
Dentro do container Laravel, execute os seguintes comandos para rodar as migrations e seeders:

```bash
# Execute as migrations
php artisan migrate

# Execute os seeders
php artisan db:seed
```

### 5. Acesso ao Painel
Após rodar o servidor e os assets frontend, você pode acessar o painel via navegador.

### 6. Credenciais Iniciais
Para acessar o painel, utilize as seguintes credenciais que foram configuradas no seeder:

```bash
### Nome: Default User
### Email: defaultuser@example.com
### Senha: Senha123#
```



### 7. Criar Novo Usuário
Se preferir, você também pode criar novos usuários a partir do menu superior da Home.


###  Contribuindo
Sinta-se à vontade para contribuir com melhorias e correções. Se você encontrar algum bug ou tiver uma sugestão, abra um issue ou envie um pull request.

###  Licença
Este projeto está licenciado sob a MIT License.



