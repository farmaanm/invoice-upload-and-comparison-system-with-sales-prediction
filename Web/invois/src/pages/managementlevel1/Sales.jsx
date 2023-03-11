import { MDBIcon } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react'
import { Chart } from "react-google-charts";
import LoadingScreen from '../../loading/LoadingScreen';

function Sales() {

    /* Loading Screen */
    const [loading, setLoading] = useState(true)
    let [sales, setSales] = useState([])

    let getSales = async () => {
        let response = await fetch('http://127.0.0.1:8000/salesprediction')
        let data = await response.json()
        setSales(data)
    }

    useEffect(() => {
        /* Timeout for Loadin Screen */
        setTimeout(() => setLoading(false), 4000) //4s
        getSales()
    });

    const data = [
        //["Year", "Actual Sales", "Predicted Sales"]
        ["Month", "Predicted Sales"]
        /*[0, 1296, 920.273462],
        [1, 1368, 1490.778158],
        [2, 4986, 4961.348225],
        [3, 75, -1.542094],
        [4, 176, 152.711333],
        [5, 125, 66.640923],
        [6, 4986.00, 4963.679278],
        [7, 151.00, 120.076733],
        [8, 350.00, 275.406602],
        [9, 134.00, 124.899418],
        [10, 656.00, 786.222850],
        [11, 246.00, 345.330943],
        [12, 75.00, 4.203454],
        [13, 594.00, 639.425456],
        [14, 990.00, 1128.475337],
        [15, 296.00, 361.534059],
        [16, 275.00, 280.054846],
        [17, 378.00, 421.671669],
        [18, 200.00, 221.704172],
        [19, 240.00, 334.815918],
        [20, 151.00, 129.486920],
        [21, 100.00, 23.959172],
        [22, 323.00, 333.044993],
        [23, 632.00, 591.748161],
        [24, 519.00, 593.884089],
        [25, 750.00, 812.745610],
        [26, 175.00, 213.473098],
        [27, 159.00, 134.051537],
        [28, 100.00, 14.132591],
        [29, 435.00, 366.266250],
        [30, 151.00, 108.724001],
        [31, 990.00, 1128.475337],
        [32, 200.00, 134.203557],
        [33, 418.00, 441.505393],
        [34, 100.00, 203.125286],
        [35, 301.00, 256.229163],
        [36, 443.00, 579.803210],
        [37, 198.00, 219.145703],
        [38, 3274.00, 3303.204720],
        [39, 316.00, 372.629593],
        [40, 396.00, 434.767691]*/
    ];

    function getMonthName(monthNumber) {
        const date = new Date();
        date.setMonth(monthNumber - 1);

        return date.toLocaleString('en-US', { month: 'long' });
    }

    for (var i = 0; i < sales.length; i++) {
        //console.log(typeof (sales[i][0]))

        if (typeof (sales[i][0]) == 'number') {
            sales[i][0] = getMonthName(sales[i][0])
        }

        data.push(sales[i])
    }

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

            <div>
                <div style={{
                    position: 'relative',
                    height: '100px',
                    width: '100%'
                }}>

                    <div style={{ position: 'absolute', top: '20px', left: '60px' }}>
                        <MDBIcon fas icon="crow fa-3x me-3" style={{ color: '#381ce4' }} />
                        <span className="h1 fw-bold mb-0">Invois</span>
                    </div>

                    <div style={{ position: 'absolute', bottom: '10px', right: '320px' }}>
                        <a href='/sales' style={{ textDecoration: 'underline' }}>Sales</a>
                    </div>

                    <div style={{ position: 'absolute', bottom: '10px', right: '240px' }}>
                        <a href='/hhistory'>History</a>
                    </div>

                    <div style={{ position: 'absolute', bottom: '10px', right: '140px' }}>
                        <a href="/hcontract">Customers</a>
                    </div>

                    <div style={{ position: 'absolute', bottom: '10px', right: '60px' }}>
                        <a href="/">Log out</a>
                    </div>
                </div>
                <hr style={{ height: '5px', backgroundColor: '#381ce4' }}></hr>
            </div>

            {loading === false ? (
                <div>

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