const axios = require("axios");
const Events = require("../../models/Events");

const getActiveEvent = async (req, res) => {
    try {
      const activeEvent = await Events.findOne({ "metadata.status": "active" });
  
      if (!activeEvent) {
        return res.status(404).json({ message: "No active event found" });
      }
  
      return res.status(200).json({ event: activeEvent });
    } catch (error) {
      console.error("Error fetching active event:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    getActiveEvent,
};