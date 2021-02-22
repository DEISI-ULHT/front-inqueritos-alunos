import * as React from 'react';
import Home from './home';

class PerguntaGeral4 extends Home {
    
    
    constructor(props){
        super(props);
        this.state = {
            respostaPergunta4:"",

        };
        console.log(this.props)

    }
    setRespostaPergunta4 (valor) {
        this.setState({
            respostaPergunta4: this.state.respostaPergunta4 = valor,
        })

        
    }
    proximaPagina3 () {
        this.props.history.push('/professorTeorica')
        console.log(this.props)
    };
    handleClick(valor){
         this.setRespostaPergunta4(valor);
         this.proximaPagina3();
        console.log('Resposta da pergunta 4: ' + this.state.respostaPergunta4);
        }
    
    
    
    render(){

            
        
        return(
            
            <div className="container ">
                <div className="row" style={{ display: 'flex', justifyContent: 'center'}}>
                    <div className="col-md-6" style={{justifyContent:'center', position: 'absolute', color: 'white', top: '25%', textAlign: 'center'}}>
                        <p  style= {{fontSize: '28pt', top: '50%'}}> Houve uma boa ligação entre as teóricas e as práticas? </p>
                        <p  style= {{fontSize: '15pt', verticalAlign: 'middle'}}> As aulas práticas concretizavam aquilo que foi dado nas aulas teóricas?</p>
                        <div className="form-group">
                            <button onClick={() => this.handleClick("Nenhuma Ligação")} style= {{ padding: '13pt', fontSize:'18pt', fontWeight: '500', borderWidth:'5px', width: '100%'}} type="button" className="btn btn-primary btn-lg">Nenhuma ligação</button>
                            <button onClick={() => this.handleClick("Pouca ligação")} style= {{ marginTop: '1%', padding: '13pt', fontSize:'18pt', fontWeight: '500', borderWidth:'5px', width: '100%'}} type="button" className="btn btn-primary btn-lg">Pouca ligação</button>
                            <button onClick={() => this.handleClick("Muita ligação")} style= {{ marginTop: '1%', padding: '13pt', fontSize:'18pt', fontWeight: '500', borderWidth:'5px', width: '100%'}} type="button" className="btn btn-primary btn-lg">Muita ligação</button>
                            <button onClick={() => this.handleClick("Não faz sentido nessa disciplina")} style= {{ marginTop: '1%', padding: '13pt', fontSize:'18pt', fontWeight: '500', borderWidth:'5px', width: '100%'}} type="button" className="btn btn-primary btn-lg">Não faz sentido nessa disciplina</button>

                        </div>
                    </div>
                </div>   
             </div>

        )

    }

}
export default PerguntaGeral4