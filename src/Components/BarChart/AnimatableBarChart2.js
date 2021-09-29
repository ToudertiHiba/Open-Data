import JSONdata from './../../Data/SpecificCauses.json'
import React, { useEffect, useState } from 'react';
import ChartRace from 'react-chart-race';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import RangeSlider from 'react-bootstrap-range-slider';

const Slider = (props) => {
    const countryCode = props.countryCode;
    console.log(countryCode);
    const findCountryInfo = (countryCode) => {
        let searchedCountry = undefined
        JSONdata.forEach(country => {
            //probleme d'incoherence entre les code et ISO_A3
            if (country.code === countryCode) {
                searchedCountry = country
            }
        });
        return searchedCountry
    }

    const country = findCountryInfo(countryCode)
    const years = Object.keys(country.years);
    var fullData = []


    years.forEach(year => {
        const labels = Object.keys(country.years[year])
        const dataset = Object.values(country.years[year])
        const colors = ["#e6194B", "#f58231", "#ffe119", "#bfef45", "#42d4f4", "#4363d8", "#911eb4"]
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
    const [play, setPlay] = useState(true)
    const [yearId, setYearId] = useState(0)
    const [data, setData] = useState(fullData[yearId].value)
    useEffect(() => {
        const interval = setInterval(() => {
            if (yearId < years.length && play) {
                if (yearId === years.length - 1) {
                    setPlay(false)
                }
                else {
                    setYearId(parseInt(yearId) + 1)
                }


                setData(fullData[yearId].value);
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    });

    return (
        <div>
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
            <div style={{ margin: 100 }}>
                <div>{'Year: ' + fullData[Math.min(yearId, years.length - 1)].name}</div>
                <Button togglable={"true"} onClick={() => setPlay(!play)}>
                    {play ? (

                        <FontAwesomeIcon icon={faPause} />
                    ) : (

                        <FontAwesomeIcon icon={faPlay} />
                    )}
                </Button>
                <RangeSlider
                    value={parseInt(fullData[Math.min(yearId, years.length - 1)].name)}
                    min={parseInt(fullData[0].name)}
                    max={parseInt(fullData[years.length - 1].name)}
                    onChange={
                        changeEvent => {
                            const getCurrentYearId = () => {
                                for (let i = 0; i < fullData.length; i++) {
                                    if (parseInt(fullData[i].name) === parseInt(changeEvent.target.value))
                                        return i
                                }
                                return 0
                            }
                            setYearId(getCurrentYearId())
                            setData(fullData[yearId].value);
                            setPlay(false)
                        }
                    }
                />
            </div>

        </div>
    );
}



export default Slider












