import React, { useState } from 'react'

function LoginForm({ Login }) {
    const [details, setDetails] = useState({ name: "", email: "", password: "" });

    const submitHandler = e => {
        e.preventDefault();
        Login(details);
    }

    return (
        <form onSubmit={submitHandler}>
            <h1>Perus Single Page Application (SPA)</h1>
            <div className="loginForm">

                <h2>Kirjautuminen</h2>
                <div>
                    <label htmlFor="name">Nimi: </label>
                    <input type="text" name="name" id="name"
                        onChange={e => setDetails({ ...details, name: e.target.value })}
                        value={details.name} />
                </div>
                <div className="form group">
                    <label htmlFor="email">Sähköposti: </label>
                    <input type="email" name="email" id="email"
                        onChange={e => setDetails({ ...details, email: e.target.value })}
                        value={details.email} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Salasana: </label>
                    <input type="password" name="password" id="password"
                        onChange={e => setDetails({ ...details, password: e.target.value })}
                        value={details.password} />
                </div>
                <button type="submit">Login</button>
            </div>
        </form>
    )
}

export default LoginForm
