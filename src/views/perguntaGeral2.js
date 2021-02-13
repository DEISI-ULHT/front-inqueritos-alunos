import * as React from 'react'

import disciplinas from '../components/disciplinas'


class PerguntaGeral2 extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            respostaPerguntaGeral2:"",
            texto: "",
           

        };
    }
     proximaPagina1(){
        this.props.history.push('/perguntaGeral3')
    };
    state1 = { disciplinas: disciplinas }
    /*state = { disciplinas: [] }
    componentDidMount() {
        axios.get('localhost:8080')
          .then(res => {
            const disciplinas = res.data;
            this.setState({ disciplinas });
          })
      }*/


    handleClick(){
        this.proximaPagina1();
        console.log('Resposta :' + this.state.texto);  

       }

    render(){
        return(
            <div className="container ">
            <div className="row" style={{ display: 'flex', justifyContent: 'center'}}>
                <div className="col-md-6" style={{justifyContent:'center', position: 'absolute', color: 'white', top: '25%', textAlign: 'center'}}>
                        
                        <p className="alert alert-danger">
                            { this.state1.disciplinas.find(disciplina => disciplina.id === 1).nome}
                         </p>
                        <p  style= {{fontSize: '28pt', top: '50%'}}> { this.state1.disciplinas.find(disciplina => disciplina.id === 1).perguntaGerais.find(pergunta => pergunta.id === 2).enunciado}</p>
                        <br/>
                        <div className="form-group">
                        <label htmlFor="exampleTextarea"></label>
                            
                             <textarea onInput={(e) => this.setState({texto: e.target.value})} type="text" name="message"className="form-control" id="exampleTextarea"  style={{borderBottomRightRadius: '0px', borderBottomLeftRadius: '0px'}} rows="7" placeholder="Escreva o texto aqui"></textarea> 
                             <button onClick={() => this.handleClick()} style= {{ borderTopLeftRadius: '0px',borderTopRightRadius: '0px', padding: '13pt', fontSize:'18pt', fontWeight: '500', borderWidth:'5px', width: '100%'}} type="button" className="btn btn-primary btn-lg">Responda e continue</button>
                        </div>
                </div>
            </div>
                
        </div>

        )

    }

}
export default PerguntaGeral2
