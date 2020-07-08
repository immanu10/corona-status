import React, { useState, useEffect } from "react"
import { fetchDailyData } from "../../api"
import { Line, Bar } from "react-chartjs-2"

import styles from "./Chart.module.css"

const Chart = ({ data: { confirmed, recovered, deaths }, country }) => {
    const [dailyData, setDailyData] = useState([])

    useEffect(() => {
        const fetchAPI = async () => {

            const initialDailyData = await fetchDailyData();

            setDailyData(initialDailyData);
        }
        fetchAPI()

    }, [])


    const lineChart = (
        dailyData.length
            ? (
                <Line
                    data={{
                        labels: dailyData.map(({ date }) => date),
                        datasets: [{
                            // data: dailyData.map(({ confirmed }) => confirmed),
                            data: dailyData.map((data) => data.confirmed),
                            label: "Infected",
                            borderColor: "#ffeb3b",
                            fill: true,
                        },
                        {
                            data: dailyData.map((data) => data.deaths),
                            label: "Deaths",
                            borderColor: "#ef5350",
                            backgroundColor: "#d32f2f",
                            fill: true,
                        }]
                    }}
                />) : null
    )


    const barChart = (
        confirmed ? (
            <Bar
                data={{
                    labels: ["INFECTED", "RECOVERED", "DEATHS"],
                    datasets: [{
                        label: "People",
                        backgroundColor: ["#ffeb3b", "#66bb6a", "#ef5350"],
                        data: [confirmed.value, recovered.value, deaths.value]
                    }],

                }}
                options={{
                    legend: { display: false },
                    title: { display: true, text: `Current Status in ${country}` }

                }}

            />
        ) : null
    )
    return (
        <div className={styles.container}>
            {country ? barChart : lineChart}
        </div>
    )
}

export default Chart