# Inquéritos aos alunos (frontend)

Aplicação desenvolvida em react para os inquéritos aos alunos do DEISI / ULHT. Esta aplicação
comunica via webservices com o backend feito em Spring (noutro repositório)

## Correr em desenvolvimento

Implica instalação prévia do node.js

Na raiz do projeto, correr
    
    npm start

Aceder a http://localhost:3000/inqueritos/<codigo_disciplina>

em que <codigo_disciplina> é uma string começada pelo caracter '_' seguida de 6 caracteres aleatórios, previamente atribuídos a cada disciplina.

## Preparar build para produção

Na raiz do projeto, correr
    
    npm run build

Isto vai gerar os ficheiros para produção na pasta build. 
De seguida, copiar esses ficheiros para a pasta src/main/resources/public do projeto do backend.

## Manutenção

Todos os semestres é necessário atualizar a informação que está na BD, nomeadamente quais as disciplinas que existem e quais
os professores associados a cada uma delas.