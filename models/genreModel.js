const mongoose = require("mongoose");

const GenreSchema = new mongoose.Schema({
	name: { type: String, required: true, min: 3, max: 100 },
	enum: [ 'fiction', 'romance', 'non_fiction', 'military', 'history' ],
});

// Virtual for book's URL
GenreSchema.virtual("url").get(function () {
	return "/catalog/genre/" + this._id;
});

//Export model
module.exports = mongoose.model("Genre", GenreSchema);
