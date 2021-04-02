import * as React from 'react'
import 'bootswatch/dist/cyborg/bootstrap.css';
import  Rotas from './rotas'

import {Link,Router,Route} from 'react-router-dom'


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
