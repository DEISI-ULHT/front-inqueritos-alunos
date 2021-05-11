import * as React from 'react';
import axios from 'axios'
import { ProgressBar } from 'react-bootstrap';

class PerguntaGeral3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.location.state2;
    this.state.texto = "";
    this.state.texto_pergunta3 = "";
    this.state.disciplinas = [];
    this.state.perguntasGerais = [];
    this.state.errormessage = '';
    this.state.ready = 0;
    this.state.id = props.match.params.id
  }
  async proximaPagina3() {
    this.setState({ respostas: [...this.state.texto_pergunta3] })
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "disciplinaId": this.state.disciplinas.id,
        "perguntaId": this.state.perguntasGerais[4].id,
        "professorId": 'null',
        "conteudo": this.state.texto_pergunta3,
      })
    };
    const response = await fetch('/resposta/submit', requestOptions);
    this.props.match.params.estado = this.state
    this.props.history.push({
      pathname: `/perguntaGeral4/${this.state.id}`,
      state: this.state.onClick,
      state3: this.state,
    })
  };
  async componentDidMount() {
    await axios.get(`/disciplina/exportacao?disciplina=${this.state.id}`)
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
  handleClick() {
    this.proximaPagina3();
  }
  myChangeHandler = (event) => {
    let val = event.target.value;
    let err = '';

    if (val.length < 10 && val !== "") {
      err = <strong className="text-extra-info" style={{ color: "white" }}>Escreva um pouco mais</strong>;
    }
    if (val.length > 10 && val !== "") {
      err = <strong className="text-extra-info2" style={{ color: "white" }}>Obrigado pelo feedback</strong>;
    }
    if (val === "") {
      err = <strong style={{ color: "white" }}></strong>;
    }

    this.setState({ errormessage: err });

  }
  render() {
    return (this.state.ready ?
      <div>
        <div>
          <ProgressBar style={{ marginTop: "0px" }}>
            <ProgressBar animated now={50} />
          </ProgressBar>
        </div>
        <div style={{ backgroundColor: '#800000' }} className="nm-custom-decoration" >
          <div style={{ color: 'white', marginLeft: '120%', whiteSpace: 'nowrap', paddingTop: '160%' }}> {this.state.disciplinas.nome}
          </div>
        </div>
        <div className="container ">
          <div className="row" style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="col-md-6" style={{ justifyContent: 'center', position: 'absolute', color: 'white', top: '21%', textAlign: 'center' }}>
              <p style={{ fontSize: '28pt', top: '50%' }}>
                {this.state.perguntasGerais.find(pg => pg.id === 3).enunciado}
                <p style={{ fontSize: '15pt', verticalAlign: 'middle' }}> As críticas só são úteis se forem respeitosas e construtivas.</p>
              </p>
              <div className="form-group">
                <label htmlFor="exampleTextarea"></label>
                <div style={{ marginBottom: '2%', marginTop: '-5%' }} >
                  <div className="extra-info-icon-box">
                    <div className="engine-sprite icon-engine-info">
                    </div>
                  </div>
                  <div className="extra-info-text-box">{this.state.errormessage}
                  </div>
                </div>
                <textarea style={{ marginTop: '2%' }} onInput={(e) => this.setState({ texto_pergunta3: e.target.value })} onChange={this.myChangeHandler} className="form-control" id="exampleTextarea" style={{ borderBottomRightRadius: '0px', borderBottomLeftRadius: '0px' }} rows="7" placeholder="Escreva o texto aqui"></textarea>
                <button onClick={() => this.handleClick()} style={{ borderTopLeftRadius: '0px', borderTopRightRadius: '0px', padding: '13pt', fontSize: '18pt', fontWeight: '500', borderWidth: '5px', width: '100%' }} type="button" className="btn btn-primary btn-lg">Responda e continue</button>

              </div>
            </div>
          </div>

        </div>
      </div>
      : <div>loading...</div>

    )
  }
}
export default PerguntaGeral3