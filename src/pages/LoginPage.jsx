import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components"

const URL = import.meta.env.VITE_API_URL;

export default function LoginPage() {

    const [userData, setUserData] = useState({ username: "", password: ""});
    const [disabled, setDisabled] = useState(false);

    const navigate = useNavigate();

    function updateLoginInfo(information, value) {
        setUserData(prevState => {
            return {
                ...prevState,
                [information]: value
            };
        });
    };

    function submitUserData(ev) {
        ev.preventDefault();
        setDisabled(true);

        axios.post(`${URL}/token`, {
            username: userData.username,
            password: userData.password
        })
            .then(response => {
                console.log('Access Token:', response.data.access);
                console.log('Refresh Token:', response.data.refresh);
                setDisabled(false);
                navigate('/folders');
            })
            .catch(error => {
                console.error('Erro ao obter tokens:', error);
                setDisabled(false);
                alert("erro");
            });
    }

    return (
        <Login>
            <FormLogin onSubmit={submitUserData}>
                <p>Welcome</p>
                <InputLogin
                    id="username"
                    placeholder="Username"
                    required
                    value={userData.username}
                    onChange={ev => updateLoginInfo('username', ev.target.value)}
                />
                <InputLogin data-test="password-input"
                    id="password"
                    type="password"
                    placeholder="Password"
                    required
                    value={userData.password}
                    onChange={ev => updateLoginInfo('password', ev.target.value)}
                />
                <SubmitButton type="submit">Sign in</SubmitButton>
                <h2>*Sign in to access your folders.</h2>
            </FormLogin>
        </Login>
    )
}

const Login = styled.div`
    width: 100%;
    height: 100vh;
    background: linear-gradient(45deg, #fc466b, #3f5efb);
    font-family: 'Montserrat', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
`
const FormLogin = styled.form`
    background: rgba(255,255,255,0.3);
    padding: 70px 0 20px;
    width: 500px;
    border-radius: 20px;
    border-left: 1px solid rgba(255,255,255,0.3);
    border-top: 1px solid rgba(255,255,255,0.3);
    backdrop-filter: blur(10px);
    box-shadow: 20px 20px 40px -6px rgba(0, 0, 0, 0.2);
    text-align: center;
    transition: all 0.2s ease-in-out;
    display: flex;
    flex-direction: column;
    align-items: center;
    p {
        font-weight: 500;
        letter-spacing: 0.5px;
        color: #ffffff;
        opacity: 0.8;
        font-size: 23px;
        margin-bottom: 40px;
    }
    h2{
        font-weight: 400;
        color: #ffffff;
        opacity: 0.8;
        font-size: 10px;
        margin-top: 60px;
    }

    @media (max-width: 500px) {
        width: 80%;
        padding: 60px 0;
    }
`
export const InputLogin = styled.input`
    background: transparent;
    width: 65%;
    padding: 16px;
    margin-bottom: 15px;
    border: none;
    border-left: 1px solid rgba(255, 255, 255, 0.3);
    border-top: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 50px;
    backdrop-filter: blur(5px);
    box-shadow: 4px 4px 60px rgba(0, 0, 0, 0.2);
    transition: all 0.2s ease-in-out;
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
    letter-spacing: 0.8px;
    color: #ffffff;
    outline: none;

    &::placeholder{
        color: #ffffff;
    }

    &:hover {
        background: rgba(255, 255, 255, 0.1);
        box-shadow: 4px 4px 60px 8px rgba(0, 0, 0, 0.2);
    }

    @media (max-width: 500px) {
        width: 80%;
    }
`
const SubmitButton = styled.button`
    width: 40%;
    font-size: 16px;
    background: transparent;
    padding: 16px;
    margin-top: 5px;
    border: none;
    border-left: 1px solid rgba(255, 255, 255, 0.3);
    border-top: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 50px;
    backdrop-filter: blur(5px);
    box-shadow: 4px 4px 60px rgba(0, 0, 0, 0.2);
    color: #ffffff;
    letter-spacing: 0.8px;
    font-weight: 500;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    &:hover {
        background: rgba(255, 255, 255, 0.1);
        box-shadow: 4px 4px 60px 8px rgba(0, 0, 0, 0.2);
    }
`