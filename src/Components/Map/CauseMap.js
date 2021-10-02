import React, { useEffect, useState } from 'react';
import { Map, GeoJSON } from "react-leaflet";
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import RangeSlider from 'react-bootstrap-range-slider';
import countries from './../../Data/countries-50m.json';
import ListCountry from './../../Data/countries.json';
import ListCountryPopulations from './../../Data/population.json';

import "./grid-container.css";
import "leaflet/dist/leaflet.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';

const CauseMap = (props) => {
    const years = Object.keys(ListCountry[0].years)
    const [yearId, setYearId] = useState(0)
    const causeName = props.causeName
    const mapBounds = [
        [89, 179],
        [-89, -179]
    ]
    const [play, setPlay] = useState(true)

    const legendPourcentages = [0.01, 0.05, 0.1, 0.2, 0.4, 0.6, 0.8, 1]

    function getCauseColor(d) {
        return d > legendPourcentages[6] * generalizeMax() ? '#800026' :
            d > legendPourcentages[5] * generalizeMax() ? '#BD0026' :
                d > legendPourcentages[4] * generalizeMax() ? '#E31A1C' :
                    d > legendPourcentages[3] * generalizeMax() ? '#FC4E2A' :
                        d > legendPourcentages[2] * generalizeMax() ? '#FD8D3C' :
                            d > legendPourcentages[1] * generalizeMax() ? '#FEB24C' :
                                d > legendPourcentages[0] * generalizeMax() ? '#FED976' :
                                    '#FFEDA0';
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (yearId < years.length && play) {
                if (yearId === years.length - 1) {
                    setPlay(false)
                }
                else {
                    setYearId(parseInt(yearId) + 1)
                }
                countries.features.forEach(element => {
                    countryStyle(element)
                });
                
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    });

    // const getTotalDeaths = (year) => {
    //     let totalDeaths = 0
    //     ListCountry.forEach(country => {
    //         if (country.code !== "OWID_WRL") {
    //             totalDeaths += parseFloat(country.years[year][causeName])
    //         }
    //     });
    //     return totalDeaths
    // }

    // const getPourcentage = (code, cause, year) => {
    //     const totalDeaths = getTotalDeaths(cause, year)
    //     let pourc = 0
    //     let objet = {};
    //     ListCountry.forEach(country => {
    //         if (country.code === code) {
    //             //console.log(country.years[Year]);
    //             objet = country.years[year];
    //             if (objet === undefined) {
    //                 return pourc;
    //             }
    //             else {
    //                 pourc = parseFloat(objet[cause]) / totalDeaths
    //                 return pourc;

    //             }
    //         }
    //     });
    //     return pourc;
    // }

    const getCountryPopulation = (code, year) => {
        let population = 0
        let objet = {};
        ListCountryPopulations.forEach(country => {
            if (country["Country Code"] === code) {
                objet = country.years[year];
                if (objet === undefined) {
                    return population;
                }
                else {
                    population = parseInt(objet)
                    return population;
                }
            }
        });
        return population;
    }

    const getPourcentagePopulation = (code, year) => {
        const population = getCountryPopulation(code, year)
        let pourc = 0
        let objet = {};
        ListCountry.forEach(country => {
            if (country.code === code && code !== "OWID_WRL") {
                objet = country.years[year];
                if (objet === undefined) {
                    return pourc;
                }
                else if (population === 0) {
                    return pourc;
                }
                else {
                    pourc = 100000 * parseFloat(objet[causeName]) / population
                    return pourc;
                }
            }
        });
        return pourc;
    }

    const maxPourcentageCountry = (code) => {
        const yearsPourcentages = []
        for (let i = 0; i < years.length; i++) {
            yearsPourcentages.push(parseFloat(getPourcentagePopulation(code, years[i])))
        }
        let max = Math.max.apply(null, yearsPourcentages)
        if (isNaN(max)) {
            max = 0
        }
        return max
    }

    //We are sure this works
    const getMaxPourcentage = () => {
        const maxCountries = []
        ListCountry.forEach(country => {
            maxCountries.push(maxPourcentageCountry(country.code))
        });
        const max = Math.max.apply(null, maxCountries);
        return max
    }

    const generalizeMax = () => {
        const grades = [1, 10, 100, 1000, 10000, 100000]
        const max = getMaxPourcentage()
        let result = 100000
        console.log(max);
        grades.forEach(element => {
            if (max <= element){
                result = element
                console.log("max = " + max + "result = " +  result);
                return result
            }
        });
        
        return result
    }

    let countryStyle = (feature) => {
        return {
            fillColor: getCauseColor(getPourcentagePopulation(feature.id, causeName, years[yearId])),
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 1
        }
    };

    const onEachCountry = (country, layer) => {
        const countryName = country.properties.name;
        layer.bindPopup(countryName);

        layer.on({
            mouseover: (event) => {
                event.target.setStyle({
                    weight: 2,
                    color: '#000',
                    dashArray: '',
                    fillOpacity: 0.7
                });
            },
            mouseout: (event) => {
                event.target.setStyle({
                    weight: 2,
                    opacity: 1,
                    color: 'white',
                    dashArray: '3',
                    fillOpacity: 1
                });
            }
        })
    }
    const legend = (legendPourcentages) => {
        return legendPourcentages.map((item, index) => {
            if (index === legendPourcentages.length - 1) {
                return (
                    null
                );
            }
            else {
                return (
                    <tr style={{ margin: 0 }} key={index} >
                        <td style={{ margin: 0 }}> <div style={{ width: 30, height: 30, backgroundColor: getCauseColor(item), margin: 0 }}></div></td>
                        <td style={{ margin: 0 }}> {item * generalizeMax()}-{legendPourcentages[index + 1] * generalizeMax()}</td>
                    </tr>
                );
            }

        });
    }

    return (
        <div>

            <div style={{ textAlign: "left", fontSize: "20px" }}>
                <h3>{causeName} {years[Math.min(yearId, years.length - 1)]}</h3>
            </div>

            <div style={{ marginTop: "20px", marginLeft: "11cm" }}>

                <Map style={{ height: "60vh", width: "100vh" }} zoom={2} center={[10, 10, 10]} maxZoom={6} minZoom={2} maxBounds={mapBounds} >
                    <GeoJSON style={countryStyle} data={countries.features} onEachFeature={onEachCountry} ></GeoJSON>
                    <div style={{ float: "left", borderWidth: 2, borderStyle: "solid", padding: 10, marginTop: 300 }}>
                        <table style={{ width: "50px", height: "20px" }}>
                            <tbody>
                                {legend(legendPourcentages)}
                            </tbody>
                        </table>
                    </div>
                </Map>


            </div>

            <div  >
                <div style={{ marginLeft: "22cm", marginTop: "30px" }}>

                    <Button
                        style={{ width: 60, height: 60, borderRadius: "50%", display: "inline-block" }}
                        togglable={"true"}
                        onClick={() => setPlay(!play)}>
                        {play ? (
                            <FontAwesomeIcon icon={faPause} size="2x" />
                        ) : (
                            <FontAwesomeIcon icon={faPlay} size="2x" />
                        )}
                    </Button>
                </div>

                <div >
                    <RangeSlider
                        style={{ paddingTop: 10 }}
                        value={parseInt(years[yearId])}
                        min={parseInt(years[0])}
                        max={parseInt(years[years.length - 1])}
                        onChange={
                            changeEvent => {
                                const getCurrentYearId = () => {
                                    for (let i = 0; i < years.length; i++) {
                                        if (years[i] === changeEvent.target.value)
                                            return i
                                    }
                                    return 0
                                }
                                setYearId(getCurrentYearId())
                                countries.features.forEach(element => {
                                    countryStyle(element)
                                });
                                setPlay(false)
                            }
                        }
                    />
                </div>
            </div>
        </div>
    )
}

export default CauseMap
