"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CrimeRanking: React.FC = () => {
  const [year, setYear] = useState('');
  const [district, setDistrict] = useState('');
  const [result, setResult] = useState('');

  const populateYearDropdown = () => {
    const yearDropdown = document.getElementById("year") as HTMLSelectElement;
    const currentYear = new Date().getFullYear();

    for (let year = 2005; year <= currentYear; year++) {
      const option = document.createElement("option");
      option.text = year.toString();
      option.value = year.toString();
      yearDropdown.add(option);
    }
  };

  const handleFormSubmission = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    axios.get(`https://tool6.onrender.com/crime_ranking/${year}/${district}`)
      .then(response => {
        const data = response.data;

        let crimeRankingResult = document.getElementById("crimeRankingResult");
        crimeRankingResult!.innerHTML = ""; // Clear previous results

        if (data.error) {
          crimeRankingResult!.innerText = data.error;
        } else {
          data.forEach((item: { rank: number, beat: string, num_crimes: number }) => {
            crimeRankingResult!.innerHTML += `<p>Rank: ${item.rank}, Beat: ${item.beat}, Number of Crimes: ${item.num_crimes}</p>`;
          });
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    populateYearDropdown();
  }, []);

  const allDistricts = [
    "Bagalkot", "Ballari", "Belagavi City", "Belagavi Dist", "Bengaluru City",
    "Bengaluru Dist", "Bidar", "Chamarajanagar", "Chickballapura", "Chikkamagaluru",
    "Chitradurga", "CID", "Coastal Security Police", "Dakshina Kannada", "Davanagere",
    "Dharwad", "Gadag", "Hassan", "Haveri", "Hubballi Dharwad City", "K.G.F", "Kalaburagi",
    "Kalaburagi City", "Karnataka Railways", "Kodagu", "Kolar", "Koppal", "Mandya",
    "Mangaluru City", "Mysuru City", "Mysuru Dist", "Raichur", "Ramanagara", "Shivamogga",
    "Tumakuru", "Udupi", "Uttara Kannada", "Vijayanagara", "Vijayapur", "Yadgir",
    "Yelahanka", "Basavanagudi", "Rajajinagar", "Malleshwaram" // Add more districts here
  ];

  const selectStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    marginBottom: '15px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
  };

  const buttonStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Crime Ranking</h1>

      <form id="crimeRankingForm" onSubmit={handleFormSubmission} style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
        <label htmlFor="year">Select Year:</label>
        <select name="year" id="year" onChange={(e) => setYear(e.target.value)} style={selectStyle}>
          <option value="">Select Year</option>
        </select>

        <label htmlFor="district">Select District:</label>
        <select name="district" id="district" onChange={(e) => setDistrict(e.target.value)} style={selectStyle}>
          <option value="">Select District</option>
          {allDistricts.map((districtName, index) => (
            <option key={index} value={districtName}>{districtName}</option>
          ))}
        </select>

        <button type="submit" style={buttonStyle}>Get Crime Ranking</button>
      </form>

      <div id="crimeRankingResult" style={{ marginTop: '20px', textAlign: 'center' }}></div>
    </div>
  );
};

export default CrimeRanking;
