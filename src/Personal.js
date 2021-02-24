import React, {useState, useEffect} from 'react';
import TextInput from './components/textInput/textInput';
import './App.css';

let Personal = (props) => {
  //form fields held as state
  const [title, setTitle] = useState(props.fields.title);
  const [firstName, setFirstName] = useState(props.fields.firstName);
  const [lastName, setLastName] = useState(props.fields.lastName);
  const [dob, setDOB] = useState(props.fields.dob);
  const [addressName, setAddressName] = useState(props.fields.addressName);
  const [tel, setTel] = useState(props.fields.tel);
  const [email, setEmail] = useState(props.fields.email);
  const [GPName, setGPName] = useState(props.fields.GPName);
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

      setAddressName(address.filter((current) => {
        return current.long_name !== 'United Kingdom' && 
        current.long_name !== 'Greater London' &&
        current.long_name !== 'England'
      }).reduce((string, cur) => {
        string.push(cur.long_name);
        return string;
      }, []).join(', '))

    }

    //google address autocomlete for GP address details
    let autoGP = null;
    autoGP = new google.maps.places.Autocomplete(document.getElementById('GP'), {})

    let handleGPSelect = () => {
      let addressObject = autoGP.getPlace();
      let address = addressObject.address_components;

      setGPName(address.filter((current) => {
        return current.long_name !== 'United Kingdom' && 
        current.long_name !== 'Greater London' &&
        current.long_name !== 'England'
      }).reduce((string, cur) => {
        string.push(cur.long_name);
        return string;
      }, []).join(', '))  

    }

    autocomplete.addListener("place_changed", handlePlaceSelect)
    autoGP.addListener("place_changed", handleGPSelect)

  })

  //data validation function and render phase of application
  let onClick = () => {
    let thisForm = {
      title: title,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      dob: dob,
      addressName: addressName,
      tel: tel,
      email: email,
      GPName: GPName,
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
      "title",
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
        <label>
          Title: <div className="required-label">*required</div> <br />
          <select name="title" value={title} onChange={e => setTitle(e.target.value)} required>
                      <option value="" disabled defaultValue>-Select-</option>
                      <option value="Mr">Mr</option>
                      <option value="Ms">Ms</option>
                      <option value="Mrs">Mrs</option>
                      <option value="Miss">Miss</option>
                      <option value="Master">Master</option>
                      <option value="Dr">Dr</option>
                      <option value="Lord">Lord</option>
                      <option value="Sir">Sir</option>
          </select>
          <br />
        </label>
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
