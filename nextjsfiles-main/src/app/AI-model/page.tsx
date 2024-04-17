"use client";
import React, { useEffect, useState } from 'react';
import Plotly from 'plotly.js-dist';

const CrimeMap: React.FC = () => {
    const [crimeData, setCrimeData] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://tool7.onrender.com/crime_locations');
                const data = await response.json();
                setCrimeData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        plotMap();
    }, [crimeData]);

    const plotMap = () => {
        const crimeLocations = crimeData.filter(location => location.Type === 'Predicted Crime Location');
        const policeStations = crimeData.filter(location => location.Type === 'Police Station');

        const crimeLat = crimeLocations.map(location => location.Latitude);
        const crimeLon = crimeLocations.map(location => location.Longitude);

        const policeLat = policeStations.map(location => location.Latitude);
        const policeLon = policeStations.map(location => location.Longitude);

        const mapData = [{
            type: 'scattermapbox',
            mode: 'markers',
            lat: crimeLat,
            lon: crimeLon,
            marker: {
                size: 10,
                color: 'red',
                opacity: 0.7
            },
            name: 'Predicted Crime Locations'
        }, {
            type: 'scattermapbox',
            mode: 'markers',
            lat: policeLat,
            lon: policeLon,
            marker: {
                size: 10,
                color: 'green',
                opacity: 0.7
            },
            name: 'Police Stations'
        }];

        const layout = {
            title: 'Crime Locations and Police Stations',
            mapbox: {
                style: 'open-street-map',
                zoom: 10
            }
        };

        Plotly.newPlot('map', mapData, layout);

        document.getElementById('json-data')!.innerHTML = `<pre>${JSON.stringify(crimeData, null, 2)}</pre>`;
    };

    return (
        <div>
            <div id="map" style={{ width: '100%', height: '600px' }}></div>
            <div id="json-data" style={{ marginTop: '20px' }}></div>
        </div>
    );
};

export default CrimeMap;
