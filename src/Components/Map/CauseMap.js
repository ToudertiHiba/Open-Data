import React, { useEffect, useState } from 'react';
import { Map, GeoJSON } from "react-leaflet";
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import RangeSlider from 'react-bootstrap-range-slider';
import { withRouter } from "react-router-dom";

import countries from './../../Data/countries-50m.json';
import ListCountry from './../../Data/SpecificCauses.json';

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
    const causeList = [
        "Maladies cardiovasculaires",
        "Cancer",

        "Utilisation d'alcool et de drogues",
        "Suicide",

        "Déficiences nutritionnelles",
        "Maladies respiratoires",

        "Accidents de route"]
    const causeColor = ["#e6194B", "#f58231", "#ffe119", "#bfef45", "#42d4f4", "#4363d8", "#911eb4"]
    // console.log(causeColor)
    const noDataColor = "red"

    const getColor = (cause) => {
        for (let i = 0; i < causeList.length; i++) {
            if (causeList[i] === cause) {
                return causeColor[i];
            }
        }
        return noDataColor;
    }



    function getCauseColor(d) {
        return d > 0.1 ? '#800026' :
            d > 0.035 ? '#BD0026' :
                d > 0.03 ? '#E31A1C' :
                    d > 0.02 ? '#FC4E2A' :
                        d > 0.015 ? '#FD8D3C' :
                            d > 0.01 ? '#FEB24C' :
                                d > 0.005 ? '#FED976' :
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


    const getTotalDeaths = (cause, year) => {
        let totalDeaths = 0
        ListCountry.forEach(country => {
            totalDeaths += parseFloat(country.years[year][cause])
        });
        return totalDeaths
    }

    const getPourcentage = (code, cause, year) => {
        const totalDeaths = getTotalDeaths(cause, year)
        let pourc = 0
        let objet = {};
        ListCountry.forEach(country => {
            if (country.code === code) {
                //console.log(country.years[Year]);
                objet = country.years[year];
                if (objet === undefined) {
                    return pourc;
                }
                else {
                    pourc = parseFloat(objet[cause]) / totalDeaths
                    return pourc;

                }
            }
        });
        return pourc;
    }


    // là il faut passer un parametre à la fct, afin de recuperer la cause 
    let countryStyle = (feature) => {
        //feature est un pays: un element de la liste features dans le fichier countries-50m

        // let cause = getPrincipalCause(feature.id, years[yearId])[0];
        return {
            fillColor: getCauseColor(getPourcentage(feature.id, causeName, years[yearId])),
            //la ou il faut mettre getColor
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
                //refs.geojson.leafletElement.resetStyle(event.target);
            }
        })
    }


    return (
        <div className="grid-container">

            <div className="NavBar">
                {causeName}
            </div>

            <div className="map">

                <Map style={{ height: "80vh", width: "100vh" }} zoom={2} center={[10, 10, 10]} maxZoom={6} minZoom={2} maxBounds={mapBounds} >
                    <GeoJSON style={countryStyle} data={countries.features} onEachFeature={onEachCountry} ></GeoJSON>
                </Map>

            </div>
            {/* <div className="listCause"  >

                <div style={{ margin: 20, boxShadow: 50 }}>
                    <DataTable
                        title="Liste des Causes"
                        columns={tableCauseColumns}
                        data={colorDictionary()}
                        defaultSortField="title"
                        onRowClicked={
                            clickEvent => {
                                openModal();
                                setcauseName(clickEvent.cause)
                            }
                        }
                    />
                </div>
            </div> */}
            <div className="slider" >
                <div style={{ display: "inline-block", margin: 0 }}>
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

                <div style={{ display: "inline-block", width: window.innerWidth - 200, }}>
                    <RangeSlider
                        style={{ paddingTop: 30 }}
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

export default withRouter(CauseMap);
