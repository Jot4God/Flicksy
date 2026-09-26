import './LoginButton.css';
import { IconUser } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

function LoginButton() {

    const navigate = useNavigate();

    return (
        <div className="login-button">
            <button onClick={() => navigate('/login')}>
                <IconUser size={30} stroke={2} />
            </button>
        </div>
    );
}

export default LoginButton;