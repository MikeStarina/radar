import styles from './header.module.css';
import { Button } from 'antd';
import { Link } from 'react-router';
import { useLocation } from 'react-router';

export const Header = () => {
    const { pathname } = useLocation()
    return (
        <>
        {pathname !== '/signin' && pathname !== '/signup' && <header className={styles.header}>
            <Link to='/' style={{fontSize: '40px', textDecoration: 'none'}}>🐱</Link>
                <Button
                    type='primary'
                >
                    Logout
                </Button>
        </header>}
        </>
    )
}

export default Header;