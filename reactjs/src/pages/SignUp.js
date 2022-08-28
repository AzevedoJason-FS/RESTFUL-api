import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { useState } from 'react';
import authService from '../services/auth.service';

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try{
      await authService.signup(email, password).then(
      response => {
        navigate("/dashboard")
      })
    }catch(error){
      console.error(error)
    }
  }
  
  return (
    <div className="App">
      <Header />
      <h2 style={styles.title}>Signup</h2>
      <section>
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
           <input
            type="password"
            placeholder='email'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type='submit'>Sign Up</button>
        </form>
      </section>
    </div>
  );
}

export default Signup;

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