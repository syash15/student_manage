require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

async function run() {
  const uri = process.env.MONGODB_URI;
  if (!uri) { console.error('Set MONGODB_URI in .env'); process.exit(1); }
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  const username = process.env.ADMIN_USERNAME || 'admin';
  const password = process.env.ADMIN_PASSWORD || 'adminpassword';
  const existing = await User.findOne({ username });
  if (existing) { console.log('Admin exists'); process.exit(0); }
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);
  const user = new User({ username, passwordHash, fullName: 'Administrator', email: '', role: 'admin' });
  await user.save();
  console.log('Admin created:', username);
  process.exit(0);
}

run().catch(err=>{ console.error(err); process.exit(1); });
