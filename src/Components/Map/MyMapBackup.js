import React, { useEffect, useState } from 'react';
import { Map, GeoJSON } from "react-leaflet";
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause,faTimes } from "@fortawesome/free-solid-svg-icons";
import RangeSlider from 'react-bootstrap-range-slider';
import { withRouter } from "react-router-dom";
import DataTable from "react-data-table-component";
import ReactModal from 'react-modal';
import CauseMap from './CauseMap';

import countries from './../../Data/countries-50m.json';

import ListCountry from './../../Data/countries.json';
import NavBar from './../NavBar/Navbar'
import AnimatableBarChart2 from '../BarChart/AnimatableBarChart2'

import "./grid-container.css";
import "leaflet/dist/leaflet.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';

const MyMapBackup = (props) => {
    const years = Object.keys(ListCountry[0].years)
    const [yearId, setYearId] = useState(0)

    const mapBounds = [
        [89, 179],
        [-89, -179]
    ]
    const [play, setPlay] = useState(true)
    const causeList = [
        "Maladies respiratoires",
        "Maladies cardiovasculaires",
        "Alzheimer et autres démences",
        "Maladies hépatiques",
        "Maladies digestives",
        "Cancers",
        "Utilisation d'alcool et de drogues",
        "Accidents de route",
        "Affections néonatales",
        "Maladies diarrhéiques",
        "Déficiences nutritionnelles",
        "Suicides",
        "Diabètes"]
    const causeColor = ["#808000", "#f58231", "#ffe119", "#bfef45", "#42d4f4", "#4363d8", "#911eb4", "#3cb44b", "#f032e6", "#dcbeff", "#aaffc3", "#000075", "#008080"]
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

    const colorDictionary = () => {
        let data = []
        for (let i = 0; i < causeList.length; i++) {

            let dataLine = {}
            dataLine.cause = causeList[i]
            dataLine.couleur = <div style={{ backgroundColor: getColor(dataLine.cause), height: 28, width: 28, borderWidth: 1, borderColor: "#000", borderRadius: 5, borderStyle: "solid" }}></div>
            data.push(dataLine)
        }

        let dataLine = {}
            dataLine.cause = "Pas de données"
            dataLine.couleur = <div style={{ backgroundColor: "red", height: 28, width: 28, borderWidth: 1, borderColor: "#000", borderRadius: 5, borderStyle: "solid" }}></div>
            data.push(dataLine)

        //console.log(data)
        return data
    }

    // const causeClicked = (cause) => {
    //     pushToRoute({
    //         pathname: '/causes/' + cause,
    //         state: { cause: cause }
    //     })
    // }

    const tableCauseColumns = [
        {
            name: "cause",
            selector: "cause",
            sortable: false
        },
        {
            name: "couleur",
            selector: "couleur",
            sortable: false
        }
    ];

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

    //cette fct donne tableau des cause pricipales (ou une cause)
    //code: code iso 3 et year est l'annee
    const getPrincipalCause = (code, Year) => {
        let objet = {};
        let ab = ["b"]
        ListCountry.forEach(country => {
            //console.log(country.code);
            //probleme d'incoherence entre les code et ISO_A3
            if (country.code === code) {
                //console.log(country.years[Year]);
                objet = country.years[Year];
                if (objet === undefined) {
                    ab = ["a"]
                    return ab;
                }
                else {

                    ab = Object.keys(objet).filter(x => {
                        return objet[x] == Math.max.apply(null,
                            Object.values(objet));
                    });
                    return ab;

                }
                // console.log(objet);
                // console.log(country.code)
                // return Object.keys(objet).filter(x => {
                //     return objet[x] === Math.max.apply(null, 
                //     Object.values(objet));
                //   });
            }

        });
        //console.log(objet);
        return ab;
    }

    // là il faut passer un parametre à la fct, afin de recuperer la cause 
    let countryStyle = (feature) => {
        //feature est un pays: un element de la liste features dans le fichier countries-50m

        let cause = getPrincipalCause(feature.id, years[yearId])[0];
        return {
            fillColor: getColor(cause),
            //la ou il faut mettre getColor
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 1
        }
    };

    // const resetStyle = (code, year) => {
    //     const cause = getPrincipalCause(code, year)[0];
    //     return {
    //         fillColor: getColor(cause), //la ou il faut mettre getColor getColor(getPrincipalCause(feature.properties.ISO_A3,year))
    //         weight: 2,
    //         opacity: 1,
    //         color: 'white',
    //         dashArray: '3',
    //         fillOpacity: 0.2
    //     }
    // }

    //model 1 pour les cause 
    const [modalIsOpen, setIsOpen] = React.useState(false);
    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }
    // model 2 pour les pays 
    const [modalIsOpen2, setIsOpen2] = React.useState(false);
    function openModal2() {
        setIsOpen2(true);
    }

    function closeModal2() {
        setIsOpen2(false);
    }
    const [countryCode, setcountryCode] = useState("");
    const [causeName, setCauseName] = useState("");

    const pushToRoute = route => {
        props.history.push(route)
    }

    const onEachCountry = (country, layer) => {
        const countryName = country.properties.name;
        //console.log(countryName);
        layer.bindPopup(countryName);

        //donner automatiquement des couleur en gradient 
        //layer.options.fillOpacity = Math.random(); // valeur [0-1]

        layer.on({
            click: (event) => {
                // event.target.setStyle({
                //     //on change la couleur du pays 
                //     color: "green",
                //     fillColor: "yellow",
                // });
                const countryCode = event.target.feature.id
                // pushToRoute({
                //     pathname: '/country/' + countryCode,
                //     state: { countryCode: event.target.feature.id }
                // })
                ListCountry.forEach(country => {
                   
                    if (country.code === countryCode) {
                       
                        let numberOfyears = Object.keys(country.years).length;
                        if (numberOfyears === years.length) {
                            setcountryCode(countryCode);
                            openModal2();
                        }
                    
                    }
        
                });

            },
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
                <NavBar></NavBar>
            </div>

            <div className="map">
                {modalIsOpen ? (
                    <ReactModal isOpen={modalIsOpen} onAfterClose={closeModal} style={{overlay:{backgroundColor:"rgba(0,0,0,.6)"}}}>
                        <Button className="button1" onClick={closeModal}><FontAwesomeIcon icon={faTimes} size="2x" /></Button>
                        <CauseMap causeName={causeName} />
                        
                    </ReactModal>
                ): modalIsOpen2 ?(
                    <ReactModal isOpen={modalIsOpen2} onAfterClose={closeModal2} style={{overlay:{backgroundColor:"rgba(0,0,0,.6)"},content:{margin:"50px"}}} >
                        <div>
                            <Button className="button1" onClick={closeModal2}><FontAwesomeIcon icon={faTimes} size="2x" /></Button>
                            <AnimatableBarChart2 countryCode={countryCode}></AnimatableBarChart2>
                            
                        </div>
                    </ReactModal>
                ) : (
                    <Map style={{ height: "80vh", width: "120vh",marginLeft:"5cm",marginTop: "10px" }} zoom={2} center={[10, 10, 10]} maxZoom={6} minZoom={2} maxBounds={mapBounds}  >
                        <GeoJSON style={countryStyle} data={countries.features} onEachFeature={onEachCountry} ></GeoJSON>
                    </Map>
                )}
            </div>
            <div className="listCause"  >
                <div style={{ margin: 20, boxShadow: 50 }}>
                    <DataTable
                        title="Liste des Causes"
                        columns={tableCauseColumns}
                        data={colorDictionary()}
                        defaultSortField="title"
                        onRowClicked={
                            clickEvent => {
                                setCauseName(clickEvent.cause)
                                openModal();
                            }
                        }
                    />
                </div>

            </div>
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
            {/* <div className="footer">
                <h1 style={{ textAlign: "center" }}>
                    {'Year: ' + years[Math.min(yearId, years.length - 1)]}
                </h1>
            </div> */}
        </div>
    )
}

export default withRouter(MyMapBackup);
