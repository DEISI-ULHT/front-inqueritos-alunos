import * as React from 'react';
import Home from './home';
import axios from 'axios'
import API from '../main/api'
import { ProgressBar} from 'react-bootstrap';
import '../App.css';
import { Button, Container, Card, Row, Carousel} from 'react-bootstrap';


class perguntasProfessorPratica extends React.Component {
    
      constructor(props) {
        super(props);
        this.state = props.location.state;
        this.state.teacher=props.location.teacher;
        this.state.index = 0;
        this.state.index2 = 0;
        this.state.direction = null;
        this.state.carouselItemCount = 6;
        this.state.childVisible = 1;
        this.state.count = 0;
        this.state.pergunta7 = 0;
        this.state.pergunta8 = 0;
        this.state.pergunta9 = 0;
        this.state.pergunta10 = 0;
        this.state.pergunta11 = 0;
        this.state.pergunta12 = 0;
        this.state.texto = "";
        this.state.texto_perguntasProfPratica = "";
        this.state.disciplinas=[];
        this.state.perguntasGerais=[];
        this.state.ready=0;
        this.state.id = props.match.params.id
        console.log(props.match.params.id)
        console.log(this.props) 
      }
    
      toggleCarousel = (direction, valida) => {
        let index = this.state.index
        let index2 = this.state.index2
        let count = this.state.count;
        const [min, max] = [0, this.state.carouselItemCount - 1]
    
        if (direction === 'next') {
          index++
          index2++
    
        }
    
        if (index !== 0 && direction === 'prev') {
          index--
          index2--
        }
    
        if(valida === true){
           count++
        }
        
        if(count >= 6 && index2 === 6){
          this.enviaDados();
            
        }
    
        if (index > max) {
          index = max
          index2 = max
        }
    
        if (index < min) {
          index = max
          index2 = max
        }
    
        this.setState({
          direction,
          index,
          index2,
          count
        })
      }
      async componentDidMount() {
        await API.get(`disciplina/exportacao?disciplina=${this.state.id}`)
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
   
     async enviaDados(){
      var listaPerguntas = [10,11,12,13,14,15];
      var contador = 6;
      var perguntasFiltradas = this.state.perguntasGerais.filter(x=>listaPerguntas.includes(x.id));
      for (let i = 0; i < perguntasFiltradas.length; i++) {
        contador++;
        const element = perguntasFiltradas[i];
        const idPergunta = perguntasFiltradas[i].id;
        const resposta = this.state["pergunta"+contador];
        var listaProfessoresPratico = this.state.disciplinas.professores.filter(x => x.pratico)
        if (listaProfessoresPratico.length === 1) {
          this.state.teacher = listaProfessoresPratico[0].professor.nome
          this.state.teacherId = listaProfessoresPratico[0].professor.id_lusofona
        }else{
          this.state.teacherId = this.state.selectedId
        }
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
          "disciplinaId": this.state.disciplinas.id,
          "perguntaId": idPergunta,
          "professorId": this.state.teacherId,
          "conteudo": resposta, })
        };

