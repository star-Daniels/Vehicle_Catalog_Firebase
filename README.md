# Vehicle Catalog Firebase

## Vilauto — Catálogo de Veículos

Projeto de catálogo e gerenciamento de veículos desenvolvido para a Vilauto.

O sistema possui uma área pública para consulta dos veículos disponíveis e uma área administrativa para gerenciamento do estoque. O projeto está em funcionamento e foi desenvolvido com HTML, CSS, JavaScript e Firebase.

## Sobre o projeto

O objetivo do projeto é fornecer uma plataforma simples para apresentação dos veículos disponíveis, permitindo que os clientes visualizem informações detalhadas e entrem em contato através do WhatsApp.

A área administrativa permite o gerenciamento dos veículos cadastrados, utilizando autenticação para restringir o acesso.

## Funcionalidades

### Área pública

* Catálogo de veículos
* Filtro por marca
* Filtro por modelo
* Ordenação dos veículos
* Exibição de veículos em destaque
* Página individual de detalhes do veículo
* Informações de preço, ano, quilometragem, câmbio, combustível e cor
* Descrição do veículo
* Integração com WhatsApp para contato

### Área administrativa

* Login administrativo
* Cadastro de veículos
* Listagem de veículos cadastrados
* Edição de veículos
* Exclusão de veículos
* Marcação de veículos como destaque
* Seleção da imagem do veículo
* Gerenciamento dos dados armazenados no Firestore

## Tecnologias utilizadas

* HTML5
* CSS3
* JavaScript
* Firebase Authentication
* Firebase Cloud Firestore
* Firebase Hosting

## Estrutura do projeto

```text
vehicle-catalog-firebase/
├── public/
│   ├── index.html
│   ├── detalhes.html
│   ├── admin.html
│   ├── painel.html
│   ├── 404.html
│   ├── assets/
│   │   └── images/
│   ├── css/
│   │   ├── style.css
│   │   ├── detalhes.css
│   │   ├── admin.css
│   │   └── painel.css
│   └── js/
│       ├── firebase.js
│       ├── catalogo.js
│       ├── detalhes.js
│       ├── admin.js
│       └── painel.js
├── firebase.json
├── .firebaserc
└── .gitignore
```

## Firebase

O projeto utiliza o Firebase como infraestrutura para autenticação, banco de dados e hospedagem.

O Cloud Firestore é utilizado para armazenar os dados dos veículos, enquanto o Firebase Authentication controla o acesso à área administrativa.

O Firebase Hosting é utilizado para disponibilizar a aplicação na internet.

As informações de configuração do Firebase não são disponibilizadas neste repositório. O arquivo responsável pela configuração está incluído no `.gitignore`.

Para executar o projeto em outro ambiente, é necessário configurar uma aplicação Firebase própria e adicionar as configurações correspondentes.

## Imagens

Atualmente, as imagens dos veículos são armazenadas dentro do próprio projeto, na pasta:

```text
public/assets/images/
```

O caminho da imagem é armazenado junto aos dados do veículo no Firestore.

Uma possível evolução do projeto é utilizar o Firebase Storage para permitir o upload das imagens diretamente através da área administrativa.

## Executando o projeto

Clone o repositório:

```bash
git clone URL_DO_REPOSITORIO
```

Entre na pasta do projeto:

```bash
cd vehicle-catalog-firebase
```

Configure o Firebase de acordo com o ambiente utilizado.

Para executar o projeto localmente, pode ser utilizado um servidor local, como a extensão Live Server do Visual Studio Code.

## Deploy

O projeto utiliza Firebase Hosting para publicação.

Após configurar a Firebase CLI e realizar o login:

```bash
firebase login
```

O projeto pode ser publicado com:

```bash
firebase deploy
```

Para publicar somente o Hosting:

```bash
firebase deploy --only hosting
```

## Segurança

Informações sensíveis, como senhas, tokens e credenciais privadas, não fazem parte deste repositório.

A configuração do Firebase utilizada pelo projeto não é versionada no Git.

O acesso à área administrativa é protegido por autenticação.

As permissões de acesso aos dados são controladas através das regras de segurança do Firebase.

## Objetivo do projeto

O projeto foi desenvolvido para atender a uma necessidade real de catálogo e gerenciamento de veículos, sendo também utilizado como projeto de portfólio para demonstrar conhecimentos em desenvolvimento web e integração com serviços do Firebase.

Entre os principais conhecimentos aplicados estão:

* Desenvolvimento Front-End
* JavaScript
* Manipulação do DOM
* CRUD
* Autenticação
* Banco de dados NoSQL
* Integração com Firebase
* Firebase Hosting
* Organização de código
* Desenvolvimento de uma aplicação para uso real

## Status

Projeto em funcionamento e em constante evolução.

## Autor

Daniel Santos
