import * as React from 'react'
import 'bootswatch/dist/cyborg/bootstrap.css';
import axios from 'axios'
import API from '../main/api'

class Final extends React.Component {
    constructor(props) {
        super(props);
        this.state = props.location.state;
        this.state.texto = "";
        this.state.texto_final = "";
        this.state.disciplinas = [];
        this.state.perguntasGerais = [];
        this.state.errormessage = '';
        this.state.ready = 0;
        this.state.id = props.match.params.id
    }
    async componentDidMount() {
        await API.get(`disciplina/exportacao?disciplina=${this.state.id}`)
            .then(res => {
                const disciplinas = res.data.disciplina;
                const perguntasGerais = res.data.perguntasGerais;
                const token = res.data.token;
                this.setState({ disciplinas, perguntasGerais, ready: 1, token });
                window.onbeforeunload = function () { return "Your work will be lost."; };
                window.history.pushState(null, "", window.location.href);
                window.onpopstate = function () {
                    window.history.pushState(null, "", window.location.href);
                }

            })
    }

    render() {
        const centralizar = {
            justifyContent: "center",
            alignItems: "center",
            marginTop: '10%',
            marginBottom: '30px',
        };

        return (
            <div className="container ">
                <div className="row" style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className="col-md-6" style={{ justifyContent: 'center', position: 'absolute', color: 'white', textAlign: 'center' }}></div>
                    <img style={{ marginTop: '25%' }} src="https://cdn.pixabay.com/photo/2015/12/07/22/53/paper-planes-1081560_1280.png" height="15%" width=" 10%" />
                    <p style={{ marginTop: '25%', fontSize: '28pt' }}  >Enviado!</p>
                </div>
            </div>
        )
    }
}
export default Final