        await API.post('resposta/submit', {
              "disciplinaId": this.state.disciplinas.id,
              "perguntaId": idPergunta,
              "professorId": this.state.teacherId,
              "conteudo": resposta, });
      }
      this.props.history.push({
        pathname:`/final/${this.state.id}`,
        state: this.state
      })
     }
      handleClick(valor, key, resposta){    
        if(key === 1){
        this.setState({
          pergunta7: resposta
          
        })
        }
        if(key === 2){
          this.setState({
            pergunta8: resposta
          })
        }
        if(key === 3){
          this.setState({
            pergunta9: resposta
          })
          }
        if(key === 4){
        this.setState({
            pergunta10: resposta
        })
     }
        if(key === 5){
            this.setState({
                pergunta11: resposta
            })
        }
        if(key === 6){
            this.state.pergunta12 = resposta;
          
        }
    
        this.toggleCarousel('next', true);
      };
      render(){
    
        const centralizar={
          justifyContent: "center",
          alignItems: "center",
          marginTop: '10%',
          marginBottom: '30px',     
        };
        const centralizar2={
            justifyContent: "center",
            alignItems: "center",  
          };
        return ( this.state.ready?
          <div>
             <div>
                <ProgressBar style= {{marginTop: "0px"}}> 
                <ProgressBar animated now={90} />
                </ProgressBar>
            </div>
            <div style={{backgroundColor:'#008B8B'}} className="nm-custom-decoration" >
               <div style={{color: 'white',marginLeft: '120%', whiteSpace: 'nowrap',paddingTop:'160%'}}> {this.state.disciplinas.nome}
            </div>
            </div>
          <Container >
          <div className="container ">
            <div className="row" style={{ display: 'flex', justifyContent: 'center', marginTop: '11%'}}>
            <p style= {{color: 'white' ,fontSize: '20pt', marginTop: '-5%',textAlign: 'center'}}> 
                { this.state.perguntasGerais.find(pg=>pg.id===18).enunciado}
                <p  style= {{fontSize: '11pt', top: '50%'}}> 
                          Estas questões são referentes ao professor <strong style={{color: '#008B8B'}}>{this.props.location.professor}</strong> 
                        </p>
             </p>
               </div>
              </div>
            <Carousel className = "carousel1" id="quote-carousel" interval={null} indicators={false} controls={false} activeIndex={this.state.index2} direction={this.state.direction}>
              <Carousel.Item>
                    <img  src="https://images-submarino.b2w.io/produtos/01/00/img/1895545/5/1895545511_1GG.jpg" height= "200px" width=" 100%"   />
                  <Carousel.Caption>
                    
                  <p style= {{color: '#686571'}} className="questao">Questão 1/6 </p>
                    <h2>
                      <Button variant="white" className="carousel-control-prev-icon left carousel-control" style = {{marginLeft:"-120%", border: "none"}} onClick={() => this.toggleCarousel('prev', false)}></Button>
                    </h2> 
                    <h2>
                      <p  style= {{color: 'black', fontSize: '16pt', top: '50%', textAlign: 'center'}}> 
                            {this.state.perguntasGerais.find(pg=>pg.id===7).enunciado}
                           
                        </p>
                        
                    </h2>     
                    <h2>
                      <Button variant="white" className="carousel-control-next-icon right carousel-control" style = {{marginLeft:"105%", border: "none"}} onClick={() => this.toggleCarousel('next', false)}></Button>
                    </h2>    
                  </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                    <img  src="https://images-submarino.b2w.io/produtos/01/00/img/1895545/5/1895545511_1GG.jpg"  height= "200px" width=" 100%"   />
                  <Carousel.Caption>
                  <p style= {{color: '#686571'}} className="questao">Questão 2/6 </p>
                    <h2>
                      <Button variant="white" className="carousel-control-prev-icon left carousel-control" style = {{marginLeft:"-120%", border: "none"}} onClick={() => this.toggleCarousel('prev', false)}></Button>
                    </h2> 
                    <h2>
                    <p  style= {{color: 'black', fontSize: '16pt', top: '50%', textAlign: 'center'}}> 
                            {this.state.perguntasGerais.find(pg=>pg.id===8).enunciado}
                        </p>
                    </h2>     
                    <h2>
                      <Button variant="white" className="carousel-control-next-icon right carousel-control" style = {{marginLeft:"105%", border: "none"}} onClick={() => this.toggleCarousel('next', false)}></Button>
                    </h2>    
                  </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                    <img  src="https://images-submarino.b2w.io/produtos/01/00/img/1895545/5/1895545511_1GG.jpg"  height= "200px" width=" 100%"   />
                  <Carousel.Caption>
                  <p style= {{color: '#686571'}} className="questao">Questão 3/6 </p>
                    <h2>
                      <Button variant="white" className="carousel-control-prev-icon left carousel-control" style = {{marginLeft:"-120%", border: "none"}} onClick={() => this.toggleCarousel('prev', false)}></Button>
                    </h2> 
                    <h2>
                    <p  style= {{color: 'black', fontSize: '16pt', top: '50%', textAlign: 'center'}}> 
                            {this.state.perguntasGerais.find(pg=>pg.id===9).enunciado}
                        </p>
                    </h2>     
                    <h2>
                      <Button variant="white" className="carousel-control-next-icon right carousel-control" style = {{marginLeft:"105%", border: "none"}} onClick={() => this.toggleCarousel('next', false)}></Button>
                    </h2>    
                  </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                    <img  src="https://images-submarino.b2w.io/produtos/01/00/img/1895545/5/1895545511_1GG.jpg"  height= "200px" width=" 100%"   />
                  <Carousel.Caption>
                  <p style= {{color: '#686571'}} className="questao">Questão 4/6 </p>
                    <h2>
                      <Button variant="white" className="carousel-control-prev-icon left carousel-control" style = {{marginLeft:"-120%", border: "none"}} onClick={() => this.toggleCarousel('prev', false)}></Button>
                    </h2> 
                    <h2>
                    <p  style= {{color: 'black', fontSize: '16pt', top: '50%', textAlign: 'center'}}> 
                            {this.state.perguntasGerais.find(pg=>pg.id===10).enunciado}
                        </p>
                    </h2>     
                    <h2>
                      <Button variant="white" className="carousel-control-next-icon right carousel-control" style = {{marginLeft:"105%", border: "none"}} onClick={() => this.toggleCarousel('next', false)}></Button>
                    </h2>    
                  </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                    <img  src="https://images-submarino.b2w.io/produtos/01/00/img/1895545/5/1895545511_1GG.jpg"  height= "200px" width=" 100%"   />
                  <Carousel.Caption>
                  <p style= {{color: '#686571'}} className="questao">Questão 5/6 </p>
                    <h2>
                      <Button variant="white" className="carousel-control-prev-icon left carousel-control" style = {{marginLeft:"-120%", border: "none"}} onClick={() => this.toggleCarousel('prev', false)}></Button>
                    </h2> 
                    <h2>
                    <p  style= {{color: 'black', fontSize: '16pt', top: '50%', textAlign: 'center'}}> 
                            {this.state.perguntasGerais.find(pg=>pg.id===14).enunciado}
                        </p>
                    </h2>     
                    <h2>
                      <Button variant="white" className="carousel-control-next-icon right carousel-control" style = {{marginLeft:"105%", border: "none"}} onClick={() => this.toggleCarousel('next', false)}></Button>
                    </h2>    
                  </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                    <img  src="https://images-submarino.b2w.io/produtos/01/00/img/1895545/5/1895545511_1GG.jpg"  height= "200px" width=" 100%"   />
                  <Carousel.Caption>
                  <p style= {{color: '#686571'}} className="questao">Questão 6/6 </p>
                    <h2>
                      <Button variant="white" className="carousel-control-prev-icon left carousel-control" style = {{marginLeft:"-120%", border: "none"}} onClick={() => this.toggleCarousel('prev', false)}></Button>
                    </h2> 
                    <h2>
                    <p  style= {{color: 'black', fontSize: '16pt', top: '50%', textAlign: 'center'}}> 
                            {this.state.perguntasGerais.find(pg=>pg.id===12).enunciado}
                        </p>
                    </h2>     
                    <h2>
                      <Button variant="white" className="carousel-control-next-icon right carousel-control" style = {{marginLeft:"105%", border: "none"}} onClick={() => this.toggleCarousel('next', false)}></Button>
                    </h2>    
                  </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          
          <Carousel className = "carousel2" style = {{marginTop: "2%"}} id="quote-carousel" interval={null} indicators={false} controls={false} activeIndex={this.state.index} direction={this.state.direction}>
            <Carousel.Item>
                <Card.Body>
              
                <Row style = {centralizar}>
                    
                    <div style = {{marginLeft: "0%"}} >
                      <button className={this.state.pergunta7 === 1 ? "blackButton" : "whiteButton"} 
                                onClick={() => this.handleClick(1,1,1)}>
                                1
                      </button>
                    </div>
    
                    <div style = {{marginLeft: "2%"}} >
                      <button className={this.state.pergunta7 === 2 ? "blackButton" : "whiteButton"}
                              onClick={() => this.handleClick(2,1,2)}>
                                2
                      </button>
                    </div>
    
                    <div style = {{marginLeft: "2%"}} >
                      <button className={this.state.pergunta7 === 3 ? "blackButton" : "whiteButton"}
                              onClick={() => this.handleClick(3,1,3)}>
                                3
                      </button>
                    </div>
    
                    <div style = {{marginLeft: "2%"}} >
                      <button className={this.state.pergunta7 === 4 ? "blackButton" : "whiteButton"}
                              onClick={() => this.handleClick(4,1,4)}>
                                4
                      </button>
                    </div>
    
                    <div style = {{marginLeft: "2%"}} >
                      <button className={this.state.pergunta7 === 5 ? "blackButton" : "whiteButton"}
                              onClick={() => this.handleClick(5,1,5)}>
                                5
                      </button>
                    </div>
    
                    <div style = {{marginLeft: "2%"}} >
                      <button className={this.state.pergunta7 === 6 ? "blackButton" : "whiteButton"}
                              onClick={() => this.handleClick(6,1,6)}>
                                6
                      </button>
                    </div>
    
                </Row>
                <Row style = {centralizar2}>  
                <div style = {{marginLeft: "0%"}} >
                <p className="label question-option-label-left" data-attr="placeholder_start" style={{ textAlign: "left"}}>NEM POR ISSO</p>

                    </div>
    
                    <div style = {{marginLeft: "45%"}} >
                    <p className="label question-option-label-right" data-attr="placeholder_end" style={{ textAlign: "right"}}>PERFEITAMENTE</p>

                    </div>
                
                </Row> 
                   
            </Card.Body>
            </Carousel.Item>
            <Carousel.Item>
                <Card.Body>
              
                <Row style = {centralizar}>
                    
                    <div style = {{marginLeft: "0%"}} >
                      <button className={this.state.pergunta8 === 1 ? "blackButton" : "whiteButton"} 
                                onClick={() => this.handleClick(7,2,1)}>
                                1
                      </button>
                    </div>
    
                    <div style = {{marginLeft: "2%"}} >
                      <button className={this.state.pergunta8 === 2 ? "blackButton" : "whiteButton"}
                              onClick={() => this.handleClick(8,2,2)}>
                                2
                      </button>
                    </div>
    
                    <div style = {{marginLeft: "2%"}} >
                      <button className={this.state.pergunta8 === 3 ? "blackButton" : "whiteButton"}
                              onClick={() => this.handleClick(9,2,3)}>
                                3
                      </button>
                    </div>
    
                    <div style = {{marginLeft: "2%"}} >
                      <button className={this.state.pergunta8 === 4 ? "blackButton" : "whiteButton"}
                              onClick={() => this.handleClick(10,2,4)}>
                                4
                      </button>
                    </div>
    
                    <div style = {{marginLeft: "2%"}} >
                      <button className={this.state.pergunta8 === 5 ? "blackButton" : "whiteButton"}
                              onClick={() => this.handleClick(11,2,5)}>
                                5
                      </button>
                    </div>
    
                    <div style = {{marginLeft: "2%"}} >
                      <button className={this.state.pergunta8 === 6 ? "blackButton" : "whiteButton"}
                              onClick={() => this.handleClick(12,2,6)}>
                                6
                      </button>
                    </div>
    
                </Row>
                <Row style = {centralizar2}>  
                <div style = {{marginLeft: "0%"}} >
                <p className="label question-option-label-left" data-attr="placeholder_start" style={{ textAlign: "left"}}>NEM POR ISSO</p>

                    </div>
    
                    <div style = {{marginLeft: "45%"}} >
                    <p className="label question-option-label-right" data-attr="placeholder_end" style={{ textAlign: "right"}}>PERFEITAMENTE</p>

                    </div>
                
                </Row> 
                   
            </Card.Body>
            </Carousel.Item>
            <Carousel.Item>
                <Card.Body>
              
                <Row style = {centralizar}>
                    
                    <div style = {{marginLeft: "0%"}} >
                      <button className={this.state.pergunta9 === 1 ? "blackButton" : "whiteButton"} 
                                onClick={() => this.handleClick(13,3,1)}>
                                1
                      </button>
                    </div>
    
                    <div style = {{marginLeft: "2%"}} >
                      <button className={this.state.pergunta9 === 2 ? "blackButton" : "whiteButton"}
                              onClick={() => this.handleClick(14,3,2)}>
                                2
                      </button>
                    </div>
    
                    <div style = {{marginLeft: "2%"}} >
                      <button className={this.state.pergunta9 === 3 ? "blackButton" : "whiteButton"}
                              onClick={() => this.handleClick(15,3,3)}>
                                3
                      </button>
                    </div>
    
                    <div style = {{marginLeft: "2%"}} >
                      <button className={this.state.pergunta9 === 4 ? "blackButton" : "whiteButton"}
                              onClick={() => this.handleClick(16,3,4)}>
                                4
                      </button>
                    </div>
    
                    <div style = {{marginLeft: "2%"}} >
                      <button className={this.state.pergunta9 === 5 ? "blackButton" : "whiteButton"}
                              onClick={() => this.handleClick(17,3,5)}>
                                5
                      </button>
                    </div>
    
                    <div style = {{marginLeft: "2%"}} >
                      <button className={this.state.pergunta9 === 6 ? "blackButton" : "whiteButton"}
                              onClick={() => this.handleClick(18,3,6)}>
                                6
                      </button>
                    </div>
    
                </Row>
                <Row style = {centralizar2}>  
                <div style = {{marginLeft: "0%"}} >
                <p className="label question-option-label-left" data-attr="placeholder_start" style={{ textAlign: "left"}}>NEM POR ISSO</p>

                    </div>
    
                    <div style = {{marginLeft: "45%"}} >
                    <p className="label question-option-label-right" data-attr="placeholder_end" style={{ textAlign: "right"}}>PERFEITAMENTE</p>

                    </div>
                
                </Row> 
                   
            </Card.Body>
            </Carousel.Item>
    
            
              <Carousel.Item>
                <Card.Body>
              
                <Row style = {centralizar}>
                    
                    <div style = {{marginLeft: "0%"}} >
                      <button className={this.state.pergunta10 === 1 ? "blackButton" : "whiteButton"} 
                                onClick={() => this.handleClick(19,4,1)}>
                                1
                      </button>
                    </div>
    
                    <div style = {{marginLeft: "2%"}} >
                      <button className={this.state.pergunta10 === 2 ? "blackButton" : "whiteButton"}
                              onClick={() => this.handleClick(20,4,2)}>
                                2
                      </button>
                    </div>
    
                    <div style = {{marginLeft: "2%"}} >
                      <button className={this.state.pergunta10 === 3 ? "blackButton" : "whiteButton"}
                              onClick={() => this.handleClick(21,4,3)}>
                                3
                      </button>
                    </div>
    
                    <div style = {{marginLeft: "2%"}} >
                      <button className={this.state.pergunta10 === 4 ? "blackButton" : "whiteButton"}
                              onClick={() => this.handleClick(22,4,4)}>
                                4
                      </button>
                    </div>
    
                    <div style = {{marginLeft: "2%"}} >
                      <button className={this.state.pergunta10 === 5 ? "blackButton" : "whiteButton"}
                              onClick={() => this.handleClick(23,4,5)}>
                                5
                      </button>
                    </div>
    
                    <div style = {{marginLeft: "2%"}} >
                      <button className={this.state.pergunta10 === 6 ? "blackButton" : "whiteButton"}
                              onClick={() => this.handleClick(24,4,6)}>
                                6
                      </button>
                    </div>
    
                </Row>
                <Row style = {centralizar2}>  
                <div style = {{marginLeft: "0%"}} >
                <p className="label question-option-label-left" data-attr="placeholder_start" style={{ textAlign: "left"}}>NEM POR ISSO</p>

                    </div>
    
                    <div style = {{marginLeft: "45%"}} >
                    <p className="label question-option-label-right" data-attr="placeholder_end" style={{ textAlign: "right"}}>PERFEITAMENTE</p>

                    </div>
                
                </Row> 
                   
            </Card.Body>
            </Carousel.Item>
            <Carousel.Item>
                <Card.Body>
              
                <Row style = {centralizar}>
                    
                    <div style = {{marginLeft: "0%"}} >
                      <button className={this.state.pergunta11 === 1 ? "blackButton" : "whiteButton"} 
                                onClick={() => this.handleClick(25,5,1)}>
                                1
                      </button>
                    </div>
    
                    <div style = {{marginLeft: "2%"}} >
                      <button className={this.state.pergunta11 === 2 ? "blackButton" : "whiteButton"}
                              onClick={() => this.handleClick(26,5,2)}>
                                2
                      </button>
                    </div>
    
                    <div style = {{marginLeft: "2%"}} >
                      <button className={this.state.pergunta11 === 3 ? "blackButton" : "whiteButton"}
                              onClick={() => this.handleClick(27,5,3)}>
                                3
                      </button>
                    </div>
    
                    <div style = {{marginLeft: "2%"}} >
                      <button className={this.state.pergunta11 === 4 ? "blackButton" : "whiteButton"}
                              onClick={() => this.handleClick(28,5,4)}>
                                4
                      </button>
                    </div>
    
                    <div style = {{marginLeft: "2%"}} >
                      <button className={this.state.pergunta11 === 5 ? "blackButton" : "whiteButton"}
                              onClick={() => this.handleClick(29,5,5)}>
                                5
                      </button>
                    </div>
    
                    <div style = {{marginLeft: "2%"}} >
                      <button className={this.state.pergunta11 === 6 ? "blackButton" : "whiteButton"}
                              onClick={() => this.handleClick(30,5,6)}>
                                6
                      </button>
                    </div>
    
                </Row>
                <Row style = {centralizar2}>  
                <div style = {{marginLeft: "0%"}} >
                <p className="label question-option-label-left" data-attr="placeholder_start" style={{ textAlign: "left"}}>NEM POR ISSO</p>

                    </div>
    
                    <div style = {{marginLeft: "45%"}} >
                    <p className="label question-option-label-right" data-attr="placeholder_end" style={{ textAlign: "right"}}>PERFEITAMENTE</p>

                    </div>
                
                </Row> 
                   
            </Card.Body>
            </Carousel.Item>
            <Carousel.Item>
                <Card.Body>
              
                <Row style = {centralizar}>
                    
                    <div style = {{marginLeft: "0%"}} >
                      <button className={this.state.pergunta12 === 1 ? "blackButton" : "whiteButton"} 
                                onClick={() => this.handleClick(31,6,1)}>
                                1
                      </button>
                    </div>
    
                    <div style = {{marginLeft: "2%"}} >
                      <button className={this.state.pergunta12 === 2 ? "blackButton" : "whiteButton"}
                              onClick={() => this.handleClick(32,6,2)}>
                                2
                      </button>
                    </div>
    
                    <div style = {{marginLeft: "2%"}} >
                      <button className={this.state.pergunta12 === 3 ? "blackButton" : "whiteButton"}
                              onClick={() => this.handleClick(33,6,3)}>
                                3
                      </button>
                    </div>
    
                    <div style = {{marginLeft: "2%"}} >
                      <button className={this.state.pergunta12 === 4 ? "blackButton" : "whiteButton"}
                              onClick={() => this.handleClick(34,6,4)}>
                                4
                      </button>
                    </div>
    
                    <div style = {{marginLeft: "2%"}} >
                      <button className={this.state.pergunta12 === 5 ? "blackButton" : "whiteButton"}
                              onClick={() => this.handleClick(35,6,5)}>
                                5
                      </button>
                    </div>
                    
    
                    <div style = {{marginLeft: "2%"}} >
                      <button className={this.state.pergunta12 === 6 ? "blackButton" : "whiteButton"}
                              onClick={() => this.handleClick(36,6,6)}>
                                6
                     
                      </button>
                    </div>
    
                </Row>
                <Row style = {centralizar2}>  
                <div style = {{marginLeft: "0%"}} >
                <p className="label question-option-label-left" data-attr="placeholder_start" style={{ textAlign: "left"}}>NEM POR ISSO</p>

                    </div>
    
                    <div style = {{marginLeft: "45%"}} >
                    <p className="label question-option-label-right" data-attr="placeholder_end" style={{ textAlign: "right"}}>PERFEITAMENTE</p>

                    </div>
                
                </Row> 
                   
            </Card.Body>
            </Carousel.Item>
            </Carousel>
          
      </Container>
      </div>
      
      :<div>loading...</div>
      );}
    }
export default perguntasProfessorPratica