const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
  _id: String,          // document ID (e.g., 'demo-document')
  data: Object          // Quill delta format
});

module.exports = mongoose.model('Document', DocumentSchema);
