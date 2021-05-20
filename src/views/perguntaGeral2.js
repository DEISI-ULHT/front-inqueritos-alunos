import * as React from 'react'
import '../App.css'
import { ProgressBar } from 'react-bootstrap';
import API from "../main/api";


class PerguntaGeral2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.location.state;
    this.state.texto = "";
    this.state.texto_pergunta2 = "";
    this.state.disciplinas = [];
    this.state.perguntasGerais = [];
    this.state.errormessage = '';
    this.state.ready = 0;
    this.state.id = props.match.params.id
  }

  async proximaPagina2() {
    this.setState({ respostas: [...this.state.texto_pergunta2] })

    await API.post('resposta/submit', {
      "disciplinaId": this.state.disciplinas.id,
      "perguntaId": this.state.perguntasGerais[3].id,
      "professorId": 'null',
      "conteudo": this.state.texto_pergunta2,
      "session": this.state.token,

    }).then(res => {
      this.props.match.params.estado = this.state
      this.props.history.push({
        pathname: `/perguntaGeral3/${this.state.id}`,
        state: this.state.onClick,
        state2: this.state,
      })
    });

  };
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

  handleClick() {
    this.proximaPagina2();
  }
  myChangeHandler = (event) => {

    let val = event.target.value;
    let err = '';

    if (val.length < 10 && val !== "") {
      err = <strong className="text-extra-info" style={{ color: "white" }}>Escreva um pouco mais</strong>;
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
            <ProgressBar animated now={40} />
          </ProgressBar>
        </div>
        <div style={{ backgroundColor: '#C71585' }} className="nm-custom-decoration" >
          <div style={{ color: 'white', marginLeft: '120%', whiteSpace: 'nowrap', paddingTop: '160%' }}> {this.state.disciplinas.nome}
          </div>
        </div>
        <div className="container ">
          <div className="row" style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="col-md-6" style={{ justifyContent: 'center', position: 'absolute', color: 'white', top: '19%', textAlign: 'center' }}>
              <p style={{ fontSize: '18pt'}}>
                {this.state.perguntasGerais.find(pg => pg.id === 2).enunciado}
              </p>
              <br />
              <div className="form-group">
                <label htmlFor="exampleTextarea"></label>
                <div style={{ marginBottom: '1%', marginTop:"-10px" }} ><div className="extra-info-icon-box"><div className="engine-sprite icon-engine-info"></div></div><div className="extra-info-text-box">{this.state.errormessage} </div></div>
                <textarea onChange={this.myChangeHandler} onInput={(e) => this.setState({ texto_pergunta2: e.target.value })} type="text" name="message" className="form-control" id="exampleTextarea" style={{ borderBottomRightRadius: '0px', borderBottomLeftRadius: '0px' }} rows="7" placeholder="Escreva o texto aqui"></textarea>
                <button onClick={() => { this.handleClick() }} style={{ borderTopLeftRadius: '0px', borderTopRightRadius: '0px', padding: '13pt', fontSize: '18pt', fontWeight: '500', borderWidth: '5px', width: '100%' }} type="button" className="btn btn-primary btn-lg">Responde e continua</button>
              </div>
            </div>
          </div>

        </div>

      </div>
      : <div>Verifique o endereço...</div>
    )

  }
}

export default PerguntaGeral2
