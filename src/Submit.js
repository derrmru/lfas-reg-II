import React, { useState, useRef } from "react";
import Loading from './Loading';
import SignatureCanvas from 'react-signature-canvas';
import HSMC from './downloads/Harley Street Medical Centre Privacy Policy.pdf';
import $ from "jquery";

let Submit = (props) => {
    let theFields = props.fields;
    const [privacy, setPrivacy] = useState(props.fields.privacy || "");
    const [marketing, setMarketing] = useState(props.fields.marketing || "");
    const sigPad = useRef({});
    //console.log(sigPad)
    const [loading, setLoading] = useState(false);
    let theseStates = {
        privacy: privacy,
        marketing: marketing
    };
    let ff = Object.assign(theFields, theseStates);

    let onClick = (e) => {
        props.updateFields(ff);
        const empty = sigPad.current._sigPad._isEmpty;

        //Form Validation
        let fieldCount = 0;

        if (privacy === "") {
            fieldCount += 1;
            document.getElementById("privacy").style = "border: 3px solid red";
        }

        if (empty) {
            fieldCount += 1;
            document.getElementById("signature").style.border = "3px solid red";
        }
        
        if (privacy !== "" && !empty){
            fieldCount = 0;
        }

        e === "medical" ? props.reRender(e) : 
            e === "fieldSubmit" && fieldCount === 0 ? postData() : 
                console.log(fieldCount);
    }

    let postData = () => {
        //toggle loading icon while submitting data to web app
        setLoading(true);

        //data validation prior to submit
        ff.dob = ff.dob.split('-').reverse().join('.').split('/').join('.');
        ff.firstName = ff.firstName.split(' ').reduce((total, cur) => {
            total.push(cur[0].toUpperCase() + cur.slice(1).toLowerCase());
            return total;
        }, []).join(' ')
        ff.lastName = ff.lastName.split(' ').reduce((total, cur) => {
            total.push(cur[0].toUpperCase() + cur.slice(1).toLowerCase());
            return total;
        }, []).join(' ')

        //attach signature image to payload
        ff.signature = sigPad.current.getSignaturePad().toDataURL('image/png')

        //post the data and on completion reRender to completed
        $.post( process.env.REACT_APP_POST,
            ff,
            function(res, status)   {
                    if (status === 'success'){
                        props.reRender("completed")
                    }
                }
            );
    }

    return (
        <>
        <div className="reg-border">
        <h1>Registration Form</h1>
        <h2>London Foot & Ankle Surgery</h2>
        <hr />
        <div className="privacy-statement">
        <h3 className="privacy-title">Privacy Statement</h3>
            Your Personal Data (Name, Date or Birth, Preferred Correspondence, Contact details and Medical Information and other identifying information) will be used to provide our healthcare service to you and processed in accordance with the following privacy policies:
            <br />
            <br />
            <ul style={{textAlign: 'left'}}>
                <li><a href="http://www.londonfootandanklesurgery.co.uk/privacy-policy/" target="_blank" rel="noopener noreferrer">London Foot & Ankle Surgery - Privacy Statement</a></li>
                <li><a href={HSMC} target="_blank" rel="noopener noreferrer">Harley Street Medical Centre - Privacy Statement</a></li>
            </ul>
            <br />
            For more information on how we process your data contact our team who would be happy to provide further details. 
            <br />
            <br />
            <ul style={{textAlign: 'left'}}>
                <li>Tel: <a href="tel:+442078208007">+44 207 820 8007</a><br /></li>
                <li>Email: <a href="mailto: admin@londonfootandanklesurgery.co.uk">admin@londonfootandanklesurgery.co.uk</a></li>
            </ul>
        </div>

        <form className="reg-form pm-margin">
            <label>
            By checking this box you confirm that you have read and agree with the London Foot & Ankle Surgery and Harley Street Medical Centre’s Privacy Statements and that the personal information you provide will be processed in accordance with these. <br />
            <div id="privacy">
                <input className="pm-checkbox" type="checkbox" checked={privacy} name="privacy" onChange={e => setPrivacy(privacy === "I AGREE" ? "" : "I AGREE")} />I AGREE
                <div className="required-label">*required</div>
            </div>
            </label>

            <label>
            We would like to send you information by email about our own products and services. If you agree to being contacted in this way, please tick the 'Yes' box below.<br />
            <div id="marketing">
                <input className="pm-checkbox" type="checkbox" checked={marketing} name="marketing" onChange={e => setMarketing(marketing === "YES" ? "" : "YES")} />YES
            </div>
            </label>

            <hr />
            <div 
                className='signature-container'
                style={{textAlign: 'center'}}
                >
                <div className="required-label">*required</div>
                <div style={{width: '100%', textAlign: 'left', margin: '20px 0'}}>
                    PLEASE SIGN
                    <p>You can use your mouse or your finger if you have a touch screen.</p>
                </div>
                <SignatureCanvas 
                    penColor='#20365F'
                    clearOnResize={false}
                    canvasProps={{id: "signature", className: 'sigCanvas', style: {width: '98%', height: 140, border: '2px solid #20365F'}}}
                    backgroundColor='rgba(255, 255, 255, 0.8)'
                    ref={(ref) => sigPad.current = ref}
                    />
                <button 
                    style={{marginBottom: 0, width: '100%'}}
                    onClick={(e) => {
                        e.preventDefault()
                        sigPad.current.clear()
                    }}>
                        clear signature
                    </button>
            </div>
            <hr />
        </form>

        <div className="nav-buttons">
            <button className="back-button" onClick={() => onClick("medical")}>back</button>
            <button className="next-button" onClick={() => onClick("fieldSubmit")}>submit</button>
        </div>
        </div>

        {
            loading && <Loading />
        }
        </>
    )
}

export default Submit;