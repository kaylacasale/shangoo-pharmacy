import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { FIND_PRESCRIPTION } from '../utils/mutations';

import shangooIcon from '../assets/images/shangoo-icon.png';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import VaccineIcon from '@mui/icons-material/Vaccines'
// npm install @mui/icons-material @mui/material @emotion/styled @emotion/react

const Info = () => {
    const [medication, setMedication] = useState('');
    const [prescription, setPrescription] = useState('');
    const [selectedPrescriptions, setSelectedPrescriptions] = useState([]);

    const handleMedicationChange = (event) => {
        setMedication(event.target.value);
    };

    const handlePrescriptionChange = (event) => {
        const selectedPrescription = event.target.value;
        console.log(`Selected prescription: ${selectedPrescription}`);
        setPrescription(selectedPrescription);
        setSelectedPrescriptions([...selectedPrescriptions, selectedPrescription]);
    };

    // const handleFindPrescriptionClick = () => {
    //     console.log(`Medication name: ${medication}`);
    //     findPrescription({ variables: { prescriptionName: prescription } });
    //     setSelectedPrescriptions([...selectedPrescriptions, prescription]);
    // };
    // const handleFindPrescriptionClick = () => {
    //     setPrescriptionList([]);
    //     findPrescription({ variables: { prescriptionName: prescription } });
    //     setMedicationList((prev) => [...prev, medication]);
    // };
    const handleFindPrescriptionClick = () => {
        const matchedPrescription = prescriptionList.find(
            (prescription) => prescription.name === medication
        );

        if (matchedPrescription) {
            setPrescriptionList((prev) => [...prev, matchedPrescription]);
        }

        setMedicationList((prev) => [...prev, medication]);
    };
    const [medicationList, setMedicationList] = useState([]);
    // const [prescriptionList, setPrescriptionList] = useState([]);

    const [findPrescription, { data }] = useMutation(FIND_PRESCRIPTION);

    const [prescriptionList, setPrescriptionList] = useState([
        { id: 1, name: 'Prescription 1' },
        { id: 2, name: 'Prescription 2' },
        { id: 3, name: 'Prescription 3' },
    ]);

    return (
        <div className="info-page">
            <div className="search-section">
                <div className="search-box">
                    <label htmlFor="medication">Medication:</label>
                    <input className="form-input" placeholder="Rx Name" type="text" id="medication" value={medication} onChange={handleMedicationChange} />
                </div>
                <div className="prescription-dropdown">
                    <label htmlFor="prescription">Prescription:</label>
                    <select id="prescription" value={prescription} onChange={handlePrescriptionChange}>
                        <option value="">Select a prescription</option>
                        <option value="prescription1">Prescription 1</option>
                        <option value="prescription2">Prescription 2</option>
                        <option value="prescription3">Prescription 3</option>
                    </select>
                </div>
                <div className="find-prescription-button">
                    <button onClick={handleFindPrescriptionClick} className="btn btn-lg btn-primary">Find Prescription</button>
                </div>
            </div>
            {data && data.findPrescription && (
                <div>
                    <h3>Prescription List</h3>
                    <ul>
                        {data.findPrescription.map((prescription) => (
                            <li key={prescription.id}>{prescription.name}</li>
                        ))}
                    </ul>
                </div>
            )}
            {selectedPrescriptions.length > 0 && (
                <div>
                    <h3>Selected Prescriptions</h3>
                    <ul>
                        {selectedPrescriptions.map((prescription) => (
                            <li key={prescription}>{prescription}</li>
                        ))}
                    </ul>
                </div>
            )}
            {medicationList.length > 0 && (
                <div>
                    <h3>Medication List</h3>
                    <ul>
                        {medicationList.map((med) => (
                            <li key={med}>{med}</li>
                        ))}
                    </ul>
                </div>
            )}
            <div className="rounded-boxes">
                <div className="rounded-box">
                    <div className="box-container">
                        <span>Travel & Vaccinations</span>
                        <i className="material-icons"><VaccineIcon sx={{ color: '#DCE8E8', fontSize: 40 }} /></i>
                    </div>
                </div>
                <div className="rounded-box">
                    <div className="box-container">
                        <span>In-stock</span>
                        <i className="material-icons">icon2</i>
                    </div>
                </div>
                <div className="rounded-box">
                    <div className="box-container">
                        <span>Compounding</span>
                        <i className="material-icons">icon3</i>
                    </div>
                </div>
            </div>

            {/* <div className="rounded-boxes" style={{ display: 'flex', textAlign: 'center', justifyContent: 'center', lineHeight: '180px', fontSize: '18px' }}>
                <div className="rounded-box">Travel & Vaccinations
                    <img src={shangooIcon} alt="icon" style={{ verticalAlign: 'middle', marginRight: '5px' }} />

                </div>
                <div className="rounded-box">In-stock
                    <img src="your-icon-url" alt="icon" style={{ verticalAlign: 'middle', marginRight: '5px' }} />

                </div>
                <div className="rounded-box"> Compounding
                    <img src="your-icon-url" alt="icon" style={{ verticalAlign: 'middle', marginRight: '5px' }} />

                </div>
            </div> */}
        </div>
    );
};

export default Info;
