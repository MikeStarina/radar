import { Link } from "react-router";
const Footer = () => {
    return (
        <footer style={{ 
            width: '100%',
            height: '50dvh',
            background: 'black',
            color: 'white',
            padding: '50px'
        }}>
           <Link to='/' style={{fontSize: '40px', textDecoration: 'none'}}>🐱</Link>
        </footer>
    )
}

export default Footer;