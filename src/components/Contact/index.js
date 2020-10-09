import React from 'react'
import firebaseconfig from '../../database'
import firebase from 'firebase'
import MoreOnContactUsDetails from '../MoreonContactus'


class Contact extends React.Component{

    constructor() {
        super();
        this.state = {
          History: {},
          presentHistory: '',
        };
      }
    componentDidMount(){
        firebase.database().ref(`contactUs`).on('value',snapshot=>{
            let data = snapshot.val() ? snapshot.val() : {};
            let HistoryItems = {...data};
            this.setState({
                History: HistoryItems,
              }); 
})
    }

    render(){
        let keys=Object.keys(this.state.History)
        console.log(keys,keys.length,'keasdsd');
        
        return (
             <div style={{flex:1}}>
                   {keys.length > 0 ? (
              keys.map(key =>(
                <MoreOnContactUsDetails
                 key={key}
                 HistoryItem={this.state.History[key]}
                 props={this.props.navigation}
                 />
              ))
              
            ) : (
                <div style={{flex:1,alignItems:'center',marginTop:250,textAlign:'center'}}> 
                  <p style={{fontSize:20,fontWeight:'bold',color:'black'}}>No Customers Found</p>
                  </div>
            )}
             </div>
        )
    }
}

export default Contact