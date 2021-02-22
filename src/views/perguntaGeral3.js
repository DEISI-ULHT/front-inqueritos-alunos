import * as React from 'react';
import axios from 'axios'


class PerguntaGeral3 extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          //  respostas: this.props.location.state.respostas,
           // respostaPerguntaGeral3:"",
           respostas:[],
            texto: "",
            ready:0,
            id: props.match.params.id
            
        };
        console.log(props.match.params.id)
        console.log(this.props)
    }
    proximaPagina2(){
        this.props.match.params.respostaPerguntaGeral3 = this.state.texto
        this.props.match.params.estado = this.state

        console.log(this.props)

       // this.props.history.push('/perguntaGeral4')
        this.props.history.push({
            pathname: `/perguntaGeral4/${this.state.id}`,
            state: this.state

        })
    };
    handleClick(){
        
        console.log('Resposta da pergunta 3:' + this.state.texto);  
        this.setState({
            respostas: [...this.state.texto]
        })
        this.proximaPagina2();

       }
       async componentDidMount() {
        await axios.get(`http://localhost:8080/disciplina/exportacao?disciplina=${this.state.id}`)
         .then(res => {
           const disciplinas = res.data.disciplina;
           const perguntasGerais = res.data.perguntasGerais;
           this.setState({ disciplinas,perguntasGerais,ready:1 });
       
         })
     }
    render(){
        return(this.state.ready?
            <div className="container ">
            <div className="row" style={{ display: 'flex', justifyContent: 'center'}}>
                <div className="col-md-6" style={{justifyContent:'center', position: 'absolute', color: 'white', top: '25%', textAlign: 'center'}}>
                        <p  style= {{fontSize: '28pt', top: '50%'}}> O que melhorarias nessa disciplina? </p>
                        <p  style= {{fontSize: '15pt', verticalAlign: 'middle'}}> As críticas só são úteis se forem respeitosas e construtivas.</p>
                        <div className="form-group">
                        <label htmlFor="exampleTextarea"></label>
                            
                             <textarea onInput={(e) => this.setState({texto: e.target.value})} className="form-control" id="exampleTextarea" style={{borderBottomRightRadius: '0px', borderBottomLeftRadius: '0px'}} rows="7" placeholder="Escreva o texto aqui"></textarea>
                             <button onClick={() => this.handleClick()} style= {{ borderTopLeftRadius: '0px',borderTopRightRadius: '0px', padding: '13pt', fontSize:'18pt', fontWeight: '500', borderWidth:'5px', width: '100%'}} type="button" className="btn btn-primary btn-lg">Responda e continue</button>
 
                        </div>
                </div>
            </div>
                
        </div>
                :<div>loading...</div>


        )
        

    }

}
export default PerguntaGeral3