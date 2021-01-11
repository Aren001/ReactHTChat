import React from 'react';
import { Link } from 'react-router-dom';



const Notfond = () => {
    return (
        <div >
            <div > 
                <div style={{backgroundColor:'#00738D',fontSize:'50px',marginTop:'200px' , }}> ☁ Page NOT Found  ➔  404 ➠ 
                <Link to='/'> ↺  </Link>         </div>
            </div>
        </div>
    )
};

export default Notfond;