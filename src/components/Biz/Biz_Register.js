import React, { useState, useEffect } from 'react';
import { Form, Modal, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import BarSpinner from './Reusable_BarSpinner';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

export default function NewSignUp() {
    const [ user, setUser ] = useState('');

    const userId = user._id;

    const [ businessName, setBusinessName ] = useState('');
    const [ businessAlias, setBusinessAlias ] = useState('');
    const [ externalURL, setExternalURL ] = useState('');
    const [ category, setCategory ] = useState('');
    const [ address1, setAddress1 ] = useState('');
    const [ address2, setAddress2 ] = useState('');
    const [ address3, setAddress3 ] = useState('');
    const [ selectedCountry, setSelectedCountry ] = useState(null);
    const [ state, setState ] = useState('');
    const [ city, setCity ] = useState('');
    const [ latitude, setLatitude ] = useState('');
    const [ longitude, setLongitude ] = useState('');
    const [ displayAddress, setDisplayAddress ] = useState('');
    const [ acceptTerms, setAcceptTerms ] = useState(false);

    const [ isLoading, setIsLoading ] = useState(false);
    const [ message, setMessage ] = useState('');
    const [ showSuccessModal, setShowSuccessModal ] = useState(false);

    const categories = [
        "Agriculture",
        "Apparel & Accessories",
        "Arts & Entertainment",
        "Automotive",
        "Banking",
        "Beauty & Cosmetics",
        "Biotechnology",
        "Chemicals",
        "Communications",
        "Construction",
        "Consulting",
        "Consumer Goods",
        "Education",
        "Electronics",
        "Energy",
        "Engineering",
        "Environmental",
        "Finance",
        "Food & Beverage",
        "Government",
        "Healthcare",
        "Hospitality",
        "Information Technology",
        "Insurance",
        "Legal",
        "Manufacturing",
        "Marketing",
        "Media & Broadcasting",
        "Medical Devices & Supplies",
        "Mining",
        "Non-Profit",
        "Pharmaceuticals",
        "Real Estate",
        "Recreation & Leisure",
        "Retail",
        "Security",
        "Services",
        "Technology",
        "Telecommunications",
        "Textiles",
        "Tourism",
        "Transportation",
        "Utilities",
        "Wholesale"
    ];    

    const countries = [ 
        {"name": "Afghanistan", "code": "AF"}, 
        {"name": "Albania", "code": "AL"}, 
        {"name": "Algeria", "code": "DZ"}, 
        {"name": "American Samoa", "code": "AS"}, 
        {"name": "AndorrA", "code": "AD"}, 
        {"name": "Angola", "code": "AO"}, 
        {"name": "Anguilla", "code": "AI"}, 
        {"name": "Antarctica", "code": "AQ"}, 
        {"name": "Antigua and Barbuda", "code": "AG"}, 
        {"name": "Argentina", "code": "AR"}, 
        {"name": "Armenia", "code": "AM"}, 
        {"name": "Aruba", "code": "AW"}, 
        {"name": "Australia", "code": "AU"}, 
        {"name": "Austria", "code": "AT"}, 
        {"name": "Azerbaijan", "code": "AZ"}, 
        {"name": "Bahamas", "code": "BS"}, 
        {"name": "Bahrain", "code": "BH"}, 
        {"name": "Bangladesh", "code": "BD"}, 
        {"name": "Barbados", "code": "BB"}, 
        {"name": "Belarus", "code": "BY"}, 
        {"name": "Belgium", "code": "BE"}, 
        {"name": "Belize", "code": "BZ"}, 
        {"name": "Benin", "code": "BJ"}, 
        {"name": "Bermuda", "code": "BM"}, 
        {"name": "Bhutan", "code": "BT"}, 
        {"name": "Bolivia", "code": "BO"}, 
        {"name": "Bosnia and Herzegovina", "code": "BA"}, 
        {"name": "Botswana", "code": "BW"}, 
        {"name": "Bouvet Island", "code": "BV"}, 
        {"name": "Brazil", "code": "BR"}, 
        {"name": "British Indian Ocean Territory", "code": "IO"}, 
        {"name": "Brunei Darussalam", "code": "BN"}, 
        {"name": "Bulgaria", "code": "BG"}, 
        {"name": "Burkina Faso", "code": "BF"}, 
        {"name": "Burundi", "code": "BI"}, 
        {"name": "Cambodia", "code": "KH"}, 
        {"name": "Cameroon", "code": "CM"}, 
        {"name": "Canada", "code": "CA"}, 
        {"name": "Cape Verde", "code": "CV"}, 
        {"name": "Cayman Islands", "code": "KY"}, 
        {"name": "Central African Republic", "code": "CF"}, 
        {"name": "Chad", "code": "TD"}, 
        {"name": "Chile", "code": "CL"}, 
        {"name": "China", "code": "CN"}, 
        {"name": "Christmas Island", "code": "CX"}, 
        {"name": "Cocos (Keeling) Islands", "code": "CC"}, 
        {"name": "Colombia", "code": "CO"}, 
        {"name": "Comoros", "code": "KM"}, 
        {"name": "Congo", "code": "CG"}, 
        {"name": "Congo, The Democratic Republic of the", "code": "CD"}, 
        {"name": "Cook Islands", "code": "CK"}, 
        {"name": "Costa Rica", "code": "CR"}, 
        {"name": "Cote D'Ivoire", "code": "CI"}, 
        {"name": "Croatia", "code": "HR"}, 
        {"name": "Cuba", "code": "CU"}, 
        {"name": "Cyprus", "code": "CY"}, 
        {"name": "Czech Republic", "code": "CZ"}, 
        {"name": "Denmark", "code": "DK"}, 
        {"name": "Djibouti", "code": "DJ"}, 
        {"name": "Dominica", "code": "DM"}, 
        {"name": "Dominican Republic", "code": "DO"}, 
        {"name": "Ecuador", "code": "EC"}, 
        {"name": "Egypt", "code": "EG"}, 
        {"name": "El Salvador", "code": "SV"}, 
        {"name": "Equatorial Guinea", "code": "GQ"}, 
        {"name": "Eritrea", "code": "ER"}, 
        {"name": "Estonia", "code": "EE"}, 
        {"name": "Ethiopia", "code": "ET"}, 
        {"name": "Falkland Islands (Malvinas)", "code": "FK"}, 
        {"name": "Faroe Islands", "code": "FO"}, 
        {"name": "Fiji", "code": "FJ"}, 
        {"name": "Finland", "code": "FI"}, 
        {"name": "France", "code": "FR"}, 
        {"name": "French Guiana", "code": "GF"}, 
        {"name": "French Polynesia", "code": "PF"}, 
        {"name": "French Southern Territories", "code": "TF"}, 
        {"name": "Gabon", "code": "GA"}, 
        {"name": "Gambia", "code": "GM"}, 
        {"name": "Georgia", "code": "GE"}, 
        {"name": "Germany", "code": "DE"}, 
        {"name": "Ghana", "code": "GH"}, 
        {"name": "Gibraltar", "code": "GI"}, 
        {"name": "Greece", "code": "GR"}, 
        {"name": "Greenland", "code": "GL"}, 
        {"name": "Grenada", "code": "GD"}, 
        {"name": "Guadeloupe", "code": "GP"}, 
        {"name": "Guam", "code": "GU"}, 
        {"name": "Guatemala", "code": "GT"}, 
        {"name": "Guernsey", "code": "GG"}, 
        {"name": "Guinea", "code": "GN"}, 
        {"name": "Guinea-Bissau", "code": "GW"}, 
        {"name": "Guyana", "code": "GY"}, 
        {"name": "Haiti", "code": "HT"}, 
        {"name": "Heard Island and Mcdonald Islands", "code": "HM"}, 
        {"name": "Holy See (Vatican City State)", "code": "VA"}, 
        {"name": "Honduras", "code": "HN"}, 
        {"name": "Hong Kong", "code": "HK"}, 
        {"name": "Hungary", "code": "HU"}, 
        {"name": "Iceland", "code": "IS"}, 
        {"name": "India", "code": "IN"}, 
        {"name": "Indonesia", "code": "ID"}, 
        {"name": "Iran, Islamic Republic Of", "code": "IR"}, 
        {"name": "Iraq", "code": "IQ"}, 
        {"name": "Ireland", "code": "IE"}, 
        {"name": "Isle of Man", "code": "IM"}, 
        {"name": "Israel", "code": "IL"}, 
        {"name": "Italy", "code": "IT"}, 
        {"name": "Jamaica", "code": "JM"}, 
        {"name": "Japan", "code": "JP"}, 
        {"name": "Jersey", "code": "JE"}, 
        {"name": "Jordan", "code": "JO"}, 
        {"name": "Kazakhstan", "code": "KZ"}, 
        {"name": "Kenya", "code": "KE"}, 
        {"name": "Kiribati", "code": "KI"}, 
        {"name": "Korea, Democratic People's Republic of", "code": "KP"}, 
        {"name": "Korea, Republic of", "code": "KR"}, 
        {"name": "Kuwait", "code": "KW"}, 
        {"name": "Kyrgyzstan", "code": "KG"}, 
        {"name": "Lao People's Democratic Republic", "code": "LA"}, 
        {"name": "Latvia", "code": "LV"}, 
        {"name": "Lebanon", "code": "LB"}, 
        {"name": "Lesotho", "code": "LS"}, 
        {"name": "Liberia", "code": "LR"}, 
        {"name": "Libyan Arab Jamahiriya", "code": "LY"}, 
        {"name": "Liechtenstein", "code": "LI"}, 
        {"name": "Lithuania", "code": "LT"}, 
        {"name": "Luxembourg", "code": "LU"}, 
        {"name": "Macao", "code": "MO"}, 
        {"name": "Macedonia, The Former Yugoslav Republic of", "code": "MK"}, 
        {"name": "Madagascar", "code": "MG"}, 
        {"name": "Malawi", "code": "MW"}, 
        {"name": "Malaysia", "code": "MY"}, 
        {"name": "Maldives", "code": "MV"}, 
        {"name": "Mali", "code": "ML"}, 
        {"name": "Malta", "code": "MT"}, 
        {"name": "Marshall Islands", "code": "MH"}, 
        {"name": "Martinique", "code": "MQ"}, 
        {"name": "Mauritania", "code": "MR"}, 
        {"name": "Mauritius", "code": "MU"}, 
        {"name": "Mayotte", "code": "YT"}, 
        {"name": "Mexico", "code": "MX"}, 
        {"name": "Micronesia, Federated States of", "code": "FM"}, 
        {"name": "Moldova, Republic of", "code": "MD"}, 
        {"name": "Monaco", "code": "MC"}, 
        {"name": "Mongolia", "code": "MN"}, 
        {"name": "Montenegro", "code": "ME"},
        {"name": "Montserrat", "code": "MS"},
        {"name": "Morocco", "code": "MA"}, 
        {"name": "Mozambique", "code": "MZ"}, 
        {"name": "Myanmar", "code": "MM"}, 
        {"name": "Namibia", "code": "NA"}, 
        {"name": "Nauru", "code": "NR"}, 
        {"name": "Nepal", "code": "NP"}, 
        {"name": "Netherlands", "code": "NL"}, 
        {"name": "Netherlands Antilles", "code": "AN"}, 
        {"name": "New Caledonia", "code": "NC"}, 
        {"name": "New Zealand", "code": "NZ"}, 
        {"name": "Nicaragua", "code": "NI"}, 
        {"name": "Niger", "code": "NE"}, 
        {"name": "Nigeria", "code": "NG"}, 
        {"name": "Niue", "code": "NU"}, 
        {"name": "Norfolk Island", "code": "NF"}, 
        {"name": "Northern Mariana Islands", "code": "MP"}, 
        {"name": "Norway", "code": "NO"}, 
        {"name": "Oman", "code": "OM"}, 
        {"name": "Pakistan", "code": "PK"}, 
        {"name": "Palau", "code": "PW"}, 
        {"name": "Palestinian Territory, Occupied", "code": "PS"}, 
        {"name": "Panama", "code": "PA"}, 
        {"name": "Papua New Guinea", "code": "PG"}, 
        {"name": "Paraguay", "code": "PY"}, 
        {"name": "Peru", "code": "PE"}, 
        {"name": "Philippines", "code": "PH"}, 
        {"name": "Pitcairn", "code": "PN"}, 
        {"name": "Poland", "code": "PL"}, 
        {"name": "Portugal", "code": "PT"}, 
        {"name": "Puerto Rico", "code": "PR"}, 
        {"name": "Qatar", "code": "QA"}, 
        {"name": "Reunion", "code": "RE"}, 
        {"name": "Romania", "code": "RO"}, 
        {"name": "Russian Federation", "code": "RU"}, 
        {"name": "RWANDA", "code": "RW"}, 
        {"name": "Saint Helena", "code": "SH"}, 
        {"name": "Saint Kitts and Nevis", "code": "KN"}, 
        {"name": "Saint Lucia", "code": "LC"}, 
        {"name": "Saint Pierre and Miquelon", "code": "PM"}, 
        {"name": "Saint Vincent and the Grenadines", "code": "VC"}, 
        {"name": "Samoa", "code": "WS"}, 
        {"name": "San Marino", "code": "SM"}, 
        {"name": "Sao Tome and Principe", "code": "ST"}, 
        {"name": "Saudi Arabia", "code": "SA"}, 
        {"name": "Senegal", "code": "SN"}, 
        {"name": "Serbia", "code": "RS"}, 
        {"name": "Seychelles", "code": "SC"}, 
        {"name": "Sierra Leone", "code": "SL"}, 
        {"name": "Singapore", "code": "SG"}, 
        {"name": "Slovakia", "code": "SK"}, 
        {"name": "Slovenia", "code": "SI"}, 
        {"name": "Solomon Islands", "code": "SB"}, 
        {"name": "Somalia", "code": "SO"}, 
        {"name": "South Africa", "code": "ZA"}, 
        {"name": "South Georgia and the South Sandwich Islands", "code": "GS"}, 
        {"name": "Spain", "code": "ES"}, 
        {"name": "Sri Lanka", "code": "LK"}, 
        {"name": "Sudan", "code": "SD"}, 
        {"name": "Suriname", "code": "SR"}, 
        {"name": "Svalbard and Jan Mayen", "code": "SJ"}, 
        {"name": "Swaziland", "code": "SZ"}, 
        {"name": "Sweden", "code": "SE"}, 
        {"name": "Switzerland", "code": "CH"}, 
        {"name": "Syrian Arab Republic", "code": "SY"}, 
        {"name": "Taiwan, Province of China", "code": "TW"}, 
        {"name": "Tajikistan", "code": "TJ"}, 
        {"name": "Tanzania, United Republic of", "code": "TZ"}, 
        {"name": "Thailand", "code": "TH"}, 
        {"name": "Timor-Leste", "code": "TL"}, 
        {"name": "Togo", "code": "TG"}, 
        {"name": "Tokelau", "code": "TK"}, 
        {"name": "Tonga", "code": "TO"}, 
        {"name": "Trinidad and Tobago", "code": "TT"}, 
        {"name": "Tunisia", "code": "TN"}, 
        {"name": "Turkey", "code": "TR"}, 
        {"name": "Turkmenistan", "code": "TM"}, 
        {"name": "Turks and Caicos Islands", "code": "TC"}, 
        {"name": "Tuvalu", "code": "TV"}, 
        {"name": "Uganda", "code": "UG"}, 
        {"name": "Ukraine", "code": "UA"}, 
        {"name": "United Arab Emirates", "code": "AE"}, 
        {"name": "United Kingdom", "code": "GB"}, 
        {"name": "United States", "code": "US"}, 
        {"name": "United States Minor Outlying Islands", "code": "UM"}, 
        {"name": "Uruguay", "code": "UY"}, 
        {"name": "Uzbekistan", "code": "UZ"}, 
        {"name": "Vanuatu", "code": "VU"}, 
        {"name": "Venezuela", "code": "VE"}, 
        {"name": "Viet Nam", "code": "VN"}, 
        {"name": "Virgin Islands, British", "code": "VG"}, 
        {"name": "Virgin Islands, U.S.", "code": "VI"}, 
        {"name": "Wallis and Futuna", "code": "WF"}, 
        {"name": "Western Sahara", "code": "EH"}, 
        {"name": "Yemen", "code": "YE"}, 
        {"name": "Zambia", "code": "ZM"}, 
        {"name": "Zimbabwe", "code": "ZW"} 
    ]
    
    const navigate = useNavigate();

    const fetchUserDetails = async (token) => {
        try {
          const response = await axios.get(`${apiUrl}/api/v1/users/details`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          if (response.status === 200) {
            const data = response.data;
            setUser(data);
          } 
        } catch (error) {

        }
    };

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
            fetchUserDetails(token);
        }
    }, []);

    const registerBiz = async () => {
        setIsLoading(true);
        try {
            const response1 = await axios.get(`${apiUrl}/api/v1/business/check/biz`, {
                tag: businessName
            });

            if(!response1.data.exists){

                const registerResponse = await axios.post(`${apiUrl}/api/v1/business/register`, {
                    userId: userId, 
                    alias: businessAlias,
                    name: businessName,
                    url: externalURL,
                    categories: [{
                        alias: category,
                        title: category
                    }],
                    location: {
                        address1: address1,
                        address2: address2,
                        address3: address3,
                        city: city,
                        country: selectedCountry,
                        state: state,
                        display_address: [ displayAddress ] 
                    },
                    coordinates: {
                        latitude: latitude,
                        longitude: longitude
                    }
                });

                if (registerResponse.status === 201) {
                    return true; 
                }
            } else {
                setMessage("Business already exists.");
            }
        } catch (error) {
            setMessage('Failed to register business.');
        } finally {
            setIsLoading(false);
        }
        return false; 
    };
    
    const handleCloseModal = () => {
        setShowSuccessModal(false);
        navigate('/account');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const success = await registerBiz();
        if (success) {
            setShowSuccessModal(true);
        } else {
            if (!message) {
                setMessage("Registration was not successful. Please try again.");
            }
        }
    };
    
    return (
        <>
            {isLoading ? <BarSpinner /> : (

                <div className='app-landing-page'>
                    <div className="login-container">
                        <Form className="login-form" onSubmit={handleSubmit}>
                            <h1 className='pb-3'>Register Biz</h1>
                            <p>Register your business today!</p>
                            <hr />
                            <h6 className='text-danger'>{message}</h6>
                            
                            <Form.Group controlId="formBusinessName">
                                <Form.Label>Biz Name</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Business Name"
                                    value={businessName}
                                    onChange={e => setBusinessName(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId="formBusinessAlias">
                                <Form.Label>Biz Alias</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Business Alias"
                                    value={businessAlias}
                                    onChange={e => setBusinessAlias(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId="formBasicCategory">
                                <Form.Label>Business Category</Form.Label>
                                <Form.Select
                                    required
                                    value={category}
                                    onChange={e => setCategory(e.target.value)}
                                >
                                    <option value="">Select a category</option>
                                    {categories.map((cat, index) => (
                                        <option key={index} value={cat}>{cat}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>

                            <Form.Group controlId="formExternalURL">
                                <Form.Label>Existing URL</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="External Biz URL"
                                    value={externalURL}
                                    onChange={e => setExternalURL(e.target.value)}
                                />
                            </Form.Group>

                            <h5 className='py-3 text-center'>Biz Address</h5>

                            <Form.Group controlId="formBasicAddress">
                                <Form.Label>Address Line 1</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Address Line 1"
                                    value={address1}
                                    onChange={e => setAddress1(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId="formBasicAddress">
                                <Form.Label>Address Line 2</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Address Line 2"
                                    value={address2}
                                    onChange={e => setAddress2(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId="formBasicAddress">
                                <Form.Label>Address Line 3</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Address Line 3"
                                    value={address3}
                                    onChange={e => setAddress3(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId="formDisplayAddress">
                                <Form.Label>Display Address</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Biz Display Address"
                                    value={displayAddress}
                                    onChange={e => setDisplayAddress(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId="formBasicCountry">
                                <Form.Label>Country</Form.Label>
                                <Form.Select
                                    required
                                    value={selectedCountry}
                                    onChange={e => setSelectedCountry(e.target.value)}
                                >
                                    <option value="">Select a country</option>
                                    {countries.map((country, index) => (
                                        <option key={index} value={country.code}>{country.name}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>

                            <Form.Group controlId="formBasicState">
                                <Form.Label>State</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="State"
                                    value={state}
                                    onChange={e => setState(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId="formBasicCity">
                                <Form.Label>City</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="City"
                                    value={city}
                                    onChange={e => setCity(e.target.value)}
                                />
                            </Form.Group>

                            <h6 className='py-3 text-center'>Biz Coordinates</h6>
                            <h6 className='text-center'>
                                For more information, please visit this  
                                <a href="https://support.google.com/maps/answer/18539?hl=en&co=GENIE.Platform%3DDesktop" target="_blank" rel="noopener noreferrer" className='ps-1 biz-color'>
                                    link
                                </a>.
                            </h6>

                            <Form.Group controlId="formBasicLatitude">
                                <Form.Label>Latitude</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Latitude"
                                    value={latitude}
                                    onChange={e => setLatitude(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId="formBasicLongitude">
                                <Form.Label>Longitude</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Longitude"
                                    value={longitude}
                                    onChange={e => setLongitude(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Check
                                    required
                                    type="checkbox"
                                    label="By clicking this, you agree to the Terms & Conditions and the Privacy Policy."
                                    checked={acceptTerms}
                                    className='pt-3'
                                    onChange={e => setAcceptTerms(e.target.checked)}
                                />
                            </Form.Group>

                            <Button variant="warning" type="submit" disabled={isLoading} className='my-3'>
                                Sign Up
                            </Button>
                        </Form>
                    </div>
                </div>

            )}

            <Modal show={showSuccessModal} onHide={handleCloseModal} centered size="lg" backdrop="static" keyboard={false}>
                <Modal.Body>
                    <Container>
                        <h1>Successful Registration!</h1>
                        <p>Congratulations on signing up! Welcome to BizSolutions!</p>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="warning" onClick={handleCloseModal}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}