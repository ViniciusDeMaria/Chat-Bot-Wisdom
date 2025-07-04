# Contexto
Hoje as Equipes externas de suporte, vendas e projetos utilizando a base de conhecimento do PCF-Facotory - Help como apoio para configuração do sistema. Essa base de conhecimento de documentação e muito estensa e não muito intuitiva no seu fluxo de pesquisa.

# Problema
Hoje essa equipes acabam solicitando apoio a equipe de pesquisa e desvolvimento (P&D) para resolução de problemas e dúvidas que estão contidas na base de conhecimento do PCF-Factory - Help.

# Objetivo
Criação de um chat bot inteligente capaz de ler, interpretar e fornecer informaçôes pesquisando na documentação do PCF-Factory - Help.

# Escopo:
1. Interface do Chat bot para o usuario.
 * Interface intuitava.
2. Caches
 * Cache para o modelo da AI das informações inseridas
3. Armazenamento dos dados
 * Armazenamento das informações inseridas no chat bot no ElasticSearch.
 * Armazenamento dos embeddings do modelo.
4. Testes e Validações:
 * Realização de testes unitários, integrados e automação no sistema para assegurar o funcionamento adequado.

Diagramas e Fluxo.
Os diagramas e fluxo dos sistemas se encontraram na pasta diagramas.

# Tecnologias utilizadas
# Frontend
* Angular: é um framework web que permite aos desenvolvedores criar aplicações rápidos, dinâmicas e de maneira mais estruturadas e eficientes.

# Backend
* Node.js: É uma ambiente de execução em javascript para o lado do servidor pemitindo executar códigos do javascript fora de um navegador.

# Teste e qualidade
Realização de testes unitarios, integrados e automatizados.   

# Requisitos do projeto
# Requisitos funcionais
* RF1: UI intuitiva.
  = UI simples e eficiente para que o usuario possa estar utilizando.
* RF2: Modelo de Ai para ler, interpretar e fornecer informaçôes inseridas.
* RF3: Armazenamento das informações no ElasticSearch.
* RF4: Armazenamento temporario de informações no redis.
* RF5: Logs e avalição de metricas com o Kibana.

# Requisitos não funcionais
* RNF1: Hospedagem na WEB.
* RNF2: Necessario o uso ElasticSearch para armazenamento dos historicos e embeddings do modelo.
* RNF3: Precisará está conectado na internet para poder acessar o sitema.
* RNF4: Será contemplado apenas para versão web.
* RNF5: Uso do redis para armazenamento temporario de informações.
* RNF6: Uso do Kibana para geração de logs e avalição de metricas do sistema.

# Metodologia de Organização das tarefas
Nesse projeto será utilizado o Trello como quardro visual das tarefas a serem realizadas tendo o uso da metodologia de scrum para criação do quadro, assim definindo as tarefas a serem entregues a cada sprint.

# Infaestrutura
* Frontend: Angular 19.
* Backend: node.js
* Armazenamento ElasticSearch
* Logs e Metricas: Kibana
* Cache: Redis
* CI/CD: GitHub Actions

# Configuração Inicial
--
# Executando o Projeto
Para execução do projeto em desenvolvimento e necessario realizar os seguintes comandos:
-- npm install
-- npm start

# Testes
Para execução dos testes no backend e necessario realizar a execução dos seguintes comandos:

--test <nomeDoScript> ?

Para execução dos testes no frontend e necessario realizar a execução dos seguintes comandos:

--test <nomeDoScript> ?

# ElasticSearch
Este projeto utiliziado do ElasticSearch. Para armazenamento dos historicos e embrddings do chat bot.

# Pull Requests
1. Criar uma nova branch a partir da master para realizar as alterações.
2. Fazer o commit das suas mudanças com mensagens claras e objetivas.
3. Subir a branch para o repositório e abrir um Pull Request informando as mudanças realizadas.
