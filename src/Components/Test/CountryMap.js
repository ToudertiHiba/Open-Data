import React, { Component } from 'react';
import { Map, GeoJSON } from "react-leaflet";
import countries from './../../Data/countries.json';
import "leaflet/dist/leaflet.css";
import "./MyMapp.css"


class CountryMap extends Component {
    state = {}

    componentDidMount() {
        console.log(countries);
    };

    getColor(cause){
        switch(cause){
            case "suicide" : return 'red';
            case "concer" : return 'blue';
            default: return 'white';
        }
    }


    // là il faut passer un parametre à la fct, afin de recuperer la cause 
    countryStyle() {
        return {
            fillColor: "blue", //la ou il faut mettre getColor 
            weight:2,
            opacity:1,
            color: 'white',
            dashArray:'3',
            fillOpacity: 0.2
        }
    };

    onEachCountry = (country,layer) =>{
        const countryName = country.properties.ADMIN;
        console.log(countryName);
        layer.bindPopup(countryName);

        //donner automatiquement des couleur en gradient 
        //layer.options.fillOpacity = Math.random(); // valeur [0-1]

        layer.on({
            click:(event)=>{
                event.target.setStyle({
                    //on change la couleur du pays 
                    color:"green",
                    fillColor:"yellow",

                });
                
            },
            mouseover:(event)=>{
                event.target.setStyle({
                    weight: 5,
                    color: '#666',
                    dashArray: '',
                    fillOpacity: 0.7                    
                });
            },
            mouseout:(event)=>{
                event.target.setStyle(this.countryStyle())
            }
        })

    }



    render() {
        return (
            <div>
                <h1 style={{ textAlign: "center" }}>
                    My Map
                </h1>
                <Map style={{ height: "80vh" }} zoom={2} center={[20, 100]} >
                    <GeoJSON style={this.countryStyle} data={countries.features} onEachFeature={this.onEachCountry} ></GeoJSON>
                </Map>
            </div>
        )
    }
}

export default CountryMap;