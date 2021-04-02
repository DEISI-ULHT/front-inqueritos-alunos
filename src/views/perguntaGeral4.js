import * as React from 'react';
import Home from './home';
import axios from 'axios'
import { ProgressBar} from 'react-bootstrap';



class PerguntaGeral4 extends Home {

    
    constructor(props){
        super(props);
        this.state = {
           // respostas:[],
            texto:"",
            disciplinas:[],
            perguntasGerais:[],
            ready:0,
            id: props.match.params.id
        };
        console.log(props.match.params.id)  
        console.log(this.props)
  
    }

    
   // setRespostaPergunta4 (valor) {
   //     this.setState({
    //        respostaPergunta4: this.state.texto = valor,
   //     })
        
  //  }
    proximaPagina4 () {
        this.setState({respostas:[...this.state.texto]})
         //this.props.match.params.respostaPerguntaGeral2 = this.state.texto
         this.props.match.params.estado = this.state
         //PerguntaGeral3(this.state)
         debugger;
         console.log(this.props)
        // var listaProfessoresTeorico = this.state.disciplinas.cursos
          debugger;
         if(this.state.disciplinas.perguntaEspecifica.length > 0){
            this.props.history.push({
                pathname: `/paginaEspecifica/${this.state.id}`,
                state: this.state       
            })  
         }else{
            var listaProfessoresTeorico = this.state.disciplinas.professores.filter(x=> x.tipo==='T' || x.tipo=== 'T+TP' )

         if(listaProfessoresTeorico.length===0){
            this.props.history.push({
                pathname: `/professorTeorica/${this.state.id}`,
                state: this.state
                
            })  
         }else{
            this.props.history.push({
                pathname: `/perguntasProfessorTeorica/${this.state.id}`,
                state: this.state
                
            })

         }
         }
    };
    
    handleClick(valor){
        this.setState({texto:this.state.texto=valor})

        // this.setRespostaPergunta4(valor);
         this.proximaPagina4();
        console.log('Resposta da pergunta 4: ' + this.state.texto);
        }

        async componentDidMount() {
        await axios.get(`http://localhost:8080/disciplina/exportacao?disciplina=${this.state.id}`)
         .then(res => {
           const disciplinas = res.data.disciplina;
           const perguntasGerais = res.data.perguntasGerais;
           const professores = res.data.professores;
           this.setState({ disciplinas,perguntasGerais,ready:1 });
           window.onbeforeunload = function() { return "Your work will be lost."; };
           window.history.pushState(null, "", window.location.href);
           window.onpopstate = function () {
               window.history.pushState(null, "", window.location.href);
           }
       
         })
     }
    
    render(){

        return( this.state.ready?
            <div>
                <div>
                <ProgressBar style= {{marginTop: "0px"}}> 
                <ProgressBar animated now={50} />
                </ProgressBar>
            </div>
            <div style={{backgroundColor:'#FFD700'}} className="nm-custom-decoration" >
               <div style={{color: 'white',marginLeft: '120%', whiteSpace: 'nowrap',paddingTop:'160%'}}> {this.state.disciplinas.nome}
            </div>
            </div>
            <div className="container ">
                <div className="row" style={{ display: 'flex', justifyContent: 'center'}}>
                    <div className="col-md-6" style={{justifyContent:'center', position: 'absolute', color: 'white', top: '25%', textAlign: 'center'}}>
                    <p  style= {{fontSize: '18pt', top: '50%'}}> 
                            { this.state.perguntasGerais.find(pg=>pg.id===5).enunciado}
                        </p>
                        <p  style= {{fontSize: '12pt', verticalAlign: 'middle'}}>{ this.state.perguntasGerais.find(pg=>pg.id===20).enunciado}</p>
                        <div className="form-group">
                            <button onClick={() => this.handleClick("Nenhuma Ligação")}  style= {{ padding: '13pt', fontSize:'18pt', fontWeight: '500', borderWidth:'5px', width: '100%'}} type="button" className="btn btn-primary btn-lg">Nenhuma ligação</button>
                            <button onClick={() => this.handleClick("Pouca ligação")}   style= {{ marginTop: '1%', padding: '13pt', fontSize:'18pt', fontWeight: '500', borderWidth:'5px', width: '100%'}} type="button" className="btn btn-primary btn-lg">Pouca ligação</button>
                            <button onClick={() => this.handleClick("Muita ligação")}  style= {{ marginTop: '1%', padding: '13pt', fontSize:'18pt', fontWeight: '500', borderWidth:'5px', width: '100%'}} type="button" className="btn btn-primary btn-lg">Muita ligação</button>
                            <button onClick={() => this.handleClick("Não faz sentido nessa disciplina")}  style= {{ marginTop: '1%', padding: '13pt', fontSize:'18pt', fontWeight: '500', borderWidth:'5px', width: '100%'}} type="button" className="btn btn-primary btn-lg">Não faz sentido nessa disciplina</button>

                        </div>
                    </div>
                </div>   
             </div>
             </div>
            :<div>loading...</div>

        )

    }

}
export default PerguntaGeral4