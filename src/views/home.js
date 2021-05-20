import * as React from 'react'
import DEISI from './deisi_logo.png'
import 'bootswatch/dist/cyborg/bootstrap.css';
import { Link } from 'react-router-dom';
import API from '../main/api'

class Home extends React.Component {
    constructor(props) {
        super(props);
        console.log('constructor')
        this.state = {
            // respostas:[],
            texto: "",
            disciplinas: [],
            perguntasGerais: [],
            ready: 0,
            id: props.match.params.id
        };
    }
    proximaPagina() {
        this.props.match.params.estado = this.state
        debugger;
        if(this.state.disciplinas.cursos === "undefined" ){
            <Link to="/notFound">
          </Link>
        }else if (this.state.disciplinas.cursos !== "undefined" || this.state.disciplinas.cursos.length > 1 ) {
            this.props.history.push({
                pathname: `/EscolheCurso/${this.state.id}`,
                state: this.state
            })
        } else {
            this.props.history.push({
                pathname: `/perguntaGeral1/${this.state.id}`,
                state: this.state
            })
        }
     
    };
    
  

    handleClick(valor) {
        this.proximaPagina();
    }
    async componentDidMount() {
        console.log("componentDidMount " + this.state.id)
        await API.get(`disciplina/exportacao?disciplina=${this.state.id}`)
            .then(res => {
                const disciplinas = res.data.disciplina;
                const perguntasGerais = res.data.perguntasGerais;
                this.setState({ disciplinas, perguntasGerais, ready: 1 });
            })
    }
    render() {
        return (
            <div className="container ">
                <div className="row" style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className="col-md-6" style={{ justifyContent: 'center', position: 'absolute', color: 'white', top: '5%', textAlign: 'center' }}>
                        <img src={DEISI} className="img-fluid" alt="Deisi logo" />
                        <p style={{ fontSize: '23pt', top: '55%' }}> Ajuda-nos a melhorar o DEISI! </p>
                        <p style={{ fontSize: '13pt', verticalAlign: 'middle' }}> Só podemos melhorar as nossas aulas se soubermos o que melhorar.  </p>
                        <p style={{ fontSize: '13pt' }}>Queremos a tua opinião justa e honesta sobre as aulas que tiveste este semestre.</p>
                        <p style={{ fontSize: '13pt', textTransform: 'upperCase' }}>  <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" className="bi bi-info-circle-fill" viewBox="0 0 16 16">
                            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
                        </svg> &nbsp;O questionário é anónimo</p>
                        <button onClick={() => this.handleClick()} style={{ marginTop: '5%', padding: '19pt', fontSize: '18pt', fontWeight: '500', borderRadius: '4pt', width: '100%' }} type="button" className="btn btn-primary btn-lg">Começar</button>
                    </div>
                </div>

            </div>
        )
    }
}
export default Home