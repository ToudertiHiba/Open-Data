const fs = require("fs");
csv = fs.readFileSync("population_countries.csv")
var array = csv.toString().split("\n");
let result = []

function devide(str) {
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

const isCountry = (result, code) => {
    let i = false;
    result.forEach(element => {
        if (element.code == code) {
            i = true;
            return i
        }
    });
    return i
}
const getObjet = (result, code) => {
    let i = {}
    result.forEach(element => {
        if (element.code == code) {
            i = element;
            return i
        }
    });
    return i
}

const startArrayIndex = 3
let headers = devide(array[startArrayIndex])
//console.log(headers);
for (let i = startArrayIndex + 1; i < array.length; i++) {
    let obj = {}
    let line = devide(array[i])
    if (line[2] === "Population, total") {
        obj[headers[0]] = line[0]
        obj[headers[1]] = line[1]
        obj["years"] = {}
        for (let i = 4; i < headers.length; i++) {
            if (parseInt(headers[i]) >= 1990 && parseInt(headers[i]) <= 2017) {
                obj["years"][headers[i]] = line[i]
            }
        }
    }

    // console.log(obj)
    result.push(obj)
}
let json = JSON.stringify(result);
fs.writeFileSync('population.json', json);