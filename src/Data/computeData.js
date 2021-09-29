const fs = require ("fs-extra");
const linearRegression = require('../Utils/linearRegression');

const lowerBound = 1990;
const upperBound = 2017;

const chosenCauses = {
    "Cardiovascular diseases": "Maladies cardiovasculaires",
    "Neoplasms": "Cancers",
    "Lower respiratory infections": "Maladies respiratoires",
    "Chronic respiratory diseases": "Maladies respiratoires",
    "Alzheimer disease and other dementias": "Alzheimer et autres démences",
    "Digestive diseases": "Maladies digestives",
    "Neonatal disorders": "Affections néonatales",
    "Diarrheal diseases": "Maladies diarrhéiques",
    "Diabetes mellitus": "Diabètes",
    "Cirrhosis and other chronic liver diseases": "Maladies hépatiques",

    "Drug use disorders": "Utilisation d'alcool et de drogues", 
    "Alcohol use disorders": "Utilisation d'alcool et de drogues",
    "Self-harm": "Suicides",
    "Nutritional deficiencies": "Déficiences nutritionnelles",
    "Road injuries": "Accidents de route",
};

function splitData (allText) {
    let allLines = allText.split(/\r\n|\n/);
    let headers = allLines[0].match(/[\w-\s\(\)\/]+|".+"/g).map(x => x.replace(/\"/g,''));
    return {allLines, headers};
}

function initiateCauses(headers) {
    const causes = {};
    for (let headerCode = 0; headerCode < headers.length; headerCode++) {
        if (chosenCauses[headers[headerCode]]) {
            causes[headerCode]={"name": headers[headerCode]};
            causes[headerCode]['total'] = 0;
            causes[headerCode]['years'] = {};
        }
    }
    return causes;
}

function getIdCountryCurrYear(data) {
    return {
        countryName: data[0],
        code: data[1],
        year: data[2] 
    };
}
function checkAdd (code, countriesCode) {
    if (!countriesCode.includes(code)) {
        countriesCode.push(code);
    }
}
function computeTendency(causeObj) {
    const x = [];
    const y = [];
    Object.entries(causeObj['years']).forEach((yearTuple, index)  => {
        const value = yearTuple[1];
        if (value) { // ignore year without data
            x.push(index)
            y.push(value)
        }
    });
    const lr = linearRegression(y, x);
    return parseFloat(lr.slope);
}

function computeAllTendencies(causes) {
    Object.entries(causes).forEach((cause)  => {
        const causeObj = cause[1];
        cause[1]['tendency'] = computeTendency(causeObj) > 0 ;
    });
}
function putInArray(preCountries){
    return Object.values(preCountries);
}

function getDeathStats(headers, allLines) {
    const causes = initiateCauses(headers);
    const preCountries = {};
    const countriesCode = [];
    for (let line=1; line<allLines.length; line++) {
        const data = allLines[line].split(',');
        const {countryName, code, year} = getIdCountryCurrYear(data);
        
        checkAdd(code, countriesCode);
        if (!preCountries[code]) {
            preCountries[code] = { code, countryName };
            preCountries[code]["years"] = {};
        }
        preCountries[code]["years"][year] = {};
        for (let headerCode = 3; headerCode < data.length; headerCode++) {
            if (causes[headerCode]) {
                const cause = causes[headerCode]['name'];
                if (chosenCauses[cause]) {
                    if (preCountries[code]['years'][year][chosenCauses[cause]]) {
                        preCountries[code]['years'][year][chosenCauses[cause]] += parseInt(data[headerCode]);
                    } else {
                        preCountries[code]['years'][year][chosenCauses[cause]] = parseInt(data[headerCode]); // key is string
                    }
                    if (!causes[headerCode]['years'][year]) { 
                        causes[headerCode]['years'][year] = 0;
                    }
                    causes[headerCode]['years'][year] += isNaN(data[headerCode]) ? 0.0 : parseInt(data[headerCode]); // total morts par an 
                }
            }
        }
    }
    computeAllTendencies(causes);
    const countries = putInArray(preCountries);
    return {causes, countries, countriesCode};
}

function processDatatoJSON(allText) {
    let { allLines, headers } = splitData(allText);
    return getDeathStats(headers, allLines);
}

function main() {
    const txtFile = fs.readFileSync(`${__dirname}/annualNumberOfDeathsByCause.csv`).toString();
    const d1 = new Date();
    const {causes, countries} = processDatatoJSON(txtFile);
    const d2 = new Date();
    fs.writeJSON(`${__dirname}/countries.json`, countries, {spaces:"  "});
    fs.writeJSON(`${__dirname}/causes.json`, causes, {spaces:"  "});
}

main();
