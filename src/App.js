import React, {useState} from 'react';
import Personal from './Personal';
import './App.css';

function App() {
  const [stage, setStage] = useState("medical");

  let reRender = (e) => {
    setStage(e)
  }

  if ({stage} !== "personal") {
    return  (
	<Personal stage={(e) => reRender(e)}  />
    )
  } else if ({stage} === "medical") {
    return <>What</>
  } else {
    return <>whatever</>
  }

}

export default App;
