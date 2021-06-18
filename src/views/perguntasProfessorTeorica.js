import * as React from 'react';
import API from '../main/api'
import { ProgressBar } from 'react-bootstrap';
import '../App.css';
import { Button, Container, Card, Row, Carousel } from 'react-bootstrap';
import blueBg from '../images/blue-bg.png'


class perguntasProfessorTeorica extends React.Component {

  constructor(props) {
    super(props);
    this.state = props.location.state;
    this.state.teacher = props.location.teacher;
    this.state.index = 0;
    this.state.index2 = 0;
    this.state.direction = null;
    this.state.carouselItemCount = 6;
    this.state.childVisible = 1;
    this.state.count = 0;
    this.state.pergunta1 = 0;
    this.state.pergunta2 = 0;
    this.state.pergunta3 = 0;
    this.state.pergunta4 = 0;
    this.state.pergunta5 = 0;
    this.state.pergunta6 = 0;
    this.state.texto = "";
    this.state.texto_perguntasProfTeorica = "";
    this.state.disciplinas = [];
    this.state.perguntasGerais = [];
    this.state.ready = 0;
    this.state.id = props.match.params.id
    this.state = props.location.state;
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

    if (valida === true) {
      count++
    }

    if (count >= 6 && index2 === 6) {
    
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
        this.setState({ disciplinas, perguntasGerais, ready: 1 });
        window.onbeforeunload = function () { return "Your work will be lost."; };
        window.history.pushState(null, "", window.location.href);
        window.onpopstate = function () {
          window.history.pushState(null, "", window.location.href);
        }

      })

  }

  async enviaDados() {
    var listaPerguntas = [7, 8, 9, 10, 11, 12];
    var perguntasFiltradas = this.state.perguntasGerais.filter(x => listaPerguntas.includes(x.id));
    for (let i = 0; i < perguntasFiltradas.length; i++) {
      var contador = i + 1;
      const idPergunta = perguntasFiltradas[i].id;
      const resposta = this.state["pergunta" + contador];
      var listaProfessoresTeorico = this.state.disciplinas.professores.filter(x=> x.teorico)
          if(listaProfessoresTeorico.length===1){
              this.state.teacher = listaProfessoresTeorico[0].professor.nome
              this.state.teacherId= listaProfessoresTeorico[0].professor.id_lusofona
         }else{
          this.state.teacherId = this.state.selectedId
        }

      await API.post('resposta/submit', {
        "disciplinaId": this.state.disciplinas.id,
        "perguntaId": idPergunta,
        "professorId": this.state.teacherId,
        "conteudo": resposta,
        "session": this.state.token,

      });
    }
    var listaProfessoresPratica = this.state.disciplinas.professores.filter(x => x.pratico)
    if (listaProfessoresPratica.length === 1) {
      this.props.history.push({
        pathname: `/perguntasProfessorPratica/${this.state.id}`,
        state: this.state,
        professor:(listaProfessoresPratica[0].professor.nome)    

      })
    } else if(listaProfessoresPratica.length>1){
      this.props.history.push({
          pathname: `/professorPratica/${this.state.id}`,
          state: this.state,
      })
    }else {
      this.props.history.push({
        pathname: `/perguntasProfessorPratica/${this.state.id}`,
        teacher: listaProfessoresPratica[0].professor.id_lusofona,
        state: this.state
      })
    }
  }

  handleClick(valor, key, resposta) {

    if (key === 1) {
      this.setState({
        pergunta1: resposta
      })
    }
    if (key === 2) {
      this.setState({
        pergunta2: resposta
      })
    }
    if (key === 3) {
      this.setState({
        pergunta3: resposta
      })

    }
    if (key === 4) {
      this.setState({
        pergunta4: resposta
      })

    }
    if (key === 5) {
      this.setState({
        pergunta5: resposta
      })
    }
    if (key === 6) {
      this.setState({
        pergunta6: resposta
      })

    }

    this.toggleCarousel('next', true);
  };



  render() {

    const centralizar = {
      justifyContent: "center",
      alignItems: "center",
      marginTop: '10%',
      marginBottom: '8%',


    };
    const centralizar2 = {
      justifyContent: "center",
      alignItems: "center",
    };

    return (this.state.ready ?
      <div>
        <div>
          <ProgressBar style={{ marginTop: "0px" }}>
            <ProgressBar animated now={75} />
          </ProgressBar>
        </div>
        <div style={{ backgroundColor: '#3960BA' }} className="nm-custom-decoration" >
          <div style={{ color: 'white', marginLeft: '120%', whiteSpace: 'nowrap', paddingTop: '160%' }}> {this.state.disciplinas.nome}
          </div>
        </div>

        <Container >
          <div className="container ">
            <div className="row" style={{ display: 'flex', justifyContent: 'center', marginTop: '11%' }}>
              <p style={{ color: 'white', fontSize: '18pt', marginTop: '-5%', textAlign: 'center' }}>
                {this.state.perguntasGerais.find(pg => pg.id === 6).enunciado}
                <p style={{ fontSize: '9pt', top: '50%' }}>
                  Estas questões são referentes ao professor <strong style={{ color: '#3960BA' }}> {this.props.location.professor}</strong>
                </p>
              </p>

            </div>
          </div>
          <Carousel className="carousel1" id="quote-carousel" interval={null} indicators={false} controls={false} activeIndex={this.state.index2} direction={this.state.direction}>
            <Carousel.Item>
              <img src={blueBg} height="130px" width="100%" />
              <Carousel.Caption>

                <p  className="questao">Questão 1/6 </p>
                <h2>
                  <Button variant="white" className="carousel-control-prev-icon left carousel-control" style={{ marginLeft: "-120%", border: "none" }} onClick={() => this.toggleCarousel('prev', false)}></Button>
                </h2>
                <h2>
                  <p style={{ color: 'black', fontSize: '13pt', top: '50%', textAlign: 'center' }}>
                    {this.state.perguntasGerais.find(pg => pg.id === 7).enunciado}
                  </p>
                </h2>
                <h2>
                  <Button variant="white" className="carousel-control-next-icon right carousel-control" style={{ marginLeft: "105%", border: "none" }} onClick={() => this.toggleCarousel('next', false)}></Button>
                </h2>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img src={blueBg} height="130px" width=" 100%" />
              <Carousel.Caption>
                <p  className="questao">Questão 2/6 </p>
                <h2>
                  <Button variant="white" className="carousel-control-prev-icon left carousel-control" style={{ marginLeft: "-120%", border: "none" }} onClick={() => this.toggleCarousel('prev', false)}></Button>
                </h2>
                <h2>
                  <p style={{ color: 'black', fontSize: '13pt', top: '50%', textAlign: 'center' }}>
                    {this.state.perguntasGerais.find(pg => pg.id === 8).enunciado}
                  </p>
                </h2>
                <h2>
                  <Button variant="white" className="carousel-control-next-icon right carousel-control" style={{ marginLeft: "105%", border: "none" }} onClick={() => this.toggleCarousel('next', false)}></Button>
                </h2>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img src={blueBg} height="130px" width=" 100%" />
              <Carousel.Caption>
                <p  className="questao">Questão 3/6 </p>
                <h2>
                  <Button variant="white" className="carousel-control-prev-icon left carousel-control" style={{ marginLeft: "-120%", border: "none" }} onClick={() => this.toggleCarousel('prev', false)}></Button>
                </h2>
                <h2>
                  <p style={{ color: 'black', fontSize: '13pt', top: '50%', textAlign: 'center' }}>
                    {this.state.perguntasGerais.find(pg => pg.id === 9).enunciado}
                  </p>
                </h2>
                <h2>
                  <Button variant="white" className="carousel-control-next-icon right carousel-control" style={{ marginLeft: "105%", border: "none" }} onClick={() => this.toggleCarousel('next', false)}></Button>
                </h2>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img src={blueBg} height="130px" width=" 100%" />
              <Carousel.Caption>
                <p className="questao">Questão 4/6 </p>
                <h2>
                  <Button variant="white" className="carousel-control-prev-icon left carousel-control" style={{ marginLeft: "-120%", border: "none" }} onClick={() => this.toggleCarousel('prev', false)}></Button>
                </h2>
                <h2>
                  <p style={{ color: 'black', fontSize: '13pt', top: '50%', textAlign: 'center' }}>
                    {this.state.perguntasGerais.find(pg => pg.id === 10).enunciado}
                  </p>
                </h2>
                <h2>
                  <Button variant="white" className="carousel-control-next-icon right carousel-control" style={{ marginLeft: "105%", border: "none" }} onClick={() => this.toggleCarousel('next', false)}></Button>
                </h2>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img src={blueBg} height="130px" height="130px" width=" 100%" />
              <Carousel.Caption>
                <p className="questao">Questão 5/6 </p>
                <h2>
                  <Button variant="white" className="carousel-control-prev-icon left carousel-control" style={{ marginLeft: "-120%", border: "none" }} onClick={() => this.toggleCarousel('prev', false)}></Button>
                </h2>
                <h2>
                  <p style={{ color: 'black', fontSize: '12pt', top: '50%', textAlign: 'center' }}>
                    {this.state.perguntasGerais.find(pg => pg.id === 11).enunciado}
                  </p>
                </h2>
                <h2>
                  <Button variant="white" className="carousel-control-next-icon right carousel-control" style={{ marginLeft: "105%", border: "none" }} onClick={() => this.toggleCarousel('next', false)}></Button>
                </h2>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img src={blueBg} height="130px" width=" 100%" />
              <Carousel.Caption>
                <p className="questao">Questão 6/6 </p>
                <h2>
                  <Button variant="white" className="carousel-control-prev-icon left carousel-control" style={{ marginLeft: "-120%", border: "none" }} onClick={() => this.toggleCarousel('prev', false)}></Button>
                </h2>
                <h2>
                  <p style={{ color: 'black', fontSize: '13pt', top: '50%', textAlign: 'center' }}>
                    {this.state.perguntasGerais.find(pg => pg.id === 12).enunciado}
                  </p>
                </h2>
                <h2>
                  <Button variant="white" className="carousel-control-next-icon right carousel-control" style={{ marginLeft: "105%", border: "none" }} onClick={() => this.toggleCarousel('next', false)}></Button>
                </h2>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>

          <Carousel className="carousel2" style={{ marginTop: "2%", marginBottom: "5%" }} id="quote-carousel" interval={null} indicators={false} controls={false} activeIndex={this.state.index} direction={this.state.direction}>
            <Carousel.Item>
              <Card.Body>

                <Row style={centralizar}>

                  <div style={{ marginLeft: "0%" }} >
                    <button className={this.state.pergunta1 === 1 ? "blackButton" : "whiteButton"}
                      onClick={() => this.handleClick(1, 1, 1)}>
                      1
                      </button>
                  </div>

                  <div style={{ marginLeft: "2%" }} >
                    <button className={this.state.pergunta1 === 2 ? "blackButton" : "whiteButton"}
                      onClick={() => this.handleClick(2, 1, 2)}>
                      2
                      </button>
                  </div>

                  <div style={{ marginLeft: "2%" }} >
                    <button className={this.state.pergunta1 === 3 ? "blackButton" : "whiteButton"}
                      onClick={() => this.handleClick(3, 1, 3)}>
                      3
                      </button>
                  </div>

                  <div style={{ marginLeft: "2%" }} >
                    <button className={this.state.pergunta1 === 4 ? "blackButton" : "whiteButton"}
                      onClick={() => this.handleClick(4, 1, 4)}>
                      4
                      </button>
                  </div>

                  <div style={{ marginLeft: "2%" }} >
                    <button className={this.state.pergunta1 === 5 ? "blackButton" : "whiteButton"}
                      onClick={() => this.handleClick(5, 1, 5)}>
                      5
                      </button>
                  </div>

                  <div style={{ marginLeft: "2%" }} >
                    <button className={this.state.pergunta1 === 6 ? "blackButton" : "whiteButton"}
                      onClick={() => this.handleClick(6, 1, 6)}>
                      6
                      </button>
                  </div>

                </Row>
                <Row style={centralizar2}>
                  <div style={{ marginLeft: "0%", fontSize:"8" }} >
                    <p className="label question-option-label-left" data-attr="placeholder_start" >NEM POR ISSO</p>

                  </div>

                  <div style={{ marginLeft: "17%", fontSize:"8"  }} >
                    <p className="label question-option-label-right" data-attr="placeholder_end">PERFEITAMENTE</p>

                  </div>

                </Row>

              </Card.Body>
            </Carousel.Item>
            <Carousel.Item>
              <Card.Body>

                <Row style={centralizar}>

                  <div style={{ marginLeft: "0%" }} >
                    <button className={this.state.pergunta2 === 1 ? "blackButton" : "whiteButton"}
                      onClick={() => this.handleClick(7, 2, 1)}>
                      1
                      </button>
                  </div>

                  <div style={{ marginLeft: "2%" }} >
                    <button className={this.state.pergunta2 === 2 ? "blackButton" : "whiteButton"}
                      onClick={() => this.handleClick(8, 2, 2)}>
                      2
                      </button>
                  </div>

                  <div style={{ marginLeft: "2%" }} >
                    <button className={this.state.pergunta2 === 3 ? "blackButton" : "whiteButton"}
                      onClick={() => this.handleClick(9, 2, 3)}>
                      3
                      </button>
                  </div>

                  <div style={{ marginLeft: "2%" }} >
                    <button className={this.state.pergunta2 === 4 ? "blackButton" : "whiteButton"}
                      onClick={() => this.handleClick(10, 2, 4)}>
                      4
                      </button>
                  </div>

                  <div style={{ marginLeft: "2%" }} >
                    <button className={this.state.pergunta2 === 5 ? "blackButton" : "whiteButton"}
                      onClick={() => this.handleClick(11, 2, 5)}>
                      5
                      </button>
                  </div>

                  <div style={{ marginLeft: "2%" }} >
                    <button className={this.state.pergunta2 === 6 ? "blackButton" : "whiteButton"}
                      onClick={() => this.handleClick(12, 2, 6)}>
                      6
                      </button>
                  </div>

                </Row>
                <Row style={centralizar2}>
                  <div style={{ marginLeft: "0%", fontSize:"8"  }}>
                    <p className="label question-option-label-left" data-attr="placeholder_start">NEM POR ISSO</p>

                  </div >

                  <div style={{ marginLeft: "17%", fontSize:"8"  }} >
                    <p className="label question-option-label-right" data-attr="placeholder_end" >PERFEITAMENTE</p>

                  </div>

                </Row>

              </Card.Body>
            </Carousel.Item>
            <Carousel.Item>
              <Card.Body>

                <Row style={centralizar}>

                  <div style={{ marginLeft: "0%" }} >
                    <button className={this.state.pergunta3 === 1 ? "blackButton" : "whiteButton"}
                      onClick={() => this.handleClick(13, 3, 1)}>
                      1
                      </button>
                  </div>

                  <div style={{ marginLeft: "2%" }} >
                    <button className={this.state.pergunta3 === 2 ? "blackButton" : "whiteButton"}
                      onClick={() => this.handleClick(14, 3, 2)}>
                      2
                      </button>
                  </div>

                  <div style={{ marginLeft: "2%" }} >
                    <button className={this.state.pergunta3 === 3 ? "blackButton" : "whiteButton"}
                      onClick={() => this.handleClick(15, 3, 3)}>
                      3
                      </button>
                  </div>

                  <div style={{ marginLeft: "2%" }} >
                    <button className={this.state.pergunta3 === 4 ? "blackButton" : "whiteButton"}
                      onClick={() => this.handleClick(16, 3, 4)}>
                      4
                      </button>
                  </div>

                  <div style={{ marginLeft: "2%" }} >
                    <button className={this.state.pergunta3 === 5 ? "blackButton" : "whiteButton"}
                      onClick={() => this.handleClick(17, 3, 5)}>
                      5
                      </button>
                  </div>

                  <div style={{ marginLeft: "2%" }} >
                    <button className={this.state.pergunta3 === 6 ? "blackButton" : "whiteButton"}
                      onClick={() => this.handleClick(18, 3, 6)}>
                      6
                      </button>
                  </div>

                </Row>
                <Row style={centralizar2}>
                  <div style={{ marginLeft: "0%", fontSize: "8" }} >
                    <p className="label question-option-label-left" data-attr="placeholder_start" style={{ textAlign: "left" }}>NEM POR ISSO</p>

                  </div>

                  <div style={{ marginLeft: "17%", fontSize: "8" }} >
                    <p className="label question-option-label-right" data-attr="placeholder_end" style={{ textAlign: "right" }}>PERFEITAMENTE</p>

                  </div>

                </Row>

              </Card.Body>
            </Carousel.Item>


            <Carousel.Item>
              <Card.Body>

                <Row style={centralizar}>

                  <div style={{ marginLeft: "0%" }} >
                    <button className={this.state.pergunta4 === 1 ? "blackButton" : "whiteButton"}
                      onClick={() => this.handleClick(19, 4, 1)}>
                      1
                      </button>
                  </div>

                  <div style={{ marginLeft: "2%" }} >
                    <button className={this.state.pergunta4 === 2 ? "blackButton" : "whiteButton"}
                      onClick={() => this.handleClick(20, 4, 2)}>
                      2
                      </button>
                  </div>

                  <div style={{ marginLeft: "2%" }} >
                    <button className={this.state.pergunta4 === 3 ? "blackButton" : "whiteButton"}
                      onClick={() => this.handleClick(21, 4, 3)}>
                      3
                      </button>
                  </div>

                  <div style={{ marginLeft: "2%" }} >
                    <button className={this.state.pergunta4 === 4 ? "blackButton" : "whiteButton"}
                      onClick={() => this.handleClick(22, 4, 4)}>
                      4
                      </button>
                  </div>

                  <div style={{ marginLeft: "2%" }} >
                    <button className={this.state.pergunta4 === 5 ? "blackButton" : "whiteButton"}
                      onClick={() => this.handleClick(23, 4, 5)}>
                      5
                      </button>
                  </div>

                  <div style={{ marginLeft: "2%" }} >
                    <button className={this.state.pergunta4 === 6 ? "blackButton" : "whiteButton"}
                      onClick={() => this.handleClick(24, 4, 6)}>
                      6
                      </button>
                  </div>

                </Row>
                <Row style={centralizar2}>
                  <div style={{ marginLeft: "0%", fontSize: "8" }} >
                    <p className="label question-option-label-left" data-attr="placeholder_start" style={{ textAlign: "left" }}>NEM POR ISSO</p>

                  </div>

                  <div style={{ marginLeft: "17%", fontSize: "8" }} >
                    <p className="label question-option-label-right" data-attr="placeholder_end" style={{ textAlign: "right" }}>PERFEITAMENTE</p>

                  </div>

                </Row>

              </Card.Body>
            </Carousel.Item>
            <Carousel.Item>
              <Card.Body>

                <Row style={centralizar}>

                  <div style={{ marginLeft: "0%" }} >
                    <button className={this.state.pergunta5 === 1 ? "blackButton" : "whiteButton"}
                      onClick={() => this.handleClick(25, 5, 1)}>
                      1
                      </button>
                  </div>

                  <div style={{ marginLeft: "2%" }} >
                    <button className={this.state.pergunta5 === 2 ? "blackButton" : "whiteButton"}
                      onClick={() => this.handleClick(26, 5, 2)}>
                      2
                      </button>
                  </div>

                  <div style={{ marginLeft: "2%" }} >
                    <button className={this.state.pergunta5 === 3 ? "blackButton" : "whiteButton"}
                      onClick={() => this.handleClick(27, 5, 3)}>
                      3
                      </button>
                  </div>

                  <div style={{ marginLeft: "2%" }} >
                    <button className={this.state.pergunta5 === 4 ? "blackButton" : "whiteButton"}
                      onClick={() => this.handleClick(28, 5, 4)}>
                      4
                      </button>
                  </div>

                  <div style={{ marginLeft: "2%" }} >
                    <button className={this.state.pergunta5 === 5 ? "blackButton" : "whiteButton"}
                      onClick={() => this.handleClick(29, 5, 5)}>
                      5
                      </button>
                  </div>

                  <div style={{ marginLeft: "2%" }} >
                    <button className={this.state.pergunta5 === 6 ? "blackButton" : "whiteButton"}
                      onClick={() => this.handleClick(30, 5, 6)}>
                      6
                      </button>
                  </div>

                </Row>
                <Row style={centralizar2}>
                  <div style={{ marginLeft: "0%", fontSize: "8" }} >
                    <p className="label question-option-label-left" data-attr="placeholder_start" style={{ textAlign: "left" }}>NEM POR ISSO</p>

                  </div>

                  <div style={{ marginLeft: "17%", fontSize: "8" }} >
                    <p className="label question-option-label-right" data-attr="placeholder_end" style={{ textAlign: "right" }}>PERFEITAMENTE</p>

                  </div>

                </Row>

              </Card.Body>
            </Carousel.Item>
            <Carousel.Item>
              <Card.Body>

                <Row style={centralizar}>

                  <div style={{ marginLeft: "0%" }} >
                    <button className={this.state.pergunta6 === 1 ? "blackButton" : "whiteButton"}
                      onClick={() => this.handleClick(31, 6, 1)}>
                      1
                      </button>
                  </div>

                  <div style={{ marginLeft: "2%" }} >
                    <button className={this.state.pergunta6 === 2 ? "blackButton" : "whiteButton"}
                      onClick={() => this.handleClick(32, 6, 2)}>
                      2
                      </button>
                  </div>

                  <div style={{ marginLeft: "2%" }} >
                    <button className={this.state.pergunta6 === 3 ? "blackButton" : "whiteButton"}
                      onClick={() => this.handleClick(33, 6, 3)}>
                      3
                      </button>
                  </div>

                  <div style={{ marginLeft: "2%" }} >
                    <button className={this.state.pergunta6 === 4 ? "blackButton" : "whiteButton"}
                      onClick={() => this.handleClick(34, 6, 4)}>
                      4
                      </button>
                  </div>

                  <div style={{ marginLeft: "2%" }} >
                    <button className={this.state.pergunta6 === 5 ? "blackButton" : "whiteButton"}
                      onClick={() => this.handleClick(35, 6, 5)}>
                      5
                      </button>
                  </div>

                  <div style={{ marginLeft: "2%" }} >
                    <button className={this.state.pergunta6 === 6 ? "blackButton" : "whiteButton"}
                      onClick={() => this.handleClick(36, 6, 6)}>
                      6
                      </button>
                  </div>

                </Row>
                <Row style={centralizar2}>
                  <div style={{ marginLeft: "0%", fontSize: "8" }} >
                    <p className="label question-option-label-left" data-attr="placeholder_start" style={{ textAlign: "left" }}>NEM POR ISSO</p>

                  </div>

                  <div style={{ marginLeft: "17%", fontSize: "8" }} >
                    <p className="label question-option-label-right" data-attr="placeholder_end" style={{ textAlign: "right" }}>PERFEITAMENTE</p>

                  </div>

                </Row>

              </Card.Body>
            </Carousel.Item>
          </Carousel>

        </Container>
      </div>

      : <div>Verifique o endereço...</div>
    );
  }
}
export default perguntasProfessorTeorica