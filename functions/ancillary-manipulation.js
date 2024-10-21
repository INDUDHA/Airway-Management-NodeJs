const Ancillary = require('../model/Ancillary');
const express = require('express');
const mongoose = require('mongoose');


//Add Ancillary Services
exports.addAncillaryServices = async (req, res) => {
    function generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    let ancillary_id = generateUUID();
    try {
        let ancillary_get = await Ancillary.findOne({ $or: [{ OptedBy: req.body.optedby }] });
        if (ancillary_get == null) {
            let ancillary = new Ancillary({
                AncillaryId: ancillary_id,
                OptedBy: req.body.OptedBy,
                SpecialMeals: req.body.SpecialMeals,
                OrdinaryMeals: req.body.OrdinaryMeals,
                LegRoom: req.body.LegRoom,
                InFlightShopRequest: req.body.InFlightShopRequest,
                ExtraBaggage: req.body.ExtraBaggage,
                CreatedAt: new Date()
            })
            let addAncillary = await ancillary.save();
            return res
                .status(200)
                .json({
                    "message": "Ancillary Details Added Successfully!",
                    "title": "success",
                    "ancillary_id": ancillary_id
                })
        }
        else {
            return res
                .status(201)
                .json({
                    "message": "Ancillary Details Already exist for this Passenger",
                    "title": "success",
                    "data": ancillary_get
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

//Get Ancillary Services By Id
exports.getAncillaryServices = async (req, res) => {
    let params = req.query;
    try {
        let getAncillaryServicesById = await Ancillary.findOne({ $or: [{ AncillaryId: params.ancillaryid }] });

        if (getAncillaryServicesById == null) {
            return res
                .status(201)
                .json({
                    "message": "Ancillary Service Details not found for this ID",
                    "title": "success"
                })
        }
        else {
            return res
                .status(200)
                .json({
                    "message": "Ancillary Service Details Fetched Successfully!",
                    "title": "success",
                    "data": getAncillaryServicesById
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

//Get Ancillary Services Details By Opted By
exports.getAncillaryServicesByOpted = async (req, res) => {
    let params = req.query;
    try {
        let getAncillaryServicesByOptedId = await Ancillary.findOne({ $or: [{ OptedBy: params.optedby }] });
        if (getAncillaryServicesByOptedId == null) {
            return res
                .status(201)
                .json({
                    "message": "Ancillary Service Details Not Found This Id",
                    "title": "success"
                })
        }
        else {
            return res
                .status(200)
                .json({
                    "message": "Ancillary Service Details Fetched Successfully!",
                    "title": "success",
                    "data": getAncillaryServicesByOptedId
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

//Get All Ancillary Services
exports.getAllAncillaryServices = async (req, res) => {
    try {
        let getAllAncillaryServices = await Ancillary.find();
        return res
            .status(200)
            .json({
                "message": "Ancillary Service Details Fetched Successfully!",
                "title": "success",
                "data": getAllAncillaryServices
            })
    }
    catch (error) {
        return res
            .status(400)
            .json({
                "message": error,
                "title": "failure",
            })
    }
}

//Update Ancillary Services
exports.updateAncillaryServices = async (req, res) => {
    try {
        let getAncillaryService = await Ancillary.findOne({ AncillaryId: req.body.ancillaryid });
        if (!getAncillaryService) {
            return res.status(404).json({
                "message": "Ancillary Service not found",
                "title": "failure"
            });
        }

        let updateFields = {};

        if (req.body.special_meals && req.body.special_meals.length > 0) {
            updateFields["SpecialMeals"] = req.body.special_meals;
        }

        if (req.body.ordinary_meals && req.body.ordinary_meals.length > 0) {
            updateFields["OrdinaryMeals"] = req.body.ordinary_meals;
        }

        if (req.body.legroom && req.body.legroom.length > 0) {
            updateFields["LegRoom"] = req.body.legroom;
        }

        if (req.body.inflight_shop_request && req.body.inflight_shop_request.length > 0) {
            updateFields["InFlightShopRequest"] = req.body.inflight_shop_request;
        }

        if (req.body.extra_baggage && req.body.extra_baggage.length > 0) {
            updateFields["ExtraBaggage"] = req.body.extra_baggage;
        }

        let updateAncillaryService = await Ancillary.updateOne(
            { AncillaryId: req.body.ancillaryid },
            { $set: updateFields }
        );
        let updatedAncillaryService = await Ancillary.find({ $or: [{ AncillaryId: req.body.ancillaryid }] })

        return res.status(200).json({
            "message": "Ancillary Services Updated Successfully!",
            "title": "success",
            "updated_data": updatedAncillaryService
        });
    } catch (error) {
        return res.status(400).json({
            "message": error,
            "title": "failure"
        });
    }
};
