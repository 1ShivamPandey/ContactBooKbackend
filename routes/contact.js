const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");
const multer = require("multer");
// router.route('/').post(createContact);

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    return cb(null, "./Image");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post(
  "/createContact",
  upload.single("image"),
  contactController.createContact
);
router.put("/editContact/:id", contactController.editContact);
router.get("/getContact", contactController.getContact);
router.delete("/deleteContact/:id", contactController.deleteContact);
router.post("/login", contactController.login);
module.exports = router;
