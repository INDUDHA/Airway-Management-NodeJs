const express = require("express");
const router = express.Router();
const PassengerController = require('../functions/passenger-manipulation.js');
const FlightController = require('../functions/flight-manipulation.js');
const AncillaryController = require('../functions/ancillary-manipulation.js')

//Passenger Manipulation Apis
router.post("/addPassengerDetails", PassengerController.AddPassenger);
router.get("/getPassengerDetails", PassengerController.GetPassenger);
router.post("/updatePassengerDetails", PassengerController.UpdatePassenger)
router.get("/getAllPassengerDetails", PassengerController.GetAllPassenger);

//Flight Manipulation Apis
router.post("/addFlightDetails", FlightController.AddFlightDetails);
router.get("/getFlightDetailsById", FlightController.GetFlightDetailsById);
router.get("/getPassengerDetailsByFlightId", FlightController.GetPassengerByFlightId);
router.post("/updateFlightTimings", FlightController.UpdateFlightTimings);

//Ancillary Manipulation Apis
router.post("/addAncillaryServices", AncillaryController.addAncillaryServices);
router.get("/getAncillaryById", AncillaryController.getAncillaryServices);
router.get("/getAncillaryByOptedBy", AncillaryController.getAncillaryServicesByOpted)
router.get("/getAncillaryServiceDetails", AncillaryController.getAllAncillaryServices);
router.post("/updateAncillaryService", AncillaryController.updateAncillaryServices);

module.exports = router;
