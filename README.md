Blog API
API completa para sistema de blog com autenticação e controle de acesso.

🚀 Quick Start
Com Docker (Recomendado)
bash
docker-compose up -d
Local
bash
yarn install
yarn start:dev
📍 URLs
API: http://localhost:3000

Documentação: http://localhost:3000/docs

Banco: PostgreSQL na porta 5432

🔐 Usuário root
Usuário Admin:

Email: root@admin.com

Senha: root123

🔒 Autenticação
Faça login em POST /auth/login

Use o token: Authorization: Bearer <token>
