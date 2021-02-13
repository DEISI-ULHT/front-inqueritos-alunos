import * as React from 'react';
import Home from './home';
import Select from 'react-select';

const options = [
  { value: 'Bruno Cipriano', label: 'Bruno Cipriano' },
  { value: 'Pedro Alves', label: 'Pedro Alves' },
];
const customStyles = {
    control: base => ({
      ...base,
      height: 70,
      minHeight: 70,
      textAlignLast: 'center'
    })
  };
 
class ProfessorTeorica extends Home {
  proximaPagina4 = () =>{
    this.props.history.push('/perguntaGeral2')
};

  state = {
    selectedOption: null,
  };
  handleChange = selectedOption => {
    this.setState({ selectedOption });
    console.log('Option selected:', selectedOption);
  
  };
  

  render() {
      
    const { selectedOption } = this.state;

    return (
        <div className="container ">
            <div className="row" style={{ display: 'flex', justifyContent: 'center'}}>
                <div className="col-md-6" style={{justifyContent:'center', position: 'absolute',  top: '35%', textAlign: 'center'}}>
                        <p  style= {{fontSize: '28pt', top: '50%'}}> Indique seu professor(a) das teóricas </p>
                        <br/>              
                           <Select 
                              styles={customStyles}
                              placeholder={"Selecione seu professor(a) das teóricas"}
                              value={selectedOption}
                              onChange={this.handleChange}
                              options={options}                            
                        />           
                 </div>                
            </div>
        </div>
    );
  }
}
export default ProfessorTeorica