import JSONdata from "../../Data/newResult.json";

import React, { useEffect, useState } from 'react';
import ChartRace from 'react-chart-race';

const AnimatableBarChart = (props) => {
    const countryCode = "MAR"
    const years = Object.keys(JSONdata[countryCode].year)
    var fullData = []

    const [data, setData] = useState([])
    const [yearId, setYearId] = useState(0)

    years.forEach(year => {
        const labels = Object.keys(JSONdata[countryCode].year[year])
        const dataset = Object.values(JSONdata[countryCode].year[year])
        const colors = ["#0048BA", "#B0BF1A", "#7CB9E8", "#C0E8D5", "#B284BE", "#72A0C1", "#EDEAE0",
            "#F0F8FF", "#C46210", '#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231',
            '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff',
            '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075',
        ]
        var dataYear = {}
        dataYear.name = year
        dataYear.value = []

        for (let i = 0; i < labels.length; i++) {
            var value = {}
            value["id"] = i
            value["title"] = labels[i]
            value["value"] = dataset[i]
            value["color"] = colors[i]
            dataYear.value.push(value)
        }

        fullData.push(dataYear)
    });

    useEffect(() => {
        console.log(years[yearId]);
        const interval = setInterval(() => {
            if (yearId < years.length) {

                setData(fullData[yearId].value);
                setYearId(yearId + 1)
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    });

    return (
        <div>
            <div>

                {fullData[Math.min(yearId, years.length - 1)].name}
            </div>
            <div>
                <ChartRace
                    data={data}
                    padding={12}
                    itemHeight={58}
                    gap={12}
                    titleStyle={{ font: 'normal 400 13px Arial', color: '#000' }}
                    valueStyle={{ font: 'normal 400 11px Arial', color: '#000' }}
                />
            </div>

        </div>
    );
}

export default AnimatableBarChart
