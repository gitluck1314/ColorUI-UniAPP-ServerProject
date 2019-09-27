module.exports = app =>{
  const mongoose=app.mongoose;
  const TicketsSchema = new mongoose.Schema(
    {
      name: { type: String,unique:true, required: true },
      address:{type: String, required: true},
      adultPrice: { type: Number},
      childPrice: { type: Number},
      routeReference: { type: String},
      openTime: { type: String},
      img: { type: String },
      cityId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true, 
        ref: 'city'
      }
    }
  );
  return mongoose.model('Tickets', TicketsSchema);
}