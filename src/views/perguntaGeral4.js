import * as React from 'react';
import Home from './home';
import { ProgressBar } from 'react-bootstrap';
import API from "../main/api";

class PerguntaGeral4 extends Home {
    constructor(props) {
        super(props);
        this.state = props.location.state3;
        this.state.texto = "";
        this.state.texto_pergunta4 = "";
        this.state.disciplinas = [];
        this.state.perguntasGerais = [];
        this.state.errormessage = '';
        this.state.ready = 0;
        this.state.id = props.match.params.id
        console.log(props.match.params.id)
        console.log(this.props) 
    }
    async proximaPagina4() {
        this.setState({ respostas: [...this.state.texto_pergunta4] })
        var listaProfessoresTeorico = this.state.disciplinas.professores.filter(x => x.teorico)
        if (listaProfessoresTeorico.length === 1) {
            this.state.teacher = listaProfessoresTeorico[0].professor.nome
            this.state.teacherId = listaProfessoresTeorico[0].professor.id_lusofona

        }

        await API.post('resposta/submit', {
            "disciplinaId": this.state.disciplinas.id,
            "perguntaId": this.state.perguntasGerais[5].id,
            "professorId": this.state.teacherId,
            "conteudo": this.state.texto_pergunta4,
            "session": this.state.token,

        }).then(res => {
            this.props.match.params.estado = this.state
            if (this.state.disciplinas.perguntaEspecifica.length > 0) {
                this.props.history.push({
                    pathname: `/paginaEspecifica/${this.state.id}`,
                    state: this.state
                })
            } else {
                var listaProfessoresTeorico = this.state.disciplinas.professores.filter(x => x.teorico)

                if (listaProfessoresTeorico.length === 1) {
                    this.props.history.push({
                        pathname: `/perguntasProfessorTeorica/${this.state.id}`,
                        state: this.state,
                        professor: (listaProfessoresTeorico[0].professor.nome)
                    })
                } else if (listaProfessoresTeorico.length > 1) {
                    this.props.history.push({
                        pathname: `/professorTeorica/${this.state.id}`,
                        state: this.state,
                    })
                }
                else {
                    this.props.history.push({
                        pathname: `/perguntasProfessorTeorica/${this.state.id}`,
                        state: this.state
                    })
                }
            }
        });

    };
    handleClick(valor) {
        this.setState({ texto_pergunta4: this.state.texto_pergunta4 = valor })
        this.proximaPagina4();
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
    render() {
        return (this.state.ready ?
            <div>
                <div>
                    <ProgressBar style={{ marginTop: "0px" }}>
                        <ProgressBar animated now={60} />
                    </ProgressBar>
                </div>
                <div style={{ backgroundColor: '#FFD700' }} className="nm-custom-decoration" >
                    <div style={{ color: 'white', marginLeft: '120%', whiteSpace: 'nowrap', paddingTop: '160%' }}> {this.state.disciplinas.nome}
                    </div>
                </div>
                <div className="container ">
                    <div className="row" style={{ display: 'flex', justifyContent: 'center' }}>
                        <div className="col-md-6" style={{ justifyContent: 'center', position: 'absolute', color: 'white', top: '18%', textAlign: 'center' }}>
                            <p style={{ fontSize: '18pt', top: '50%' }}>
                                {this.state.perguntasGerais.find(pg => pg.id === 4).enunciado}
                            </p>

                            <p style={{ fontSize: '12pt', verticalAlign: 'middle' }}>{this.state.perguntasGerais.find(pg => pg.id === 16).enunciado}</p>
                            <div className="form-group">
                                <button onClick={() => this.handleClick("Nenhuma Ligação")} style={{ padding: '13pt', fontSize: '18pt', fontWeight: '500', borderWidth: '5px', width: '100%' }} type="button" className="btn btn-primary btn-lg">Nenhuma ligação</button>
                                <button onClick={() => this.handleClick("Pouca ligação")} style={{ marginTop: '1%', padding: '13pt', fontSize: '18pt', fontWeight: '500', borderWidth: '5px', width: '100%' }} type="button" className="btn btn-primary btn-lg">Pouca ligação</button>
                                <button onClick={() => this.handleClick("Muita ligação")} style={{ marginTop: '1%', padding: '13pt', fontSize: '18pt', fontWeight: '500', borderWidth: '5px', width: '100%' }} type="button" className="btn btn-primary btn-lg">Muita ligação</button>
                                <button onClick={() => this.handleClick("Não faz sentido nessa disciplina")} style={{ marginTop: '1%', padding: '13pt', fontSize: '18pt', fontWeight: '500', borderWidth: '5px', width: '100%' }} type="button" className="btn btn-primary btn-lg">Não faz sentido nessa disciplina</button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            : <div>loading...</div>
        )
    }

}
export default PerguntaGeral4