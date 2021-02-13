import * as React from 'react'
import  Home from '../views/home'
import 'bootswatch/dist/cyborg/bootstrap.css';
import  PerguntaGeral2 from '../views/perguntaGeral2'
import  PerguntaGeral3 from '../views/perguntaGeral3'
import  PerguntaGeral4 from '../views/perguntaGeral4'
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
