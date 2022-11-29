import './App.css';

import ModeSelect from './components/ModeSelect';
import BookButtons from './containers/BookButtons';
import Combinatoria from './components/Combinatoria'

function App() {
  
  return (
    <div className="App">
      <div className='row-container'>
        <ModeSelect />
        <Combinatoria />
        <BookButtons />
      </div>
    </div>
  );
}

export default App;
