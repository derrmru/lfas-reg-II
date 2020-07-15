import React, {useState} from 'react';
import Personal from './Personal';
import Medical from './Medical';
import Submit from './Submit';
import Complete from './Complete';
import './App.css';

function App() {
  const [stage, setStage] = useState("personal");
  const [fields, setFields] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    addressName: "",
    addressStreet: "",
    addressCity: "",
    addressCountry: "",
    addressPost: "",
    tel: "",
    email: "",
    GPName: "",
    GPStreet: "",
    GPCity: "",
    GPCountry: "",
    GPPost: "",
    insurer: "",
    auth: "",
    membership: ""
  })

  let updateFields = (d) => {
    setFields(d);
  }

  let reRender = (e) => {
    setStage(e)
  }

  return (
    stage === "personal" ? 
      <Personal reRender={reRender} fields={fields} updateFields={updateFields} /> : stage === "medical" ? 
      <Medical reRender={reRender} fields={fields} updateFields={updateFields} /> : stage === "submit" ?
      <Submit reRender={reRender} fields={fields} /> : <Complete />
  )
}

export default App;
