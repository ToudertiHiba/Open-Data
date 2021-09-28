import React, { Component } from 'react';
import { Map, GeoJSON } from "react-leaflet";
//import countries from './../../Data/countries.json';
 import countries from './../../Data/countries-50m.json';
import ListCountry from './../../Data/newResult.json';
import "leaflet/dist/leaflet.css";
import "./MyMapp.css";
import Select from 'react-select';


class MyMapp extends Component {
    // state = {
    //     year:"1990",
    //     color:"red",
    //     causeColor: ["","","","","","","","","","",""]
    // }
    constructor(props){
        super(props);
        this.state = {
            year:"1990",
            color:"red",
            causeColor: ["","","","","","","","","","",""]
        };
        this.handleChange = this.handleChange.bind(this);
    }

    

    componentDidMount() {
        
        console.log(countries);
        console.log(ListCountry);
        // console.log(this.getPrincipalCause("AFG","1990"));
        // console.log(this.getColor("Meningitis"));
        // this.state.color=this.getColor("Meningitis");
        // console.log(this.state.color)
        console.log(this.state.causeColor)
    };

    //cette fct donne tableau des cause pricipales (ou une cause)
    getPrincipalCause(code,Year){
        let objet = {};
        let ab = ["b"]
        ListCountry.forEach(country => {
            //console.log(country.code);
            //probleme d'incoherence entre les code et ISO_A3
            if (country.code == code) {
                //console.log(country.years[Year]);
                objet = country.years[Year];
                if (objet === undefined) {
                    ab = ["a"]
                    return ab;
                }
                else{
                    
                    ab = Object.keys(objet).filter(x => {
                        return objet[x] == Math.max.apply(null, 
                        Object.values(objet));
                    });
                    return ab;

                }
                // console.log(objet);
                // console.log(country.code)
                // return Object.keys(objet).filter(x => {
                //     return objet[x] == Math.max.apply(null, 
                //     Object.values(objet));
            //   });
            }
            
        });
        //console.log(objet);
        return ab;
        
    }

    getColor(cause){

        let randomColor = (Math.floor(Math.random()*0xFFFFFF)).toString(16);
        switch(cause){
            case "Meningitis" : {
                if (this.state.causeColor[0]=="") {
                    this.state.causeColor[0]="#" + randomColor;
                }
            } return this.state.causeColor[0];
            case "Lower respiratory infections" : {
                if (this.state.causeColor[1]=="") {
                    this.state.causeColor[1]="#" + randomColor;
                }
            } return this.state.causeColor[1];
            case "Intestinal infectious diseases":{
                if (this.state.causeColor[2]=="") {
                    this.state.causeColor[2]="#" + randomColor;
                }
            } return this.state.causeColor[2];
            case "Protein-energy malnutrition": {
                if (this.state.causeColor[3]=="") {
                    this.state.causeColor[3]="#" + randomColor;
                }
            } return this.state.causeColor[3];
            case "Terrorism": {
                if (this.state.causeColor[4]=="") {
                    this.state.causeColor[4]="#" + randomColor;
                }
            } return this.state.causeColor[4];
            case "Cardiovascular diseases": {
                if (this.state.causeColor[5]=="") {
                    this.state.causeColor[5]="#" + randomColor;
                }
            } return this.state.causeColor[5];
            case "Alzheimer disease and other dementias": {
                if (this.state.causeColor[6]=="") {
                    this.state.causeColor[6]="#" + randomColor;
                }
            } return this.state.causeColor[6];
            case "Chronic kidney disease": {
                if (this.state.causeColor[7]=="") {
                    this.state.causeColor[7]="#" + randomColor;
                }
            } return this.state.causeColor[7];
            case "Chronic respiratory diseases": {
                if (this.state.causeColor[8]=="") {
                    this.state.causeColor[8]="#" + randomColor;
                }
            } return this.state.causeColor[8];
            case "Malaria": {
                if (this.state.causeColor[9]=="") {
                    this.state.causeColor[9]="#" + randomColor;
                }
            } return this.state.causeColor[9];
            case "Alcohol use disorders": {
                if (this.state.causeColor[10]=="") {
                    this.state.causeColor[10]="#" + randomColor;
                }
            } return this.state.causeColor[10];
            default: return "red";
        }
    }


    // là il faut passer un parametre à la fct, afin de recuperer la cause 
    countryStyle = (feature) => {
        //getPrincipalCause("AFG","1990")[0]
        //console.log(this.state.color)
        //console.log(feature.properties.ISO_A3);
        
        //console.log(this.getPrincipalCause(feature.properties.ISO_A3,"2000"));
        //let cause = this.getPrincipalCause("-99","2000")[0];
        // let cause = this.getPrincipalCause(feature.properties.ISO_A3,this.state.year)[0];
        let cause = this.getPrincipalCause(feature.id,this.state.year)[0];
        //console.log(cause)
        // console.log(this.getColor(cause))
        // console.log(this.state.causeColor)
        return {
            fillColor: this.getColor(cause), //la ou il faut mettre getColor getColor(getPrincipalCause(feature.properties.ISO_A3,year))
            weight:2,
            opacity:1,
            color: 'white',
            dashArray:'3',
            fillOpacity: 0.2
        }
    };

    resetStyle(code,year){
        const cause = this.getPrincipalCause(code,year)[0];
        return {
            fillColor: this.getColor(cause), //la ou il faut mettre getColor getColor(getPrincipalCause(feature.properties.ISO_A3,year))
            weight:2,
            opacity:1,
            color: 'white',
            dashArray:'3',
            fillOpacity: 0.2
        }
    }

    onEachCountry = (country,layer) =>{
        const countryName = country.properties.ADMIN;
        //console.log(countryName);
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
                event.target.setStyle(this.resetStyle(country.id,this.state.year));
                //this.refs.geojson.leafletElement.resetStyle(event.target);
            }
        })

    }

    options = [
        {
          label: "1990",
          value: "1990",
        },
        {
          label: "2000",
          value: "2000",
        },
        {
          label: "2002",
          value: "2002",
        },
        {
          label: "2007",
          value: "2007",
        },
      ];

      handleChange(e) {
          console.log(e.target.value);
          this.state.year = e.target.value;
          console.log(this.state.year)
          this.state.causeColor= ["","","","","","","","","","",""];
          ListCountry.forEach((country)=>{
              this.countryStyle=this.resetStyle(country.code,this.state.year);
          })
          
      }

    



    render() {
        return (
            <div>
                <h1 style={{ textAlign: "center" }}>
                    My Map
                </h1>
                <div className="map" style={{marginRight:"5cm",marginLeft:"25cm"}}>
                    <div>
                        <select value={this.state.year} onChange={this.handleChange}>
                            {this.options.map((option) => (
                                <option value={option.value}>{option.label}</option>
                            ))}
                        </select>
                    </div>
                    <Map ref="geojson" style={{ height: "80vh",width:"80vh" }} zoom={2} center={[10,10,10]} maxZoom={15} minZoom={2} >
                        <GeoJSON style={this.countryStyle} data={countries.features} onEachFeature={this.onEachCountry} ></GeoJSON>
                    </Map>
                </div>
            </div>
        )
    }
}

export default MyMapp;
