import * as React from 'react'
import Home from '../views/home'
import PerguntaGeral2 from '../views/perguntaGeral2'
import PerguntaGeral1 from '../views/perguntaGeral1'
import PerguntaGeral3 from '../views/perguntaGeral3'
import PerguntaGeral4 from '../views/perguntaGeral4'
import ProfessorTeorica from '../views/professorTeorica'
import ProfessorPratica from '../views/professorPratica'
import PaginaEspecifica from '../views/paginaEspecifica'
import perguntasProfessorTeorica from '../views/perguntasProfessorTeorica'
import {Route, Switch, BrowserRouter} from 'react-router-dom'
import Card from '../components/card'
import EscolheCurso from '../views/EscolheCurso'
import perguntasProfessorPratica from '../views/perguntasProfessorPratica'
import Final from '../views/final'
import PaginaEspecifica2 from '../views/paginaEspecifica2'

function Rotas(){
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/:id" component={Home} />
                <Route exact path="/" component={Home} />
                <Route path="/EscolheCurso/:id" component={EscolheCurso}/>
                <Route path="/perguntaGeral1/:id" component={PerguntaGeral1}/>
                <Route path="/perguntaGeral2/:id" component={PerguntaGeral2}/>
                <Route path="/perguntaGeral3/:id" component={PerguntaGeral3}/>
                <Route path="/perguntaGeral4/:id" component={PerguntaGeral4}/>
                <Route path="/paginaEspecifica/:id" component={PaginaEspecifica}/>
                <Route path="/paginaEspecifica2/:id" component={PaginaEspecifica2}/>
                <Route path="/professorTeorica/:id" component={ProfessorTeorica}/>
                <Route path="/professorPratica/:id" component={ProfessorPratica}/>
                <Route path="/final/:id" component={Final}/>
                <Route path="/perguntasProfessorTeorica/:id" component={perguntasProfessorTeorica}/>
                <Route path="/perguntasProfessorPratica/:id" component={perguntasProfessorPratica}/>
                <Route path="/card/:id" component={Card}/>

                </Switch>
        </BrowserRouter>
    )
}
export default Rotas
