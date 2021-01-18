import React, { Component } from 'react'

class NewPassword extends Component {
    constructor() {
        super()
        this.state = {
            WebsiteName: "",
            Password: "",
            ShowPassword: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.GeneratePassword = this.GeneratePassword.bind(this)
    }


    handleChange(event) {
        const { name, value, type, checked } = event.target
        if (type === "checkbox") {
            this.setState({ [name]: checked })
            if (checked === true) {
                document.getElementById("Password").type = "text"
            } else {
                document.getElementById("Password").type = "password"
            }

        } else {
            this.setState({ [name]: value })
        }

    }

    GeneratePassword() {
        var length = Math.floor(Math.random() * 25 + 10)
        var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*/<+-"
        var retVal = ""
        for (var i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        document.getElementById("Password").value = retVal
    }

    handleSubmit(event) {
        event.preventDefault()
    }


    render() {
        return (
            <div>
                <center>
                    <form onSubmit={this.handleSubmit}>
                        <br />
                        <input
                            type="text"
                            name="WebsiteName"
                            placeholder="website name"
                            onChange={this.handleChange}
                        />
                        <span style={{ padding: 5 }}></span>
                        <input
                            id="Password"
                            type="password"
                            name="Password"
                            placeholder="password"
                            onChange={this.handleChange}
                        />
                        <br /><br />
                        <label>
                            <input
                                type="checkbox"
                                name="ShowPassword"
                                checked={this.state.ShowPassword}
                                onChange={this.handleChange}
                            />
                            <span id="ShowPassword">Show Password</span>
                        </label>
                        <button
                            id="suggest-passwords-button"
                            onClick={this.GeneratePassword}
                        >
                            suggest password?
                        </button>

                        <br /><br />
                        <button id="add-button">create</button>
                    </form><br />

                </center>
            </div>
        )
    }
}

export default NewPassword