const fs = require("fs-extra");
const listCauses = [
    "Meningitis",
    "Lower respiratory infections",
    "Cardiovascular diseases",
    "Drug use disorders",
    "Self-harm"
]
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
    for (let line = 1; line < allLines.length; line++) {
        const data = allLines[line].split(',');
        let countryAlreadyFound = false;
        listCountries.forEach(object => {
            if (object.code === data[1]) {
                countryAlreadyFound = true;

                const year = data[2];
                object.years[year] = {}

                for (let headerCode = 3; headerCode < headers.length; headerCode++) {
                    for (let causeCode = 0; causeCode < listCauses.length; causeCode++) {

                        if (headers[headerCode] === listCauses[causeCode]) {
                            object.years[year][headers[headerCode]] = data[headerCode];
                        }
                    }

                }
            }
        });
        if (!countryAlreadyFound) {
            let country = {}
            country.code = data[1]
            country.countryName = data[0]

            country.years = {}
            const year = data[2];
            country.years[year] = {}

            for (let headerCode = 3; headerCode < headers.length; headerCode++) {
                for (let causeCode = 0; causeCode < listCauses.length; causeCode++) {

                    if (headers[headerCode] === listCauses[causeCode]) {
                        country.years[year][headers[headerCode]] = data[headerCode];
                    }
                }

            }
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
