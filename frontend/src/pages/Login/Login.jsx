import './Login.css';
import { IconArrowLeft } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();

    return (
        <div className="login-page">

            <button
                className="back-button"
                onClick={() => navigate('/')}
            >
                <IconArrowLeft size={28} />
            </button>

            <div className="login-container">
                <h1>Welcome back</h1>
                <p>Log in to your Flicksy account</p>

                <form>
                    <input
                        type="email"
                        placeholder="Email"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                    />

                    <button type="submit">
                        Login
                    </button>
                </form>
            </div>

        </div>
    );
}

export default Login;