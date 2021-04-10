import * as React from 'react';
import Home from './home';
import Select from 'react-select';
import axios from 'axios'
import { ProgressBar} from 'react-bootstrap';



const customStyles = {
    control: base => ({
      ...base,
      height: 70,
      minHeight: 70,
      textAlignLast: 'center'
    })
  };
 
class ProfessorTeorica extends Home {
  constructor(props){
    super(props);
    this.state = props.location.state;
    this.state.texto = "";
    this.state.texto_profTeorica = "";
    this.state.disciplinas=[];
    this.state.perguntasGerais=[];
    this.state.options = [];
    this.state.selectOptions = [];
    this.state.selectedId = "";
    this.state.selectedName = "";
    this.state.ready=0;
    this.state.id = props.match.params.id
   // this.state = {
       // respostas:[],
      //  respostaPerguntaGeral2:"",
    //    texto: "",
     //   disciplinas:[],
     //   perguntasGerais:[],
    //    professorTeorica:[],
    //    options: [],
    //selectOptions:[],
    //    selectedId: "",
    //    selectedName: "",
    //    ready:0,
    //    id: props.match.params.id
    //};
    console.log(props.match.params.id)
    console.log(this.props)
}


  
  proximaPagina6 = () =>{
    this.setState({respostas:[...this.state.texto_profTeorica]})
         //this.props.match.params.respostaPerguntaGeral2 = this.state.texto
       
         this.props.match.params.estado = this.state
         //PerguntaGeral3(this.state)
         
          //debugger;
          var listaProfessoresTeorico = this.state.disciplinas.professores.filter(x=> x.tipo==='P' || x.tipo=== 'T+TP' )

          debugger;
         if(listaProfessoresTeorico.length===0){
            this.props.history.push({
                pathname: `/professorPratica/${this.state.id}`,
                state: this.state
                
            })  
         }else{
            this.props.history.push({
                pathname: `/perguntasProfessorPratica/${this.state.id}`,
                teacher: this.state.selectedName,
                state: this.state
                
            })

         }
  };
  
  componentDidMount() {
   this.getOptions()
  }

 handleChange (event) {
  console.log(event)
  this.setState({selectedId: event.value, selectedName: event.label});
//  console.log('Resposta qual professor da teorica: ', this.state.selectedOption);
  console.log(this.props)
};
 async handleClick(){
  this.proximaPagina6();
  debugger;
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    //body: JSON.stringify({ title: 'React POST Request Example' })
    body: JSON.stringify({ 
    "disciplinaId": this.state.disciplinas.id,
    "perguntaId": this.state.perguntasGerais[9].id,
    "professorId": this.state.selectedId,
    "conteudo": this.state.selectedName, })
};

const response = await fetch('http://localhost:8080/resposta/submit', requestOptions);
  console.log('Resposta do professor teórico:' + this.state.texto);  
 }
  async getOptions(){
    await  axios.get(`http://localhost:8080/disciplina/exportacao?disciplina=${this.state.id}`)
    .then(res => {
      const disciplinas = res.data.disciplina;
      const perguntasGerais = res.data.perguntasGerais;
      console.log(disciplinas)
      const options = disciplinas.professores.filter(x => { 
          return( x.tipo==='T' || x.tipo=== 'T+TP')
      }).map(x => {
        return {value: x.professor.id_lusofona, label: x.professor.nome}
      })    
      this.setState({ disciplinas,perguntasGerais,selectOptions: options,ready:1 });
      window.onbeforeunload = function() { return "Your work will be lost."; };
      window.history.pushState(null, "", window.location.href);
      window.onpopstate = function () {
          window.history.pushState(null, "", window.location.href);
      }
      console.log(this.state.selectOptions)
      
   });
    
  } 
  
  

  render() {

    //debugger
    //let options = this.state.options
    //const { selectedOption } = this.state;
    return (this.state.ready?
      <div>
        <div>
          <ProgressBar style= {{marginTop: "0px"}}> 
          <ProgressBar animated now={75} />
          </ProgressBar>
            </div>
            <div style={{backgroundColor:'#A9A9A9	'}} className="nm-custom-decoration" >
               <div style={{color: 'white',marginLeft: '120%', whiteSpace: 'nowrap',paddingTop:'160%'}}> {this.state.disciplinas.nome}
            </div>
            </div>
        <div className="container ">
          
            <div className="row" style={{ display: 'flex', justifyContent: 'center'}}>
                <div className="col-md-6" style={{justifyContent:'center', position: 'absolute',  top: '30%', textAlign: 'center'}}>
                <p  style= {{fontSize: '25pt', top: '50%'}}> 
                            {this.state.perguntasGerais.find(pg=>pg.id===6).enunciado}
                </p>
                        <br/>              
                           <Select 
                              styles={customStyles}
                              placeholder={"Selecione seu professor(a) das teóricas"}
                             // value={selectedOption}
                              onChange={this.handleChange.bind(this)}
                              options={this.state.selectOptions}                              
                           />                                                        
                          <button onClick={() => {this.handleClick()}} style= {{marginTop: '35%', padding: '13pt', fontSize:'18pt', fontWeight: '500', borderRadius: '4pt', width: '100%'}}  type="button" className="btn btn-primary btn-lg">Avançar</button>
                  </div>                
            </div>
        </div>
        </div>
        :<div>loading...</div>
    );
  }
}
export default ProfessorTeorica