import React, { useContext, useEffect } from 'react';
import { FotovaggContext } from './../context/FotovaggContext';
function Wall() {
  console.log('--WALL COMPONENT')
  const { currentPhotos, page, setPage, totalPages } = useContext(FotovaggContext);

  useEffect(() => {
    console.log('Counter...')
    const counter = setTimeout(() => {
      page === totalPages ? setPage(1) : setPage(page + 1);
    }, 5000)
    return () => {
      clearTimeout(counter)
      console.log('Clear counter...')
    }
  }, [page, totalPages, setPage])

  return (
    <ul className="container">
      {currentPhotos.map((i, index) => {
        console.log(`index: ${index}`)
        return <li className="frame" key={i.id}><img className={"photo img-" + index} alt={i.title} src={`https://live.staticflickr.com/${i.server}/${i.id}_${i.secret}.jpg`} /></li>
      })}
    </ul>
  )
}

export default Wall
