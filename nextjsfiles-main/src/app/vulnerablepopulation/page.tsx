"use client";
import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';

// Define types for fetched data
interface CrimeData {
    age_group: string;
    sex: string;
    district_name: string;
    crime_count: number;
}

interface ProbabilityData {
    district: string;
    crime_probability: number;
}

const CrimeAnalysis: React.FC = () => {
    // State for storing fetched data
    const [crimeData, setCrimeData] = useState<CrimeData[]>([]);
    const [probabilityData, setProbabilityData] = useState<ProbabilityData | null>(null);

    // Function to fetch data based on user input
    const fetchData = () => {
        const preference = (document.getElementById('preference') as HTMLSelectElement).value;
        const selectedDistrict = (document.getElementById('districtSelect') as HTMLSelectElement).value;

        fetch(`https://tool5-7zzb.onrender.com/crime_occurrence/${preference}`)
            .then(response => response.json())
            .then((data: CrimeData[]) => {
                // Update the crime occurrence chart
                setCrimeData(data);
            })
            .catch(error => console.error('Error fetching data:', error));

        fetchCrimeProbability(selectedDistrict);
    };

    // Function to fetch crime probability data and update the UI
    const fetchCrimeProbability = (district: string) => {
        fetch(`https://tool5-7zzb.onrender.com/crime_probability/${district}`)
            .then(response => response.json())
            .then((data: ProbabilityData) => {
                setProbabilityData(data);
            })
            .catch(error => console.error('Error fetching crime probability:', error));
    };

    // Function to update the crime occurrence chart
    useEffect(() => {
        const labels = crimeData.map(item => {
            return item.age_group; // Assuming preference is always 'age_group' in this context
        });
        const counts = crimeData.map(item => item.crime_count);

        const ctx = document.getElementById('crimeCanvas') as HTMLCanvasElement;
        const existingChart = Chart.getChart(ctx); // Get the existing chart instance

        // If there's an existing chart, destroy it
        if (existingChart) {
            existingChart.destroy();
        }

        // Create a new chart instance
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Crime Count',
                    data: counts,
                    backgroundColor: 'skyblue',
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Crime Count'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Age Group'
                        }
                    }
                }
            }
        });
    }, [crimeData]);

    // Function to fetch and populate the district dropdown
    useEffect(() => {
        fetch('https://tool5-7zzb.onrender.com/crime_occurrence/location')
            .then(response => response.json())
            .then((data: CrimeData[]) => {
                const districtSelect = document.getElementById('districtSelect') as HTMLSelectElement;
                districtSelect.innerHTML = ''; // Clear previous options

                data.forEach(item => {
                    const option = document.createElement('option');
                    option.text = item.district_name;
                    option.value = item.district_name;
                    districtSelect.add(option);
                });
            })
            .catch(error => console.error('Error fetching district data:', error));
    }, []);

    // CSS styles embedded within the TypeScript file
    const styles = `
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }

        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        h1 {
            text-align: center;
            margin-bottom: 20px;
            color: #333;
        }

        label {
            font-weight: bold;
            margin-right: 10px;
        }

        select, button {
            padding: 8px;
            font-size: 16px;
            border-radius: 4px;
            border: 1px solid #ccc;
            margin-bottom: 10px;
        }

        button {
            background-color: #007bff;
            color: #fff;
            border: none;
            cursor: pointer;
        }

        .chart-container {
            width: 100%;
            margin-top: 20px;
        }

        canvas {
            width: 100% !important;
            height: 300px !important;
        }

        p {
            font-size: 16px;
            margin-top: 10px;
        }
    `;

    return (
        <div>
            {/* Embedding CSS within JSX */}
            <style>{styles}</style>

            <div className="container">
                <h1>Crime Analysis</h1>

                <div>
                    <label htmlFor="preference">Select Preference:</label>
                    <select id="preference">
                        <option value="age_group">Age Group</option>
                        <option value="sex">Sex</option>
                        <option value="location">Location</option>
                    </select>

                    <label htmlFor="districtSelect">Select District:</label>
                    <select id="districtSelect">
                        <option value="">Select a District</option>
                        {/* District options will be populated dynamically */}
                    </select>

                    <button onClick={fetchData}>Submit</button>
                </div>

                <div id="crimeProbability" className="chart-container">
                    <h2>Crime Probability</h2>
                    <p id="crimeProbabilityText">
                        {probabilityData && `The probability of a crime occurring in ${probabilityData.district} district is: ${(probabilityData.crime_probability * 100).toFixed(2)}%`}
                    </p>
                </div>

                <div id="crimeChart" className="chart-container">
                    <h2>Crime Occurrence</h2>
                    <canvas id="crimeCanvas"></canvas>
                </div>
            </div>
        </div>
    );
};

export default CrimeAnalysis;
