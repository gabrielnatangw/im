# Etapa de construção do frontend
FROM node:alpine3.20 AS build

WORKDIR /app/client

COPY ./client .

RUN npm install

RUN npm run build

# Etapa de produção para o backend e frontend
FROM node:alpine3.20 AS production

WORKDIR /app

# Copiando os artefatos do frontend
COPY --from=build /app/client/dist ./client/dist
COPY --from=build /app/client/package.json ./client/package.json
COPY --from=build /app/client/node_modules ./client/node_modules

# Copiando o backend
COPY ./service ./service
COPY ./ecosystem.config.js ./ecosystem.config.js

# Instalando PM2 globalmente
RUN npm install -g pm2

# Instalando dependências do backend
WORKDIR /app/service
RUN npm install

# Voltando para o diretório principal
WORKDIR /app

# Expondo a porta 80
EXPOSE 80

# Usando PM2 para iniciar os serviços
CMD ["pm2-runtime", "ecosystem.config.js"]
