import { Card } from 'react-bootstrap';
import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { variables } from './Variables.js';
export class Register extends Component {

    constructor(props) {
        super(props);

        this.state = {
            Users: [],
            modalTitle: "",
            UserName: "",
            UserId: 0,
            UserPassword: "",
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

    changeUserName = (e) => {
        this.setState({ UserName: e.target.value });
    }

    changeUserPassword = (e) => {
        this.setState({ UserPassword: e.target.value });
    }

    changeMainPassword = (e) => {
        this.setState({ main_password: e.target.value });
    }

    hasNumber(string) {
        return /\d/.test(string);
      }

    AddValues() {
        if (this.state.UserName.length > 8 && this.state.UserPassword.length > 8 && this.state.main_password.length > 8
            &&  /\d/.test(this.state.UserName)  && /\d/.test(this.state.UserPassword)  && /\d/.test(this.state.main_password) ) {
            this.addUser();
        }
        else {
            alert('Values ​​cannot be fewer than 8 characters long and must contain at least one number');
        }
    }

    addUser() {


        fetch(variables.API_URL + 'user', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                UserName: this.state.UserName,
                UserPassword: this.state.UserPassword,
                main_password: this.state.main_password
            })
        })
            .then(res => res.json()).then((result) => {
                alert(result);
                this.refresh();
                this.props.history.push('/login');
            }, (error) => {
                alert('Failed');
                this.props.history.push('/register');
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
                        <h1 style={{ fontWeight: "bold" }}> Sign up Panel</h1>
                        <div style={{ width: "30%", height: "70%", margin: "auto" }}>
                            <div className="form-group" style={{ marginTop: "25px" }} >
                                <label style={{ marginBottom: "15px", float: "left" }} >Username:</label>
                                <input type="text" className="form-control" placeholder="Username..." style={{ width: "100%", margin: "auto", border: "1px solid #00334E" }}
                                    onChange={this.changeUserName} />
                            </div>

                            <div className="form-group" style={{ marginTop: "30px" }} >
                                <label style={{ marginBottom: "15px", float: "left" }} >Password:</label>
                                <input type="password" className="form-control" placeholder="Password..." style={{ width: "100%", margin: "auto", border: "1px solid #00334E" }}
                                    onChange={this.changeUserPassword} />
                            </div>

                            <div className="form-group" style={{ marginTop: "30px" }} >
                                <label style={{ marginBottom: "15px", float: "left" }} >Password Manager password:</label>
                                <input type="password" className="form-control" placeholder="Password Manager password..." style={{ width: "100%", margin: "auto", border: "1px solid #00334E" }}
                                    onChange={this.changeMainPassword} /></div>
                        </div>



                        <button type="button" style={{ backgroundColor: "#0262B6", marginTop: "10px", width: "168px", height: "37px", fontWeight: "bold", fontSize: "18px", border: "2px solid black" }}
                            className="btn btn-primary btn-block"
                            onClick={() => this.AddValues()} > Sign up</button>

                        
                        <p>
                            <Link to="/"><button type="submit" className="btn btn-primary btn-block" style={{ backgroundColor: "darkred", marginTop: "20px", width: "168px", height: "37px", fontWeight: "bold", fontSize: "15px", border: "2px solid black" }}> Close</button>

                            </Link>
                        </p>



                    </form>
                </Card >
            </div>
        )
    }
}

export default Register; 