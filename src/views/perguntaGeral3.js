import * as React from 'react';
import Home from './home';

class PerguntaGeral3 extends Home {
    proximaPagina2 = () =>{
        this.props.history.push('/perguntaGeral4')
    };
    render(){
        return(
            <div className="container ">
            <div className="row" style={{ display: 'flex', justifyContent: 'center'}}>
                <div className="col-md-6" style={{justifyContent:'center', position: 'absolute', color: 'white', top: '25%', textAlign: 'center'}}>
                        <p  style= {{fontSize: '28pt', top: '50%'}}> O que melhorarias nessa disciplina? </p>
                        <p  style= {{fontSize: '15pt', verticalAlign: 'middle'}}> As críticas só são úteis se forem respeitosas e construtivas.</p>
                        <div className="form-group">
                        <label htmlFor="exampleTextarea"></label>
                            
                             <textarea className="form-control" id="exampleTextarea" style={{borderBottomRightRadius: '0px', borderBottomLeftRadius: '0px'}} rows="7" placeholder="Escreva o texto aqui"></textarea>
                             <button onClick={this.proximaPagina2} style= {{ borderTopLeftRadius: '0px',borderTopRightRadius: '0px', padding: '13pt', fontSize:'18pt', fontWeight: '500', borderWidth:'5px', width: '100%'}} type="button" className="btn btn-primary btn-lg">Responda e continue</button>
 
                        </div>
                </div>
            </div>
                
        </div>

        )

    }

}
export default PerguntaGeral3