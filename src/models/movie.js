const mongoose = require('mongoose');
const { schema } = require('./user');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  name:{ type: String, required: true },
  img: { type: String, required: true },
  summary: { type: String, required: true },
  ownerId: { type: Schema.Types.ObjectId, ref: 'User' },
  createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    }
}, {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }}
)

module.exports = mongoose.model('Movie', movieSchema);
