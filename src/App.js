import './App.css';

import ModeSelect from './components/ModeSelect';
import BookButtons from './containers/BookButtons';
import Combinatoria from './components/Combinatoria'

function App() {
  
  return (
    <div className="App">
      <ModeSelect />
      <div className='column-container'>
        <BookButtons />
      </div>
        <Combinatoria />
    </div>
  );
}

export default App;
