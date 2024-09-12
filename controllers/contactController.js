const Contact = require("../models/contactModel");

// const createContact = async (req, res) => {
//   try {
//     const data = new Contact(req.body);
//     // const {name,email,password} = req.body
//     await data.save();
//     res.status(201).json(data);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

const createContact = async (req, res) => {
  try {
    const { name, email, phone, password, role ,verified,State,District} = req.body;
    const image = req.file ? req.file.path : null;
    const data = new Contact({ name, email, phone, password, image, role ,verified,State,District});

    const existingContact = await Contact.findOne({
      $or: [{ email }, { phone }],
    });
    if (existingContact) {
      return res.status(401).json({
        error: "Email or phone already registered",
        message: "Email or phone already registered",
      });
    }
    await data.save();
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const User = await Contact.findOne({ email });
    if (!User) {
      return res.status(404).json({ message: "User not found" });
    }

    if (password !== User.password) {
      return res.status(400).json({ message: "Wrong password" });
    }
    res.status(200).json({ message: "Login Successfull", UserId: User });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const editContact = async (req, res) => {
  try {
    const data = await Contact.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getContact = async (req, res) => {
  try {
    const data = await Contact.find();
    res.json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteContact = async (req, res) => {
  try {
    const data = await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: "Contact deleted Successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createContact,
  editContact,
  getContact,
  deleteContact,
  login,
};
