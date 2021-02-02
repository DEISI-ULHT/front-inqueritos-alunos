import * as React from 'react'
import  Home from './home'
import 'bootswatch/dist/cyborg/bootstrap.css';
import  PerguntaGeral2 from './perguntaGeral2'
import  PerguntaGeral3 from './perguntaGeral3'
import  Rotas from './rotas'

class App extends React.Component {
  render(){
    return(
    <div>
      <Rotas/>
    </div>
    )
  }
}

export default App;
