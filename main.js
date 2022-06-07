const express = require('express');
const { urlencoded } = require('body-parser');

const app = express();
const portNumber = 3000;
//setting ejs
app.set('view engine', 'ejs');

app.use(urlencoded({ extended: true }));

//using static to use css in public folder..
app.use(express.static('public'));

var stringResult = "";

app.get("/", function (req, res) {
    res.render('bmi', { result: stringResult });
})

app.post("/", function (req, res) {

    //variables to store data from the form..
    let age = req.body.age;
    let weight = parseFloat(req.body.weight);
    let height = parseFloat(req.body.height);

    //BMI calculation and formating..
    let bmi = (weight / Math.pow((height / 100), 2)).toFixed(1);

    //Save the result in string
    stringResult = "Your BMI Result is: " + `${bmi}`;

    //render the result..
    res.render('bmi', { result: { BMIresult: stringResult, age: age, height: height, weight: weight } });
})

app.listen(portNumber, function () {
    console.log("Server running on" + portNumber);
})