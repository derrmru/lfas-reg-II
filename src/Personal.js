import React, {useState, useEffect} from 'react';
import TextInput from './components/textInput/textInput';
import './App.css';

let Personal = (props) => {
  //form fields held as state
  const [firstName, setFirstName] = useState(props.fields.firstName);
  const [lastName, setLastName] = useState(props.fields.lastName);
  const [dob, setDOB] = useState(props.fields.dob);
  const [addressName, setAddressName] = useState(props.fields.addressName);
  const [addressStreet, setAddressStreet] = useState(props.fields.addressStreet);
  const [addressCity, setAddressCity] = useState(props.fields.addressCity);
  const [addressCountry, setAddressCountry] = useState(props.fields.addressPost);
  const [addressPost, setAddressPost] = useState(props.fields.addressPost);
  const [tel, setTel] = useState(props.fields.tel);
  const [email, setEmail] = useState(props.fields.email);
  const [GPName, setGPName] = useState(props.fields.GPName);
  const [GPStreet, setGPStreet] = useState(props.fields.GPStreet);
  const [GPCity, setGPCity] = useState(props.fields.GPCity);
  const [GPCountry, setGPCountry] = useState(props.fields.GPCountry);
  const [GPPost, setGPPost] = useState(props.fields.GPPost);
  const [insurer, setInsurer] = useState(props.fields.insurer);
  const [auth, setAuth] = useState(props.fields.auth);
  const [membership, setMembership] = useState(props.fields.membership);

  useEffect(() => {
    //google address auto complete
    let autocomplete = null;
    const google = window.google;
    autocomplete = new google.maps.places.Autocomplete(document.getElementById('autocomplete'), {})

    let handlePlaceSelect = () => {
      let addressObject = autocomplete.getPlace();
      let address = addressObject.address_components;

      autocomplete.setFields(['address_component']);

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

    //google address autocomlete for GP address details
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

  //data validation function and render phase of application
  let onClick = () => {
    let thisForm = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      dob: dob,
      addressName: addressName,
      addressStreet: addressStreet,
      addressCity: addressCity,
      addressCountry: addressCountry,
      addressPost: addressPost,
      tel: tel,
      email: email,
      GPName: GPName,
      GPStreet: GPStreet,
      GPCity: GPCity,
      GPCountry: GPCountry,
      GPPost: GPPost,
      insurer: insurer,
      auth: auth,
      membership: membership
    }

    let theFields = props.fields;
    
    Object.assign(theFields, thisForm)

    props.updateFields(theFields);

    //Form Validation - replace in next version with type-specific validity checks
    let forms = document.forms[0];
    let requiredFields = [
      "firstName", 
      "lastName", 
      "dob", 
      "addressName", 
      "tel", 
      "email", 
      "insurer", 
    ] 

    let fieldCount = requiredFields.length;

    requiredFields.map(x => {
      if (forms[x].value === "" || forms[x].value === undefined) {
        fieldCount += 1;
        return forms[x].style = "border: 3px solid red;" 
      } else {
        fieldCount -= 1;
        return forms[x].style = "border: 1pz solid black;"
      }
    })

    fieldCount === 0 ? props.reRender("medical") : console.log(fieldCount);
  }

  return (
    <div>
      <div className="reg-border">
      <h1>Registration Form</h1>
      <h2>London Foot & Ankle Surgery</h2>
      <div>If any fields are not relevant, please use 'N/A'</div>
      <hr />
      <form className="reg-form">
        <TextInput 
          label='First Name'
          required={true}
          update={e => setFirstName(e)}
          name="firstName"
          value={firstName}
          placeholder='e.g. John'
          />
        <TextInput 
          label='Last Name'
          required={true}
          update={e => setLastName(e)}
          name="lastName"
          value={lastName}
          placeholder='e.g. Smith'
          />

        <label>
          Date of Birth: <div className="required-label">*required</div> <br />
          <input type="date" name="dob" value={dob}  className="date-picker" onChange={e => setDOB(e.target.value)} />
          <br />
        </label>

        <label>
          Address: <div className="required-label">*required</div> <br />
          <input id="autocomplete" type="text" name="addressName" value={addressName} onChange={e => setAddressName(e.target.value)} />
          <br />
        </label>

        {addressCountry !== "" ?
        <>
        <div className="address-details">
          <label>
            Street: <br />
            <input className="address-part" type="text" value={addressStreet} onChange={e => setAddressStreet(e.target.value)} />
            <br />
          </label>
          <label>
            City: <br />
            <input className="address-part" type="text" onChange={e => setAddressCity(e.target.value)}  value={addressCity} />
            <br />
          </label>
          <label>
            Country: <br />
            <input className="address-part" type="text" onChange={e => setAddressCountry(e.target.value)}  value={addressCountry} />
            <br />
          </label>
          <label>
            Post/Zip Code: <br />
            <input className="address-part" type="text" onChange={e => setAddressPost(e.target.value)}  value={addressPost} />
            <br />
          </label>
        </div>
        </>
        :
        <></>}

        <TextInput 
          label='Contact Number'
          required={true}
          update={e => setTel(e)}
          name="tel"
          value={tel}
          placeholder='e.g. +44 7512 345 678'
          />
        <TextInput 
          label='Email Address'
          required={true}
          update={e => setEmail(e)}
          name="email"
          value={email}
          placeholder='e.g. example@example.com'
          />

        <label>
          GP Address: <div style={{fontSize: "11px", float: "right", marginRight: "20px"}}>Enter 'N/A' if you do not have a GP</div> <br />
          <input id="GP" type="text" name="GPName" value={GPName} onChange={e => setGPName(e.target.value)} />
          <br />
        </label>

              {GPName !== "" && GPStreet !== "" && GPPost !== "" ?
              <>
              <div className="address-details">
                <label>
                  Street: <br />
                  <input className="address-part" type="text" onChange={e => setGPStreet(e.target.value)} value={GPStreet} />
                  <br />
                </label>
                <label>
                  City: <br />
                  <input className="address-part" type="text" onChange={e => setGPCity(e.target.value)} value={GPCity} />
                  <br />
                </label>
                <label>
                  Country: <br />
                  <input className="address-part" type="text" onChange={e => setGPCountry(e.target.value)} value={GPCountry} />
                  <br />
                </label>
                <label>
                  Post/Zip Code: <br />
                  <input className="address-part" type="text" onChange={e => setGPPost(e.target.value)} value={GPPost} />
                  <br />
                </label>
              </div>
              </>
              :
              <></>}

        <label>
        Method of Payment: <div className="required-label">*required</div> <br />
        <select name="insurer" value={insurer} onChange={e => setInsurer(e.target.value)} required>
                    <option value="" disabled defaultValue>-Select a method of payment-</option>
                    <option value="Self-funding">Self-funding</option>
                    <option value="aetna">Aetna</option>
                    <option value="allianz">Allianz</option>
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
                    <option value="wpa">WPA</option>
              </select>
        <br />
        </label>

        {insurer !== "" && insurer !== 'Self-funding' ?
          <>
          <hr />
          <TextInput 
            label='Membership / Policy Number'
            required={false}
            update={e => setMembership(e)}
            name="membership"
            value={membership}
            />
          <TextInput 
            label='Authorisation Number'
            required={false}
            update={e => setAuth(e)}
            name="auth"
            value={auth}
            />
          <hr />
          </>
          :
          <></>
        }
      </form>
      <button onClick={onClick}>next</button>

      </div>
    </div>
  );
}

export default Personal;
