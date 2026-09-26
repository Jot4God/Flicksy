import './LoginButton.css';

import { IconUser } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

import { auth } from '../../firebase/firebase';

function LoginButton() {

    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(
            auth,
            (currentUser) => {
                setUser(currentUser);
            }
        );

        return () => unsubscribe();

    }, []);

    return (
        <div className="login-button">

            {user ? (

                <button onClick={() => navigate('/profile')}>

                    {user.photoURL ? (

                        <img
                            src={user.photoURL}
                            alt="Profile"
                            className="profile-image"
                        />

                    ) : (

                        <>
                            <IconUser size={30} stroke={2} />

                            <span>
                                {user.displayName || 'Profile'}
                            </span>
                        </>
                    )}

                </button>

            ) : (

                <button onClick={() => navigate('/login')}>
                    <IconUser size={30} stroke={2} />
                </button>

            )}

        </div>
    );
}

export default LoginButton;