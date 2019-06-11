import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Images from './Components/Images';

const App = () => {
    const [movies, setMovies] = useState([]);
    const [loaded, setLoaded] = useState(false);
    
    // const fetchData = async () => {
    //   const result = await axios.get(`http://localhost:8090/workshop/wordpress/wp-json/wp/v2/media/${data._links['wp:featuredmedia'][0].href}`);
    //   setImageUrl(result.data.media_details.sizes.full.source_url);
    // };

    useEffect(()=>{
      let mounted = true;
      const loadData = async() => {
      await axios.get('http://localhost:8090/workshop/wordpress/wp-json/wp/v2/movies')
      .then(response =>{
       
        if(mounted){
          setMovies(response.data);
          

      }
      })
      .catch(err => {
        console.log(err)
      });
         
      };
      loadData();
      return () => {
          mounted = false;
          setLoaded(true);
      }
  },[movies.length]);
  console.log(movies)
  if(loaded){
    return (
        <div>
            <h1>Star Wars Movies</h1>
          {movies.slice(0).reverse().map(movie => (
             <div className="post" key={movie.id}>
               {/* <img src={imageUrl} /> */}
               <Images movie={movie}/>
               <p><strong>Title:</strong> {movie.title.rendered}</p>
                <p><strong>Release Year:</strong> {movie.acf.release_year}</p>
                <p><strong>Rating:</strong> {movie.acf.rating}</p>
               <div><strong>Description:</strong><div dangerouslySetInnerHTML={ {__html: movie.acf.description} } /></div>
               </div>
          ))
        }
        </div>
      )
  }
  return <h3>Loading..</h3>
}


export default App;
