module.exports = app => {
  const mongoose = app.mongoose;
  const CitySchema = new mongoose.Schema(
    {
      cityFirstCode: { type: String, required: true },
      cityCode: { type: Number, required: true },
      provinceName: { type: String, required: true  },
      cityName: { type: String, required: true },
      regionName: { type: String },
      countyName: { type: String }
    }
  );
  return mongoose.model('City', CitySchema);
}