import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from 'react-router-dom';

import '../App.css';

function Movie() {
  const [movies, setMovies] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [values, setValues] = useState({
      name: '',
      collection_Name: '',
      year: ''
  })

  const { id } = useParams()
  const navigate = useNavigate();

  const API_BASE = process.env.NODE_ENV === 'development' ? `http://localhost:8000/api/v1` : process.env.REACT_APP_BASE_URL;
  let ignore = false;

  useEffect(() => {
 
    if(!ignore){
      getMovie();
    }

    return () => {
      ignore = true;
    }
  },[])

  const getMovie = async () => {
    setLoading(true)
    try{
      await fetch(`${API_BASE}/movies/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log({data})
        setValues({
            name: data.name,
            collection_Name: data.collection_Name,
            year: data.year
        })
      })
    }catch(error){
      setError(error.message || "Unexpected Error")
    } finally {
      setLoading(false)
    }
  }

  const deleteMovie = async () => {
    try{
        await fetch(`${API_BASE}/movies/${id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
          setMovies(data)
          navigate("/dashboard", { replace: true })
        })
      }catch(error){
        setError(error.message || "Unexpected Error")
      } finally {
        setLoading(false)
      }
  }

  const updateMovie = async () => {
    try{
        await fetch(`${API_BASE}/movies/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
        .then(res => res.json())
        .then(data => {
          console.log({data})
        })
      }catch(error){
        setError(error.message || "Unexpected Error")
      } finally {
        setLoading(false)
      }
  }

  const handleSubmit = (e) => {
      e.preventDefault();
      updateMovie();
  }

  const handleInputChanges = (e) => {
      e.persist();
      setValues((values) => ({
          ...values,
          [e.target.name]:e.target.value
      }))
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie Profile</h1>
        <h2>{values && values.name}</h2>
        <h2>{values && values.collection_Name}</h2>
        <button onClick={() => deleteMovie()}> Delete Movie</button>
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>

        <form onSubmit={(e) => handleSubmit(e)}>
            <label>
                Name:
                <input type="text" name="name" value={values.name} onChange={handleInputChanges} />
            </label>
            <label>
                Name:
                <input type="text" name="collection_Name" value={values.collection_Name} onChange={handleInputChanges} />
            </label>
            <input type="submit" value="Submit" />
        </form>
      </header>
    </div>
  );
}

export default Movie;
