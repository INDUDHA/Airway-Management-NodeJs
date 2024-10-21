const mongoose = require('mongoose');

const ancillaryservicesschema = new mongoose.Schema({
    AncillaryId: {
        type: String,
        required: true
    },
    OptedBy: {
        type: String,
        required: true
    },
    ExtraBaggage: {
        type: Object,
        required: true
    },
    OrdinaryMeals: {
        type: Object,
        required: true
    },
    SpecialMeals: {
        type: Object,
        required: true
    },
    LegRoom: {
        type: Object,
        required: true
    },
    InFlightShopRequest: {
        type: Object,
        required: true
    },
    CreatedAt: {
        type: Date,
        required: true
    }

})

module.exports = mongoose.model('ancillaryservicesinfo', ancillaryservicesschema);