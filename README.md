# Mevo Challenge

Projeto backend desenvolvido com NestJS e MongoDB, orquestrado via Docker Compose.

---

## 🚀 Tecnologias utilizadas

- **NestJS** (Node.js Framework)
- **MongoDB** (Banco de dados NoSQL)
- **Docker & Docker Compose** (para containerização e orquestração)
- **Jest** (testes)
- **ESLint & Prettier** (lint e formatação)

---

## 📁 Estrutura do projeto

- **src/**: Código-fonte da aplicação NestJS
- **payloads/**: Arquivos para testes (CSV)
- **.docker/aplicacao/**: Dockerfile para construir a imagem da API
- **.docker/mongo/**: Dockerfile para construir a imagem do Mongo
- **transactionGenerator.js**: Script para gerar arquivos CSV randomizados para testes
- **Transaction-api.postman_collection.json** : Coleção Postman com todos os endpoints da API para testes

---

## ⚙️ Como executar

### Pré-requisitos

- Docker e Docker Compose instalados

### Passos

1. Clone o repositório:

   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd mevo-challenge
   ```

2. Inicialize os containers com Docker Compose:

   ```bash
   docker-compose up --build
   ```

   - O container **mongo** ficará disponível na porta `29017`
   - A API estará acessível na porta `3000`

3. A API se conecta automaticamente ao MongoDB com a string:

   ```
   mongodb://root:root@mongo:27017/nest?authSource=admin
   ```

---

## 🛠️ Scripts úteis

- **Buildar projeto NestJS:**

  ```bash
  npm run build
  ```

- **Rodar API em modo desenvolvimento com hot reload:**

  ```bash
  npm run start:dev
  ```

- **Rodar testes:**

  ```bash
  npm test
  ```

- **Formatar código:**

  ```bash
  npm run format
  ```

## 📡 Endpoints da API

### 1. Upload de arquivo CSV de transações

- **URL:** `/transaction/upload`
- **Método:** `POST`
- **Descrição:** Endpoint para upload de um arquivo CSV contendo transações. O arquivo é validado quanto ao tamanho (até 1GB) e tipo MIME permitido.
- **Parâmetros:**
  - `file` (form-data): arquivo CSV a ser enviado.
- **Respostas:**
  - `200 OK`: Retorna dados do processamento do arquivo via `UploadTransactionPresenter`.
  - `400 Bad Request`: Caso o arquivo tenha tipo MIME inválido ou ultrapasse o limite de tamanho.

### 2. Buscar transações por nome do arquivo

- **URL:** `/transaction/:fileName`
- **Método:** `GET`
- **Descrição:** Retorna um resumo sobre as transações processadas associadas a um arquivo pelo seu nome.
- **Parâmetros:**
  - `fileName`: nome do arquivo CSV a ser consultado.
  - Exemplo: "file": "1748568577073-output-9.csv",
- **Respostas:**

  - `200 OK`: Retorna as transações via `FindTransactionPresenter`.
  - `404 Not Found`: Caso o arquivo com o nome especificado não exista.

- **Gerar arquivos CSV randomizados para testes**

  Na raiz do projeto, execute:

  ```bash
  node transactionGenerator.js <quantidade> <nome_arquivo.csv>
  ```

  Exemplo:

  ```bash
  node transactionGenerator.js 50 output-4.csv
  ```

  Os arquivos gerados serão criados dentro da pasta `payloads` para facilitar novos testes.

---

## 📬 Testando os endpoints

Use a coleção Postman fornecida (`Transaction-api.postman_collection.json`) para importar os endpoints e realizar chamadas à API rapidamente.

---

## 📝 Observações

- O arquivo `main.ts` inicializa a aplicação NestJS e escuta na porta definida pela variável de ambiente `PORT` (padrão 3000).
- Os dados do MongoDB são persistidos em volume Docker para garantir que não se percam após o container ser parado.

---
