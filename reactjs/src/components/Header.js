import { RiMovie2Line } from 'react-icons/ri';
import { Link } from 'react-router-dom'

const Header = () => {
    return(
        <header style={styles.header}>
            <div style={styles.title}>
                <RiMovie2Line style={styles.headerIcon}/>
                <h2>movieposters</h2>
            </div>
            <div style={styles.nav}>
                <Link to="/" style={styles.navLink}>Home</Link>
                <Link to="/dashboard" style={styles.navLink}>Dashboard</Link>
            </div>
        </header>
    )
}

export default Header;

const styles = {
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#1abc9c',
        color: 'white',
        fontSize: '30px'
      },
    
    headerIcon: {
        fontSize: '50px',
        marginLeft: '4rem',
        paddingRight: '4px'
    },

    nav: {
        marginRight: '3rem'
    },

    navLink: {
        margin: '0 1rem 0 0',
        color: 'white',
        textDecoration: 'none',
        fontWeight: '700'
    },

    title: {
        display: 'flex',
        alignItems: 'center',
    }
}