import * as React from 'react';
import Home from './home';
import axios from 'axios'
import { ProgressBar} from 'react-bootstrap';
import '../App.css';
import { Button, Container, Card, Row, Carousel} from 'react-bootstrap';



class perguntasProfessorPratica extends React.Component {
    
      constructor(props) {
        super(props);
        this.state = {
          index: 0,
          index2: 0,
          direction: null,
          carouselItemCount: 6,
          childVisible: 1,
          count: 0,
          pergunta1: 0,
          pergunta2: 0,
          pergunta3: 0,
          pergunta4: 0,
          pergunta5: 0,
          pergunta6: 0,
          texto: "",
          disciplinas:[],
          perguntasGerais:[],
          ready:0,
          errormessage: '',
          id: props.match.params.id
        }
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
          this.props.history.push({
                pathname:`/final/${this.state.id}`,
                state: this.state
            })
        }
    
        if (index > max) {
          // at max, start from top
          index = 0
          index2 = 0
        }
    
        if (index < min) {
          // at min, start from max
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
    
      handleClick(valor, key, resposta){    
        console.log('Resposta da pergunta : ' + resposta);

        if(key === 1){
        this.setState({
          pergunta1: valor
        })
        }
        if(key === 2){
          this.setState({
            pergunta2: valor
          })
        }
        if(key === 3){
          this.setState({
            pergunta3: valor
          })

          }
        if(key === 4){
        this.setState({
            pergunta4: valor
        })
     
     }
        if(key === 5){
            this.setState({
                pergunta5: valor
            })
        }
        if(key === 6){
            this.setState({
              pergunta6: valor,
            })
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
                <ProgressBar animated now={50} />
                </ProgressBar>
            </div>
            <div style={{backgroundColor:'#008B8B'}} className="nm-custom-decoration" >
               <div style={{color: 'white',marginLeft: '120%', whiteSpace: 'nowrap',paddingTop:'160%'}}> {this.state.disciplinas.nome}
            </div>
            </div>
            
          <Container >
          <div className="container ">
            <div className="row" style={{ display: 'flex', justifyContent: 'center', marginTop: '14%'}}>
            <p style= {{color: 'white' ,fontSize: '20pt', marginTop: '-5%',textAlign: 'center'}}> 
                { this.state.perguntasGerais.find(pg=>pg.id===18).enunciado}
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
                  <p style= {{color: '#686571'}} className="questao">Questão 2/6 </p>
                    <h2>
                      <Button variant="white" className="carousel-control-prev-icon left carousel-control" style = {{marginLeft:"-120%", border: "none"}} onClick={() => this.toggleCarousel('prev', false)}></Button>
                    </h2> 
                    <h2>
                    <p  style= {{color: 'black', fontSize: '16pt', top: '50%', textAlign: 'center'}}> 
                            {this.state.perguntasGerais.find(pg=>pg.id===11).enunciado}
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
                            {this.state.perguntasGerais.find(pg=>pg.id===12).enunciado}
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
                            {this.state.perguntasGerais.find(pg=>pg.id===13).enunciado}
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
                            {this.state.perguntasGerais.find(pg=>pg.id===16).enunciado}
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
                            {this.state.perguntasGerais.find(pg=>pg.id===15).enunciado}
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
                      <button className={this.state.pergunta1 === 1 ? "blackButton" : "whiteButton"} 
                                onClick={() => this.handleClick(1,1,1)}>
                                1
                      </button>
                    </div>
    
                    <div style = {{marginLeft: "2%"}} >
                      <button className={this.state.pergunta1 === 2 ? "blackButton" : "whiteButton"}
                              onClick={() => this.handleClick(2,1,2)}>
                                2
                      </button>
                    </div>
    
                    <div style = {{marginLeft: "2%"}} >
                      <button className={this.state.pergunta1 === 3 ? "blackButton" : "whiteButton"}
                              onClick={() => this.handleClick(3,1,3)}>
                                3
                      </button>
                    </div>
    
                    <div style = {{marginLeft: "2%"}} >
                      <button className={this.state.pergunta1 === 4 ? "blackButton" : "whiteButton"}
                              onClick={() => this.handleClick(4,1,4)}>
                                4
                      </button>
                    </div>
    
                    <div style = {{marginLeft: "2%"}} >
                      <button className={this.state.pergunta1 === 5 ? "blackButton" : "whiteButton"}
                              onClick={() => this.handleClick(5,1,5)}>
                                5
                      </button>
                    </div>
    
                    <div style = {{marginLeft: "2%"}} >
                      <button className={this.state.pergunta1 === 6 ? "blackButton" : "whiteButton"}
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
                      <button className={this.state.pergunta2 === 7 ? "blackButton" : "whiteButton"} 
                                onClick={() => this.handleClick(7,2,1)}>
                                1
                      </button>
                    </div>
    
                    <div style = {{marginLeft: "2%"}} >
                      <button className={this.state.pergunta2 === 8 ? "blackButton" : "whiteButton"}
                              onClick={() => this.handleClick(8,2,2)}>
                                2
                      </button>
                    </div>
    
                    <div style = {{marginLeft: "2%"}} >
                      <button className={this.state.pergunta2 === 9 ? "blackButton" : "whiteButton"}
                              onClick={() => this.handleClick(9,2,3)}>
                                3
                      </button>
                    </div>
    
                    <div style = {{marginLeft: "2%"}} >
                      <button className={this.state.pergunta2 === 10 ? "blackButton" : "whiteButton"}
                              onClick={() => this.handleClick(10,2,4)}>
                                4
                      </button>
                    </div>
    
                    <div style = {{marginLeft: "2%"}} >
                      <button className={this.state.pergunta2 === 11 ? "blackButton" : "whiteButton"}
                              onClick={() => this.handleClick(11,2,5)}>
                                5
                      </button>
                    </div>
    
                    <div style = {{marginLeft: "2%"}} >
                      <button className={this.state.pergunta2 === 12 ? "blackButton" : "whiteButton"}
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
                      <button className={this.state.pergunta3 === 13 ? "blackButton" : "whiteButton"} 
                                onClick={() => this.handleClick(13,3,1)}>
                                1
                      </button>
                    </div>
    
                    <div style = {{marginLeft: "2%"}} >
                      <button className={this.state.pergunta3 === 14 ? "blackButton" : "whiteButton"}
                              onClick={() => this.handleClick(14,3,2)}>
                                2
                      </button>
                    </div>
    
                    <div style = {{marginLeft: "2%"}} >
                      <button className={this.state.pergunta3 === 15 ? "blackButton" : "whiteButton"}
                              onClick={() => this.handleClick(15,3,3)}>
                                3
                      </button>
                    </div>
    
                    <div style = {{marginLeft: "2%"}} >
                      <button className={this.state.pergunta3 === 16 ? "blackButton" : "whiteButton"}
                              onClick={() => this.handleClick(16,3,4)}>
                                4
                      </button>
                    </div>
    
                    <div style = {{marginLeft: "2%"}} >
                      <button className={this.state.pergunta3 === 17 ? "blackButton" : "whiteButton"}
                              onClick={() => this.handleClick(17,3,5)}>
                                5
                      </button>
                    </div>
    
                    <div style = {{marginLeft: "2%"}} >
                      <button className={this.state.pergunta3 === 18 ? "blackButton" : "whiteButton"}
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
                      <button className={this.state.pergunta4 === 19 ? "blackButton" : "whiteButton"} 
                                onClick={() => this.handleClick(19,4,1)}>
                                1
                      </button>
                    </div>
    
                    <div style = {{marginLeft: "2%"}} >
                      <button className={this.state.pergunta4 === 20 ? "blackButton" : "whiteButton"}
                              onClick={() => this.handleClick(20,4,2)}>
                                2
                      </button>
                    </div>
    
                    <div style = {{marginLeft: "2%"}} >
                      <button className={this.state.pergunta4 === 21 ? "blackButton" : "whiteButton"}
                              onClick={() => this.handleClick(21,4,3)}>
                                3
                      </button>
                    </div>
    
                    <div style = {{marginLeft: "2%"}} >
                      <button className={this.state.pergunta4 === 22 ? "blackButton" : "whiteButton"}
                              onClick={() => this.handleClick(22,4,4)}>
                                4
                      </button>
                    </div>
    
                    <div style = {{marginLeft: "2%"}} >
                      <button className={this.state.pergunta4 === 23 ? "blackButton" : "whiteButton"}
                              onClick={() => this.handleClick(23,4,5)}>
                                5
                      </button>
                    </div>
    
                    <div style = {{marginLeft: "2%"}} >
                      <button className={this.state.pergunta4 === 24 ? "blackButton" : "whiteButton"}
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
                      <button className={this.state.pergunta5 === 25 ? "blackButton" : "whiteButton"} 
                                onClick={() => this.handleClick(25,5,1)}>
                                1
                      </button>
                    </div>
    
                    <div style = {{marginLeft: "2%"}} >
                      <button className={this.state.pergunta5 === 26 ? "blackButton" : "whiteButton"}
                              onClick={() => this.handleClick(26,5,2)}>
                                2
                      </button>
                    </div>
    
                    <div style = {{marginLeft: "2%"}} >
                      <button className={this.state.pergunta5 === 27 ? "blackButton" : "whiteButton"}
                              onClick={() => this.handleClick(27,5,3)}>
                                3
                      </button>
                    </div>
    
                    <div style = {{marginLeft: "2%"}} >
                      <button className={this.state.pergunta5 === 28 ? "blackButton" : "whiteButton"}
                              onClick={() => this.handleClick(28,5,4)}>
                                4
                      </button>
                    </div>
    
                    <div style = {{marginLeft: "2%"}} >
                      <button className={this.state.pergunta5 === 29 ? "blackButton" : "whiteButton"}
                              onClick={() => this.handleClick(29,5,5)}>
                                5
                      </button>
                    </div>
    
                    <div style = {{marginLeft: "2%"}} >
                      <button className={this.state.pergunta5 === 30 ? "blackButton" : "whiteButton"}
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
                      <button className={this.state.pergunta6 === 31 ? "blackButton" : "whiteButton"} 
                                onClick={() => this.handleClick(31,6,1)}>
                                1
                      </button>
                    </div>
    
                    <div style = {{marginLeft: "2%"}} >
                      <button className={this.state.pergunta6 === 32 ? "blackButton" : "whiteButton"}
                              onClick={() => this.handleClick(32,6,2)}>
                                2
                      </button>
                    </div>
    
                    <div style = {{marginLeft: "2%"}} >
                      <button className={this.state.pergunta6 === 33 ? "blackButton" : "whiteButton"}
                              onClick={() => this.handleClick(33,6,3)}>
                                3
                      </button>
                    </div>
    
                    <div style = {{marginLeft: "2%"}} >
                      <button className={this.state.pergunta6 === 34 ? "blackButton" : "whiteButton"}
                              onClick={() => this.handleClick(34,6,4)}>
                                4
                      </button>
                    </div>
    
                    <div style = {{marginLeft: "2%"}} >
                      <button className={this.state.pergunta6 === 35 ? "blackButton" : "whiteButton"}
                              onClick={() => this.handleClick(35,6,5)}>
                                5
                      </button>
                    </div>
    
                    <div style = {{marginLeft: "2%"}} >
                      <button className={this.state.pergunta6 === 36 ? "blackButton" : "whiteButton"}
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