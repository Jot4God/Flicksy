import './Login.css';

import { IconArrowLeft } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile
} from 'firebase/auth';

import { auth } from '../../firebase/firebase';

function Login() {

    const navigate = useNavigate();

    const [isRegister, setIsRegister] = useState(false);

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError('');

        try {

            if (isRegister) {

                if (password !== repeatPassword) {
                    setError('Passwords do not match');
                    return;
                }

                // Cria conta no Firebase
                const userCredential =
                    await createUserWithEmailAndPassword(
                        auth,
                        email,
                        password
                    );

                // Guarda username no perfil Firebase
                await updateProfile(userCredential.user, {
                    displayName: username
                });

                // Firebase já deixa o utilizador logged in
                // Voltamos diretamente ao menu
                navigate('/');

            } else {

                await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                );

                navigate('/');
            }

        } catch (err) {
            console.error(err);

            setError(err.message);
        }
    };

    return (
        <div className="login-page">

            <button
                className="back-button"
                onClick={() => navigate('/')}
            >
                <IconArrowLeft size={28} />
            </button>

            <div className="login-container">

                <h1>
                    {isRegister
                        ? 'Create account'
                        : 'Welcome back'}
                </h1>

                <p>
                    {isRegister
                        ? 'Create your Flicksy account'
                        : 'Sign in to your Flicksy account'}
                </p>

                <form onSubmit={handleSubmit}>

                    {isRegister && (
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) =>
                                setUsername(e.target.value)
                            }
                            required
                        />
                    )}

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        required
                    />

                    {isRegister && (
                        <input
                            type="password"
                            placeholder="Repeat password"
                            value={repeatPassword}
                            onChange={(e) =>
                                setRepeatPassword(e.target.value)
                            }
                            required
                        />
                    )}

                    {error && (
                        <p className="login-error">
                            {error}
                        </p>
                    )}

                    <button type="submit">
                        {isRegister
                            ? 'Register'
                            : 'Sign In'}
                    </button>

                </form>

                <p className="register-text">

                    {isRegister
                        ? 'Already have an account?'
                        : "Don't have an account?"}

                    <span
                        onClick={() =>
                            setIsRegister(!isRegister)
                        }
                    >
                        {isRegister
                            ? ' Sign In'
                            : ' Register'}
                    </span>

                </p>

            </div>

        </div>
    );
}

export default Login;