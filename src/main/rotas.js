import * as React from 'react'
import Home from '../views/home'
import PerguntaGeral2 from '../views/perguntaGeral2'
import PerguntaGeral3 from '../views/perguntaGeral3'
import PerguntaGeral4 from '../views/perguntaGeral4'
import ProfessorTeorica from '../views/professorTeorica'
import ProfessorPratica from '../views/professorPratica'
import perguntasProfessorTeorica from '../views/perguntasProfessorTeorica'
import {Route, Switch, HashRouter} from 'react-router-dom'
import Card from '../components/card'

function Rotas(){
    return(
        <HashRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/perguntaGeral2" component={PerguntaGeral2}/>
                <Route path="/perguntaGeral3" component={PerguntaGeral3}/>
                <Route path="/perguntaGeral4" component={PerguntaGeral4}/>
                <Route path="/professorTeorica" component={ProfessorTeorica}/>
                <Route path="/professorPratica" component={ProfessorPratica}/>
                <Route path="/perguntasProfessorTeorica" component={perguntasProfessorTeorica}/>
                <Route path="/card" component={Card}/>

                </Switch>
        </HashRouter>
    )
}
export default Rotas
