
import Search from './Search';
import Wall from './Wall'
import './../assets/css/App.css';

function App() {
  console.log('--APP COMPONENT')

  return (
    <div className="App">
      <Search />
      <Wall />
    </div>
  );
}

export default App;
