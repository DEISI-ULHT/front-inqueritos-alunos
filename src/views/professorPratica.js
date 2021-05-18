import * as React from 'react';
import Home from './home';
import Select from 'react-select';
import API from '../main/api'
import { ProgressBar } from 'react-bootstrap';

const customStyles = {
  control: base => ({
    ...base,
    height: 70,
    minHeight: 70,
    textAlignLast: 'center'
  })
};
class ProfessorPratica extends Home {
  constructor(props) {
    super(props);
    this.state = props.location.state;
    this.state.texto = "";
    this.state.texto_profPratica = "";
    this.state.disciplinas = [];
    this.state.perguntasGerais = [];
    this.state.options = [];
    this.state.selectOptions = [];
    this.state.selectedId = "";
    this.state.selectedName = "";
    this.state.ready = 0;
    this.state.id = props.match.params.id
    console.log(props.match.params.id)
        console.log(this.props) 
  }

  proximaPagina7 = () => {
    this.setState({ respostas: [...this.state.texto_profPratica] })
    this.props.match.params.estado = this.state
    this.props.history.push({
      pathname: `/perguntasProfessorPratica/${this.state.id}`,
      teacher: this.state.selectedId,
      state: this.state,
      professor: this.state.selectedName
    })

  };

  componentDidMount() {
    this.getOptions()
  }
  handleChange(event) {
    this.setState({ selectedId: event.value, selectedName: event.label });
  };
  async handleClick() {
    this.proximaPagina7();

    await API.post('resposta/submit', {
      "disciplinaId": this.state.disciplinas.id,
      "perguntaId": this.state.perguntasGerais[9].id,
      "professorId": this.state.selectedId,
      "conteudo": this.state.selectedName,
      "session": this.state.token,

    });
  }
  async getOptions() {
    await API.get(`disciplina/exportacao?disciplina=${this.state.id}`)
      .then(res => {
        const disciplinas = res.data.disciplina;
        const perguntasGerais = res.data.perguntasGerais;

        const options = disciplinas.professores.filter(x => {
          return (x.pratico)
        }).map(x => {
          return { value: x.professor.id_lusofona, label: x.professor.nome }
        })
        this.setState({ disciplinas, perguntasGerais, selectOptions: options, ready: 1 });
        window.onbeforeunload = function () { return "Your work will be lost."; };
        window.history.pushState(null, "", window.location.href);
        window.onpopstate = function () {
          window.history.pushState(null, "", window.location.href);
        }
      });

  }
  render() {
    return (this.state.ready ?
      <div>
        <div>
          <ProgressBar style={{ marginTop: "0px" }}>
            <ProgressBar animated now={80} />
          </ProgressBar>
        </div>
        <div style={{ backgroundColor: '#483D8B' }} className="nm-custom-decoration" >
          <div style={{ color: 'white', marginLeft: '120%', whiteSpace: 'nowrap', paddingTop: '160%' }}> {this.state.disciplinas.nome}
          </div>
        </div>
        <div className="container ">

          <div className="row" style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="col-md-6" style={{ justifyContent: 'center', position: 'absolute', top: '30%', textAlign: 'center' }}>
              <p style={{ fontSize: '25pt', top: '50%' }}>
                {this.state.perguntasGerais.find(pg => pg.id === 17).enunciado}
              </p>
              <br />
              <Select
                styles={customStyles}
                placeholder={"Selecione seu professor(a) das práticas"}
                onChange={this.handleChange.bind(this)}
                options={this.state.selectOptions}
              />
              <button onClick={() => { this.handleClick() }} style={{ marginTop: '35%', padding: '13pt', fontSize: '18pt', fontWeight: '500', borderRadius: '4pt', width: '100%' }} type="button" className="btn btn-primary btn-lg">Avançar</button>
            </div>
          </div>
        </div>
      </div>
      : <div>loading...</div>
    );
  }
}
export default ProfessorPratica