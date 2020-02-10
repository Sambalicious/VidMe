import React from 'react';
import Form from './Form';
import Joi  from 'joi-browser';


class Register extends Form {
    state = { 
        data:{
            username:"", password:"", name:""
        }, 
    errors:{}
 }

 schema = {
     username:Joi.string().required().label('Username'),
     password: Joi.string().required().label('Password'),
     name:Joi.string().required().label('Name')
 }

 doSubmit = () => {

    //call the server
    console.log("submitted")
}

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