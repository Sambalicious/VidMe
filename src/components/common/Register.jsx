import React from 'react';
import Form from './Form';
import Joi  from 'joi-browser';
import { register } from './../../services/UserService';


class Register extends Form {
    state = { 
        data:{
            username:"", password:"", name:""
        }, 
    errors:{}
 }

 schema = {
     username:Joi.string().email().required().label('Username'),
     password: Joi.string().min(5).required().label('Password'),
     name:Joi.string().required().label('Name')
 }

 doSubmit = async() => {
     try {
        await register(this.state.data);
         
     } catch (ex) {
         if (ex.response && ex.response.status === 400){
            const errors = {...this.state.errors};
            errors.username = ex.response.data;
            this.setState({errors});

         }
     }
};

    render() { 
        return (
         <div>
            <h1>Register</h1>
            
            <form onSubmit={this.handleSubmit}>
               
                {this.renderInput("username", 'Username')}
                {this.renderInput("password", 'Password', "password")}
                {this.renderInput("name", 'Name')}

                {this.renderButton('Register')}
            </form>


        </div> );
    }
}
 
export default Register;