import * as React from 'react'
import axios from 'axios'
import PerguntaGeral3 from './perguntaGeral3';
// import disciplinas from '../components/disciplinas'
import '../App.css'


class EscolheCurso extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            respostas:[],
          //  respostaPerguntaGeral2:"",
          respostaQualCurso:"",
            disciplinas:[],
            perguntasGerais:[],
            ready:0,
            id: props.match.params.id
        };
        console.log(props.match.params.id)
        
    }   
     proximaPagina6(){
         this.setState({respostas:[...this.state.respostaQualCurso]})
         //this.props.match.params.respostaPerguntaGeral2 = this.state.texto
         this.props.match.params.estado = this.state
         //PerguntaGeral3(this.state)
         this.props.history.push({
             pathname: `/perguntaGeral3/${this.state.id}`,
             state: this.state

         })
        // return <PerguntaGeral3 state= {this.state} />
        
    };
   
    
     async componentDidMount() {
         await axios.get(`http://localhost:8080/disciplina/exportacao?disciplina=${this.state.id}`)
          .then(res => {
            const disciplinas = res.data.disciplina;
            const perguntasGerais = res.data.perguntasGerais;
            //const cursos = res.data.cursos;

            this.setState({ disciplinas,perguntasGerais,ready:1 });
        
          })
      }


    handleClick(){
        this.proximaPagina6();
        console.log('Meu curso é:' + this.state.respostaQualCurso); 
        


       }

    render(){
        
        return( this.state.ready?
            <div>
            <div className="nm-custom-decoration" >
               <div style={{marginLeft: '110%'}}> {this.state.disciplinas.nome}
               </div>
             </div>  
            <div className="container ">
            <div className="row" style={{ display: 'flex', justifyContent: 'center'}}>
                <div className="col-md-6" style={{justifyContent:'center', position: 'absolute', color: 'white', top: '25%', textAlign: 'center'}}>
                        <p  style= {{fontSize: '28pt', top: '50%'}}> 
                            { this.state.perguntasGerais.find(pg=>pg.id===2).enunciado}
                        </p>
                        <br/>
                        <div className="form-group">
                             <button onClick={() => {this.handleClick(); return <PerguntaGeral3 state= {this.state} />}}  style= {{ padding: '13pt', fontSize:'18pt', fontWeight: '500', borderWidth:'5px', width: '100%'}} type="button" className="btn btn-primary btn-lg">{ this.state.disciplinas.cursos.find(pg=>pg.id===1).nome}</button>
                             <button onClick={() => {this.handleClick(); return <PerguntaGeral3 state= {this.state} />}}  style= {{ marginTop: '1%', padding: '13pt', fontSize:'18pt', fontWeight: '500', borderWidth:'5px', width: '100%'}} type="button" className="btn btn-primary btn-lg">{ this.state.disciplinas.cursos.find(pg=>pg.id===2).nome}</button>
                             <button onClick={() => {this.handleClick(); return <PerguntaGeral3 state= {this.state} />}}  style= {{ marginTop: '1%', padding: '13pt', fontSize:'18pt', fontWeight: '500', borderWidth:'5px', width: '100%'}} type="button" className="btn btn-primary btn-lg">{ this.state.disciplinas.cursos.find(pg=>pg.id===3).nome}</button>
  
                        </div>

                </div>
            </div>
            
            </div>
                
        </div>
        :<div>loading...</div>
        )

    }

   
   

}

export default EscolheCurso
