import React, { useState } from "react";

let Submit = (props) => {
    let theFields = props.fields;
    const [privacy, setPrivacy] = useState(props.fields.privacy ? props.fields.privacy : "");
    const [marketing, setMarketing] = useState(props.fields.marketing ? props.fields.marketing : "");
    let theseStates = {
        privacy: privacy,
        marketing: marketing
    };
    let ff = Object.assign(theFields, theseStates);
    

    let onClick = (e) => {
        props.updateFields(ff);

        //Form Validation
        let fieldCount = 0;

        if (privacy === "") {
            fieldCount += 1;
            document.getElementById("privacy").style = "border: 3px solid red";
        } 
        
        if (marketing === "") {
            fieldCount += 1;
            document.getElementById("marketing").style = "border: 3px solid red";
        } 
        
        if (marketing === 0 && privacy === 0){
            fieldCount = 0;
        }

        fieldCount === 0 && e === "medical" ? props.reRender(e) : e === "fieldSubmit" && fieldCount === 0 ? 
            postData() : console.log(fieldCount);
    }

    let postData = () => {
        console.log(theFields)
    }

    return (
        <>
        <div className="reg-border">
        <h1>Registration Form</h1>
        <h2>London Foot & Ankle Surgery</h2>
        <hr />
        <div className="privacy-statement">
        <h3 className="privacy-title">Privacy Statement</h3>
            Your Personal Data (Name, Date or Birth, Preferred Correspondence, Contact details and Medical Information) will be used to identify you when correspondence is shared with you and your GP/referrer (e.g. Consultant letter summarizing the Consultation), or when your Consultant refers you to another Consultant or Allied Health Professional as jointly agreed during the consultation process. The same data will also be used when mutually agreed tests or investigations are requested to further facilitate your diagnosis.
            <br />
            <br />
            For more information on how we process your data visit our <a href="http://www.londonfootandanklesurgery.co.uk/privacy-policy/" target="_blank" rel="noopener noreferrer">Privacy Statement</a>, or contact our team who would be happy to provide further details. The person responsible for Data Protection is: Mr. Peter Sweeney, Information Governance Lead, who you can reach via – F.A.O. Mr. Peter Sweeney, 79 Wimpole Street, London, W1G 9RY (or by email – admin@londonfootandanklesurgery.co.uk)
        </div>

        <form className="reg-form pm-margin">
            <label>
            By checking this box you agree that you have read our privacy policy and that the personal information you provide will be processed in accordance with this. <br />
            <div id="privacy">
                <input className="pm-checkbox" type="checkbox" checked={privacy} name="privacy" onChange={e => setPrivacy(privacy === "I AGREE" ? "" : "I AGREE")} />I AGREE
            </div>
            </label>

            <label>
            We would like to send you information by email about our own products and services. If you agree to being contacted in this way, please tick the 'Yes' box below.<br />
            <div id="marketing">
                <input className="pm-checkbox" type="checkbox" checked={marketing} name="marketing" onChange={e => setMarketing(marketing === "YES" ? "" : "YES")} />YES
            </div>
            </label>
        </form>

        <div className="nav-buttons">
            <button className="back-button" onClick={() => onClick("medical")}>back</button>
            <button className="next-button" onClick={() => onClick("fieldSubmit")}>Submit</button>
        </div>
        </div>
        </>
    )
}

export default Submit;