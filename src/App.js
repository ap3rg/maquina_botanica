import './App.css';
import { RefApplicationParameterHook } from './hooks/ApplicationParamatersHook';
import { SELECTED_MODE } from './Constants';
import { ModeSelect } from './comonents/parameters/applicationParameters';

function App() {
  
  const selectedMode = RefApplicationParameterHook(SELECTED_MODE)
  
  return (
    <div className="App">
      <ModeSelect />
      {selectedMode}

    </div>
  );
}

export default App;
