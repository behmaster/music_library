import { useEffect, useState, useRef, Fragment, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Gallery from "./components/Gallery";
import SearchBar from "./components/SearchBar";
import AlbumView from "./components/AlbumView";
import ArtistView from "./components/ArtistView";
import Spinner from "./components/Spinner";
import { DataContext } from "./context/DataContext";
import { SearchContext } from "./context/SearchContext";
import { createResource as fetchData } from './helper'

const App = () => {
  let [searchTerm, setSearchTerm] = useState("");
  let [message, setMessage] = useState("Search for Music!");
  let [data, setData] = useState(null);
  let searchInput = useRef("");

  const API_URL = `https://itunes.apple.com/search?term=`;

//   useEffect(() => {
//     if (searchTerm) {
//       document.title=`${searchTerm} Music`
//       console.log(fetchData(searchTerm))
//       setData(fetchData(searchTerm))
//   }
//   }, [searchTerm])

//   const handleSearch = (e, searchTerm) => {
//     e.preventDefault()
//     setSearchTerm(searchTerm)
//   }

// //Solution code2
  const handleSearch = (e, term) => {
    e.preventDefault()
    setData(fetchData(term))
  }

//ORIGINAL CODE === this code works
//   const handleSearch = (e, term, path) => {
//     e.preventDefault();
//     const fetchData = async () => {
//       document.title = `${term} Music`;
//       const response = await fetch(API_URL + term);
//       const resData = await response.json();
//       if (resData.results.length > 0) {
//         return setData(resData.results);
//       } else {
//         return setMessage("Not Found.");
//       }
//     };
//     fetchData();
//   };

const renderGallery = () => {
    if(data){
      return (
        <Suspense fallback={<Spinner />}>
          <Gallery data={data} />
        </Suspense>
      )
    }
  }

  return (
    <div>
      {message}
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Fragment>
                <SearchContext.Provider
                  value={{
                    term: searchInput,
                    handleSearch: handleSearch,
                  }}
                >
                  <SearchBar />
                </SearchContext.Provider>
                <DataContext.Provider value={data}>
                  {renderGallery()}
                </DataContext.Provider>
              </Fragment>
            }
          />
          <Route path="/album/:id" element={<AlbumView />} />
          <Route path="/artist/:id" element={<ArtistView />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
