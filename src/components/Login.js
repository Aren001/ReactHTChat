
import React from 'react';
import axios from "axios";

import './login.css';

import { Redirect, Link } from "react-router-dom";


class Login extends React.Component {
    constructor(props) {
        super(props);
        let loggedIn = false;
        this.state = {
            loggedIn,
            formData: {
                email: '',
                password: '',
                id: ""
            },
        }
        this.sendLoginRequest = this.sendLoginRequest.bind(this);
    }

    


    sendLoginRequest() {

        
        
        localStorage.setItem('id', this.state.formData.id);
        console.log(localStorage.getItem('id'), 'USER ID'); 
        localStorage.setItem('email', this.state.formData.email);
        axios.post('http://127.0.0.1:8000/api/login', this.state.formData)
        .then(resp => {
            // console.log(resp, 'login');
            if (resp.data != 'Not Match') {
                this.setState({
                    userObj: resp.data,
                    formData: {
                        email: localStorage.getItem('email'),
                        password: this.state.formData.password,
                        
                        
                    },
                    
                    loggedIn: true
                    
                })
                
                
            } else {
                alert('Not Match'); this.setState({
                    formData: {
                        email: '',
                        password: '',
                        
                    },
                })
            }
           

        })

    }


    handleChange = (e) => {
        e.preventDefault();
    }

    render() {

        if (this.state.loggedIn) {
            return <Redirect to='/admin/messages/' />
        }
        

        return (
            <div id="login">
               

                <div className="container">
                    <div id="login-row" className="row justify-content-center align-items-center">
                        <div id="login-column" className="col-md-6">
                            <div id="login-box" className="col-md-12">
                                <form id="login-form" className="form" onSubmit={this.handleChange}   >
                                    <h3 className="text-center text-info" >Login</h3>
                                    <div className="form-group" style={{ marginTop: '50px' }}>
                                        <label className="text-info">User-ID:</label><br />
                                        <input
                                            type="text"
                                            name="id"
                                            id="username"
                                            required
                                            className="form-control"
                                            placeholder="User ID"
                                            value={this.state.formData.id}
                                            onChange={(e) => {
                                                let { formData } = this.state;
                                                formData.id = e.target.value
                                                this.setState({ formData })
                                            }}
                                        />
                                    </div>
                                    <div className="form-group" style={{ marginTop: '50px' }}>
                                        <label className="text-info">E-Mail:</label><br />
                                        <input
                                            type="text"
                                            name="email"
                                            id="username"
                                            required
                                            className="form-control"
                                            placeholder="E-Mail"
                                            value={this.state.formData.email}
                                            onChange={(e) => {
                                                let { formData } = this.state;
                                                formData.email = e.target.value
                                                this.setState({ formData })
                                            }}
                                        />
                                    </div>
                                    <div className="form-group" style={{ marginTop: '50px' }}>
                                        <label className="text-info">Password:</label><br />
                                        <input
                                            type="password"
                                            name="password"
                                            id="password"
                                            required
                                            className="form-control"
                                            placeholder='Password'
                                            value={this.state.formData.password}
                                            onChange={(e) => {
                                                let { formData } = this.state;
                                                formData.password = e.target.value
                                                this.setState({ formData })
                                            }}
                                        />
                                    </div>
                                    <div className="form-group" style={{ marginTop: '50px' }}>
                                        <button type="submit" className="btn btn-info btn-md" onClick={this.sendLoginRequest} >Send</button>


                                    </div><br /><br />
                                    <div id="register-link" className="text-right">
                                        <Link to='/register' className="text-right">REGISTER</Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>





        )

    }

}
export default Login;




