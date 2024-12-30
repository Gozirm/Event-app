import Event from "../modals/createEvent.js";
import moment from "moment";
import User from "../modals/signUpModal.js";
import { v2 as cloudinary } from "cloudinary";

const formatDate = (dateString) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  const date = new Date(dateString);
  return date.toLocaleString("en-US", options).replace(",", "");
};

export const createEvent = async (req, res) => {
  try {
    const {
      name,
      date,
      timeStart,
      timeEnd,
      location,
      description,
      category,
      tags,
      free, // This should be a boolean or string indicating if the event is free
      regular,
      vip,
    } = req.body;

    if (
      !name ||
      !date ||
      !timeStart ||
      !timeEnd ||
      !location ||
      !description ||
      !category
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Validate date format
    if (!moment(date, moment.ISO_8601, true).isValid()) {
      return res.status(400).json({ message: "Invalid date format." });
    }

    // Validate time order
    if (timeStart >= timeEnd) {
      return res
        .status(400)
        .json({ message: "Start time must be before end time." });
    }

    const userId = req.user ? req.user.userId : null;

    // Prepare event data
    const eventData = {
      name,
      date,
      timeStart,
      timeEnd,
      location,
      description,
      category,
      tags: tags ? tags.split(",").map((tag) => tag.trim()) : [],
      free: free === "true" ? "free" : null, // Set to "free" if the checkbox is checked
      regular: regular ? parseFloat(regular) : null, // Ensure regular is a number
      vip: vip ? parseFloat(vip) : null, // Ensure vip is a number
      user: userId,
    };

    // Check for uploaded image
    const imageToBeUploaded =
      req.files?.imageUrl?.tempFilePath || req.body.imageUrl;
    if (!imageToBeUploaded) {
      return res
        .status(400)
        .json({ success: false, errMsg: "Image has to be uploaded" });
    }

    let profileImageUrl;
    try {
      const result = await cloudinary.uploader.upload(imageToBeUploaded, {
        use_filename: true,
        folder: "mubby-events",
      });
      profileImageUrl = result.secure_url;
    } catch (uploadError) {
      console.error("Error uploading image to Cloudinary", uploadError);
      return res
        .status(500)
        .json({ success: false, errMsg: "Image upload failed" });
    }

    // Create the new event with the uploaded image URL
    const newEvent = await Event.create({
      ...eventData,
      imageUrl: profileImageUrl,
    });

    res
      .status(201)
      .json({ message: "Event created successfully", event: newEvent });
  } catch (error) {
    console.error("Error creating event:", error);
    res
      .status(500)
      .json({ message: "Error creating event", error: error.message });
  }
};
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .populate("user", "fullname")
      .sort({ createdAt: -1 });

    const eventDetails = events.map((event) => {
      let ticketType;

      // Determine the ticket type based on the event's properties
      if (event.free) {
        ticketType = "Free";
      } else if (event.regular && event.vip) {
        ticketType = "Regular,VIP";
      } else if (event.regular) {
        ticketType = "Regular";
      } else if (event.vip) {
        ticketType = "VIP";
      } else {
        ticketType = "Free"; // Handle case where no ticket type is set
      }

      return {
        title: event.name,
        category: event.category,
        location: event.location,
        date: formatDate(event.date),
        ticket: ticketType, // Use the determined ticket type
        image: event.imageUrl,
        createdBy: event.user ? event.user.fullname : "Unknown",
        _id: event._id,
      };
    });

    res.status(200).json({
      success: true,
      events: eventDetails,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, errMsg: "Server error." });
  }
};

export const getSingleEvent = async (req, res) => {
  const { _id } = req.params;

  try {
    const event = await Event.findById(_id).populate("user", "fullname");

    if (!event) {
      return res
        .status(404)
        .json({ success: false, errMsg: "Event not found." });
    }

    const eventDetails = {
      title: event.name,
      category: event.category,
      location: event.location,
      date: formatDate(event.date),
      ticket: event.ticketType,
      image: event.imageUrl,
      createdBy: event.user ? event.user.fullname : "Unknown",
      description: event.description,
      price: event.price,
      tags: event.tags,
      _id: event._id,
    };

    res.status(200).json({
      success: true,
      event: eventDetails,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, errMsg: "Server error." });
  }
};

export const savedEvents = async (req, res) => {
  const { userId, eventId } = req.body;
  console.log("Received userId:", userId);
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User  not found" });
    }

    if (user.savedEvents.includes(eventId)) {
      return res.status(400).json({ message: "Event already saved" });
    }

    user.savedEvents.push(eventId);
    await user.save();
    res.status(200).json({ message: "Event saved successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error saving event" });
  }
};

export const getSavedEvents = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).populate("savedEvents");
    if (!user) {
      return res.status(404).json({ message: "User  not found" });
    }

    res.status(200).json(user.savedEvents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving saved events" });
  }
};

export const deleteSavedEvents = async (req, res) => {
  const { userId, eventId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User  not found" });
    }

    // Check if the event is saved
    if (!user.savedEvents.includes(eventId)) {
      return res.status(400).json({ message: "Event not saved" });
    }

    // Remove the event from saved events
    user.savedEvents = user.savedEvents.filter(
      (id) => id.toString() !== eventId
    );
    await user.save();
    res.status(200).json({ message: "Event unsaved successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error unsaving event" });
  }
};
