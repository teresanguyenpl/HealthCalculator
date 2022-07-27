// fitness and health calculator
// Teresa Nguyen

// import required module
const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');
// body-parser middleware
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:false}))

// convert to json
app .use(express.json())
app.use(bodyParser.json())

// sendFile 
// connect to html files and display user interface
// link to css file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
})
app.use(express.static(__dirname + '/public'));
app.get('/bmi', (req,res) => {
    res.sendFile(path.join(__dirname, '/public/bmi.html'));
})
app.get('/bodyfat', (req,res) => {
    res.sendFile(path.join(__dirname, '/public/bodyfat.html'));
})
app.get('/idealweight', (req,res) => {
    res.sendFile(path.join(__dirname, '/public/ideal.html'));
})
app.get('/calories', (req,res) => {
    res.sendFile(path.join(__dirname, '/public/calories.html'));
})

// calculate bmi
app.post('/bmi', (req, res) => {
    // get input data
    var h = req.body.height;
    var w = req.body.weight;
    var name = req.body.name;

    var bmi = (w / (Math.pow(h,2)) * 703);
    // round to 1 decimal place
    var r = Number(bmi.toFixed(1));
    if (r < 18.5) {
        res.send("<h3>Hi " + name + "! Your BMI is around: " + r +
                "<centre><h2>You are Underweight :(");
    } else if (18.5 <= r && r < 24.9) {
        res.send("<h3>Hi " + name + "! Your BMI is around: " + r +
                "<centre><h2>You are normal :) Congratulation!");
    } else if (25 <= r && r < 29.9) {
        res.send("<h3>Hi " + name + "! Your BMI is around: " + r +
                "<centre><h2>You are Overweight :(");
    } else {
        res.send("<h3>Hi " + name + "! Your BMI is around: " + r +
                "<centre><h2>You are Obese :(");
    }
    
})

// calculate calories burned
app.post('/calories', (req, res) => {
    // get input data
    var name = req.body.name;
    var gender = req.body.gender;
    var age = req.body.age;
    var h = req.body.height;
    var w = req.body.weight;
    var activity = req.body.activity;

    //calculate bmr
    var menBase = 66 + (6.2 * w) + (12.7 * h) - (6.76 * age);
    var womenBase = 655.1 + (4.35 * w) + (4.7 * h) - (4.7 * age);

    //points
    var p = pick(activity);

    //calculate calories burned based on activity
    if(gender == 'male') {
        var r = menBase * p;
        // round to 1 decimal place
        var final = Number(r.toFixed(1));
        res.send("<h3>Hi " + name + "! The calories you burned is: " + final + " calories/day")
    }
    else if(gender == 'female') {
        var r = womenBase * p;
        // round to 1 decimal place
        var final = Number(r.toFixed(1));
        res.send("<h3>Hi " + name + "! The calories you burned is: " + final + " calories/day")
    }
    
    // get points for activity level
    function pick(a) {
        if(a == 0) {
            return 1.2;
        }
        else if (a == 1) {
            return 1.37;
        }
        else if (a == 1) {
            return 1.55;
        }
        else if (a == 1) {
            return 1.725;
        }
        else {
            return 1.9;
        }
    }
})

// calculate body fat
app.post('/bodyfat', (req, res) => {
    // get input data
    var h = req.body.height;
    var w = req.body.weight;
    var name = req.body.name;
    var age = req.body.age;
    var gender = req.body.age;

    var bmi = (w / (Math.pow(h,2)) * 703);

    var bf = cal(age);
    res.send("<h3>Hi " + name + "! Your body fat is: " + bf + "%");

    function cal(age) {
        // adult ages
        if(age > 20) {
            if(gender == 'male') {
                var final = 1.2 * bmi + 0.23 * age - 16.2;
                // round to 1 decimal place
                return Number(final.toFixed(1));
            }
            else {
                var final = 1.2 * bmi + 0.23 * age - 5.4;
                // round to 1 decimal place
                return Number(final.toFixed(1));
            }
        }
        //teen age
        else {
            if(gender == 'male') {
                var final = 1.51 * bmi - 0.7 * age - 2.2;
                // round to 1 decimal place
                return Number(final.toFixed(1));
            }
            else {
                var final = 1.51 * bmi - 0.7 * age + 1.4;
                // round to 1 decimal place
                return Number(final.toFixed(1));
            }
        }
    } 
})
// calculate ideal
app.post('/ideal', (req, res) => {
    // get input data
    var h = req.body.height;
    var name = req.body.name;
    var gender = req.body.age;
    
    if(gender == 'male') {
        var i = 50 + (0.91 * (h - 152.4));
        var final = Number(i.toFixed(1));
        res.send("<h3>Hi " + name + "! Your ideal weight is: " + final + " kg or " + Number(final * 2.20462.toFixed(1)) + " lbs")
    }
    else {
        var i = 45.5 + (0.91 * (h - 152.4));
        var final = Number(i.toFixed(1));
        res.send("<h3>Hi " + name + "! Your ideal weight is: " + final + " kg or " + Number(final * 2.20462.toFixed(1)) + " lbs")
    }
})

app.listen(
    PORT,
    () => console.log(`alive on http://localhost:${PORT}`)
)
