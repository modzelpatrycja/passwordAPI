import React, { Component } from 'react';
import { variables } from './Variables.js';
export class Password extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            Passwords: [],
            modalTitle: "",
            PasswordId: 0,
            PasswordName: "",
            UserId: "",
            ServiceName: "",
            visibility: "hidden",
            iv: "",
        }
    }

    refresh() {

        fetch(variables.API_URL + 'Password')
            .then(response => response.json())
            .then(data => {
                this.setState({ Passwords: data });
                
            });

        fetch(variables.API_URL + 'user')
            .then(response => response.json())
            .then(data => {
                this.setState({ users: data });
            });
    }

    componentDidMount() {
        this.refresh();
    }
    changePasswordName = (e) => {
        this.setState({ PasswordName: e.target.value });
    }
    changeServiceName = (e) => {
        this.setState({ ServiceName: e.target.value });
    }

    addClick(uId) {
        this.setState({
            modalTitle: "Add Password",
            PasswordId: 0,
            PasswordName: "",
            UserId: uId,
            ServiceName: "",
        });
    }
    editClick(password) {
        this.setState({
            modalTitle: "Edit Password",
            PasswordId: password.PasswordId,
            PasswordName: password.PasswordName,
            UserId: password.UserId,
            ServiceName: password.ServiceName,
        });
    }

    async createClick() {
        const token = localStorage.getItem('jwt')
        if (!token) return alert("User is not valid");
      await  fetch(variables.API_URL + 'password', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                PasswordName: this.state.PasswordName,
                UserId: this.state.UserId,
                ServiceName: this.state.ServiceName,
            })
        })
            .then(response=> response.json())
            .then((result) => {
                alert(result);
                this.refresh();
            }, (error) => {
                alert('Failed');
            })
    }


    updateClick() {
        fetch(variables.API_URL + 'Password', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                PasswordId: this.state.PasswordId,
                PasswordName: this.state.PasswordName,
                UserId: this.state.UserId,
                ServiceName: this.state.ServiceName,
            })
        })
            .then(response=> response.json())
            .then((result) => {
                alert(result);
                this.refresh();
            }, (error) => {
                alert('Failed');
            })
    }

    deleteClick(id) {
        const token = localStorage.getItem('jwt')
        if (!token) return alert("User is not valid");

            fetch(variables.API_URL + 'Password/' + id, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'withCredentials':'true'
                }
            })
                .then(response=> response.json())
                .then((result) => {
                    this.refresh();
                })
    }

      decrypt2 (password, vector) {
        var CryptoJS = require("crypto-js");
        var Key = "3264733361643573333861643935733932647333616435733338616439357339";
        var key = CryptoJS.enc.Hex.parse(Key);
        var iv = CryptoJS.enc.Hex.parse(vector);
        var rawData = CryptoJS.enc.Hex.parse(password);

        var decrypted = CryptoJS.AES.decrypt({ciphertext: rawData}, key, { 
          iv: iv, 
          padding: CryptoJS.pad.Pkcs7,
          mode: CryptoJS.mode.CBC
      
        })
    const x =  decrypted.toString(CryptoJS.enc.Utf8);

        return <td style={{ visibility: this.state.visibility }}  >{x}</td>;
      }

    setVisibility(id) {
        if (this.state.visibility == "hidden") {
            this.setState({
                visibility: "visible"
            });
        }
        else
            this.setState({ visibility: "hidden" });

    }

    render() {
        var {
            UserName = this.props.location.state.UserName,
            users,
            Passwords,
            modalTitle,
            PasswordId,
            PasswordName,
            ServiceName,
            selected2 = [UserName],
            selectedUser = users?.map((e,t) => { if(selected2.includes(e.UserName)) return e.UserId; else return null} ) ,
     
            uId = selectedUser.find(element => element !== null),
            arr = [String(uId)],
            pass1 = Passwords?.map((e,t) => { if(arr.includes(e.UserId)) return e; else return null} ) ,
            pass2 = pass1.filter(element => element !== null)

            
        } = this.state;

        return (

            
            <div style={{ backgroundColor: "rgb(235, 189, 235)" }}>
                <h4>User: {UserName}</h4>
                <button type="button"
                    className="btn btn-light mr-1" style={{ backgroundColor: '#BAF2BB', border: '2px solid black', marginRight: "5px", marginTop: "10px" }}
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => this.addClick(uId)}>
                        Add Password
                </button>
                <button type="button" style={{ color: "black", border: "2px solid black", backgroundColor: "#BAD7F2", marginRight: '5px', marginTop: "10px" }}
                    className="btn btn-light mr-1"
                    onClick={() => this.setVisibility()}>
                    Show Passwords</button>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>
                                Password
                            </th>
                            <th>
                                Service Name
                            </th>
                            <th>
                                Options
                            </th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {pass2?.map(pass2 =>
                            <tr key={pass2.PasswordId}>
                                    {this.decrypt2(pass2.PasswordName, pass2.iv)}
                               <td>{pass2.ServiceName}</td>
                                <td>
                                    <button type="button" style={{ color: "black", border: "2px solid black", backgroundColor: "#E05259", marginRight: '5px' }}
                                        className="btn btn-light mr-1"
                                        onClick={() => this.deleteClick(pass2.PasswordId)}>
                                        Delete</button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{modalTitle}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                ></button>
                            </div>

                                <div className="d-flex flex-row bd-highlight mb-3">

                                    <div className="p-2 w-50 bd-highlight">

                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Password</span>
                                            <input type="text" className="form-control"
                                                value={PasswordName}
                                                onChange={this.changePasswordName} />
                                        </div>

                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Service Name</span>
                                            <input type="text" className="form-control"
                                                value={ServiceName}
                                                onChange={this.changeServiceName} />
                                        </div>
                                    </div>
                                </div>
                                {PasswordId === 0 ?
                                    <button type="button"
                                        className="btn btn-primary float-start"
                                        onClick={() => this.createClick()}
                                    >Create</button>
                                    : null}

                                {PasswordId !== 0 ?
                                    <button type="button"
                                        className="btn btn-primary float-start"
                                        onClick={() => this.updateClick()}
                                    >Update</button>
                                    : null}
                        </div>
                    </div>
                </div>


            </div>
        )
    }
}