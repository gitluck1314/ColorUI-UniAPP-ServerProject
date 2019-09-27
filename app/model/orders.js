module.exports = app => {
  const mongoose = app.mongoose;
  const OrdersSchema = new mongoose.Schema(
    {
      goodsNum: { type: Number, required: true },
      goodsPrice: { type: Number ,required: true},
      goDate: { type: Date, required: true },
      ownOrderName: { type: String, required:true},
      ownOrderMoble: { type: String, required: true },
      ticketType: { type: String, required: true},
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
      },
      ticketsId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Tickets'
      }
    },
    {
      timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
      }
    }
  );
  return mongoose.model('Orders', OrdersSchema);
}