const express = require('express');
const mongoose = require('mongoose');
const Passenger = require('../model/Passenger.js')
const Ancillary = require('../utils/wrapper-ancillary.js');
// const { sendEmail } = require('../utils/mailer.js');


// Add Passenger
exports.AddPassenger = async (req, res) => {

    function generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    function validateEmail(email) {
        const regex = /[a-z0-9\._%+!$&*=^|~#%'`?{}/\-]+@([a-z0-9\-]+\.){1,}([a-z]{2,16})/;
        return regex.test(email);
    }

    function validateMobileNumber(mobileNumber) {
        const regex = /^[0-9]{10}$/;
        return regex.test(mobileNumber);
    }
    try {
        if (!validateEmail(req.body.email)) {
            return res.status(400).json({ message: 'Please Enter Valid EmailId' });
        }

        if (!validateMobileNumber(req.body.phonenumber)) {
            return res.status(400).json({ message: 'Please Enter Valid Mobile No' });
        }

        let passenger = new Passenger({
            PassengerName: req.body.name.charAt(0).toUpperCase() + req.body.name.slice(1),
            PassengerEmailId: req.body.email,
            PassengerMobileNumber: req.body.phonenumber,
            PassengerId: generateUUID(),
            SeatNumber: req.body.seatno,
            FlightId: req.body.flightid,
            NeededWheelChair: req.body.neededwheelchair,
            PassengerWithInfant: req.body.passengerwithinfant,
            AncillaryServices: req.body.ancillaryservices,
            CheckedIn: req.body.checkedin,
            PassportDetails: req.body.passportdetails,
            Address: req.body.address.charAt(0).toUpperCase() + req.body.address.slice(1),
            CreatedAt: new Date()
        })
        let getPassengerDetails = await Passenger.findOne({ $or: [{ PassengerEmailId: req.body.email }] })
        if (getPassengerDetails != null) {
            return res
                .status(201)
                .json({
                    message: `Passenger Details already exists!`,
                    "title": "success",
                    passengerid: getPassengerDetails.PassengerId,
                    emailid: getPassengerDetails.PassengerEmailId
                })
        }
        else {
            let addPassengerDetails = await passenger.save();
            let addAncillary = await Ancillary.add_ancillary(passenger);
            // console.log(addAncillary);
            // let data={
            //     "to":addPassengerDetails.PassengerEmailId,
            //     "subject":"Ticket Details"
            // }
            // sendEmail(data)
            return res
                .status(200)
                .json({
                    message: `Ticket Booked Successfully!`,
                    "title": "success",
                    passengerid: addPassengerDetails.PassengerId,
                    emailid: addPassengerDetails.PassengerEmailId,
                    ancillaryid:addAncillary.AncillaryId
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
            });
    }
}

//Get All Passenger Details
exports.GetAllPassenger = async (req, res) => {
    try {
        let getAllPassenger = await Passenger.find();
        console.log(getAllPassenger);
        return res
            .status(200)
            .json({
                "message": "All Passenger Details fetched Successfully!",
                "title": "success",
                "no_of_passengers": getAllPassenger.length,
                "data": getAllPassenger
            })
    }
    catch (error) {
        console.log(error)
        return res
            .status(400)
            .json({
                "message": error,
                "title": "failure",
            })
    }
}

//Get Passenger Details by passenger id
exports.GetPassenger = async (req, res) => {
    let params = req.query;
    let getPassengerDetails = await Passenger.findOne({ $or: [{ PassengerId: params.passengerid }] })

    try {

        if (getPassengerDetails != null) {
            return res
                .status(200)
                .json({
                    "message": "Passenger Details Fecthed Successfuly!",
                    "title": "success",
                    "data": getPassengerDetails
                })
        }
        else {
            return res
                .status(201)
                .json({
                    "message": "Passenger don't exist with this id!",
                    "title": "success"
                })
        }
    }
    catch (error) {
        console.log(error)
        return res
            .status(400)
            .json({ "message": error });
    }
}

//Update Passenger Details
exports.UpdatePassenger = async (req, res) => {
    try {
        let getPassenger = await Passenger.findById(req.body.pid);
        let PassengerName = req.body.name;
        let updatedpassportdetails = req.body.passportdetails;
        if (getPassenger != null) {
            await Passenger.updateOne({ "_id": req.body.pid }, {
                $set: {
                    "PassengerName": PassengerName,
                    "PassportDetails": updatedpassportdetails
                }
            })
            let updatedDetails = await Passenger.findById(req.body.pid);
            return res
                .status(200)
                .json({
                    "message": "Passenger Details Updated Successfully!",
                    "title": "success",

                    "data": updatedDetails
                })
        }
        else {
            return res
                .status(201)
                .json({
                    "message": "Passenger Details doesn't exist with this id",
                    "title": "success",
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
            });
    }
}


