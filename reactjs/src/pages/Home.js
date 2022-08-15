import { Link } from 'react-router-dom'
import Header from '../components/Header'
import { FaGithub } from 'react-icons/fa';

function Home() {
  
  return (
    <div className="App">
      <Header />
      <div style={styles.main}>
        <h2 style={styles.title}>Movies</h2>
        <div style={styles.bubbleBox}>
          <span style={styles.bubble}>npm</span>
          <span style={styles.bubble}>MongoDB</span>
          <span style={styles.bubble}>Express</span>
          <span style={styles.bubble}>React</span>
          <span style={styles.bubble}>NodeJs</span>
        </div>
        <p style={styles.description}>This is a RESTFUL-API React Application. Fully launched on Heroku with a fully functional CRUD through MongoDB</p>
        <a href="https://github.com/AzevedoJason-FS/RESTFUL-api" style={styles.githubLink}> <FaGithub /> AzevedoJason-FS/RESTFUL-api </a>
       </div>
    </div>
  );
}

export default Home;

const styles = {
  title: {
    fontSize: '60px',
    borderBottom: '1px solid grey',
    textAlign: 'left',
    marginBottom: '1rem'
  },

  main: {
    display: 'flex',
    width: '80%',
    margin: 'auto',
    flexDirection: 'column'
  },

  description: {
    textAlign: 'left',
    fontSize: '20px'
  },

  bubble: {
    padding: '10px',
    background: 'orange',
    marginRight: '1rem',
    borderRadius: '40px',
    color: 'white',
    fontWeight: '700',
    fontSize: '14px'
  },

  bubbleBox: {
    textAlign: 'left',
    marginBottom: '2rem'
  },

  githubLink: {
    fontSize: '20px',
    textDecoration: 'none',
    textAlign: 'left',
    marginTop: '1rem'
  }
}