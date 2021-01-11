import React from 'react';
import { Link } from 'react-router-dom';



const NotMes = () => {
    return (
        <div >
            <div > 
                <div style={{backgroundColor:'#00738D',fontSize:'50px',marginTop:'200px' ,position:'absalute' }}> ☁ Page NOT Found  ➔  404 ➠ 
                <Link to='/admin/messages'> ↺  </Link>         </div>
            </div>
        </div>
    )
};

export default NotMes;