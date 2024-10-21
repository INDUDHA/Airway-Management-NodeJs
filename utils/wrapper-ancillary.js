const Paasenger = require("../functions/passenger-manipulation");
const Ancillary = require("../functions/ancillary-manipulation")
const axios = require("axios")
const FormData = require('form-data');
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}


module.exports = {
    add_ancillary: async function (data) {
        var ancillary_input = {
            "OptedBy": data.PassengerId,
            "SpecialMeals": data.AncillaryServices.special_meals,
            "OrdinaryMeals": data.AncillaryServices.ordinary_meals,
            "LegRoom": data.AncillaryServices.legroom,
            "InFlightShopRequest": data.AncillaryServices.inflight_shop_request,
            "ExtraBaggage": data.AncillaryServices.extra_baggage,
            "CreatedAt": new Date()
        }
        try {
            let addAncillaryApi = {
                method: "POST",
                url: "http://localhost:8000/api/addAncillaryServices",
                headers: { 'Content-Type': 'application/json' },
                data: JSON.stringify(ancillary_input),
            }
            let addAncillaryResponse = await axios(addAncillaryApi);
            return addAncillaryResponse;
        }
        catch (error) {
            return error
        }
    },
};
