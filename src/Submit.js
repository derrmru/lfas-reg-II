import React, { useState } from "react";

let Submit = (props) => {
    const [privacy, setPrivacy] = useState("");
    const [marketing, setMarketing] = useState("");
    let theseStates = {
        privacy: privacy,
        marketing: marketing
    }

    let fieldSubmit = () => {
        let theFields = props.fields;
        let finalFields = Object.assign(theFields, theseStates);
        let requiredFields = [
            "firstName", 
            "lastName", 
            "dob", 
            "addressName", 
            "tel", 
            "email", 
            "insurer", 
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
            "sports",
            "privacy",
            "marketing"
        ]
        requiredFields.map(x => 

            finalFields[x] && console.log(finalFields[x])
        )
        
        props.reRender("complete")
    }

    let onClick = (e) => {
        props.reRender(e);
    }

    return (
        <>
        <div className="reg-border">
        <h1>Registration Form</h1>
        <h2>London Foot & Ankle Surgery</h2>
        <div className="privacy-statement">
        <h2 className="privacy-title">Privacy Statement</h2>
            Your Personal Data (Name, Date or Birth, Preferred Correspondence, Contact details and Medical Information) will be used to identify you when correspondence is shared with you and your GP/referrer (e.g. Consultant letter summarizing the Consultation), or when your Consultant refers you to another Consultant or Allied Health Professional as jointly agreed during the consultation process. The same data will also be used when mutually agreed tests or investigations are requested to further facilitate your diagnosis.
            <br />
            <br />
            For more information on how we process your data visit our Privacy Statement: <a href="http://www.londonfootandanklesurgery.co.uk/privacy-policy/" target="_blank" rel="noopener noreferrer">Privacy Statement</a>, or contact our team who would be happy to provide further details. The person responsible for Data Protection is: Mr. Peter Sweeney, Information Governance Lead, who you can reach via – F.A.O. Mr. Peter Sweeney, 79 Wimpole Street, London, W1G 9RY (or by email – admin@londonfootandanklesurgery.co.uk)
        </div>

        <form className="reg-form">
            <label>
            By checking this box you agree that you have read our privacy policy and that the personal information you provide will be processed in accordance with this. <br />
            <div>
                <input type="checkbox" name='I AGREE' value="I AGREE" onChange={e => setPrivacy(e.target.value)} />I AGREE
            </div>
            </label>

            <label>
            We would like to send you information by email about our own products and services. If you agree to being contacted in this way, please tick the 'Yes' box below.<br />
            <div>
                <input type="checkbox" name='YES' value="YES" onChange={e => setMarketing(e.target.value)} />YES
            </div>
            </label>
        </form>

        <div className="nav-buttons">
            <button onClick={() => onClick("medical")}>back</button>
        </div>

        <div className="submit-button">
            <button onClick={fieldSubmit}>Submit</button>
        </div>
        </div>
        </>
    )
}

export default Submit;