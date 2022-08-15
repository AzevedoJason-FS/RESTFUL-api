import './App.css';
import React, { useEffect, useReact } from "react"

function App() {
  const [movies, setMovies] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const API_BASE = process.env.NODE_ENV === 'development' ? `http://localhost:8000` : process.env.REACT_APP_BASE_URL;

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
  return (
    <div className="App">
      <header className="App-header">
       <h2>Movies:</h2>
       <ul>
         <li>Movies</li>
       </ul>
      </header>
    </div>
  );
}

export default App;
