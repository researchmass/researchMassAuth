import User from '../models/User.js';

export const createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserByRegistration = async (req, res) => {
  try {
    const user = await User.findOne({
      registrationNumber: req.params.reg
    });

    if (!user) return res.status(404).send('Not found');

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const verifyUser = async (req, res) => {
  try {
    const { registrationNumber, passportNumber } = req.query;

    const user = await User.findOne({
      registrationNumber,
      passportNumber
    });

    if (!user) {
      return res.status(404).json({ success: false });
    }

    res.json({
      success: true,
      data: user
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};