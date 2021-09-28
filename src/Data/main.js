const fs = require("fs-extra");

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
    // headers.forEach(element => {
    //     console.log(element)
    // });
    const headersMap = {};
    for (let headerCode = 0; headerCode < headers.length; headerCode++) {
        headersMap[headerCode] = headers[headerCode];
    }
    const listCountries = [];
    // console.log(headersMap);
    for (let line = 1; line < allLines.length; line++) {
        const data = allLines[line].split(',');
        let countryAlreadyFound = false;
        listCountries.forEach(object => {
            if (object.code === data[1]) {
                countryAlreadyFound = true;

                const year = data[2];
                object.years[year] = {}

                for (let headerCode = 3; headerCode < data.length; headerCode++) {
                    object.years[year][headers[headerCode]] = data[headerCode];
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

            for (let headerCode = 3; headerCode < data.length; headerCode++) {
                country.years[year][headers[headerCode]] = data[headerCode];
            }
            listCountries.push(country)
        }
        // if (!country[code]) {
        //     country[code] = { countryName };
        //     country[code]["year"] = {};
        // }
        // country[code]["year"][year] = {};


    }
    return listCountries;
}


function main() {
    const txtFile = fs.readFileSync("./annualNumberOfDeathsByCause.csv").toString();
    const d1 = new Date();
    const countries = processDatatoJSON(txtFile);
    // console.log(countries);
    const d2 = new Date();
    // console.log(d1);
    // console.log(d2);
    // console.log(d2 - d1);
    fs.writeJSON("newResult.json", countries);
}

main();
