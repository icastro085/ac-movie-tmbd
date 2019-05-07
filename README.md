# Projeto Movie Web

### Dependências
Para esse projeto, foi usado como base as tecnologinas **ReactJs** e **PHP 7**.
Para usar em ambiente de densenvolvimente foi usado a tecnologia de **container** do **docker** junto com o **docker compose**.
Segue a lista de dependências necessárias para rodar localmente.

- [Docker](https://docs.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/overview/)

---
***NOTA***: *o docker tem um **pós instalação**, é muito importante fazer antes de processeguir o uso.
https://docs.docker.com/install/linux/linux-postinstall/*


### Foi usado no projeto
Para a **criação dos ambientes**:

- [Composer](https://hub.docker.com/_/composer)
- [NodeJs](https://hub.docker.com/_/node)
- [Webpack](https://webpack.js.org)
- [Babel](https://babeljs.io/)
- [Sass](https://sass-lang.com/guide)

**Frameworks e blibliotécas** usados:

- [Slim](http://www.slimframework.com/)
- [psr7-middlewares](https://github.com/oscarotero/psr7-middlewares)
- [guzzlehttp/guzzle](http://docs.guzzlephp.org/en/stable/)
- [phpdotenv](https://github.com/vlucas/phpdotenv)
- [Bootstrap4](https://getbootstrap.com/docs/4.3/getting-started/introduction/)
- [Fontawesome](https://fontawesome.com/)
- [Redux](https://redux.js.org/)
- [redux-actions](https://github.com/redux-utilities/redux-actions)
- [redux-promise](https://github.com/redux-utilities/redux-promise)
- [react-redux-toastr](https://www.npmjs.com/package/react-redux-toastr)
- [react-route](https://reacttraining.com/react-router/web/guides/quick-start)
- [axios](https://www.npmjs.com/package/axios)

---
***NOTA***: *Para as **referências** do Php, Composer e Nodejs o link vai para as imagens docker usadas.*

### Ambiente Desenvolvimeto
O ambiente de desenvolvimento foi criado para que no mesmo projeto tivesse o frontend e backend, e os mesmo fossem separados mesmo estando no mesmo projeto git.

Dentro do projeto temos o frontend funcionado com **Webpack** e o backend rodando com o **PHP built-in web server**, ambos rodando como localhost usando porta diferentes.

O próprio **frontend** faz **proxy** para o **backend** então é transparênte o uso da aplicação apenas usando o dns localhost do frontend.
Todo esse ambiente é colocado em execução usando o docker-compose.

Para iniciar o uso do projeto execute os comando a seguir:

***Build inicial do projeto***
```bash
$ docker-compose build
```

***Para executar o projeto***
```bash
$ docker-compose up
```
---
***NOTA***: *Como foi observado, só pela url [localhost:4212](http://localhost:4212) é possível usar o sistema*.

***Para parar o projeto***
```bash
$ docker-compose down
```


---
***NOTA***: *A api usa **TMDb** para obter os filmes e para o funcionamento do mesmo é necessário a api_key do TMDb, para não deixar essa api_key no código foi feito para ser lida das variáveis de ambiente e para o funcionamento local é **necessário** criar um arquivo **".env"** igualmente ao **".env.sample""** adicionando a api_key*.

### Deploy
Para fazer deploy é criado uma **imagem** que junta o **app** que tem todo o frontend do sistema com a **api** que serve o frontend com uma rota. Tendo acesso ao heroku do sistema, basta executar o comando:

```bash
$ ./deploy.sh
```

---
***NOTA***: *Lembrando que tem que fazer o **"heroku login"** antes de executar o deploy*.

### Ambiente de produção
Para enviar o projeto para o **ambiente de produção**, foi usado como hospedagem o **[heroku](https://www.heroku.com/)** e usando a abordagem de deploy usando **containeres** do próprio **heroku**.

O sistema pode ser acessado pelo link: **https://web-movie-ac.herokuapp.com/**
