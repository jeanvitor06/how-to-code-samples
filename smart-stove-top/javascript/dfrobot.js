/*
* Copyright (c) 2015 - 2016 Intel Corporation.
*
* Permission is hereby granted, free of charge, to any person obtaining
* a copy of this software and associated documentation files (the
* "Software"), to deal in the Software without restriction, including
* without limitation the rights to use, copy, modify, merge, publish,
* distribute, sublicense, and/or sell copies of the Software, and to
* permit persons to whom the Software is furnished to do so, subject to
* the following conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
* MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
* LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
* OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
* WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

"use strict";

var exports = module.exports = {};

// The program is using the `mraa` module
// to communicate directly with the digital
// pin used to turn on/off the buzzer, and read
// the temperature sensor
var mraa = require("mraa");

// Initialize the DFRobot hardware devices
var temp = new mraa.Aio(1), // A1
    buzzer = new mraa.Gpio(16), // aka A2
    flame = new mraa.Aio(3); // A3

buzzer.dir(mraa.DIR_OUT);

exports.init = function(config) {
  return;
}

// Plays an audible alarm when the temperature has exceeded
// the target temperature
exports.tempAlarm = function() {
  buzzer.write(1);
  setTimeout(function() {
    buzzer.write(0);
  }, 1000);
}

// Plays an audible alarm when the flame sensor indicates
// a possible fire
exports.fireAlarm = function() {
  buzzer.write(1);
  setTimeout(function() {
    buzzer.write(0);
  }, 1000);
}

// returns the temperature of the pot or pan on the stovetop
// using the analog temperature sensor
exports.objectTemperature = function() {
  return (500 * temp.read()) / 1024;
}

// returns if an open flame is detected using flame sensor
exports.flameDetected = function() {
  return (flame.read() >= 800);
}
