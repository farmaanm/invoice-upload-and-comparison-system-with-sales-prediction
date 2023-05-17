import React, { useEffect, useState } from 'react'
import { Chart } from "react-google-charts";
import LoadingScreen from '../../loading/LoadingScreen';
import NavigationBar from '../utils/navBar/navigationBar'

const Sales = () => {

    /* Loading Screen */
    const [loading, setLoading] = useState(true)
    let [sales, setSales] = useState([])

    /* Get Sales Prediction */
    let getSales = async () => {
        let response = await fetch('http://127.0.0.1:8000/salesprediction')
        let data = await response.json()
        setSales(data)
    }

    useEffect(() => {
        /* Timeout for Loading Screen */
        setTimeout(() => setLoading(false), 4000) //4s
        getSales()
    });

    /* Array for prediction */
    const data = [
        ["Month", "Predicted Sales"]
    ];

    /* Get month name from month number */
    function getMonthName(monthNumber) {
        const date = new Date();
        date.setMonth(monthNumber - 1);

        return date.toLocaleString('en-US', { month: 'long' });
    }

    /* Push prediction results to array */
    for (var i = 0; i < sales.length; i++) {
        //console.log(typeof (sales[i][0]))

        if (typeof (sales[i][0]) == 'number') {
            sales[i][0] = getMonthName(sales[i][0])
        }

        data.push(sales[i])
    }

    /* Chart Labels */
    const options = {
        title: "Company Sales",
        hAxis: { title: "Month" },
        vAxis: { title: "Sales ($)" },
        curveType: "function",
        legend: { position: "topright" },
    };


    return (
        <>

            {/* Navigation Bar */}
            <NavigationBar />

            {loading === false ? (
                <div style={{ marginTop: '135px' }}>

                    {/* Sales Chart */}
                    <Chart
                        chartType="LineChart"
                        width="100%"
                        height="600px"
                        data={data}
                        options={options}
                        style={{ marginTop: '-15px' }}
                    />
                </div>
            ) : (
                <LoadingScreen />
            )}
        </>
    );
}

export default Sales