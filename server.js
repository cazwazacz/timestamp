"use strict";
var express = require('express');
var app = express();
var monthsArr = ["January",
"February",
"March",
"April",
"May",
"June",
"July",
"August",
"September",
"October",
"November",
"December"];
var now = new Date();
var obj = {unix: now.getTime(),
natural: monthsArr[now.getUTCMonth()] + " " + now.getDate() + " " + now.getFullYear()
};

app.use(express.static('public'));

app.get('/', function (req, res){
  res.send("Hi there!");
})

app.get('/:date', function (req, res) {
  var date = req.params.date;
  var rawDate;
  if (Boolean(date * 1000) === false){
    rawDate = new Date(date);
  }
  else {
    rawDate = new Date(date*1000);
  }
  var unix = rawDate.getTime()/1000;
  var natural = monthsArr[rawDate.getUTCMonth()] + " " + rawDate.getDate() + ", " + rawDate.getFullYear();
  var dateObj = {
    unix: unix,
    natural: natural
  }
  res.json(dateObj);
})

var port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log('Timestamp app listening on port ' + port);
})
