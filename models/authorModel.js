const mongoose = require("mongoose");
const { DateTime } = require("luxon");  //for date handling

const AuthorSchema = new mongoose.Schema({
	first_name: { type: String, required: true, maxLength: 100 },
	last_name: { type: String, required: true, maxLength: 100 },
	date_of_birth: { type: Date },
	date_of_death: { type: Date },
});

// Virtual for author's full name
AuthorSchema.virtual("name").get(function () {
	// To avoid errors in cases where an author does not have either a family name or first name
	// We want to make sure we handle the exception by returning an empty string for that case
	let fullname = "";
	if (this.first_name && this.last_name) {
		fullname = this.last_name + ", " + this.first_name;
	}
	if (!this.first_name || !this.last_name) {
		fullname = "";
	}
	return fullname;
});

// Virtual for author's lifespan
AuthorSchema.virtual("lifespan").get(function () {
	var lifetime_string = "";
	if (this.date_of_birth) {
		lifetime_string = this.date_of_birth.getYear().toString();
	}
	lifetime_string += " - ";
	if (this.date_of_death) {
		lifetime_string += this.date_of_death.getYear();
	}
	return lifetime_string;
});

// Virtual for author's URL
AuthorSchema.virtual("url").get(function () {
	return "/catalog/author/" + this._id;
});
//To format the date of birth
AuthorSchema.virtual('date_of_birth_yyyy_mm_dd').get(function() {
  return DateTime.fromJSDate(this.date_of_birth).toISODate(); //format 'YYYY-MM-DD'
});
//to format the date of death well
AuthorSchema.virtual('date_of_death_yyyy_mm_dd').get(function() {
  return DateTime.fromJSDate(this.date_of_death).toISODate(); //format 'YYYY-MM-DD'
});


//Export model
module.exports = mongoose.model("Author", AuthorSchema);
