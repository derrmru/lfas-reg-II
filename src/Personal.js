import React, {useState, useEffect} from 'react';
import './App.css';

function Personal(props){
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDOB] = useState("");
  const [addressName, setAddressName] = useState("");
  const [addressStreet, setAddressStreet] = useState("");
  const [addressCity, setAddressCity] = useState("");
  const [addressCountry, setAddressCountry] = useState("");
  const [addressPost, setAddressPost] = useState("");
  const [tel, setTel] = useState("");
  const [email, setEmail] = useState("");
  const [GPName, setGPName] = useState("");
  const [GPStreet, setGPStreet] = useState("");
  const [GPCity, setGPCity] = useState("");
  const [GPCountry, setGPCountry] = useState("");
  const [GPPost, setGPPost] = useState("");
  const [insurer, setInsurer] = useState("");
  const [auth, setAuth] = useState("");
  const [membership, setMembership] = useState("");

  useEffect(() => {
    let autocomplete = null;
    const google = window.google;
    autocomplete = new google.maps.places.Autocomplete(document.getElementById('autocomplete'), {})

    let handlePlaceSelect = () => {
      let addressObject = autocomplete.getPlace();
      let address = addressObject.address_components;

      autocomplete.setFields(['address_component']);

      console.log(address);
      for (let i = 0; i < address.length; i++){
	if (address[i].types[0] === 'country'){
	  setAddressCountry(address[i].long_name)
	} else if (address[i].types[0] === 'route'){
	  setAddressStreet(address[i].long_name)
	} else if (address[i].types[0] === 'administrative_area_level_2'){
	  setAddressCity(address[i].long_name)
	} else if (address[i].types.indexOf('postal_code') >= 0){
	  setAddressPost(address[i].long_name)
	} else if (address[i].types.indexOf('street_number') >= 0){
	  setAddressName(address[i].long_name)
	} else if (address[i].types.indexOf('locality') >= 0){
	  setAddressCity(address[i].long_name)
	}
      }

    }

    let autoGP = null;
    autoGP = new google.maps.places.Autocomplete(document.getElementById('GP'), {})

    let handleGPSelect = () => {
      let addressObject = autoGP.getPlace();
      let address = addressObject.address_components;

      for (let i = 0; i < address.length; i++){
        if (address[i].types[0] === 'country'){
          setGPCountry(address[i].long_name)
        } else if (address[i].types[0] === 'route'){
          setGPStreet(address[i].long_name)
        } else if (address[i].types[0] === 'administrative_area_level_2'){
          setGPCity(address[i].long_name)
        } else if (address[i].types.indexOf('postal_code') >= 0){
          setGPPost(address[i].long_name)
        } else if (address[i].types.indexOf('street_number') >= 0){
          setGPName(address[i].long_name)
        } else if (address[i].types.indexOf('locality') >= 0){
          setGPCity(address[i].long_name)
        }
      }

    }

    autocomplete.addListener("place_changed", handlePlaceSelect)
    autoGP.addListener("place_changed", handleGPSelect)

  })

  return (
    <div>
      <div className="reg-border">
	<h1>Registration Form</h1>
	<h2>London Foot & Ankle Surgery</h2>
	<form className="reg-form">
	  <label>
	    First Name: <br />
	    <input type="text" value={firstName}  onChange={e => setFirstName(e.target.value)} required />
	    <br />
	  </label>

	  <label>
            Last Name: <br />
            <input type="text" value={lastName}  onChange={e => setLastName(e.target.value)} required />
	    <br />
          </label>

	  <label>
	    Date of Birth: <br />
	    <input type="date" value={dob}  className="date-picker" onChange={e => setDOB(e.target.value)} required />
	    <br />
	  </label>

	  <label>
	    Address: <br />
	    <input id="autocomplete" type="text" value={addressName} onChange={e => setAddressName(e.target.value)}  required />
	    <br />
	  </label>

	  {addressCountry !== "" ?
	  <>
	  <label>
	    Street: <br />
	    <input type="text" value={addressStreet} onChange={e => setAddressStreet(e.target.value)}  required />
	    <br />
	  </label>
	  <label>
	    City: <br />
	    <input type="text" onChange={e => setAddressCity(e.target.value)}  value={addressCity} />
	    <br />
	  </label>
	  <label>
	    Country: <br />
	    <input type="text" onChange={e => setAddressCountry(e.target.value)}  value={addressCountry}  required />
	    <br />
	  </label>
	  <label>
	    Post/Zip Code: <br />
	    <input type="text" onChange={e => setAddressPost(e.target.value)}  value={addressPost}  required />
	    <br />
	  </label>
	  </>
	  :
	  <></>}

	  <label>
	    Contact Number: <br />
	    <input type="text" value={tel} onChange={e => setTel(e.target.value)} required />
	    <br />
	  </label>

	  <label>
	    Email Address: <br />
	    <input type="email" value={email}  onChange={e => setEmail(e.target.email)} required />
	    <br />
	  </label>

	  <label>
            GP Address: <br />
            <input id="GP" type="text" value={GPName} onChange={e => setGPName(e.target.value)} required />
            <br />
          </label>

          {GPName !== "" && GPStreet !== "" && GPPost !== "" ?
          <>
          <label>
            Street: <br />
            <input type="text" onChange={e => setGPStreet(e.target.value)} value={GPStreet}  required />
            <br />
          </label>
          <label>
            City: <br />
            <input type="text" onChange={e => setGPCity(e.target.value)} value={GPCity} />
            <br />
          </label>
          <label>
            Country: <br />
            <input type="text" onChange={e => setGPCountry(e.target.value)} value={GPCountry} required />
            <br />
          </label>
          <label>
            Post/Zip Code: <br />
            <input type="text" onChange={e => setGPPost(e.target.value)} value={GPPost} required />
            <br />
          </label>
          </>
          :
          <></>}

	  <label>
	  Method of Payment: <br />
	  <select name="insurer" value={insurer} onChange={e => setInsurer(e.target.value)} required>
                <option value="" disabled defaultValue>-Select a method of payment-</option>
                <option value="self-funding">Self-funding</option>
                <option value="aetna">Aetna</option>
                <option value="cigna">Allianz</option>
                <option value="bupa">Bupa</option>
                <option value="aviva">Aviva</option>
                <option value="axa-ppp">AXA PPP</option>
                <option value="axa-ppp-international">AXA PPP International</option>
                <option value="cigna">Cigna</option>
                <option value="cigna-international">Cigna International</option>
                <option value="exeter-friendly">Exeter Friendly</option>
                <option value="healix">Healix</option>
                <option value="simply-health">Simply Health</option>
                <option value="vitality">Vitality</option>
          </select>
	  <br />
	  </label>

	  {insurer !== "" && insurer !== 'self-funding' ?
	    <>
	    <hr />
	    <label>
	      Membership / Policy Number: <br />
	      <input type="text" value={membership} onChange={e => setMembership(e.target.value)} required />
	      <br />
	    </label>

	    <label>
              Authorisation Number: <br />
              <input type="text" value={auth} onChange={e => setAuth(e.target.value)} />
              <br />
            </label>
	    <hr />
	    </>
	    :
	    <></>
	  }
	</form>
	<button onClick={props.stage('medical')}>next</button>

      </div>
    </div>
  );
}

export default Personal;
