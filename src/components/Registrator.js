import React from 'react';
import axios from 'axios';
import './login.css';
import { Redirect ,Link } from "react-router-dom";



class Registrator extends React.Component{
    constructor(props){
        super(props);
        let red = false;
        this.state = {
            formData:{
                img:'',
                name:'',
                email:'',
                password:'',
                password_1:'',
            },
            red

        }
        this.sendReginRequest = this.sendReginRequest.bind(this);
    }

    handleChange = (e) => {
        e.preventDefault();

    }

    sendReginRequest(){
        if(this.state.formData.password === this.state.formData.password_1){
        axios.post("http://127.0.0.1:8000/api/register" , this.state.formData)
        .then(resp => {
            console.log(resp)
            
            this.setState({
                red:true
            })
            alert('Successful Registration');
        })
    }else{
        alert('Confirm Password Not Match ')
    }
    }



    render(){
        if (this.state.red) {
            return <Redirect to='/' />
        }
        return(
            <div id="login">
          
            <div className="container">
                <div id="login-row" className="row justify-content-center align-items-center">
                    <div id="login-column" className="col-md-6">
                        <div id="login-box" className="col-md-12">
                            <form id="login-form" className="form"  onSubmit={this.handleChange}   >
                                <h3 className="text-center text-info">Registration</h3>
                                <div className="form-group">
                                    <label className="text-info">IMG:</label><br/>
                                        <input
                                            type="text"
                                            name="img"
                                            id="username"
                                            className="form-control"
                                            required
                                            placeholder="IMG"
                                            value={this.state.formData.img}
                                            onChange={(e) => {
                                                let { formData } = this.state;
                                                formData.img = e.target.value
                                                this.setState({ formData })
                                            }}
                                        />
                                    </div>
                                <div className="form-group">
                                    <label  className="text-info">Name:</label><br/>
                                        <input
                                            type="text"
                                            name="name"
                                            id="username"
                                            required
                                            className="form-control"
                                            placeholder="Name"
                                            value={this.state.formData.name}
                                            onChange={(e) => {
                                                let { formData } = this.state;
                                                formData.name = e.target.value
                                                this.setState({ formData })
                                            }}
                                        />
                                    </div>
                                <div className="form-group">
                                    <label  className="text-info">E-Mail:</label><br/>
                                        <input
                                            type="text"
                                            name="email"
                                            id="username"
                                            className="form-control"
                                            required
                                            placeholder="E-Mail"
                                            value={this.state.formData.email}
                                            onChange={(e) => {
                                                let { formData } = this.state;
                                                formData.email = e.target.value
                                                this.setState({ formData })
                                            }}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label  className="text-info">Password:</label><br/>
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
                                    <div className="form-group">
                                        <label  className="text-info">Confirm Password:</label><br/>
                                            <input
                                                type="password"
                                                name="password_1"
                                                id="password"
                                                required
                                                className="form-control"
                                                placeholder='Confirm Password'
                                                value={this.state.formData.password_1}
                                                onChange={(e) => {
                                                    let { formData } = this.state;
                                                    formData.password_1 = e.target.value
                                                    this.setState({ formData })
                                                }}
                                            />
                                    </div>
                                        <div className="form-group">
                                        <button type="submit"  className="btn btn-info btn-md" onClick={this.sendReginRequest} >Send</button>
                                        
                                        
                                        </div><br/><br/>
                                        <div id="register-link" className="text-right">
                                        <Link to='/' className="text-right">Login</Link>
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
export default Registrator;