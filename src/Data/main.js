const fs = require("fs-extra");

const causeDictionary = {
    "Maladies cardiovasculaires": ["Cardiovascular diseases"],
    "Cancer": ["Neoplasms"],

    "Utilisation d'alcool et de drogues": ["Drug use disorders", "Alcohol use disorders"],
    "Suicide": ["Self-harm"],

    "Déficiences nutritionnelles": ["Nutritional deficiencies"],
    "Maladies respiratoires": ["Lower respiratory infections", "Chronic respiratory diseases"],

    "Accidents de route": ["Road injuries"],
}
function devideHeaders(str) {
    var start_index = 0;
    var parts = [];

    for (index = 0; index < str.length; index++) {
        // Single quote blocks
        if (str.charAt(index) == '"') {
            while (str.charAt(++index) != '"' && index < str.length);
        } else if (str.charAt(index) == ',') {
            if (str.charAt(start_index) == '"') {
                parts.push(str.substring(start_index + 1, index - 1).trim());
            }
            else {
                parts.push(str.substring(start_index, index).trim());
            }
            start_index = index + 1;
        }
    }
    parts.push(str.substring(start_index).trim());
    return parts;
}

function processDatatoJSON(allText) {
    let allLines = allText.split(/\r\n|\n/);
    let headers = devideHeaders(allLines[0]);

    const listCountries = [];
    // let line = 1
    for (let line = 1; line < allLines.length; line++) {
    const data = allLines[line].split(',');
    let countryAlreadyFound = false;

    //on parcours la liste des pays
    listCountries.forEach(country => {
        if (country.code === data[1]) {
            countryAlreadyFound = true;
            const year = data[2];
            country.years[year] = {}

            Object.keys(causeDictionary).forEach(resultCause => {

                //This is the list of causes we are searching for:
                const listCausesPartielles = causeDictionary[resultCause]
                // console.log(resultCause + " " + listCausesPartielles);

                //We look for the elements inside the list and sum their pourcentages:

                //we initialize the mainCause num with 0
                country.years[year][resultCause] = 0
                for (let headerCode = 3; headerCode < headers.length; headerCode++) {
                    for (let causeCode = 0; causeCode < listCausesPartielles.length; causeCode++) {
                        if (headers[headerCode] === listCausesPartielles[causeCode]) {
                            country.years[year][resultCause] += parseFloat(data[headerCode]);
                        }
                    }
                }
            });
        }
    });
    if (!countryAlreadyFound) {
        let country = {}
        country.code = data[1]
        country.countryName = data[0]

        country.years = {}
        const year = data[2];
        country.years[year] = {}


        Object.keys(causeDictionary).forEach(resultCause => {

            //This is the list of causes we are searching for:
            const listCausesPartielles = causeDictionary[resultCause]
            // console.log(resultCause + " " + listCausesPartielles);

            //We look for the elements inside the list and sum their pourcentages:

            //we initialize the mainCause num with 0
            country.years[year][resultCause] = 0
            for (let headerCode = 3; headerCode < headers.length; headerCode++) {
                for (let causeCode = 0; causeCode < listCausesPartielles.length; causeCode++) {
                    if (headers[headerCode] === listCausesPartielles[causeCode]) {
                        country.years[year][resultCause] += parseFloat(data[headerCode]);
                    }
                }
            }
        });
        listCountries.push(country)
    }
    }
    return listCountries;
}


function main() {
    const txtFile = fs.readFileSync("./annualNumberOfDeathsByCause.csv").toString();
    const d1 = new Date();
    const countries = processDatatoJSON(txtFile);
    const d2 = new Date();
    fs.writeJSON("SpecificCauses.json", countries);
}

main();
