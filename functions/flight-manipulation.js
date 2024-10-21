const express = require('express');
const mongoose = require('mongoose');
const Flight = require('../model/Flight.js');
const Passenger = require('../model/Passenger.js')

//Add Flight Details
exports.AddFlightDetails = async (req, res) => {
    function generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    let flight_id = generateUUID();
    console.log(flight_id);
    try {
        let flight = new Flight({
            FlightName: req.body.flightname.charAt(0).toUpperCase() + req.body.flightname.slice(1),
            SeatNumbers: req.body.seatnumbers,
            FlightId: flight_id,
            FlightTiming: req.body.flighttiming,
            WheelChairedPassengers: req.body.wheelchairedpassengers,
            PassengersWithInfant: req.body.passengerswithinfant,
            CheckedInPassengers: req.body.checkedinpassengers,
            PassengersOptedSpecialMeals: req.body.passengersoptedspecialmeals,
            From: req.body.from.charAt(0).toUpperCase() + req.body.from.slice(1),
            To: req.body.to.charAt(0).toUpperCase() + req.body.to.slice(1),
            TotalPassengers: req.body.totalpassengers,
            FlightAncillaryServices: req.body.flightancillaryservices,
            ShoppingItems: req.body.shoppingitems,
            CreatedAt: new Date()
        })

        let addFlightInfo = await flight.save();
        console.log(addFlightInfo);
        return res
            .status(200)
            .json({
                "message": "Flight Details Added Successfully!",
                "title": "success",
                "flight_name": req.body.flightname,
                "flight_id": flight_id
            })
    }
    catch (error) {
        console.log(error);
        return res
            .status(400)
            .json({
                "message": error,
                "title": "failure"
            })
    }
}

//Get Flight Details by id
exports.GetFlightDetailsById = async (req, res) => {
    let params = req.query;
    try {
        let getFlightDetailsById = await Flight.findOne({ $or: [{ FlightId: params.flightid }] });
        console.log(getFlightDetailsById);
        if (getFlightDetailsById != null) {
            return res
                .status(200)
                .json({
                    "message": "Flight Details Fetched Successfully",
                    "title": "success",
                    "data": getFlightDetailsById
                })
        }
        else {
            return res
                .status(201)
                .json({
                    "message": "Flight Details doesn't found for this Id",
                    "title": "success"
                })
        }
    }
    catch (error) {
        return res.status(400)
            .json({
                "message": error,
                "title": "failure"
            })
    }
}

//Get All Flight Details
exports.GetFlightDetails = async (req, res) => {
    try {
        let getFlightDetails = await Flight.find();
        console.loh(getFlightDetails);
        return res
            .status(200)
            .json({
                "message": "Flight Details Fetched Successfully",
                "title": "success",
                "data": getFlightDetails
            })
    }
    catch (error) {
        return res
            .status(400)
            .json({
                "message": error,
                "title": "failure"
            })
    }
}

//Get Passenger Details by flight id
exports.GetPassengerByFlightId = async (req, res) => {
    let params = req.query
    try {
        let getPassengerByFlightId = await Passenger.find({ FlightId: params.flightid });
        console.log("flight" + getPassengerByFlightId);
        if (getPassengerByFlightId.length > 0) {
            return res
                .status(200)
                .json({
                    "message": "Passenger Details Fetched Successfully",
                    "title": "success",
                    "data": getPassengerByFlightId
                })
        }
        else {
            return res
                .status(201)
                .json({
                    "message": "No passengers found for this Flight Id",
                    "title": "success"
                })
        }
    }
    catch (error) {
        console.log(error)
        return res
            .status(400)
            .json({
                "message": error,
                "title": "failure"
            })
    }
}

//Update Flight Timing 
exports.UpdateFlightTimings = async (req, res) => {
    try {
        let flightDetails = await Flight.findOne({ $or: [{ FlightId: req.body.flightid }] })
        if (flightDetails == null) {
           return res
           .status(201)
           .json({
            "message":"Flight Details Not Found for this Id",
            "title":"success"
           })
        }
        else {
            await Flight.updateOne({ "FlightId": req.body.flightid }, {
                $set: {
                    "FlightTiming": req.body.timings,
                    "From":req.body.from,
                    "To":req.body.to
                }
            })
            let updatedFlightDetails = await Flight.findOne({$or:[{FlightId:req.body.flightid}]})
            return res
            .status(200)
            .json({
                "message":"Flight Details Updated Successfully",
                "title":"success",
                "data":updatedFlightDetails
            })
        }
    }
    catch (error) {
        return res
            .status(400)
            .json({
                "message": error,
                "title": "failure"
            })
    }
}