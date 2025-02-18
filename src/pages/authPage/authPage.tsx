import React from "react";
import AuthForm from "../../components/auth-components/authForm";
import { Link } from "react-router";
import styles from './authPage.module.css'



type TAuthPageProps = {
    role: 'signin' | 'signup' // or use useLocation instead
}


const AuthPage: React.FC<TAuthPageProps> = ({ role }) => {

    // signin
    if (role === 'signin') {
        return (
            <section className={styles.page}>
                <h1 className={styles.title}>Вход:</h1>
                <AuthForm role={role} />
                <div className={styles.bottom}>
                    Нет аккаунта? <Link to='/signup'>Регистрация</Link>
                </div>
            </section>
        )
    }


    // signup
    if (role === 'signup') {
        return (
            <section className={styles.page}>
                <h1 className={styles.title}>Регистрация:</h1>
                <AuthForm role={role} />
                <div className={styles.bottom}>
                    Уже есть аккаунт? <Link to='/signin'>Войти</Link>
                </div>
            </section>
        )
    }
    
}

export default AuthPage;