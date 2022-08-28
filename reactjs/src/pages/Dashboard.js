import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from 'react-router-dom'
import authService from "../services/auth.service"
import moviesService from "../services/movies.service"
import Header from '../components/Header'
import { Link } from 'react-router-dom'

function Dashboard() {
  const [movies, setMovies] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [values, setValues] = useState({
    name: '',
    collection_Name: '',
    year: ''
})

const navigate = useNavigate();

  const API_BASE = process.env.NODE_ENV === 'development' ? `http://localhost:8000/api/v1` : process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    moviesService.getAllPrivateMovies().then(
      response => {
        setMovies(response.data)
      },
      (error) => {
        console.log('secured page error: ', error.response)
        if(error.response && error.response.status == 403){
          authService.logout();
          navigate('/login')
        }
      }
    )
    // if(!ignore){
    //   getMovies();
    // }
    // return () => {
    //   ignore = true;
    // }
  }, [])

  const getMovies = async () => {
    setLoading(true)
    try{
      await fetch(`${API_BASE}/movies`)
      .then(res => res.json())
      .then(data => {
        console.log({data})
        setMovies(data)
      })
    }catch(error){
      setError(error.message)
    } finally{
      setLoading(false)
    }
  }



  const createMovie = async () => {
    try{
        await fetch(`${API_BASE}/movies`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
        .then( () => getMovies())
      }catch(error){
        setError(error.message)
      } finally{
        setLoading(false)
      }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    createMovie();
  }

  const handleInputChange = (e) => {
    e.persist();
    setValues((values) => ({
        ...values,
        [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="App" style={styles.app}>
      <Header />
       <ul style={styles.ul}>
         <h4 style={styles.title}>All Movies In Database:</h4>
       {
                movies && movies.map(movie => (
                    <li key={movie._id}>
                        <Link to={`/movie/${movie._id}`} style={styles.link}>{movie.name}</Link>
                    </li>
                ))
            }
       </ul>
       <div style={styles.formBox}>
       <form onSubmit={(e) => handleSubmit(e)} style={styles.form}>
        <h2 style={styles.formTitle}>Create Movie</h2>
           <label style={styles.label}>
               Name:
               <input style={styles.input} type="text" name="name" value={values.name} onChange={handleInputChange} />
           </label>
           <label style={styles.label}>
               Collection Name:
               <input style={styles.input} type="text" name="collection_Name" value={values.collection_Name} onChange={handleInputChange} />
           </label>
           <label style={styles.label}>
               Year:
               <input style={styles.input} type="text" name="year" value={values.year} onChange={handleInputChange} />
           </label>
            <input style={styles.submitButton} type="submit" value="Submit" />
       </form>
       </div>
    </div>
  );
}

export default Dashboard;

const styles = {
  app: {
    minHeight: '100vh',
    fontSize: 'calc(10px + 2vmin)',
    color: 'white',
  },

  formBox: {
    display: 'flex',
    justifyContent: 'center'
  },

  form: {
    maxWidth: '800px',
    maxHeigth: '400px',
    display: 'flex',
    flexDirection: 'column',
    padding: '60px',
    boxShadow: 'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
    borderRadius: '12px',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },

  formTitle: {
    color: 'black',
    marginTop: '0',
    fontSize: '30px'
  },

  label: {
    color: 'black',
    fontSize: '20px',
    marginBottom: '2rem'
  },

  input: {
    display: 'flex',
    justifyContent: 'flex-end',
  },

  submitButton: {
    background: '#1abc9c',
    border: 'none',
    color: 'white',
    fontSize: '24px',
    padding: '10px',
    width: '100%',
    cursor: 'pointer'
  },

  link: {
    color: 'blue',
    fontSize: '20px'
  },

  ul: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    margin: '0 0 6rem 2rem',
    alignItems: 'flex-start'
  },

  title: {
    color: 'black'
  }
}
