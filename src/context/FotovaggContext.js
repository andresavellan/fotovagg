import React, { useEffect, useState, createContext, useRef } from 'react';
import loader from './../assets/img/circles.svg'

export const FotovaggContext = createContext();

const FotovaggContextProvider = (props) => {
  //States 
  const [error, setError] = useState(null);
  const [render, setRender] = useState(false);
  //Refs
  const isLoadedRef = useRef(false);
  const pageRef = useRef(1);
  const searchTermRef = useRef('Semla');
  const totalPagesRef = useRef();
  const newPhotosRef = useRef([]);
  const timerRef = useRef();

  //Fetch data. 1st round show without pause, second and forward with pause.
  useEffect(() => {

    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=d83d78b867afc81cee8e684569c62d85&content_type=1&media=photos&per_page=6&page=${pageRef.current}&text=${searchTermRef.current}&format=json&nojsoncallback=1`)
      .then(res => res.json())
      .then(
        (result) => {
          newPhotosRef.current = result.photos.photo;
          totalPagesRef.current = result.photos.pages;
          isLoadedRef.current = true;

          if (pageRef.current === 1) {
            pageRef.current = 2;
            setRender(render => !render);
            //pauses from second round onwards
          } else if (pageRef.current > 1) {
            timerRef.current = setTimeout(() => {
              if (pageRef.current === totalPagesRef.current) {
                pageRef.current = 1;
              } else {
                pageRef.current += 1;
              }
              setRender(render => !render);
            }, 7000);

          }
        },
        (error) => {
          isLoadedRef.current = true;
          setError(error);
        }
      )
    return () => {
      clearTimeout(timerRef.current);
    }
  }, [render]);
  //search function from search component. Reset and ads new search term.
  const newSearch = (newSearchTerm) => {
    clearTimeout(timerRef.current);
    isLoadedRef.current = false;
    pageRef.current = 1;
    searchTermRef.current = newSearchTerm;
    setRender(render => !render);
  }

  if (error) {
    return (
      <div className="error">
        <p>Error: {error.message}</p>
      </div>
    )
  } else if (isLoadedRef.current !== true) {
    return <div className="loader" ><img src={loader} width="160" alt="loader" /></div>;
  } else {
    return (
      <FotovaggContext.Provider value={
        {
          pageRef,
          newSearch,
          newPhotosRef,
          render
        }
      }>
        {props.children}
      </FotovaggContext.Provider>
    );
  }
}
export default FotovaggContextProvider; 
