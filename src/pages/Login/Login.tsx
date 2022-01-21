import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import userApi from "../../api/userApi";
import { addUser } from "../../app/auth/AuthSlice";
import { RootState, useAppDispatch } from "../../app/store";
import { User } from "../../app/types";
import firebase, { auth } from "../../firebase/config";

const Login: React.FC = () => {
    const { isValid, user } = useSelector((state: RootState) => state.auth);
    const history = useNavigate();
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    const dispatch = useAppDispatch();

    const handleLogin = async (provider: any) => {
        auth.signInWithPopup(provider).then(async (result) => {
            const { additionalUserInfo, user } = result;
            if (user) {
                const newUser: User = {
                    displayName: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                    uuid: user.uid,
                };
                if (additionalUserInfo?.isNewUser) {
                    try {
                        const response = await userApi.createUser(newUser);
                        console.log(response);
                    } catch (error) {
                        console.log(error);
                    }
                }
                dispatch(addUser(newUser));
            }
        });
    };

    useEffect(() => {
        if (isValid && user) {
            history("/user/boards");
        }
    }, [isValid, user, history]);
    return (
        <LoginBody>
            <div className='wrapped'>
                <div className='container' id='container'>
                    <div className='form-container sign-in-container'>
                        <form action='#'>
                            <img
                                alt='Trello'
                                src='https://d2k1ftgv7pobq7.cloudfront.net/meta/c/p/res/images/trello-header-logos/167dc7b9900a5b241b15ba21f8037cf8/trello-logo-blue.svg'
                                width={"150px"}
                            ></img>
                            <h1>Sign in </h1>
                            <div className='social-container'>
                                <button
                                    className='social'
                                    onClick={(event) => {
                                        event.preventDefault();
                                        handleLogin(fbProvider);
                                    }}
                                >
                                    <i className='fab fa-facebook-f'></i>
                                </button>
                                <button
                                    className='social'
                                    onClick={(event) => {
                                        event.preventDefault();
                                        handleLogin(googleProvider);
                                    }}
                                >
                                    <i className='fab fa-google-plus-g'></i>
                                </button>
                                <button className='social'>
                                    <i className='fab fa-microsoft'></i>
                                </button>
                            </div>
                            <span>or use your account</span>
                            <input type='email' placeholder='Email' />
                            <input type='password' placeholder='Password' />
                            <a href='#!'>Forgot your password?</a>
                            <button className='btnLogin'>Sign In</button>
                        </form>
                    </div>
                </div>
            </div>
        </LoginBody>
    );
};

const LoginBody = styled.div`
    background: #f9fafc;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-family: "Montserrat", sans-serif;
    height: 100vh;

    h1 {
        font-weight: bold;
        margin: 0;
    }

    h2 {
        text-align: center;
    }

    p {
        font-size: 14px;
        font-weight: 100;
        line-height: 20px;
        letter-spacing: 0.5px;
        margin: 20px 0 30px;
    }

    span {
        font-size: 12px;
    }

    a,
    .social {
        color: #333;
        font-size: 14px;
        text-decoration: none;
        margin: 15px 0;
    }

    .btnLogin {
        border-radius: 20px;
        border: 1px solid #ff4b2b;
        background-color: #ff4b2b;
        color: #ffffff;
        font-size: 12px;
        font-weight: bold;
        padding: 12px 45px;
        letter-spacing: 1px;
        text-transform: uppercase;
        transition: transform 80ms ease-in;
        cursor: pointer;
    }

    .btnLogin:active {
        transform: scale(0.95);
    }

    .btnLogin:focus {
        outline: none;
    }

    .btnLogin.ghost {
        background-color: transparent;
        border-color: #ffffff;
    }

    form {
        background-color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        padding: 0 50px;
        height: 100%;
        text-align: center;
    }

    input {
        background-color: #eee;
        border: none;
        padding: 12px 15px;
        margin: 8px 0;
        width: 100%;
    }

    .container {
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25),
            0 10px 10px rgba(0, 0, 0, 0.22);
        position: relative;
        overflow: hidden;
        width: 350px;
        max-width: 100%;
        min-height: 540px;
    }

    .form-container {
        position: absolute;
        top: 0;
        height: 100%;
        transition: all 0.6s ease-in-out;
    }

    .sign-in-container {
        left: 0;
        width: 100%;
        z-index: 2;
    }

    .container.right-panel-active .sign-in-container {
        transform: translateX(100%);
    }

    .sign-up-container {
        left: 0;
        width: 50%;
        opacity: 0;
        z-index: 1;
    }

    .container.right-panel-active .sign-up-container {
        transform: translateX(100%);
        opacity: 1;
        z-index: 5;
        animation: show 0.6s;
    }

    .social-container {
        margin: 20px 0;
    }

    .social-container .social {
        border: 1px solid #dddddd;
        border-radius: 50%;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        margin: 0 5px;
        height: 40px;
        width: 40px;
        cursor: pointer;
    }

    img {
        margin-bottom: 24px;
    }
`;
export default Login;
