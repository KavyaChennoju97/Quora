import React, { Component } from 'react';
import '../../Styles/Account.css';
import Logo from '../../Images/quora.svg';
import { signup, signin } from "../../js/actions/action";
import { connect } from "react-redux";

function mapStateToProps(store) {
    return {
        signupSuccess:store.signupSuccess,
        signupMessage:store.signupMessage,
        signinSuccess:store.signinSuccess,
        signinMessage:store.signinMessage
    }
}

function mapDispatchToProps(dispatch) {
    return {
        signup: (data) => dispatch(signup(data)),
        signin: (data) => dispatch(signin(data))
    };
}

class SignUp extends Component {
    constructor(props){
        super(props);
        this.submitSignUp = this.submitSignUp.bind(this);
        this.submitSignIn = this.submitSignIn.bind(this);
    }
    submitSignUp(e) {
        e.preventDefault();
        const data = new FormData(e.target);
        this.props.signup(data);
    }
    submitSignIn(e) {
        e.preventDefault();
        const data = new FormData(e.target);
        this.props.signin(data);
    }
    render() {
        let message;
        if(this.props.signupSuccess != null && this.props.signupSuccess){
            message = <div className="success-signup"><span>{this.props.signupMessage}</span></div>
        }
        if(this.props.signupSuccess != null && !this.props.signupSuccess){
            message = <div className="unsuccess-signup"><span>{this.props.signupMessage}</span></div>
        }
        if(this.props.signinSuccess != null && !this.props.signinSuccess){
            message = <div><h4>{this.props.signinMessage}</h4></div>
        } 
        return (
        <div className="account-parent-container">
        <div className="account-container">
            <div className="account-logo-container">
                <img className="quora-logo-account" src={Logo} alt="Quora"/>
            </div>          
            <p className="account-tag">A place to share knowledge and better understand the world</p>
            <div className="account-sub-container">
                {message}
                <div className="signup">
                    <p className="signup-text">Sign Up</p>
                    <form className="form" onSubmit={this.submitSignUp}>
                        <div className="row">
                            <div className="first-half">
                                <label className="account-labels first-name-label">FIRST NAME</label>
                                <div className="input-firstName">
                                    <input className="first-name account-input" type="text" name="firstname" required></input>
                                </div>
                            </div>
                            <div className="second-half">
                                <label className="account-labels last-name-label">LAST NAME</label>
                                <div className="input-lastName">
                                    <input className="last-name account-input" type="text" name="lastname" required></input>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <label className="account-labels email-label">EMAIL</label>
                            <div className="input-email">
                                <input className="email account-input" type="email" name="user_name" required></input>
                            </div>
                        </div>
                        <div className="row">
                            <label className="account-labels email-label">PASSWORD</label>
                            <div className="input-email">
                                <input className="email account-input" type="password" name="password" required></input>
                            </div>
                        </div>
                        <div className="row">
                            <button type="submit" className="account-btn">Sign Up</button>
                        </div>
                    </form>
                </div>
                <div className="login">
                    <p className="signup-text">Login</p>
                    <form className="form" onSubmit={this.submitSignIn}>
                        <div className="row">
                            <div className="input-email">
                                <input className="email account-input" type="email" name="user_name" required></input>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-email">
                                <input className="email account-input email-top" type="password" name="password" required></input>
                            </div>
                        </div>
                        <div className="row">
                            <button type="submit" className="account-btn-login">Login</button>
                        </div>
                    </form>
                </div>
            </div>
      </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);