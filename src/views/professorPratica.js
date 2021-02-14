import * as React from 'react';
import Home from './home';
import Select from 'react-select';

const options = [
  { value: 'Joao', label: 'Joao' },
  { value: 'Maria', label: 'Maria' },
];
const customStyles = {
    control: base => ({
      ...base,
      height: 70,
      minHeight: 70,
      textAlignLast: 'center'
    })
  };
 
class ProfessorPratica extends Home {
 
  state = {
    selectedOption: null,
  };
  handleChange = selectedOption => {
    this.setState({ selectedOption });
    console.log('Resposta qual professor da prática: ', selectedOption);
  
  };
  proximaPagina6 = () =>{
    this.props.history.push('/')
};
  

  render() {
      
    const { selectedOption } = this.state;

    return (
        <div className="container ">
            <div className="row" style={{ display: 'flex', justifyContent: 'center'}}>
                <div className="col-md-6" style={{justifyContent:'center', position: 'absolute',  top: '35%', textAlign: 'center'}}>
                        <p  style= {{fontSize: '28pt', top: '50%'}}> Indique seu professor(a) das práticas </p>
                        <br/>              
                           <Select 
                              styles={customStyles}
                              placeholder={"Selecione seu professor(a) das práticas"}
                              value={selectedOption}
                              onChange={this.handleChange}
                              options={options}                            
                           />   
                          <button onClick={this.proximaPagina6} style= {{marginTop: '26%', padding: '13pt', fontSize:'18pt', fontWeight: '500', borderRadius: '4pt', width: '100%'}}  type="button" className="btn btn-primary btn-lg">Avançar</button>
                  </div>                
            </div>
        </div>
    );
  }
}
export default ProfessorPratica