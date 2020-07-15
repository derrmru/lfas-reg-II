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
        <form className="reg-form">
            <label>
            Please list all medical conditions you are being treated for: <br />
            <input type="text" name="conditions" value={conditions ? conditions : ""}  onChange={e => setConditions(e.target.value)} required />
            <br />
            </label>

            <label>
            Please list all medicines you are currently taking: <br />
            <input type="text" name="medicines" value={medicines ? medicines : ""}  onChange={e => setMedicines(e.target.value)} required />
            <br />
            </label>

            <label>
            Please list any previous operations you have had: <br />
            <input type="text" name="operations" value={operations ? operations : ""}  onChange={e => setOperations(e.target.value)} required />
            <br />
            </label>

            <label>
            Please list any allergies: <br />
            <input type="text" name="allergies" value={allergies ? allergies : ""}  onChange={e => setAllergies(e.target.value)} required />
            <br />
            </label>

            <label>
            Smoker: <br />
            <div>
                <label>
                Smoker:
                <input type="radio" name='smoker' checked={smoker === "smoker"} value="smoker" onChange={e => setSmoker(e.target.value)} />
                </label>
                <label>
                Non-Smoker:
                <input type="radio" name='smoker' checked={smoker === "non-smoker"} value="non-smoker" onChange={e => setSmoker(e.target.value)} />
                </label>
            </div>
            </label>

            {smoker === "smoker" ?
                <label>
                How many cigarettes per day: <br />
                <input type="text" name="smokesPerDay" value={smokesPerDay ? smokesPerDay : ""}  onChange={e => setSmokesPerDay(e.target.value)} required />
                <br />
                </label> 

                :

                <></>
            }

            <label>
                How many units of alcohol do you consume per week?: <br />
                <input type="text" name="alcohol" value={alcohol ? alcohol : ""}  onChange={e => setAlcohol(e.target.value)} required />
                <br />
            </label>

            <label>
                Occupation: <br />
                <input type="text" name="occupation" value={occupation ? occupation : ""}  onChange={e => setOccupation(e.target.value)} required />
                <br />
            </label>

            <label>
                Weight: <br />
                <input type="text" name="weight" value={weight ? weight : ""}  onChange={e => setWeight(e.target.value)} required />
                <br />
            </label>

            <label>
                Height: <br />
                <input type="text" name="height" value={height ? height: ""}  onChange={e => setHeight(e.target.value)} required />
                <br />
            </label>

            <label>
                Shoe Size: <br />
                <input type="text" name="shoeSize" value={shoeSize ? shoeSize : ""}  onChange={e => setShoeSize(e.target.value)} required />
                <br />
            </label>

            <label>
                Please list all sports and recreational activities: <br />
                <input type="text" name="sports" value={sports ? sports : ""}  onChange={e => setSports(e.target.value)} required />
                <br />
            </label>
        </form>
        <div className="nav-buttons">
            <button onClick={() => onClick("personal")}>back</button>
            <button onClick={() => onClick("submit")}>next</button>
        </div>
        </div>
        </>
    )
}

export default Medical;