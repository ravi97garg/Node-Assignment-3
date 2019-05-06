import React, {Component} from 'react';
import axios from 'axios';

export default class Login extends Component{

    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: ''
        };
        if(props.isUserLoggedIn === "true"){
            props.history.push('/dashboard');
        }
    }

    updateHandle = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    submitHandle = (e) => {
        e.preventDefault();
        axios.post('http://127.0.0.1:8080/auth', this.state)
            .then((response) => {
                if(response.data.status === 200){
                    this.props.isAuthCB("true");
                    this.props.history.push('/dashboard');
                } else {
                    alert("Invalid login");
                    this.props.isAuthCB("false");
                }
            })
            .catch((error) => {
                console.log(error)
            })
    };

    render() {
        return (
            <form onSubmit={this.submitHandle}>
                <input type='text'
                       placeholder='username'
                       value={this.state.username}
                       onChange={this.updateHandle}
                       name='username'
                />
                <input type='password'
                       placeholder='password'
                       value={this.state.password}
                       onChange={this.updateHandle}
                       name='password'
                />
                <input type='submit'
                       value='Login'/>
            </form>
        )
    }
}