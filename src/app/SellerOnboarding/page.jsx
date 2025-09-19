"use client";

import { act, use, useState } from "react";
import { SquarePen, MousePointerClick, Camera, FileText, RotateCcw, CloudUpload, BadgeCheck, CircleAlert } from "lucide-react";
import "./SellerOnboard.css";


export default function SellerOnboarding() {
  const steps = [
    { label: "Contact", icon: <SquarePen size={24} /> },
    { label: "Business details", icon: <MousePointerClick size={24} /> },
    { label: "Bank info", icon: <Camera size={24} /> },
    { label: "Terms & conditions", icon: <FileText size={24} /> },
    { label: "Return policy", icon: <RotateCcw size={24} /> },
  ];

  const [activeStep, setActiveStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  // Contact Form Fields
  const [BrandName, setBrandName] = useState("");
  const [BrandDisplayName, setBrandDisplayName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [BusinessOwnerName, setBusinessOwnerName] = useState("");
  const [AdhaarNumber, setAdhaarNumber] = useState("");
  const [isSelect, setIsSelect] = useState(null);

  const roleOptions = [
    'Operations', 'Sales', 'Finance', 'BusinessPartner', 'Owner'
  ]

  // Business Form Fields
  const [GSTIN, setGSTIN] = useState("");
  const [PAN, setPAN] = useState("");
  const [warehouseAddress, setWarehouseAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [state, setState] = useState("");
  const [capacityPerDay, setCapacityPerDay] = useState("");

  const [certificateFileName, setCertificateFileName] = useState("")
  const [isCertificateValid, setIsCertificateValid] = useState(null);

  const [signatureFileName, setSignatureFileName] = useState("");
  const [isSignatureValid, setIsSignatureValid] = useState(null);

  // Bank Details Fields
  const [AccountHolderName, setAccountHolderName] = useState("");
  const [AccountNumber, setAccountNumber] = useState("");
  const [ifscCode, setifscCode] = useState("");
  const [accountType, setAccountType] = useState("");

  const [passbookCopyFileName, setPassbookCopyFileName] = useState("");
  const [isPassbookCopyValid, setisPassbookCopyValid] = useState(null);

  // Terms & Conditions Fileds
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  // Return Policy Fields
  const [returnWindow, setReturnWindow] = useState("");
  const [nonReturnableProducts, setNonReturnableProducts] = useState("");
  const [qualityCheck, setQualityCheck] = useState(null);
  const [refundDays, setRefundDays] = useState(0);



  // File Handling
  const allowedFileTypes = ["image/png", "image/jpeg", "image/jpg", "application/pdf"];

  const handleCertificateFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setCertificateFileName(file.name);

    if (allowedFileTypes.includes(file.type)) {
      setIsCertificateValid(true);
      console.log("Valid file:", file.type);
    } else {
      setIsCertificateValid(false);
      console.log("Invalid file:", file.type);
    }
  };

  const handleSignatureFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSignatureFileName(file.name);
    if (allowedFileTypes.includes(file.type)) {
      console.log("Valid file:", file.type);
      setIsSignatureValid(true);
    }
    else {
      console.log("Invalid file:", file.type);
      setIsSignatureValid(false);
    }
  }

  const handlePassbookCopyFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPassbookCopyFileName(file.name);
    if (allowedFileTypes.includes(file.type)) {
      console.log("Valid file:", file.type);
      setisPassbookCopyValid(true);
    }
    else {
      console.log("Invalid file:", file.type);
      setisPassbookCopyValid(false);
    }
  }

  const handleCheck = (e) => {
    setAcceptedTerms(e.target.checked);
  }

  const handleSelect = (e) => {
    setIsSelect(!isSelect);
  }

  // Errors
  const [errors, setErrors] = useState({});

  // Validation
  const validateStep = () => {
    let newErrors = {};

    if (activeStep === 0) {
      if (!BrandName) newErrors.BrandName = "Brand name is required";
      if (!BrandDisplayName) newErrors.BrandDisplayName = "Display name is required";
      if (!BusinessOwnerName) newErrors.BusinessOwnerName = "Business owner name is required";
      if (!role) newErrors.role = "Role is Required";
      if (!phone) newErrors.phone = "Phone number is required";
      else if (!/^[6-9]\d{9}$/.test(phone))
        newErrors.phone = "Enter a valid 10-digit mobile number";

      if (!email) newErrors.email = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
        newErrors.email = "Enter a valid email address";

      if (!AdhaarNumber) newErrors.AdhaarNumber = "Aadhaar number is required";
      else if (!/^[2-9]\d{11}$/.test(AdhaarNumber))
        newErrors.AdhaarNumber = "Enter a valid 12-digit Aadhaar number";
    }

    if (activeStep === 1) {
      if (!GSTIN) newErrors.GSTIN = "GSTIN is required";
      if (!PAN) newErrors.PAN = "PAN is required";
      else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(PAN)) newErrors.PAN = "Invalid PAN number"
      if (!isCertificateValid) newErrors.certficate = "Certificate upload is required";
      if (!warehouseAddress) newErrors.warehouseAddress = "Warehouse address is required";
      if (!city) newErrors.city = "City is required";
      if (!zipcode) newErrors.zipcode = "Zipcode is required";
      else if (zipcode.length !== 6 && !/^[1-9]\d{5}$/.test(zipcode)) newErrors.zipcode = "Zipcode is invalid";
      if (!state) newErrors.state = "State is required";
      if (!capacityPerDay) newErrors.capacityPerDay = "Capacity per day is required";
      if (!isSignatureValid) newErrors.signature = "Signature upload is required";
    }

    if (activeStep === 2) {
      if (!AccountHolderName) newErrors.AccountHolderName = "Account Holder Name is required";
      if (!AccountNumber) newErrors.AccountNumber = "Account Number is required";
      else if (!/^\d{12}$/.test(AccountNumber)) newErrors.AccountNumber = "Invalid Account Number";
      if (!ifscCode) newErrors.ifscCode = "IFSC code is requires"
      else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifscCode)) newErrors.ifscCode = 'Invalid IFSC code';
      if (!accountType) newErrors.accountType = "Account type is required";
      if (!isPassbookCopyValid) newErrors.passbookCopy = "Passbook Copy Required";
    }

    if (activeStep === 3) {
      if (!acceptedTerms) newErrors.acceptedTerms = "Please accept to the terms & conditions";
    }

    if (activeStep === 4) {
      if (!returnWindow) newErrors.returnWindow = "Please select Return Window";
      if (!nonReturnableProducts) newErrors.nonReturnableProducts = "Please fill this field";
      if (!qualityCheck) newErrors.qualityCheck = "Please select quality check option";
      if (!refundDays) newErrors.refundDays = "please select refund days";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateStep()) {
      setActiveStep(activeStep + 1);
    }
  };

  const handleStep = (stepIndex) => {
    if (stepIndex > activeStep) {
      console.log(stepIndex, activeStep)

      if (!validateStep()) {
        setActiveStep(stepIndex);
      }
    } else {
      setActiveStep(stepIndex);
    }
  };

  const handleSubmit = () => {
    if (!validateStep()) {
      setSubmitted(true);
      setActiveStep(activeStep + 1)
    }
  };

  return (
    <div className="onboarding-wrapper">
      {/* Top Navbar */}
      <div className="onboarding-navbar">
        <h1 className="title">Pehnawa</h1>
      </div>

      {/* Stepper */}
      <div className="stepper">
        {steps.map((step, index) => (
          <div key={index} className="step-item">
            <div
              className={`step-circle ${index === activeStep ? "active" : "inactive"}`}
              onClick={() => handleStep(index)}
            >
              {step.icon}
            </div>
            <p
              className={`step-label ${index === activeStep ? "active" : ""}`}
            >
              {step.label}
            </p>
          </div>
        ))}
      </div>

      {/* Form Section */}
      <div className="form-section">
        <div className="form-container">
          {/*-------------------------------- CONTACT FORM --------------------------------*/}
          {activeStep === 0 && (
            <div className="form">
              <label className="required-label">
                Brand / Legal Entity Name
                <input
                  type="text"
                  placeholder="Fashion fables pvt ltd"
                  value={BrandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  maxLength={100}
                />
                <div className="constraints">{BrandName.length}/100
                  {errors.BrandName && <p className="error">{errors.BrandName}</p>}
                </div>
              </label>

              <label className="required-label">
                Brand Display Name (Store Name)
                <input
                  type="text"
                  placeholder="Fashion fables"
                  value={BrandDisplayName}
                  onChange={(e) => setBrandDisplayName(e.target.value)}
                  maxLength={25}
                />
                <div className="constraints">{BrandDisplayName.length}/25
                  {errors.BrandDisplayName && <p className="error">{errors.BrandDisplayName}</p>}
                </div>
              </label>

              <label> Website / Marketplace URL (Optional) <input type="text" placeholder="www.example.com" /> </label>

              <label className="required-label">
                Business Owner Name
                <input
                  type="text"
                  placeholder="Full name"
                  value={BusinessOwnerName}
                  onChange={(e) => setBusinessOwnerName(e.target.value)}
                  maxLength={40}
                />
                <div className="constraints">{BusinessOwnerName.length}/40
                  {errors.BusinessOwnerName && <p className="error">{errors.BusinessOwnerName}</p>}
                </div>
              </label>

              <label className="required-label">
                Organisation Mail
                <input
                  type="email"
                  placeholder="admin@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="constraints">{email.length}/40
                  {errors.email && <p className="error">{errors.email}</p>}
                </div>
              </label>

              <label className="required-label">
                Role
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option className="optiongroup">Operations</option>
                  <option className="options">Sales</option>
                  <option className="options">Finance</option>
                  <option className="options">Owner</option>
                  <option className="options" disabled>Business Partner</option>
                </select>
                <div className="constraints">{role.length}/40
                  {errors.role && <p className="error">{errors.role}</p>}
                </div>
              </label>

              <label className="required-label">
                Primary Contact Number
                <input
                  type="tel"
                  placeholder="7420529635"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <div className="constraints">{phone.length}/10
                  {errors.phone && <p className="error">{errors.phone}</p>}
                </div>
              </label>

              <label className="required-label">
                Aadhaar Number
                <input
                  type="text"
                  placeholder="1234 5678 9123"
                  value={AdhaarNumber}
                  onChange={(e) => setAdhaarNumber(e.target.value)}
                  maxLength={12}
                />
                <div className="constraints">{AdhaarNumber.length}/12
                  {errors.AdhaarNumber && <p className="error">{errors.AdhaarNumber}</p>}
                </div>
              </label>
            </div>
          )}

          {/*-------------------------------- BUSINESS FORM --------------------------------*/}
          {activeStep === 1 && (
            <div className="form">
              <label className="required-label">
                GSTIN
                <input
                  type="text"
                  placeholder="Enter GSTIN"
                  value={GSTIN}
                  onChange={(e) => setGSTIN(e.target.value)}
                  maxLength={15}
                />
                <div className="constraints">{GSTIN.length}/15
                  {errors.GSTIN && <p className="error">{errors.GSTIN}</p>}
                </div>
              </label>

              <label className="required-label">
                PAN Number
                <input
                  type="text"
                  placeholder="ABCDE1234F"
                  value={PAN}
                  onChange={(e) => setPAN(e.target.value.toUpperCase())}
                />
                <div className="constraints">{PAN.length}/10
                  {errors.PAN && <p className="error">{errors.PAN}</p>}
                </div>
              </label>

              <label className="required-label">
                Company Registration Certificate
                <input
                  type="file"
                  onChange={handleCertificateFile}
                />
                <div className="file-type">
                  {!certificateFileName ? (
                    <div className="file-flex">
                      <CloudUpload size={24} className="file-logo" />
                      <a className="file">click to upload</a>
                    </div>
                  ) : (
                    <div className="file-flex">
                      {isCertificateValid ?
                        (<BadgeCheck fill="#3276E8" color={"#FFFFFF"} size={24} className="file-logo" />)
                        : (
                          <CircleAlert fill="#ff0000ff" color={"#FFFFFF"} size={24} className="file-logo" />
                        )
                      }
                      <a className={`file ${isCertificateValid ? '' : 'error'}`}>{certificateFileName}</a>
                    </div>
                  )}
                </div>

                <div className="constraints">
                  {errors.certficate && <p className="error">{errors.certficate}</p>}
                </div>
              </label>

              <label className="required-label">
                Warehouse Address
                <input
                  type="text"
                  placeholder="123, Street name, Area"
                  value={warehouseAddress}
                  onChange={(e) => setWarehouseAddress(e.target.value)}
                  maxLength={100}
                />
                <div className="constraints">{warehouseAddress.length}/100
                  {errors.warehouseAddress && <p className="error">{errors.warehouseAddress}</p>}
                </div>
              </label>

              <label className="required-label">
                City
                <input
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  maxLength={50}
                />
                <div className="constraints">{city.length}/50
                  {errors.city && <p className="error">{errors.city}</p>}
                </div>
              </label>

              <label className="required-label">
                Zip Code
                <input
                  type="text"
                  placeholder="123456"
                  value={zipcode}
                  onChange={(e) => setZipcode(e.target.value)}
                  maxLength={6}
                />
                <div className="constraints">{zipcode.length}/6
                  {errors.zipcode && <p className="error">{errors.zipcode}</p>}
                </div>
              </label>

              <label className="required-label">
                State
                <input
                  type="text"
                  placeholder="State"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  maxLength={30}
                />
                <div className="constraints">{state.length}/30
                  {errors.state && <p className="error">{errors.state}</p>}
                </div>
              </label>

              <label className="required-label">
                Per Day Processing Capacity
                <input
                  type="number"
                  placeholder="30"
                  value={capacityPerDay}
                  onChange={(e) => setCapacityPerDay(e.target.value)}
                  min={1}
                />
                <div className="constraints"><p></p>
                  {errors.capacityPerDay && <p className="error">{errors.capacityPerDay}</p>}
                </div>
              </label>

              <label className="required-label">
                Signature
                <input
                  type="file"
                  onChange={handleSignatureFile}
                />
                <div className="file-type">
                  {!signatureFileName ? (
                    <div className="file-flex">
                      <CloudUpload size={24} className="file-logo" />
                      <a className="file">click to upload</a>
                    </div>
                  ) : (
                    <div className="file-flex">
                      {isSignatureValid ?
                        (<BadgeCheck fill="#3276E8" color={"#FFFFFF"} size={24} className="file-logo" />)
                        : (
                          <CircleAlert fill="#ff0000ff" color={"#FFFFFF"} size={24} className="file-logo" />
                        )
                      }
                      <a className={`file ${isSignatureValid ? '' : 'error'}`}>{signatureFileName}</a>
                    </div>
                  )}
                </div>
                <div className="constraints"><p></p>
                  {errors.signature && <p className="error">{errors.signature}</p>}
                </div>
              </label>
            </div>
          )}
          {/*-----------------------------------------------------Bank Form----------------------------------------------- */}
          {activeStep === 2 && (
            <div className="form">
              <label className="required-label">
                Account Holder Name
                <input
                  type="text"
                  placeholder="John Tuter"
                  value={AccountHolderName}
                  onChange={(e) => setAccountHolderName(e.target.value)}
                />
                <div className="constraints">{AccountHolderName.length}/40
                  {errors.AccountHolderName && <p className="error">{errors.AccountHolderName}</p>}
                </div>
              </label>

              <label className="required-label">
                Account Number
                <input
                  type="text"
                  placeholder="7420529638527"
                  value={AccountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                />
                <div className="constraints">{AccountNumber.length}/12
                  {errors.AccountNumber && <p className="error">{errors.AccountNumber}</p>}
                </div>
              </label>

              <label className="required-label">
                IFSC Code
                <input
                  type="text"
                  placeholder="HDFC0001980"
                  value={ifscCode}
                  onChange={(e) => setifscCode(e.target.value.toUpperCase())}
                />
                <div className="constraints">{ifscCode.length}/11
                  {errors.ifscCode && <p className="error">{errors.ifscCode}</p>}
                </div>
              </label>

              <label className="required-label">
                Cancelled Cheque / Bank Passbook Copy
                <select value={accountType} onChange={(e) => setAccountType(e.target.value)}>
                  <option className="options">Savings</option>
                  <option className="options">Current</option>
                </select>
                <div className="constraints"><a></a>
                  {errors.accountType && <p className="error">{errors.accountType}</p>}
                </div>
              </label>

              <label className="required-label">
                Cancelled Cheque / Bank Passbook Copy
                <input
                  type="file"
                  onChange={handlePassbookCopyFile}
                />
                <div className="file-type">
                  {!passbookCopyFileName ? (
                    <div className="file-flex">
                      <CloudUpload size={24} className="file-logo" />
                      <a className="file">click to upload</a>
                    </div>
                  ) : (
                    <div className="file-flex">
                      {isPassbookCopyValid ?
                        (<BadgeCheck fill="#3276E8" color={"#FFFFFF"} size={24} className="file-logo" />)
                        : (
                          <CircleAlert fill="#ff0000ff" color={"#FFFFFF"} size={24} className="file-logo" />
                        )
                      }
                      <a className={`file ${isPassbookCopyValid ? '' : 'error'}`}>{passbookCopyFileName}</a>
                    </div>
                  )}
                </div>
                <div className="constraints">
                  {errors.passbookCopy && <p className="error">{errors.passbookCopy}</p>}
                </div>
              </label>
            </div>
          )}
          {/*----------------------------------------------Terms and Conditions-----------------------------------------*/}
          {activeStep === 3 && (
            <div className="">
              <div className="terms-wrapper">
                <p className="terms-content">Life is a journey filled with lessons, challenges, and opportunities that shape who we are. Each day offers new experiences that strengthen our character and broaden our understanding of the world. Success is never achieved overnight; it comes through hard work, dedication, and consistency. Even when we face failures, they are not the end but valuable stepping stones that lead us toward growth and resilience. Maintaining a positive outlook helps us transform problems into opportunities and setbacks into comebacks. True happiness lies not in material possessions but in gratitude for the blessings we already have. The joy of helping others often brings deeper satisfaction than anything money can buy. Dreams remain dreams unless we take action and pursue them with courage and determination. Discipline teaches us control, while patience ensures that our efforts eventually bear fruit. In the end, it is not the number of years in our life that counts, but the life we put into those years.Life is a journey filled with lessons, challenges, and opportunities that shape who we are. Each day offers new experiences that strengthen our character and broaden our understanding of the world. Success is never achieved overnight; it comes through hard work, dedication, and consistency. Even when we face failures, they are not the end but valuable stepping stones that lead us toward growth and resilience. Maintaining a positive outlook helps us transform problems into opportunities and setbacks into comebacks. True happiness lies not in material possessions but in gratitude for the blessings we already have. The joy of helping others often brings deeper satisfaction than anything money can buy. Dreams remain dreams unless we take action and pursue them with courage and determination. Discipline teaches us control, while patience ensures that our efforts eventually bear fruit. In the end, it is not the number of years in our life that counts, but the life we put into those years.Life is a journey filled with lessons, challenges, and opportunities that shape who we are. Each day offers new experiences that strengthen our character and broaden our understanding of the world. Success is never achieved overnight; it comes through hard work, dedication, and consistency. Even when we face failures, they are not the end but valuable stepping stones that lead us toward growth and resilience. Maintaining a positive outlook helps us transform problems into opportunities and setbacks into comebacks. True happiness lies not in material possessions but in gratitude for the blessings we already have. The joy of helping others often brings deeper satisfaction than anything money can buy. Dreams remain dreams unless we take action and pursue them with courage and determination. Discipline teaches us control, while patience ensures that our efforts eventually bear fruit. In the end, it is not the number of years in our life that counts, but the life we put into those years.</p>
                <div className="term-check">
                  <div><input type="checkbox" checked={acceptedTerms} onChange={handleCheck}></input></div>
                  <div className="terms-text"><p>I have read and i agree with the terms & conditions</p></div>
                </div>
                {errors.acceptedTerms && <p className="error">{errors.acceptedTerms}</p>}
              </div>
            </div>
          )}
          {/*--------------------------------------Return Policy------------------------------------*/}
          {activeStep === 4 && (
            <div className="form">
              <label className="required-label">
                Return Window
                <select value={returnWindow} onChange={(e) => setReturnWindow(e.target.value)}>
                  <option className="options" value='5'>5 Days</option>
                  <option className="options" value='7'>7 Days</option>
                  <option className="options" value='10'>10 Days</option>
                  <option className="options" value='15'>15 Days</option>
                </select>
                <div className="constraints"><p></p>
                  {errors.returnWindow && <p className="error">{errors.returnWindow}</p>}
                </div>
              </label>

              <label className="required-label">
                Do you sell any products that are non-returnable
                <input
                  type="text"
                  placeholder="e.g., innerwear, grooming products..."
                  value={nonReturnableProducts}
                  onChange={(e) => setNonReturnableProducts(e.target.value)}
                />
                <div className="constraints">{nonReturnableProducts.length}/40
                  {errors.nonReturnableProducts && <p className="error">{errors.nonReturnableProducts}</p>}
                </div>
              </label>

              <label className="required-label">
                Do you want us to do a quality check before refund?
                <select onChange={(e) => setQualityCheck(e.target.value)}>
                  <option className="options">Yes please</option>
                  <option className="options">No</option>
                </select>
                <div className="constraints"><p></p>
                  {errors.qualityCheck && <p className="error">{errors.qualityCheck}</p>}
                </div>
              </label>

              <label className="required-label">
                How many days do you need to process refunds once a return is approved ?
                <select onChange={(e) => setRefundDays(e.target.value)}>
                  <option className="options" value='3'>3 Days</option>
                  <option className="options" value='5'>5 Days</option>
                  <option className="options" value='7'>7 Days</option>
                  <option className="options" value='10'>10 Days</option>
                </select>
                <div className="constraints"><p></p>
                  {errors.refundDays && <p className="error">{errors.refundDays}</p>}
                </div>
              </label>
            </div>
          )}
          {/*------------------------------------------------Success Page-------------------------------------------------------- */}
          {activeStep === 5 && (
            <div className="">
              <div className="successpage">
                <img src="/successimage.png" alt="Logo" className="successimage" />
                <p className="success-text">Onboarding verification takes up to 24 hours ⏳Now go grab a matcha 😉 & chill while our team verifies your details. See you on the other side 🚀</p>
                <p className="success-sign">— Team Pehnawa</p>
              </div>
            </div>
          )}
          {/*-----------------------------------------------------Next Button------------------------------------------------------*/}
          {!submitted ? (
            <div className="form-footer">
              {activeStep < steps.length - 1 ? (
                <button className="next-btn" onClick={handleNext}>
                  Next
                </button>
              ) : (<button type="submit" className="next-btn" onClick={handleSubmit}>
                Submit
              </button>
              )}
            </div>) :
            (<p></p>)}
        </div>
      </div>
    </div>
  );
}
