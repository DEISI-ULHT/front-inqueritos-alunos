import * as React from 'react'
import Home from './home'
import PerguntaGeral2 from './perguntaGeral2'
import PerguntaGeral3 from './perguntaGeral3'
import {Route, Switch, HashRouter} from 'react-router-dom'

function Rotas(){
    return(
        <HashRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/perguntaGeral2" component={PerguntaGeral2}/>
                <Route path="/perguntaGeral3" component={PerguntaGeral3}/>
                </Switch>
        </HashRouter>
    )
}
export default Rotas
