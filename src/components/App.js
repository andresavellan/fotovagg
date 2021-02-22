
import FotovaggContextProvider from './../context/FotovaggContext';
import { MemoizedSearch } from './Search';
import { MemoizedWall } from './Wall'
import './../assets/css/App.css';

function App() {
  console.log('--APP COMPONENT')

  return (
    <div className="App">
      <FotovaggContextProvider>
        <MemoizedSearch />
        <MemoizedWall />
      </FotovaggContextProvider>
    </div>
  );
}

export default App;
