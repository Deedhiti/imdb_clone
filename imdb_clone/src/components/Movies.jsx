import React from 'react'
import MovieCard from './MovieCard'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import Pagination from './Pagination'

function Movies({handleAddtoWatchList,handleRemoveFromWatchList,watchlist}) {

    const [movies, setMovies] = useState([])
    const [pageNo, setPageNo] = useState(1)


    const handlePrev = () => {
        if(pageNo==1){
            setPageNo(1)
        }
        else{
            setPageNo(pageNo-1)
        }
        
    }

    const handleNext = () => {
        setPageNo(pageNo+1)
    }

    useEffect(()=>{
        axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=e71b88711881b4bfbff9a8f64d450cad&language=en-US&page=${pageNo}`).then(function(res){
            
            setMovies(res.data.results)
        })
    }, [pageNo])
  return (
    <div className='p-5'>
        <div className='text-2xl m-5 text-center font-bold '>
            Trending Movies
        </div>

        <div className='flex flex-row flex-wrap justify-around gap-8'>
            {movies.map((movieObj)=>{
                return <MovieCard key={movieObj.id} movieObj={movieObj} poster_path={movieObj.poster_path} name={movieObj.original_title} handleAddtoWatchList={handleAddtoWatchList} handleRemoveFromWatchList={handleRemoveFromWatchList} watchlist={watchlist}/>

        })}

            
            
        </div>

        <Pagination pageNo={pageNo} handleNext={handleNext} handlePrev={handlePrev}/>
    </div>
  )
}

export default Movies


