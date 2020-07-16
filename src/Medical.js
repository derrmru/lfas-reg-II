import React, { useState } from "react";

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

        //Form Validation
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

        fieldCount === 0 ?  props.reRender(e) : console.log(fieldCount);

      }

    return (
        <>
        <div className="reg-border">
        <h1>Registration Form</h1>
        <h2>London Foot & Ankle Surgery</h2>
        <div style={{marginBottom: "30px"}}>If any fields are not relevant, please use 'N/A'</div>
        <hr />
        <form className="reg-form">
            <label>
            Please list all medical conditions you are being treated for: <div className="required-label">*required</div> <br />
            <input type="text" name="conditions" value={conditions ? conditions : ""}  onChange={e => setConditions(e.target.value)} placeholder="e.g. gout" />
            <br />
            </label>

            <label>
            Please list all medicines you are currently taking: <div className="required-label">*required</div> <br />
            <input type="text" name="medicines" value={medicines ? medicines : ""}  onChange={e => setMedicines(e.target.value)} placeholder="e.g. painkillers" />
            <br />
            </label>

            <label>
            Please list any previous operations you have had: <div className="required-label">*required</div> <br />
            <input type="text" name="operations" value={operations ? operations : ""}  onChange={e => setOperations(e.target.value)} placeholder="e.g. ACL Repair" />
            <br />
            </label>

            <label>
            Please list any allergies: <div className="required-label">*required</div> <br />
            <input type="text" name="allergies" value={allergies ? allergies : ""}  onChange={e => setAllergies(e.target.value)} placeholder="e.g. penicillin" />
            <br />
            </label>

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

            {smoker === "smoker" ?
                <label>
                How many cigarettes per day: <br />
                <input type="text" name="smokesPerDay" value={smokesPerDay ? smokesPerDay : ""}  onChange={e => setSmokesPerDay(e.target.value)} placeholder="e.g. 3" />
                <br />
                </label> 

                :

                <></>
            }

            <label>
                How many units of alcohol do you consume per week?: <div className="required-label">*required</div> <br />
                <input type="text" name="alcohol" value={alcohol ? alcohol : ""}  onChange={e => setAlcohol(e.target.value)} placeholder="e.g. 4" />
                <br />
            </label>

            <label>
                Occupation: <div className="required-label">*required</div> <br />
                <input type="text" name="occupation" value={occupation ? occupation : ""}  onChange={e => setOccupation(e.target.value)} />
                <br />
            </label>

            <label>
                Weight: <div className="required-label">*required</div> <br />
                <input type="text" name="weight" value={weight ? weight : ""}  onChange={e => setWeight(e.target.value)} placeholder="e.g. 80kg" />
                <br />
            </label>

            <label>
                Height: <div className="required-label">*required</div> <br />
                <input type="text" name="height" value={height ? height: ""}  onChange={e => setHeight(e.target.value)} placeholder="e.g. 5ft 10in" />
                <br />
            </label>

            <label>
                Shoe Size: <div className="required-label">*required</div> <br />
                <input type="text" name="shoeSize" value={shoeSize ? shoeSize : ""}  onChange={e => setShoeSize(e.target.value)} placeholder="e.g. 9 UK" />
                <br />
            </label>

            <label>
                Please list all sports and recreational activities: <div className="required-label">*required</div> <br />
                <input type="text" name="sports" value={sports ? sports : ""}  onChange={e => setSports(e.target.value)} placeholder="e.g. badminton" />
                <br />
            </label>
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