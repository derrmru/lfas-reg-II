import React, {useState, useEffect, useRef} from 'react';
import './App.css';

function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDOB] = useState("");
  const [addressName, setAddressName] = useState("");
  const [addressStreet, setAddressStreet] = useState("");
  const [addressCity, setAddressCity] = useState("");
  const [addressCountry, setAddressCountry] = useState("");
  const [addressPost, setAddressPost] = useState("");

  useEffect(() => {
    let autocomplete = null;
    const google = window.google;
    autocomplete = new google.maps.places.Autocomplete(document.getElementById('autocomplete'), {})

    let handlePlaceSelect = () => {
      let addressObject = autocomplete.getPlace();
      let address = addressObject.address_components;

      setAddressName(address[0].long_name)
      setAddressStreet(address[1].long_name)
      setAddressCity(address[3].long_name)
      setAddressCountry(address[6].long_name)
      setAddressPost(address[7].long_name)
    }


    autocomplete.addListener("place_changed", handlePlaceSelect)

  })

  return (
    <div>
      <div className="reg-border">
	<form className="reg-form">
	<h1>Registration Form</h1>
	<h2>London Foot & Ankle Surgery</h2>
	  <label>
	    First Name: <br />
	    <input type="text" onChange={e => setFirstName(e.target.value)} required />
	    <br />
	  </label>

	  <label>
            Last Name: <br />
            <input type="text" onChange={e => setLastName(e.target.value)} required />
	    <br />
          </label>

	  <label>
	    Date of Birth: <br />
	    <input type="date" className="date-picker" onChange={e => setDOB(e.target.value)} required />
	    <br />
	  </label>

	  <label>
	    Address: <br />
	    <input id="autocomplete" type="text" value={addressName} onChange={e => setAddressName(e.target.value)}  required />
	    <br />
	  </label>

	  {addressName !== "" && addressStreet !== "" && addressPost !== "" ?
	  <>
	  <label>
	    Street: <br />
	    <input id="autocomplete" type="text" value={addressStreet}  required />
	    <br />
	  </label>
	  <label>
	    City: <br />
	    <input id="autocomplete" type="text" value={addressCity} />
	    <br />
	  </label>
	  <label>
	    Country: <br />
	    <input id="autocomplete" type="text" value={addressCountry}  required />
	    <br />
	  </label>
	  <label>
	    Post/Zip Code: <br />
	    <input id="autocomplete" type="text" value={addressPost}  required />
	    <br />
	  </label>
	  </>
	  :
	  <></>}

	</form>
      </div>
    </div>
  );
}

export default App;
