import React from 'react';

import { Switch, Route, Link, Redirect } from "react-router-dom";

import UserList from '../userList';

import MesageList from '../message';

import '../App.css';

class Admin extends React.Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem('email');
    let loggedIn = true;
    if (token == null) {
      loggedIn = false;
    }
    this.state = {
      loggedIn,
      item: ''
    }



  }


  render() {
    setTimeout(this.foo, 0.00000001000);

    if (this.state.loggedIn === false) {
      return <Redirect to='/' />
    }
    return (


      <div>

        <header
          style={{
            width: '100%',
            height: '50px',
            backgroundColor: '#430C3F',
            color: 'white',
            display: 'flex',
            justifyContent: 'space-around',
          }}
        >
          <div>
            <h1> <i>MESSENGER</i></h1>
          </div>
          <div>
            <Link
              to='/logout'
              style={{
                fontSize: '30px',
                textDecoration: 'none',
                border: '3px solid black',
                backgroundColor: 'black',
                borderRadius: '80px',
                color: 'white'
              }}>
              Logout</Link>
          </div>
        </header>


        <Switch>
          <>
            <div className="container" >
              <h3 className=" text-center" > <b style={{ color: 'white' }}>
                <img src='https://res-2.cloudinary.com/crunchbase-production/image/upload/c_lpad,f_auto,q_auto:eco/ujrmktl41bf2fvlo3bud' width='50' height='50' alt='Messenger' />
              </b></h3>


              <div className="messaging">
                <div className="inbox_msg">
                  <div className="inbox_people">


                    {/* LIST */}

                    <Route path='/admin/messages/' component={UserList} />
                    {/* <UserList/> */}

                  </div>


                  {/* MESSAGES LIST */}
                  <div className="mesgs">
                    {/* <div className="msg_history"> */}

                    
                    <Route path='/admin/messages/:id' component={MesageList} />

                    {/* </div> */}

                  </div>
                </div>

              </div>

            </div>
          </>
        </Switch>

      </div>

    )
  }
}
export default Admin;