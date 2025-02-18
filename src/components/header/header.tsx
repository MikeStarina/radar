import styles from './header.module.css';
import { Button } from 'antd';
import { Link } from 'react-router';
import { useLocation, useNavigate } from 'react-router';
import { logout } from '../../api/api';
import { useAuth } from '../../utils/hooks';

export const Header = () => {
    const { pathname } = useLocation()
    const { token } = useAuth()
    const nav = useNavigate()
    const logoutClickHandler = async () => {
        const res = await logout(token);

        if (res.isSuccess) {
            nav('/signin')
            document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        }
    } 
    return (
        <>
        {pathname !== '/signin' && pathname !== '/signup' && <header className={styles.header}>
            <Link to='/' style={{fontSize: '40px', textDecoration: 'none'}}>🐱</Link>
                <Button
                    type='primary'
                    onClick={logoutClickHandler}
                >
                    Logout
                </Button>
        </header>}
        </>
    )
}

export default Header;