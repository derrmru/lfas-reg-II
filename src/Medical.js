import React, { useState } from "react";
import TextInput from './components/textInput/textInput';

let Medical = (props) => {
    let theFields = props.fields;
    const [conditions, setConditions] = useState(theFields.conditions);
    const [medicines, setMedicines] = useState(theFields.medicines);
    const [operations, setOperations] = useState(theFields.operations);
    const [allergies, setAllergies] = useState(theFields.allergies);
    const [smoker, setSmoker] = useState(theFields.smoker);
    const [smokesPerDay, setSmokesPerDay] = useState(theFields.smokesPerDay);
    const [alcohol, setAlcohol] = useState(theFields.alcohol);
    const [occupation, setOccupation] = useState(theFields.occupation);
    const [weight, setWeight] = useState(theFields.weight);
    const [height, setHeight] = useState(theFields.height);
    const [shoeSize, setShoeSize] = useState(theFields.shoeSize);
    const [sports, setSports] = useState(theFields.sports);

    let onClick = (e) => {
        theFields.conditions = conditions;
        theFields.medicines = medicines;
        theFields.operations = operations;
        theFields.allergies = allergies;
        theFields.smoker = smoker;
        theFields.smokesPerDay = smokesPerDay;
        theFields.alcohol = alcohol;
        theFields.occupation = occupation;
        theFields.weight = weight;
        theFields.height = height;
        theFields.shoeSize = shoeSize;
        theFields.sports = sports;
        props.updateFields(theFields);

        //Form Validation - replace in next iteration with type specific validity checks
        let forms = document.forms[0];

        let requiredFields = [ 
            "conditions", 
            "medicines", 
            "operations", 
            "allergies", 
            "smoker",
            "alcohol", 
            "occupation",
            "weight",
            "height", 
            "shoeSize", 
            "sports"
        ]

        let fieldCount = requiredFields.length;

        requiredFields.map(x => {
            if (forms[x].value === "" || forms[x].value === undefined) {
                fieldCount += 1;
                return forms[x].style = "border: 3px solid red;" 
            } else {
                fieldCount -= 1;
                return forms[x].style = "border: 1px solid black;" 
            }
        })

        e === "personal" ? props.reRender(e) : 
            fieldCount === 0 ? props.reRender(e) : 
                console.log(fieldCount);

      }

    return (
        <>
        <div className="reg-border">
        <h1>Registration Form</h1>
        <h2>London Foot & Ankle Surgery</h2>
        <div style={{marginBottom: "30px"}}>If any fields are not relevant, please use 'N/A'</div>
        <hr />
        <form className="reg-form">
            <TextInput 
                label='Please list all medical conditions you are being treated for'
                required={true}
                update={e => setConditions(e)}
                name="conditions"
                value={conditions}
                placeholder='e.g. gout'
                />
            <TextInput 
                label='Please list all medicines you are currently taking'
                required={true}
                update={e => setMedicines(e)}
                name="medicines"
                value={medicines}
                placeholder='e.g. painkillers'
                />
            <TextInput 
                label='Please list any previous operations you have had'
                required={true}
                update={e => setOperations(e)}
                name="operations"
                value={operations}
                placeholder='e.g. ACL Repair'
                />
            <TextInput 
                label='Please list any allergies'
                required={true}
                update={e => setAllergies(e)}
                name="allergies"
                value={allergies}
                placeholder='e.g. penicillin'
                />

            <label>
                Do you smoke? <div className="required-label">*required</div> <br />
                <div className="radio-container">
                    <label>
                    Yes:
                    <input className="radios" type="radio" name='smoker' checked={smoker === "smoker"} value="smoker" onChange={e => setSmoker(e.target.value)} />
                    </label>
                    <label>
                    No:
                    <input className="radios" type="radio" name='smoker' checked={smoker === "non-smoker"} value="non-smoker" onChange={e => setSmoker(e.target.value)} />
                    </label>
                </div>
            </label>

            {smoker === "smoker" ? //if client is smoker display how many smokes per day
                <TextInput 
                    label='How many cigarettes per day'
                    required={true}
                    update={e => setSmokesPerDay(e)}
                    name="smokesPerDay"
                    value={smokesPerDay}
                    placeholder='e.g. 4'
                    />
                :
                <></>
            }

            <TextInput 
                label='How many units of alcohol do you consume per week?'
                required={true}
                update={e => setAlcohol(e)}
                name="alcohol"
                value={alcohol}
                placeholder='e.g. 4'
                />
            <TextInput 
                label='Occupation'
                required={true}
                update={e => setOccupation(e)}
                name="occupation"
                value={occupation}
                />
            <TextInput 
                label='Weight'
                required={true}
                update={e => setWeight(e)}
                name="weight"
                value={weight}
                placeholder='e.g. 80kg'
                />
            <TextInput 
                label='Height'
                required={true}
                update={e => setHeight(e)}
                name="height"
                value={height}
                placeholder='e.g. 5ft 10in'
                />
            <TextInput 
                label='Shoe Size'
                required={true}
                update={e => setShoeSize(e)}
                name="shoeSize"
                value={shoeSize}
                placeholder='e.g. 9 UK'
                />
            <TextInput 
                label='Please list all sports and recreational activities'
                required={true}
                update={e => setSports(e)}
                name="sports"
                value={sports}
                placeholder='e.g. badminton'
                />
        </form>
        <div className="nav-buttons">
            <button className="back-button" onClick={() => onClick("personal")}>back</button>
            <button className="next-button" onClick={() => onClick("submit")}>next</button>
        </div>
        </div>
        </>
    )
}

export default Medical;