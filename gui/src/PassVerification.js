import { Card } from 'react-bootstrap';
import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { variables } from './Variables.js';
export class PassVerification extends Component {

    constructor(props) {
        super(props);

        this.state = {
            Users: [],
            modalTitle: "",
            UserName: "",
            main_password: ""
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

    changeUserPassword = (e) => {
        this.setState({ main_password: e.target.value });
    }

     async AddLogin(name) {
        fetch('http://localhost:53535/api/user/verify', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                UserName: name,
                main_password: this.state.main_password
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
                    r.props.history.push('/login');
                }
            })
    }

    render() {
        var {
            UserName = this.props.location.state.UserName
        } = this.state;

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
                            <div className="form-group" style={{ marginTop: "30px" }} >
                                <label style={{ marginBottom: "15px", float: "left" }} >Main Password:</label>
                                <input type="password" className="form-control" placeholder="Password..." style={{ width: "100%", margin: "auto", border: "1px solid #00334E" }}
                                    onChange={this.changeUserPassword} />
                            </div>
                        </div>
                        <button type="submit" onClick={() => this.AddLogin(UserName)} className="btn btn-primary btn-block" style={{ backgroundColor: "#0262B6", marginTop: "10px", width: "168px", height: "37px", fontWeight: "bold", fontSize: "18px", border: "2px solid black" }}> Login</button>
                    </form>
                </Card >
            </div>
        )
    }
}

export default PassVerification; 