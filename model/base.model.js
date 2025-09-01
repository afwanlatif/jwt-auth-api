const mongoose = require("mongoose");
const { RecordStatus } = require("../constants");

const BaseSchema = new mongoose.Schema({
    createdBy: { type: String, required: false },
    createdAt: { type: Date, default: Date.now() },
    updatedBy: { type: String, required: false },
    updatedAt: { type: Date, required: false },
    recStatus: {
        type: String,
        enum: RecordStatus,
        default: RecordStatus.ACTIVE
    }
});

const extend = (Schema, obj) => {
    return new mongoose.Schema(Object.assign({}, Schema.obj, obj))
};

module.exports = {
    BaseSchema,
    extend
}