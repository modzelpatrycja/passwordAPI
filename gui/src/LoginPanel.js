import { Card } from 'react-bootstrap';
import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { variables } from './Variables.js';
export class LoginPanel extends Component {

    constructor(props) {
        super(props);

        this.state = {
            Users: [],
            modalTitle: "",
            UserName: "",
            UserId: 0,
            UserPassword: "",
        }
    }

    refresh() {
        fetch(variables.API_URL + 'User')
            .then(response => response.json())
            .then(data => {
                this.setState({ Users: data });
            });
    }

    componentDidMount() {
        this.refresh();
    }

    changeUserName = (e) => {
        this.setState({ UserName: e.target.value });
    }

    changeUserPassword = (e) => {
        this.setState({ UserPassword: e.target.value });
    }

     AddLogin() {
        fetch('http://localhost:53535/api/user/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                UserName: this.state.UserName,
                UserPassword: this.state.UserPassword
            })
        })
            .then(result => result.json())
            .then((result) => { 
            
                this.refresh();
                var r = this;
                if (result !== "Invalid username or password"){
                        alert("login succesfully")
                 
                    localStorage.setItem('jwt', result)
                    r.props.history.push({
                        pathname: '/password',
                            state: {

                            UserName: this.state.UserName
                        }
                    })
                }
                else{
                    alert(result);
                    r.props.history.push('/');
                }
            })
    }

    render() {
        return (
            <div className="d-flex justify-content-center" style={{
                position: "absolute",
                top: "0px",
                right: "0px",
                bottom: "0px",
                left: "0px",
                textAlign: "center"
            }} >
                <Card className="card1" style={{ align: "center", width: "100%", backgroundColor: "#CBE1F6" }}>
                    <form style={{ color: "black" }} >
                        <h1 style={{ fontWeight: "bold" }}> Password Manager</h1>
                        <div style={{ width: "30%", height: "50%", margin: "auto" }}>
                            <div className="form-group" style={{ marginTop: "25px" }} >
                                <label style={{ marginBottom: "15px", float: "left" }} >Login:</label>
                                <input type="text" className="form-control" placeholder="Username..." style={{ width: "100%", margin: "auto", border: "1px solid #00334E" }}
                                    onChange={this.changeUserName} />
                            </div>
                            <div className="form-group" style={{ marginTop: "30px" }} >
                                <label style={{ marginBottom: "15px", float: "left" }} >Password:</label>
                                <input type="password" className="form-control" placeholder="Password..." style={{ width: "100%", margin: "auto", border: "1px solid #00334E" }}
                                    onChange={this.changeUserPassword} />
                            </div>
                        </div>
                        <button type="submit" onClick={() => this.AddLogin()} className="btn btn-primary btn-block" style={{ backgroundColor: "#0262B6", marginTop: "10px", width: "168px", height: "37px", fontWeight: "bold", fontSize: "18px", border: "2px solid black" }}> Login</button>
                        <p>
                            <Link to="/register"><button type="submit" className="btn btn-primary btn-block" style={{ backgroundColor: "#C7FAF2", marginTop: "20px", width: "168px", height: "37px", fontWeight: "bold", fontSize: "18px", border: "2px solid black", color: "black" }}> Sign up</button></Link>
                        </p>
                    </form>
                </Card >
            </div>
        )
    }
}

export default LoginPanel; 