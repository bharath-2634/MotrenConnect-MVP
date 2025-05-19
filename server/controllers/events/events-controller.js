const axios = require("axios");
const Events = require("../../models/Events");

const getActiveEvent = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // normalize to midnight

    // Get all events that are marked as 'active' or 'upcoming'
    const events = await Events.find({ "metadata.status": { $in: ["active"] } });
    // console.log("events : "+events);
    let firstActiveEvent = null;

    for (const event of events) {
      const eventDate = new Date(event.eventDate);
      // console.log("eventDate" + eventDate + "Today : "+today);
      eventDate.setHours(0, 0, 0, 0); // normalize to midnight
      // firstActiveEvent = event;
      if(eventDate < today) {
        event.metadata.status = "outdated";
        await event.save();
      }else if (!firstActiveEvent) {
          // Still valid
          firstActiveEvent = event;
      }
    
    }

    if (firstActiveEvent) {
      return res.status(200).json({ event: firstActiveEvent });
    } else {
      return res.status(404).json({ message: "No active event found" });
    }
  } catch (error) {
    console.error("Error fetching active event:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



module.exports = {
    getActiveEvent,
};