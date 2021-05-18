# Inquéritos aos alunos (frontend)

Aplicação desenvolvida em react para os inquéritos aos alunos do DEISI / ULHT. Esta aplicação
comunica via webservices com o backend feito em Spring (noutro repositório)

## Correr em desenvolvimento

Implica instalação prévia do node.js

Na raiz do projeto, correr
    
    npm start

## Preparar build para produção

Na raiz do projeto, correr
    
    npm run build

Isto vai gerar os ficheiros para produção na pasta build. 
De seguida, copiar esses ficheiros para a pasta src/main/resources/public do projeto do backend.