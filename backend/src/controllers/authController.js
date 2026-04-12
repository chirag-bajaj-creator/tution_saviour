const User = require('../models/User');
const Teacher = require('../models/Teacher');
const ParentAccess = require('../models/ParentAccess');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
  try {
    const { email, password, name, phone, role = 'tutor' } = req.body;
    console.log('🚀 Signup request received:', { email, name, phone, role });

    if (!email || !password || !name || !phone) {
      console.error('❌ Missing fields:', { email: !!email, password: !!password, name: !!name, phone: !!phone });
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const existing = await User.findOne({ email });
    console.log('🔍 Email check - Existing user:', existing ? 'YES (conflict)' : 'NO (ok)');
    if (existing) return res.status(400).json({ error: 'Email exists' });

    console.log('💾 Creating user with email:', email, 'role:', role);
    const user = new User({ email, passwordHash: password, role });
    await user.save();
    console.log('✅ User created:', user._id);

    // Only create Teacher profile if role is tutor
    if (role === 'tutor') {
      console.log('💾 Creating teacher profile for userId:', user._id);
      const teacher = new Teacher({ userId: user._id, name, phone });
      await teacher.save();
      console.log('✅ Teacher profile created:', teacher._id);
    }

    console.log('🔑 Generating JWT token');
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    console.log('✅ JWT token generated');

    console.log('📤 Sending response with token and user');
    res.status(201).json({ token, user: { id: user._id, email, role } });
  } catch (err) {
    console.error('❌ Signup error:', err.message);
    console.error('Stack:', err.stack);
    res.status(500).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('🚀 Login request received:', { email });

    if (!email || !password) {
      console.error('❌ Missing fields:', { email: !!email, password: !!password });
      return res.status(400).json({ error: 'Email and password required' });
    }

    console.log('🔍 Looking up user by email:', email);
    const user = await User.findOne({ email });

    if (!user) {
      console.error('❌ User not found');
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    console.log('✅ User found:', user._id);
    console.log('🔐 Comparing passwords...');
    console.log('   📝 Incoming password length:', password.length);
    console.log('   💾 Stored hash length:', user.passwordHash.length);
    console.log('   💾 Stored hash preview:', user.passwordHash.substring(0, 20) + '...');

    const isPasswordValid = await user.comparePassword(password);
    console.log('   🔍 Comparison result:', isPasswordValid);

    if (!isPasswordValid) {
      console.error('❌ Password mismatch');
      console.error('   ❌ Stored password hash seems incorrect');
      console.error('   💡 Hint: Make sure password was hashed during user creation');
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    console.log('✅ Password valid');
    console.log('🔑 Generating JWT token');
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    console.log('✅ JWT token generated');

    console.log('📤 Sending response with token and user');
    res.json({ token, user: { id: user._id, email, role: user.role } });
  } catch (err) {
    console.error('❌ Login error:', err.message);
    console.error('Stack:', err.stack);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { signup, login };
