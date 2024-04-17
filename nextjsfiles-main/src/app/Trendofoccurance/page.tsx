"use client";
import React, { useEffect, useState } from 'react';
import $ from 'jquery';

const CrimeReport: React.FC = () => {
    const [districts, setDistricts] = useState<string[]>([]);
    const [units, setUnits] = useState<string[]>([]);
    const [selectedDistrict, setSelectedDistrict] = useState<string>('');
    const [selectedUnit, setSelectedUnit] = useState<string>('');

    useEffect(() => {
        fetchDistricts();
    }, []);

    const fetchDistricts = () => {
        $.ajax({
            url: 'https://tool3-awix.onrender.com/get_districts',
            method: 'GET',
            success: (response: string[]) => {
                setDistricts(response);
            },
            error: (error) => {
                console.error('Error fetching districts:', error);
                alert('Error fetching districts from the backend.');
            }
        });
    };

    const fetchUnits = (district: string) => {
        $.ajax({
            url: `https://tool3-awix.onrender.com/get_units/${district}`,
            method: 'GET',
            success: (response: string[]) => {
                setUnits(response);
            },
            error: (error) => {
                console.error('Error fetching units:', error);
                alert('Error fetching units for the selected district.');
            }
        });
    };

    const handleDistrictChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const district = event.target.value;
        setSelectedDistrict(district);
        if (district) {
            fetchUnits(district);
        } else {
            setUnits([]);
        }
    };

    const handleDownload = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const downloadURL = `https://tool3-awix.onrender.com/download/${selectedDistrict}/${selectedUnit}`;
        window.open(downloadURL);
    };

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Crime Occurrence Report</h1>
            <form onSubmit={handleDownload}>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="district" style={{ fontWeight: 'bold' }}>Select District:</label>
                    <select
                        id="district"
                        name="district"
                        value={selectedDistrict}
                        onChange={handleDistrictChange}
                        style={{ width: '100%', padding: '8px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '4px' }}
                        required
                    >
                        <option value="" disabled>Select a district</option>
                        {districts.map((district) => (
                            <option key={district} value={district}>
                                {district}
                            </option>
                        ))}
                    </select>
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="unit" style={{ fontWeight: 'bold' }}>Select Unit:</label>
                    <select
                        id="unit"
                        name="unit"
                        value={selectedUnit}
                        onChange={(e) => setSelectedUnit(e.target.value)}
                        style={{ width: '100%', padding: '8px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '4px' }}
                        required
                    >
                        <option value="" disabled>Select a unit</option>
                        {units.map((unit) => (
                            <option key={unit} value={unit}>
                                {unit}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    type="submit"
                    style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px 20px', fontSize: '16px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                    Download PDF
                </button>
            </form>
        </div>
    );
};

export default CrimeReport;
