import "./App.css";
import Banner from "./components/Banner";
import Movies from "./components/Movies";
import Navbar from "./components/Navbar";
import WatchList from "./components/WatchList";
import Pagination from "./components/Pagination";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

function App() {

    let [watchlist, setWatchList] = useState([])


    let handleAddtoWatchList = (movieObj) => {
        let newWatchList = [...watchlist, movieObj]
        localStorage.setItem('moviesApp', JSON.stringify(newWatchList))
        setWatchList(newWatchList)
        console.log(newWatchList)
    }

    let handleRemoveFromWatchList = (movieObj) => {
      let filteredWatchList = watchlist.filter((movie)=>{
        return movie.id != movieObj.id
      })

      localStorage.setItem('moviesApp', JSON.stringify(filteredWatchList))

      setWatchList(filteredWatchList)
  }

  useEffect(()=>{
    let moviesFromLocalStorage = localStorage.getItem('moviesApp')
    if(!moviesFromLocalStorage){
      return
    }
    setWatchList(JSON.parse(moviesFromLocalStorage))
  }, [])
     
  return (
    <>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route
            path="/"
            element={
              <>
                 
                 <Banner /> <Movies watchlist={watchlist} handleAddtoWatchList={handleAddtoWatchList} handleRemoveFromWatchList={handleRemoveFromWatchList} />
              </>
            }
          />

          <Route path="/watchlist" element={<WatchList watchlist={watchlist} setWatchList={setWatchList} handleRemoveFromWatchList={handleRemoveFromWatchList}/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
