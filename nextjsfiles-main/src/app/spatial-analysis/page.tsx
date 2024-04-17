"use client";
import React, { useState } from 'react';
import Plotly from 'plotly.js-dist';

interface CrimeData {
    crime_map: string;
    crime_heatmap: string;
    message?: string;
}

const CrimeVisualizationDashboard: React.FC = () => {
    const [selectedDistrict, setSelectedDistrict] = useState<string>('');

    const updateVisualizations = async () => {
        if (!selectedDistrict) {
            // Clear visualizations if no district is selected
            return;
        }

        try {
            const response = await fetch(`https://tool1-bsoi.onrender.com/crime_visualizations/${selectedDistrict}`);
            const data: CrimeData = await response.json();

            if (data.message) {
                alert(data.message);
                return;
            }

            // Assuming the JSON object has properties 'crime_map' and 'crime_heatmap' with Plotly JSON data
            Plotly.newPlot('map-container', JSON.parse(data.crime_map));
            Plotly.newPlot('heatmap-container', JSON.parse(data.crime_heatmap));
        } catch (error) {
            console.error('Error loading the data:', error);
            alert('Failed to load data.');
        }
    };

    const handleDistrictChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedDistrict(event.target.value);
    };

    const districtOptions = [
        "", // Empty default option
        "Bagalkot",
        "Ballari",
        "Belagavi City",
        "Belagavi Dist",
        "Bengaluru City",
        "Bengaluru Dist",
        "Bidar",
        "Chamarajanagar",
        "Chickballapura",
        "Chikkamagaluru",
        "Chitradurga",
        "CID",
        "Coastal Security Police",
        "Dakshina Kannada",
        "Davanagere",
        "Dharwad",
        "Gadag",
        "Hassan",
        "Haveri",
        "Hubballi Dharwad City",
        "K.G.F",
        "Kalaburagi",
        "Kalaburagi City",
        "Karnataka Railways",
        "Kodagu",
        "Kolar",
        "Koppal",
        "Mandya",
        "Mangaluru City",
        "Mysuru City",
        "Mysuru Dist",
        "Raichur",
        "Ramanagara",
        "Shivamogga",
        "Tumakuru",
        "Udupi",
        "Uttara Kannada",
        "Vijayanagara",
        "Vijayapur",
        "Yadgir"
    ];

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', textAlign: 'center', backgroundColor: '#f8f9fa', color: '#333' }}>
            <h1 style={{ marginBottom: '20px', color: '#007bff' }}>Crime Visualization Dashboard</h1>
            <div style={{ marginBottom: '20px' }}>
                <label htmlFor="districtSelect" style={{ marginRight: '10px' }}>Choose a district:</label>
                <select
                    id="districtSelect"
                    value={selectedDistrict}
                    onChange={handleDistrictChange}
                    style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc', backgroundColor: '#fff' }}
                >
                    {districtOptions.map((district, index) => (
                        <option key={index} value={district}>{district || "Select a District"}</option>
                    ))}
                </select>
            </div>
            <button
                onClick={updateVisualizations}
                style={{ padding: '10px 20px', borderRadius: '5px', backgroundColor: '#007bff', color: '#fff', border: 'none' }}
            >
                Update Visualizations
            </button>
            <div style={{ marginTop: '40px', overflow: 'hidden' }}>
                <div id="map-container" style={{ width: '100%', height: '400px', border: '1px solid #ddd', borderRadius: '5px', backgroundColor: '#fff', marginBottom: '20px' }}></div>
                <div id="heatmap-container" style={{ width: '100%', height: '400px', border: '1px solid #ddd', borderRadius: '5px', backgroundColor: '#fff' }}></div>
            </div>
        </div>
    );
};

export default CrimeVisualizationDashboard;
