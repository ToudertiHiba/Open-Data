import React from "react";
import { Bar } from 'react-chartjs-2';
import JSONdata from "../Data/newResult.json";

const BarChart = (props) => {
    const countryCode = "MAR"
    const year = 2007
    const labels = Object.keys(JSONdata[countryCode].year[year])
    const dataset = Object.values(JSONdata[countryCode].year[year])

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Number of deaths by cause in ' + JSONdata[countryCode].countryName,
                data: dataset,
            },
        ],
    }
    return (
        <div>
            <Bar
                data={data}
                height={400}
                width={600}
                options={{
                    maintainAspectRatio: false,
                }}
            />
            
        </div>
    )
}
export default BarChart