import * as React from 'react'
import axios from 'axios'
import '../App.css'
import { Row, Col, Image, Container } from 'react-bootstrap';
import { ProgressBar } from 'react-bootstrap';
import { para_proxima } from '../views/EscolheCurso'

class PerguntaGeral1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            respostaPergunta1: "",
            disciplinas: [],
            perguntasGerais: [],
            ready: 0,
            id: props.match.params.id
        };
    }
    setRespostaPergunta1(valor) {
        this.setState({
            respostaPergunta4: this.state.respostaPergunta1 = valor,
        })
    }

    async componentDidMount() {
        await axios.get(`http://localhost:8080/disciplina/exportacao?disciplina=${this.state.id}`)
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

    handleClick(valor) {
        this.setRespostaPergunta1(valor);
        this.setState({ respostas: [...this.state.respostaPergunta1] })
        para_proxima(1, this.state, this.props, `perguntaGeral2`, `respostaPergunta1`);
    }
    render() {
        return (this.state.ready ?
            <div>
                <div>
                    <ProgressBar style={{ marginTop: "0px" }}>
                        <ProgressBar animated now={30} />
                    </ProgressBar>
                </div>
                <div style={{ backgroundColor: '#4B0082' }} className="nm-custom-decoration" >
                    <div style={{ color: 'white', marginLeft: '120%', whiteSpace: 'nowrap', paddingTop: '160%' }}> {this.state.disciplinas.nome}
                    </div>
                </div>

                <div className="container ">
                    <div className="row" style={{ display: 'flex', justifyContent: 'center' }}>
                        <div className="col-md-6" style={{ justifyContent: 'center', position: 'absolute', color: 'white', top: '25%', textAlign: 'center' }}>
                            <p style={{ fontSize: '28pt', top: '50%' }}>
                                {this.state.perguntasGerais.find(pg => pg.id === 1).enunciado}
                            </p>
                            <Container>
                                <Row style={{ cursor: 'pointer', display: "flex", justifyContent: "center", alignItems: "center", marginTop: "10%", marginBottom: "10px" }}>

                                    <Col style={{ marginRight: '1.2%' }}>
                                        <Image onClick={() => this.handleClick("Muito mal")} src="https://api.responster.com/engine/32/0.png " alt=" 1" width="130%" />
                                    </Col>
                                    <Col style={{ marginRight: '1.2%' }}>
                                        <Image onClick={() => this.handleClick("Mal")} src="https://api.responster.com/engine/32/1.png " alt=" 2" width="130%" />
                                    </Col>
                                    <Col style={{ marginRight: '1.2%' }}>
                                        <Image onClick={() => this.handleClick("Razoavel")} src="https://api.responster.com/engine/32/2.png " alt=" 3" width="130%" />
                                    </Col>
                                    <Col style={{ marginRight: '1.2%' }}>
                                        <Image onClick={() => this.handleClick("Bem")} src="https://api.responster.com/engine/32/3.png " alt="4" width="130%" />
                                    </Col>
                                    <Col style={{ marginRight: '1.2%' }}>
                                        <Image onClick={() => this.handleClick("Muito bem")} src="https://api.responster.com/engine/32/4.png " alt="5" width="130%" />
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </div>
                </div>
            </div>
            : <div>loading...</div>
        )
    }
}
export default PerguntaGeral1
