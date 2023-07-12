# Store Manager

Projeto desenvolvido por [Jonathan R. Andrade](https://www.linkedin.com/in/jonathan-r-andrade/) na [Trybe](https://www.betrybe.com/).

## Sobre

API RESTful construída com Node.js, Express.js, MySQL e arquitetura MSC (Model, Service e Controller) de um sistema de gerenciamento de vendas no formato dropshipping, onde é possível criar, visualizar, deletar e atualizar produtos e vendas. A API é documentada com Swagger.

## Habilidades desenvolvidas

* Criar APIs RESTful com Express.js;
* Utilizar arquitetura MSC (Model, Service e Controller) para organização do projeto;
* Manipular o banco de dados MySQL com operações CRUD;
* Testes unitários com Mocha, Chai e Sinon;
* Utilizar Swagger para documentar a API.

## Ferramentas/Tecnologias utilizadas

* Ubuntu v22.04
* MySQL v8
* Docker v24
* Docker Compose v2.18
* Node.js v16.20
* JavaScript
* Express.js
* Swagger

## Como executar

Siga os passos abaixo executando os comandos no terminal.

1. Clone o repositório.

    * Exemplo com Git + HTTPS
      ```
      git clone https://github.com/Jonathan-R-Andrade/store-manager.git
      ```
    * Exemplo com Git + SSH
      ```
      git clone git@github.com:Jonathan-R-Andrade/store-manager.git
      ```
    * Usando GitHub CLI
      ```
      gh repo clone Jonathan-R-Andrade/store-manager
      ```

2. Entre na pasta do repositório clonado.

    ```
    cd store-manager
    ```

3. Instale as dependências (__se estiver usando Docker, pule para o passo 4__).

    ```
    npm install
    ```

4. Crie um arquivo `.env` na raiz do projeto com as variáveis de ambiente necessárias para a aplicação.

    ```
    cp .env.example .env
    ```
    > Caso esteja usando banco de dados local, altere as variáveis conforme o seu ambiente.

5. Inicie a aplicação.

   * Caso esteja usando Docker, execute os comandos abaixo.
     ```
     # Iniciar os containers \
     docker compose up -d \
     # Entrar no container da aplicação \
     docker exec -it store_manager bash
     ```

   * Comando para criar o banco de dados e as tabelas.
     ```
     npm run migration
     ```

   * Comando para popular o banco de dados com alguns dados.
     ```
     npm run seed
     ```

   * Comando para iniciar a aplicação.
     ```
     npm start
     ```

    * Comando para executar os testes unitários.
      ```
      npm test
      ```
      > A variável de ambiente `MYSQL_DATABASE` deve estar definida como `StoreManager` para que os testes sejam executados corretamente.

> A documentação da API estará disponível no navegador no endereço [http://localhost:3000/docs/pt-br/](http://localhost:3000/docs/pt-br/).
