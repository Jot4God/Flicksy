FROM node:22-alpine

WORKDIR /app

# Copiar o projeto inteiro
COPY . .

# Instalar dependências
RUN npm install

# Gerar Prisma Client
RUN npx prisma generate

# Criar pasta para uploads
RUN mkdir -p /app/uploads

EXPOSE 3000

CMD ["npm", "run", "dev"]