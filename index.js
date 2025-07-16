const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIO = require('socket.io');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const Document = require('./models/Document');
const { verifyTokenSocket } = require('./middleware/authMiddleware');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: { origin: '*' },
});

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('✅ MongoDB connected');
}).catch(err => {
  console.error('❌ MongoDB connection error:', err);
});

// Socket.IO Authentication Middleware
io.use(verifyTokenSocket);

// Realtime Collaboration Logic
io.on('connection', socket => {
  console.log('🟢 A user connected');

  socket.on('get-document', async docId => {
    const document = await Document.findById(docId) || await Document.create({ _id: docId, data: '' });
    socket.join(docId);
    socket.emit('load-document', document.data);

    socket.on('send-changes', delta => {
      socket.broadcast.to(docId).emit('receive-changes', delta);
    });

    socket.on('save-document', async data => {
      await Document.findByIdAndUpdate(docId, { data });
    });
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
