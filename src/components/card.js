import * as React from 'react'


class Card extends React.Component {
      
    render(){
        return(
            <div className="container ">
                <div className="row" style={{ display: 'flex', justifyContent: 'center'}}>
                    <div className="col-md-3" style={{justifyContent:'center', position: 'absolute', color: 'white', top: '20%', textAlign: 'center', height: '15rem', minWidth:'40%'}}>
                        <div className="card text-white bg-dark md-3">
                            <div className="card-body">
                                <p className="card-text">Questão 1/6?</p>
                                <br/>
                                <h4 className="card-title">Conseguias entender bem as suas explicações?</h4>        
                            </div>
                        </div> 
                        <br/> 
                        <br/> 
                        <div className="card text-white bg-dark md-3">

                        <div className="card-body">
                            <div  style={{textAlign: 'center'}}>
                                <button style= {{margin:5,borderWidth:1,borderColor:'rgba(0,0,0,0.2)',alignItems:'center',width:58,height:58,backgroundColor:'body',borderRadius:40,}} type="button">1</button>
                                <button style= {{margin:5,borderWidth:1,borderColor:'rgba(0,0,0,0.2)',alignItems:'center',justifyContent:'center',width:58,height:58,backgroundColor:'#fff',borderRadius:50,}} type="button">2</button>
                                <button style= {{margin:5,borderWidth:1,borderColor:'rgba(0,0,0,0.2)',alignItems:'center',justifyContent:'center',width:58,height:58,backgroundColor:'#fff',borderRadius:50,}} type="button">3</button>
                                <button style= {{margin:5,borderWidth:1,borderColor:'rgba(0,0,0,0.2)',alignItems:'center',justifyContent:'center',width:58,height:58,backgroundColor:'#fff',borderRadius:50,}} type="button">4</button>
                                <button style= {{margin:5,borderWidth:1,borderColor:'rgba(0,0,0,0.2)',alignItems:'center',justifyContent:'center',width:58,height:58,backgroundColor:'#fff',borderRadius:50,}} type="button">5</button>
                                <button style= {{margin:5,borderWidth:1,borderColor:'rgba(0,0,0,0.2)',alignItems:'center',justifyContent:'center',width:58,height:58,backgroundColor:'#fff',borderRadius:50,}} type="button">6</button>
                          </div>
                            </div>
                        </div>    
                    </div>
                </div>
            </div>
        )
    }
}
export default Card
