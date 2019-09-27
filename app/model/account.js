module.exports = app => {
  const mongoose = app.mongoose;
  const AccountSchema = new mongoose.Schema(
    {
      money: { type: Number,  required: true },
      type: { type: String, required: true },
      name: { type: String, required: true },
      buyerNmae: { type: String, required: true },
      time: { type: Date },
      detial: { type: String },
      extra: { type: mongoose.Schema.Types.Mixed }
    },
    {
      timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
      }
    }
  );
  return mongoose.model('Account', AccountSchema);
};
