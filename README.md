## Run application

```bash
yarn install

cp .env.example .env

# Dev
yarn dev

# Serve to prod
yarn start
```

## Migrations

```bash
# Create
yarn typeorm migration:create -n <migration_name>

# Run
yarn typeorm migration:run

# Rollback
yarn typeorm migration:revert
```

## Comandos executados para criar o projeto

```bash
mkdir api-express-typeorm

generate .editorconfig

yarn init -y

yarn add express

yarn add typescript ts-node-dev @types/express -D

yarn tsc --init
# Mudar o target para es2021 e o strict como false

mkdir src

yarn add typeorm reflect-metadata mysql
```
