import '../App.css';
import React, { useEffect, useState } from "react"
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

  const API_BASE = process.env.NODE_ENV === 'development' ? `http://localhost:8000/api/v1` : process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    let ignore = false;
    if(!ignore){
      getMovies();
    }
    return () => {
      ignore = true;
    }
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
    <div className="App">
      <header className="App-header">
       <h2>Movies:</h2>
       <Link to="/">Home</Link>
       <ul>
       {
                movies && movies.map(movie => (
                    <li key={movie._id}>
                        <Link to={`/movie/${movie._id}`}>{movie.name}</Link>
                    </li>
                ))
            }
       </ul>
       <form onSubmit={(e) => handleSubmit(e)}>
           <label>
               Name:
               <input type="text" name="name" value={values.name} onChange={handleInputChange} />
           </label>
           <label>
               Collection Name:
               <input type="text" name="collection_Name" value={values.collection_Name} onChange={handleInputChange} />
           </label>
           <label>
               Year:
               <input type="text" name="year" value={values.year} onChange={handleInputChange} />
           </label>
            <input type="submit" value="Submit" />
       </form>
      </header>
    </div>
  );
}

export default Dashboard;
