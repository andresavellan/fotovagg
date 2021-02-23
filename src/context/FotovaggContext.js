import React, { useEffect, useState, createContext, useRef } from 'react';

export const FotovaggContext = createContext();

const FotovaggContextProvider = (props) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('Semla');
  const [totalPages, setTotalPages] = useState(1)

  const apiUrl = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=d83d78b867afc81cee8e684569c62d85&content_type=1&media=photos&per_page=6&page=${page}&text=${searchTerm}&format=json&nojsoncallback=1`;

  const [currentPhotos, setCurrentPhotos] = useState([]);

  console.log(`--FOTOVAGG-CONTEXT searchTerm: ${searchTerm} Page: ${page}`)

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch(apiUrl)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)


          const newPhotos = result.photos.photo;
          setCurrentPhotos([...newPhotos])
          setTotalPages(result.photos.pages)
          setIsLoaded(true); ////OBBS SWITCH PLACES?
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [apiUrl])


  const newSearchTerm = (searching) => {
    setSearchTerm(searching)
  }



  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <FotovaggContext.Provider value={
        {
          newSearchTerm,
          currentPhotos,
          page,
          setPage,
          totalPages
        }
      }>
        {props.children}
      </FotovaggContext.Provider>
    );
  }
}

export default FotovaggContextProvider; 
