

    const disciplinas = [
        {
            id: 1,
            nome: "Fundamentos da Programação",
            professores: [
                {
                    id_lusofona: "p1234",
                    nome: "Pedro Alves",
                    tipo: "T"
                },
                {
                    id_lusofona: "p5678",
                    nome: "Bruno Cipriano",
                    tipo: "P"
                },
                {
                    id_lusofona: "p9874",
                    nome: "João Pedro",
                    tipo: "P"
                },
            ],
            cursos: [
                {
                    nome: "Engenharia Informatica",
                },
                {
                    nome: "Informatica de Gestão",
                }
            ],
            perguntaGerais: [
                {
                    id: 2,
                    tipo: "A",
                    enunciado: "O que gostaste mais nessa disciplina?",
                    opcoes: null,
                    disciplinaId: 1
                },
                {
                    id: 3,
                    tipo: "A",
                    enunciado: "O que melhorarias nessa disciplina?",
                    opcoes: null,
                    disciplinaId: 1
                },
                {
                    id: 4,
                    tipo: "F",
                    enunciado: "Houve uma boa ligação entre as teóricas e as práticas?",
                    opcoes: "Nenhuma ligação" | "Pouca ligação" | "Muita ligação" | "Não faz sentido nessa disciplina",
                    disciplinaId: 1
                },
                 {
                    id: 5,
                    tipo: "F",
                    enunciado: "Indique seu professor(a) da teórica",
                    opcoes: null,
                    disciplinaId: 1
                },     
            ],
            perguntasEspecificas: [
                {
                    id: 6,
                    tipo: "A",
                    enunciado: "Achas que os quizzes realizados em aula teórica ajudaram a fixar bem o conteúdo?",
                    opcoes: "Sim, com certeza" | "Razoavelmente" | "Não" | "Definitivamente não"
                }
            ],
            
            
        },
        {
            id: 2,
            nome: "Arquitetura Avançada",
            professores: [
                {
                    id_lusofona: "p0000",
                    nome: "ARROZ",
                    tipo: "T"
                },
                {
                    id_lusofona: "p1111",
                    nome: "Guilherme",
                    tipo: "P"
                },
                {
                    id_lusofona: "p2222",
                    nome: "Sergio",
                    tipo: "P"
                },
            ],
            cursos: [
                {
                    nome: "Engenharia Informatica",
                },
                {
                    nome: "Informatica de Gestão",
                }
            ],
            perguntaGerais: [
                {
                    id: 2,
                    tipo: "A",
                    enunciado: "O que gostaste mais nessa disciplina?",
                    opcoes: null,
                    disciplinaId: 1
                },
                {
                    id: 3,
                    tipo: "A",
                    enunciado: "O que melhorarias nessa disciplina?",
                    opcoes: null,
                    disciplinaId: 1
                },
                {
                    id: 4,
                    tipo: "F",
                    enunciado: "Houve uma boa ligação entre as teóricas e as práticas?",
                    opcoes: "Nenhuma ligação" | "Pouca ligação" | "Muita ligação" | "Não faz sentido nessa disciplina",
                    disciplinaId: 1
                },
                 {
                    id: 5,
                    tipo: "F",
                    enunciado: "Indique seu professor(a) da teórica",
                    opcoes: null,
                    disciplinaId: 1
                },     
            ],
            perguntasEspecificas: [
                {
                    id: 6,
                    tipo: "A",
                    enunciado: "Achas que os quizzes realizados em aula teórica ajudaram a fixar bem o conteúdo?",
                    opcoes: "Sim, com certeza" | "Razoavelmente" | "Não" | "Definitivamente não"
                }
            ],
            
            
        }
             
    ]
    
    
    
    export default disciplinas


    //export default disciplinas
    /*class Disciplinas extends React.Component{
        
        render(){
            return <PerguntaGeral2 {...disciplinas} />
        }*/
           