const Shows = require("../model/showModel.js");

const getAllData = async (req, res) => {
  try {
    const shows = await Shows.find({}).limit(15);
    if (!shows) {
      res.status(404).send({
        success: false,
        message: "No shows available",
      });
    }

    res.status(200).send({
      success: true,
      shows,
    });
  } catch (err) {
    console.error(error);
    res.status(500).send({ sucess: false, error });
  }
};

module.exports = getAllData;
