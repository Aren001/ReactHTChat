import React from 'react';
import { Link } from 'react-router-dom';

class LogOut extends React.Component{
    constructor(props){
        super(props);
        localStorage.removeItem('email');
    }


    render(){
        return(
            <div style={{ backgroundColor:'#3F0E40' ,marginTop:'200px',color:'white'  }}>
            <center   >
                <h1>You Have been Login Out ☟  Click Button </h1>
                <Link style={{ border:'3px solid black' , color:'black' , textDecoration:"none" ,marginLeft:'250px',color:'white' }}  to='/'> Login Again </Link>
            </center>
            </div>
        )
    }
}
export default LogOut;
