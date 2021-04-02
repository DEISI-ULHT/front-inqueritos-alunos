import * as React from 'react'
import  DEISI from './deisi_logo.png'
import 'bootswatch/dist/cyborg/bootstrap.css';
import axios from 'axios'
import disciplinas from '../components/disciplinas'
import { Button, Container, Card, Row, Carousel} from 'react-bootstrap';



class Final extends React.Component{ 
    render(){
        const centralizar={
            justifyContent: "center",
            alignItems: "center",
            marginTop: '10%',
            marginBottom: '30px',
              
            
          };
        return(
                 <div className="container ">
                    <div className="row" style={{ display: 'flex', justifyContent: 'center'}}>
                <div className="col-md-6" style={{justifyContent:'center', position: 'absolute', color: 'white', textAlign: 'center'}}></div>

                    
                 <img style={{marginTop: '25%'}} src="https://cdn.pixabay.com/photo/2015/12/07/22/53/paper-planes-1081560_1280.png"  height= "15%" width=" 10%"  />
                 <p style={{marginTop: '25%', fontSize: '28pt'}}  >Enviado!</p>
  
                </div>
                </div>
        )
    }
}
export default Final