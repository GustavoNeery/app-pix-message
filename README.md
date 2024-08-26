<h1 align="center">App Pix Message Collector</h1>
<p align="center">Coleta informações de transações de pix</p>
<p align="center">
 <a href="#sobre">Sobre o projeto</a> •
 <a href="#funcionalidades">Funcionalidades</a> •
 <a href="#pre-requisitos">Pré-requisitos</a> • 
 <a href="#execuacao">Rodando o projeto</a> • 
 <a href="#tecnologias">Tecnologias</a> • 
 <a href="#development-decisions">Decisões de Desenvolvimento</a> • 
 <a href="#autor">Autor</a>
</p>
<h4 align="center"> 
	🚧  App Pix Message 🚀 Em desenvolvimento...  🚧
</h4>

## 💻 Sobre o projeto

O App Pix Message Collector é uma api criada como base a implementação utilizada pela Interface de Comunicação do SPI (Banco Central), para prover o Pix. Nela é simulado o consumo de informações de transações Pix. Essa api foi desenvolvida para um teste técnico de uma vaga de desenvolvedor Backend na empresa Beeteller.

## ⚙️ Funcionalidades

- [x] Geração de transações
- [x] Listar várias transações
- [x] Listar uma transação
- [ ] Listar transações de forma recursiva
- [x] Listar transações passando o ID buscando no banco
- [x] Interromper busca por transações

## 🚀 Como executar o projeto

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/), [Docker](https://www.docker.com/) e [Docker-Compose](https://docs.docker.com/compose/).

### Clone este repositório

```bash
$ git clone <https://github.com/GustavoNeery/app-pix-message>
```

### Acesse o diretório do projeto no terminal

```bash
$ cd app-pix-message
```

### Execute o comando abaixo para criar um arquivo .env na raiz do projeto

```bash
$ cp .env.example .env
```

### Execute o comando abaixo para criar a imagem da aplicação

Certifique-se de que você está dentro do diretório app-pix-message

```bash
$ docker build -t img-app-pix .

# Para se certificar de que a imagem foi criada corretamente execute
$ docker images
```

### Execute o comando abaixo para criar o container da Aplicação e do Banco de Dados

```bash
$ docker compose up

# Para se certificar de que foram criados corretamente e estão rodando execute
$ docker ps

# Pronto a aplicação e o banco já estarão disponiveis para serem testados porta:3000 - http://localhost:3000/
```

## 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Fastify](https://fastify.dev/)
- [Prisma](https://www.prisma.io/docs/getting-started)
- [PostgreSQL](https://www.postgresql.org/)

### Utilitários

- Editor: [Visual Studio Code](https://code.visualstudio.com/)
- Padrão de Commits: [Conventional Commits](https://conventionalcommits.org/en/v1.0.0/)
- Teste de API: [Insomnia](https://insomnia.rest/)

## 👨‍💻 Decisões de Desenvolvimento

- Criação e geração aleatória das transações e participantes.
- Organização da arquitetura para essa primeira solução.
- Inclusão do armazenamento dessas informações geradas no Banco de Dados.
- Implementação de melhorias com base na especificação técnica para buscar e exibir as transações.
- Criação de interação tentando estabelecer um relacionamento com outra tabela, mas sem sucesso.
- Criação de interação introduzindo apenas um campo ispb para aplicar a regra de negócio, o que funcionou corretamente.
- Organização da arquitetura da solução.
- Por fim, criação da rota DELETE para interromper o consumo de mensagens.
- A ideia geral sempre foi primeiro gerar e popular o banco de dados com a rota POST. Após fazer essa rota funcionar conforme solicitado, partir para as rotas GET, começando com um simples GET que retornava todas as transações. Em seguida, foi incrementado o GET de acordo com o que foi solicitado na especificação, e, por fim, houve a tentativa de juntar tudo isso e manter de forma recursiva a busca das mensagens com limitações de quantidade.
