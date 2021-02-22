import * as React from 'react'
import Home from '../views/home'
import PerguntaGeral2 from '../views/perguntaGeral2'
import PerguntaGeral1 from '../views/perguntaGeral1'

import PerguntaGeral3 from '../views/perguntaGeral3'
import PerguntaGeral4 from '../views/perguntaGeral4'
import ProfessorTeorica from '../views/professorTeorica'
import ProfessorPratica from '../views/professorPratica'
import perguntasProfessorTeorica from '../views/perguntasProfessorTeorica'
import {Route, Switch, BrowserRouter} from 'react-router-dom'
import Card from '../components/card'
import EscolheCurso from '../views/EscolheCurso'

function Rotas(){
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/EscolheCurso/:id" component={EscolheCurso}/>
                <Route path="/perguntaGeral1/:id" component={PerguntaGeral1}/>
                <Route path="/perguntaGeral2/:id" component={PerguntaGeral2}/>
                <Route path="/perguntaGeral3/:id" component={PerguntaGeral3}/>
                <Route path="/perguntaGeral4" component={PerguntaGeral4}/>
                <Route path="/professorTeorica" component={ProfessorTeorica}/>
                <Route path="/professorPratica" component={ProfessorPratica}/>
                <Route path="/perguntasProfessorTeorica" component={perguntasProfessorTeorica}/>
                <Route path="/card" component={Card}/>

                </Switch>
        </BrowserRouter>
    )
}
export default Rotas
