import * as React from 'react'
import axios from 'axios'
import '../App.css'
import { ProgressBar} from 'react-bootstrap';

class PaginaEspecifica2 extends React.Component {
    constructor(props){
      super(props);
      this.state = props.location.state;
      this.state.texto = "";
      this.state.texto_especifica2 = "";
      this.state.disciplinas=[];
      this.state.perguntasGerais=[];
      this.state.errormessage= '';
      this.state.ready=0;
      this.state.id = props.match.params.id
    }     
   async proximaPagina10(){
         this.setState({respostas:[...this.state.texto_especifica2]})
         var listaProfessoresTeorico = this.state.disciplinas.professores.filter(x=> x.teorico)
          if(listaProfessoresTeorico.length===1){
              this.state.teacher = listaProfessoresTeorico[0].professor.nome
              this.state.teacherId = listaProfessoresTeorico[0].professor.id_lusofona
         }
         const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
          "disciplinaId": this.state.disciplinas.id,
          "perguntaId": this.state.perguntasGerais[7].id,
          "professorId": this.state.teacherId,
          "conteudo": this.state.texto_especifica2, })
      };
      const response = await fetch('http://localhost:8080/resposta/submit', requestOptions);
         this.props.match.params.estado = this.state
         var listaProfessoresTeorico = this.state.disciplinas.professores.filter(x=> x.teorico )
         if(listaProfessoresTeorico.length===1){
            this.props.history.push({
                pathname: `/perguntasProfessorTeorica/${this.state.id}`,
                state: this.state,
                professor:(listaProfessoresTeorico[0].professor.nome)    
            })  
         }else if(listaProfessoresTeorico.length>1){
          this.props.history.push({
              pathname: `/professorTeorica/${this.state.id}`,
              state: this.state,
          }) 
        } else{
            this.props.history.push({
                pathname: `/perguntasProfessorTeorica/${this.state.id}`,
                teacher: listaProfessoresTeorico[0].professor.id_lusofona,
                state: this.state  
            })
         }
    };   
     async componentDidMount() {
         await axios.get(`http://localhost:8080/disciplina/exportacao?disciplina=${this.state.id}`)
          .then(res => {
            const disciplinas = res.data.disciplina;
            const perguntasGerais = res.data.perguntasGerais;
            this.setState({ disciplinas,perguntasGerais,ready:1 });
            window.onbeforeunload = function() { return "Your work will be lost."; };
            window.history.pushState(null, "", window.location.href);
            window.onpopstate = function () {
                window.history.pushState(null, "", window.location.href);
            }
          })
      }
      getPerguntas(value){
        return this.state.disciplinas.perguntaEspecifica[value];
      }
    handleClick(valor){
      if ( this.getPerguntas(1).tipo=='F') {
        this.setState({texto_especifica2:this.state.texto_especifica2=valor})
      }
        this.proximaPagina10();
       }
       myChangeHandler = (event) => {

        let val = event.target.value;
        let err = '';
    
          if (val.length < 10 && val !=="" ) {
            err = <strong class="text-extra-info" style={{color: "white"}}>Escreva um pouco mais</strong>;
          }
          if (val.length > 10 && val !=="") {
            err = <strong class="text-extra-info2" style={{color: "white"}}>Obrigada pelo feedback</strong>;
            
          }
          if (val ==="") {
            err = <strong style={{color: "white"}}></strong>;
          }
        this.setState({errormessage: err}); 
      }  
    render(){
        return( this.state.ready?
            <div>
                <div> 
                <ProgressBar style= {{marginTop: "0px"}}> 
                <ProgressBar animated now={25} />
                </ProgressBar>
                </div>
                <div style={{backgroundColor:'#3960BA'}} className="nm-custom-decoration" >
               <div style={{color: 'white',marginLeft: '120%', whiteSpace: 'nowrap',paddingTop:'160%'}}> {this.state.disciplinas.nome}
            </div>
            </div>  
            <div className="container ">
            <div className="row" style={{ display: 'flex', justifyContent: 'center'}}>
                <div className="col-md-6" style={{justifyContent:'center', position: 'absolute', color: 'white', top: '25%', textAlign: 'center'}}>
                        <p  style= {{fontSize: '28pt', top: '50%'}}> 
                            { this.getPerguntas(1).enunciado}
                        </p>
                        <br/>
                        {(() => {
                        let teste = this.getPerguntas(1);
                          if(teste.tipo=='F'){
                            let valores = teste.opcoes.split(',');
                            let vetor = [];
                            valores.forEach(element => {
                                vetor.push(
                                  <button  onClick={() => this.handleClick(element)}  style= {{ padding: '13pt', fontSize:'18pt', fontWeight: '500', borderWidth:'5px', width: '100%'}} type="button" className="btn btn-primary btn-lg">{element}</button>
                                  );
                            });
                            return vetor;
                          }
                          if (this.getPerguntas(1).tipo=='A') {
                            return (
                           <div className="form-group">
                           <label htmlFor="exampleTextarea"></label>
                           <div style={{marginBottom: '2%', marginTop: '-3%'}} ><div className="extra-info-icon-box"><div className="engine-sprite icon-engine-info"></div></div><div className="extra-info-text-box">{this.state.errormessage} </div></div>  
                                <textarea onInput={(e) => this.setState({texto_especifica2: e.target.value})} type="text" name="message"className="form-control" id="exampleTextarea"  style={{borderBottomRightRadius: '0px', borderBottomLeftRadius: '0px'}} rows="7" placeholder="Escreva o texto aqui"></textarea> 
                                <button onClick={() => {this.handleClick()}}   style= {{ borderTopLeftRadius: '0px',borderTopRightRadius: '0px', padding: '13pt', fontSize:'18pt', fontWeight: '500', borderWidth:'5px', width: '100%'}} type="button" className="btn btn-primary btn-lg">Responda e continue</button>
                           </div>
                            )}else{
                              return(
                        <div className="form-group">
                    </div>
                              )}
                          })()}
                </div>
            </div>   
            </div>           
        </div>
        :<div>loading...</div>
        )

    }
}
export default PaginaEspecifica2
