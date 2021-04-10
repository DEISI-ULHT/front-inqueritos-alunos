import * as React from 'react'
import axios from 'axios'
import PerguntaGeral3 from './perguntaGeral3';
// import disciplinas from '../components/disciplinas'
import '../App.css'
import { ProgressBar} from 'react-bootstrap';


class PerguntaGeral2 extends React.Component {
    constructor(props){
        super(props);
        this.state = props.location.state;
        this.state.texto = "";
        this.state.texto_pergunta2 = "";
        this.state.disciplinas=[];
        this.state.perguntasGerais=[];
        this.state.errormessage= '';
        this.state.ready=0;
        this.state.id = props.match.params.id

        // this.state = {
        //   //  respostas:[],
        //   //  respostaPerguntaGeral2:"",
        //     texto: "",
        //     disciplinas:[],
        //     perguntasGerais:[],
        //     errormessage: '',
        //     ready:0,
        //     id: props.match.params.id
        // };
        console.log(props.match.params.id)
        console.log(this.props)
    }   
    
      // Add a listener to prevent browser page refresh
     
    
      // Clear listener
     

     async proximaPagina2(){
         this.setState({respostas:[...this.state.texto_pergunta2]})
         //this.props.match.params.respostaPerguntaGeral2 = this.state.texto
         const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          //body: JSON.stringify({ title: 'React POST Request Example' })
          body: JSON.stringify({ 
          "disciplinaId": this.state.disciplinas.id,
          "perguntaId": this.state.perguntasGerais[3].id,
          "professorId": 'null',
          "conteudo": this.state.texto_pergunta2, })
      };

      const response = await fetch('http://localhost:8080/resposta/submit', requestOptions);
         this.props.match.params.estado = this.state
         //PerguntaGeral3(this.state)
         console.log(this.state)
         
         this.props.history.push({
          pathname: `/perguntaGeral3/${this.state.id}`,
          state: this.state.onClick,
          state2:this.state,

      })
      
      
           // return <PerguntaGeral3 state= {this.state} />        
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
      
    handleClick(){
        this.proximaPagina2();
        console.log('Resposta da pergunta 2:' + this.state.texto);  
       
       }
       myChangeHandler = (event) => {

        let val = event.target.value;
        let err = '';
    
          if (val.length < 10 && val !=="" ) {
            err = <strong className="text-extra-info" style={{color: "white"}}>Escreva um pouco mais</strong>;
          }
          if (val.length > 10 && val !=="" && val.length < 50) {
            err = <strong className="text-extra-info2" style={{color: "white"}}>Obrigada pelo feedback</strong>;
          
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
                <div style={{backgroundColor:'#C71585'}} className="nm-custom-decoration" >
               <div style={{color: 'white',marginLeft: '120%', whiteSpace: 'nowrap',paddingTop:'160%'}}> {this.state.disciplinas.nome}
            </div>
            </div>  
            <div className="container ">
            <div className="row" style={{ display: 'flex', justifyContent: 'center'}}>
                <div className="col-md-6" style={{justifyContent:'center', position: 'absolute', color: 'white', top: '25%', textAlign: 'center'}}>
                        <p  style= {{fontSize: '28pt', top: '50%'}}> 
                            {this.state.perguntasGerais.find(pg=>pg.id===3).enunciado}
                        </p>
                        <br/>
                        <div className="form-group">
                        <label htmlFor="exampleTextarea"></label>
                        <div style={{marginBottom: '2%', marginTop: '-3%'}} ><div className="extra-info-icon-box"><div className="engine-sprite icon-engine-info"></div></div><div className="extra-info-text-box">{this.state.errormessage} </div></div>  
                             <textarea  onChange={this.myChangeHandler}  onInput={(e) => this.setState({texto_pergunta2: e.target.value})} type="text" name="message"className="form-control" id="exampleTextarea"  style={{borderBottomRightRadius: '0px', borderBottomLeftRadius: '0px'}} rows="7" placeholder="Escreva o texto aqui"></textarea> 
                             <button onClick={() => {this.handleClick()}}   style= {{ borderTopLeftRadius: '0px',borderTopRightRadius: '0px', padding: '13pt', fontSize:'18pt', fontWeight: '500', borderWidth:'5px', width: '100%'}} type="button" className="btn btn-primary btn-lg">Responda e continue</button>
                        </div>
                </div>
            </div>
            
            </div>
                
        </div>
        :<div>loading...</div>
        )

    }

   
   

}

export default PerguntaGeral2
