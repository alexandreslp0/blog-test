# 📝 Blog API

API completa para sistema de blog com autenticação e controle de acesso.

## 🚀 Quick Start

### ▶️ Com Docker (Recomendado)

```bash
docker-compose up -d
```

### ▶️ Local

```bash
yarn install
yarn start:dev
```

## 📍 URLs Importantes

- API: http://localhost:3000\
- Documentação: http://localhost:3000/docs\
- Banco: PostgreSQL na porta 5432

## 🔐 Usuário Root (Admin)

Email: root@admin.com\
Senha: root123

## 🔒 Autenticação

1.  Faça login em POST /auth/login
2.  Use o token retornado como:\
    Authorization: Bearer `<token>`
