# 2024-FASE6-BSI2022

Ao baixar (somente na primeira vez):
1. git clone https://github.com/ifcvarela/2024-bsi22-fase6....web-dev2....pessoa-rest-api
2. no terminal digitar: npm install

Para rodar o servidor:
1. no terminal digitar: npm run dev

# Atividade 2

Utilizand como base a aplição feita em sala de aula, faça:

1. Criar uma tela de login com usuário e senha, utilizando as rotas do servidor previamente criadas.

2. Adicionar o campo senha (e verificar senha) nos cadastros de usuários.

3. Criar regra de negócios onde somente seja possível alterar e excluir dados do usuário logado. Os usuários logados podem cadastrar novos usuários mas não podem alterar ou excluir dados de outros usuários.

```mermaid
  graph TD;

  acesso(usuário acessou a aplicação) --> login[cliente: tela de login]
  login                               --> request-access[cliente: envia para o servidor requisição de acesso]
  request-access                      --> server-check-access{servidor: verifica se o usuário tem acesso}
  server-check-access                 --> |sim| access-allowed-yes[servidor: cria e envia para o cliente um TOKEN de acesso]
  server-check-access                 --> |não| access-allowed-no[servidor: envia para cliente resposrta de erro]
  access-allowed-yes                  --> login-ok[cliente: recebe o TOKEN e estoca de alguma maneira, para uso futuro]
  access-allowed-no                   --> login-error[cliente: recebe mensagem de erro, trata a mensagem e apresenta para o usuário]
  login-error                         --> |volta para outra tentativa|login
  login-ok                            --> |usuário logado|home[cliente: tela principal]
  home                                --> |usa o TOKEN para solictar dados|request-data(cliente: envia para o servidor requisição de dados)
  request-data                        --> server-check-token(...)
```

# Graph

```mermaid
graph LR

subgraph Servidor
  servidor_verifica-validade-do-token
  servidor_decisão-validade-do-token{token <br>valido?}
  servidor_verifica-dados-de-acesso
  servitor_decisão-dados-de-acesso{dados <br>validos?}
  servidor_mensagem-de-token-invalido
  servidor_gera-novo-token
  servidor_mensagem-de-dados-de-acesso-invalidos
end

subgraph Usuário
  usuario_acesso-inicial-na-aplicacao((acesso inicial <br>na aplicação))
  usuario_preenche-dados-de-acesso[/preenche dados de acesso/]
end

subgraph Cliente
  cliente_verifica-exsitencia-de-token-pregresso
  cliente_decisão-exsitencia-de-token-pregresso{token <br>existe?}
  cliente_envia-token-para-verificacao-do-servidor
  cliente_mensagem-de-dados-de-acesso-invalidos
  cliente_redireciona-para-login
  cliente_decisão-tipo-de-login{tipo de login}
  cliente_login-por-form-local
  cliente_login-por-oauth
  cliente_login-novo-cadastro
  cliente_valida-dados-de-acesso
  cliente_decisão-validade-dos-dados{dados <br>validos?}
  cliente_envia-dados-de-acesso-para-o-servidor
  cliente_redireciona-para-home(((redireciona <br>para home)))
end

Usuário ~~~ Cliente ~~~ Servidor

usuario_acesso-inicial-na-aplicacao 
  --> cliente_verifica-exsitencia-de-token-pregresso 
  --> cliente_decisão-exsitencia-de-token-pregresso
  -- sim --> cliente_envia-token-para-verificacao-do-servidor
          --> servidor_verifica-validade-do-token
          --> servidor_decisão-validade-do-token
          -- sim --> cliente_redireciona-para-home;

cliente_decisão-exsitencia-de-token-pregresso
  -- não --> cliente_redireciona-para-login
           --> cliente_decisão-tipo-de-login
           --> cliente_login-por-form-local
           --> usuario_preenche-dados-de-acesso
           --> cliente_valida-dados-de-acesso
           --> cliente_decisão-validade-dos-dados
           -- sim --> cliente_envia-dados-de-acesso-para-o-servidor
                  --> servidor_verifica-dados-de-acesso
                  --> servitor_decisão-dados-de-acesso
                  -- sim --> servidor_gera-novo-token
                         --> cliente_redireciona-para-home;
                      
cliente_decisão-tipo-de-login
  --> cliente_login-por-oauth;

cliente_decisão-tipo-de-login
  --> cliente_login-novo-cadastro;

cliente_decisão-validade-dos-dados
  -- não --> cliente_mensagem-de-dados-de-acesso-invalidos
         --> cliente_redireciona-para-login;

servitor_decisão-dados-de-acesso
  -- não --> servidor_mensagem-de-dados-de-acesso-invalidos
         --> cliente_mensagem-de-dados-de-acesso-invalidos;

servidor_decisão-validade-do-token
  -- não --> servidor_mensagem-de-token-invalido
         --> cliente_redireciona-para-login;
```
