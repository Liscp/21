import React, {Component} from 'react';
import "./Login.css";


export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoginOpen: true,
            isRegistroOpen: false
        };
    }

    showLoginBox(){
        this.setState({isLoginOpen: true, isRegistroOpen: false});
    }

    showRegisterBox() {
        this.setState({isRegistroOpen: true, isLoginOpen: false});
    }

    render(){
        return(
            <div className="root-container">
                <div className="box-controller">
                    <div className={"controller " + (this.state.isLoginOpen ? "selected-controller": "")} onClick={this.showLoginBox.bind(this)}>
                        Inicio Sesión
                    </div>
                    <div className={"controller " + (this.state.isRegistroOpen ? "selected-controller": "")} onClick={this.showRegisterBox.bind(this)}>
                        Registro
                    </div>
                </div>
                <div className="box-container">
                    {this.state.isLoginOpen && <LoginBox />}
                    {this.state.isRegistroOpen && <RegistroBox />}
                </div>
            </div>
        )
    }
}

class LoginBox extends Component {
    constructor(props){
        super(props)
        this.state = {};
    }

    submitLogin(e){

    }
    render(){
        return(
        <div className="inner-container">
            <div className="header">
                Inicio Sesión
            </div>
            <div className="box">
                <div className="input-group">
                    <label htmlFor="nombre">Nombre</label>
                    <input type="text" name="nombre" className="login-input" placeholder="Nombre"/>
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input type="text" name="password" className="login-input" placeholder="Password"/>
                </div>

                <button type="button" className="login-btn" onClick={this.submitLogin.bind(this)}>Iniciar Sesió</button>
            </div>
        </div>
        );
    }
}

class RegistroBox extends Component {
    constructor(props){
        super(props)
        this.state = {
            nombre: "",
            email: "",
            password: "",
            errors: []
        };
    }

    showValidationErr(elm, msg){
        this.setState((prevState) => (
            { errors: [...prevState.errors, {elm,msg}]}
        ));
    }

    clearValidationErr(elm){
        this.setState((prevState) => {
            let newArr = [];
            for (let err of prevState.errors) {
                if (elm !== err.elm) {
                    newArr.push(err);
                }
            }
            return newArr;
        })
    }

    onNombreChange(e){
        this.setState({ nombre: e.target.value});
    }

    onEmailChange(e){
        this.setState({ email: e.target.value});
    }

    onPasswordChange(e){
        this.setState({ password: e.target.value});
    }

    submitRegister(e){
        if (this.state.nombre == "") {
            this.showValidationErr("nombre","Nombre No se puede");
        }if(this.state.email == ""){
            this.showValidationErr("email","Email No se puede");
        }if(this.state.password == ""){
            this.showValidationErr("password","Password No se puede");
        }
    }
    render(){
        
        let nombreErr = null, passwordErr = null, emailErr = null;
        
        for (let err of this.state.errors) {
            if (err.elm === "nombre") {
                nombreErr = err.msg;
            }if (err.elm === "password") {
                passwordErr = err.msg;
            }if (err.elm === "email") {
                emailErr = err.msg;
            }            
        }


        return(
        <div className="inner-container">
            <div className="header">
                Registro
            </div>
            <div className="box">
                <div className="input-group">
                    <label htmlFor="nombre">Nombre</label>
                    <input type="text" name="nombre" className="login-input" placeholder="Nombre" onChange={this.onNombreChange.bind(this)}/>
                    <small className="danger-error">{ nombreErr ? nombreErr:""}</small>
                </div>
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" className="login-input" placeholder="Email" onChange={this.onEmailChange.bind(this)}/>
                    <small className="danger-error">{ emailErr ? emailErr:""}</small>
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input type="text" name="password" className="login-input" placeholder="Password" onChange={this.onPasswordChange.bind(this)}/>
                    <small className="danger-error">{ passwordErr ? passwordErr:""}</small>
                </div>

                <button type="button" className="login-btn" onClick={this.submitRegister.bind(this)}>Registrate</button>
            </div>
        </div>
        );
    }
}