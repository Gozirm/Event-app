import React, { useState, useEffect, useRef } from "react";
import "../Styles/CreateEvents.css";
import preImg from "../assets/choosePic.svg";
import { useAuth } from "../Auth/AuthContext";
import { useNavigate } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";

const CreateEvents = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [imageError, setImageError] = useState("");
  const [isFree, setIsFree] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/sign-in");
    }
  }, [user, navigate]);

  const dateRef = useRef();
  const timeStartRef = useRef();
  const timeEndRef = useRef();
  const LocationRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();
  const tagsRef = useRef();
  const regularPriceRef = useRef();
  const vipPriceRef = useRef();
  const nameRef = useRef();

  const handleFreeToggle = () => {
    setIsFree((prev) => !prev);
    if (!isFree) {
      regularPriceRef.current.value = "";
      vipPriceRef.current.value = "";
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Check file size
      if (file.size > 2 * 1024 * 1024) {
        setImageError("The file is too large (max 2MB)");
        setImagePreview(null);
        return;
      } else {
        setImageError("");
      }

      // Create an Image object to check dimensions
      const img = new Image();
      const reader = new FileReader();

      reader.onloadend = () => {
        img.src = reader.result;
        img.onload = () => {
          // Check dimensions
          if (img.width < 399 || img.height < 286) {
            setImageError("Image dimensions must be at least 399x286 pixels.");
            setImagePreview(null);
          } else {
            setImageError(""); // Clear any previous error
            setImagePreview(reader.result);
            setUploadedFile(file);
          }
        };
      };

      reader.readAsDataURL(file);
    }
  };

  const token = localStorage.getItem("mubby-event-token");

  const handleSubmit = async (event) => {
    setIsLoading(true)
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", nameRef.current.value);
    formData.append("date", dateRef.current.value);
    formData.append("timeStart", timeStartRef.current.value);
    formData.append("timeEnd", timeEndRef.current.value);
    formData.append("location", LocationRef.current.value);
    formData.append("description", descriptionRef.current.value);
    formData.append("category", categoryRef.current.value);
    formData.append("tags", tagsRef.current.value);

    if (isFree) {
      formData.append("free", "free");
    } else {
      const regularPrice = regularPriceRef.current.value
        ? parseFloat(regularPriceRef.current.value)
        : null;
      const vipPrice = vipPriceRef.current.value
        ? parseFloat(vipPriceRef.current.value)
        : null;

      if (regularPrice !== null) {
        formData.append("regular", regularPrice);
      }
      if (vipPrice !== null) {
        formData.append("vip", vipPrice);
      }
    }

    if (uploadedFile) {
      formData.append("imageUrl", uploadedFile);
    }

    try {
      const response = await axios.post(
        "https://event-app-9x9f.onrender.com/api/users/create-event",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (
        response.data &&
        response.data.message === "Event created successfully"
      ) {
        toast.success("Event Created Successfully");
        console.log("Event created successfully:", response.data);
        navigate("/event");
      } else {
        console.error("Error creating event:", response.data.message);
      }
    } catch (error) {
      console.error("Error during event creation:", error);
      toast.error(error.response.data.message);
    }finally{
      setIsLoading(false)
    }
  };

  return (
    <main className="create-events">
      <form onSubmit={handleSubmit}>
        <h1 className="create-event mb-4">Create Events</h1>
        <div className="position-relative">
          <h1 className="upload-photo">Upload Photo</h1>
          <div className="position-relative">
            <img src={imagePreview || preImg} alt="" className="img-pre"loading="lazy" />
            <input
              required
              type="file"
              className="position-absolute top-50 start-0 translate-middle-y opacity-0 img-pre"
              role="button"
              onChange={handleImageChange}
            />
            {imageError && <p className="text-danger">{imageError}</p>}
          </div>
        </div>
        <div className="mt-4">
          <input
            type="text"
            name=""
            ref={nameRef}
            placeholder="Event Title"
            className="w-100"
          />
          <h2 className="create-title-event">Time & Location</h2>
          <div>
            <div className="d-flex row m-0 mb-2">
              <label htmlFor="" className="create-event-label p-0">
                Date
              </label>
              <input type="date" ref={dateRef} className="w-auto" />
            </div>
            <div className="d-flex gap-3 mb-3">
              <div className="d-flex row m-0">
                <label
                  htmlFor=""
                  className="create-event-label p-0"
                >{`Time (Start)`}</label>
                <input type="time" ref={timeStartRef} />
              </div>
              <div className="d-flex row m-0">
                <label
                  htmlFor=""
                  className="create-event-label p-0"
                >{`Time (End)`}</label>
                <input type="time" ref={timeEndRef} />
              </div>
            </div>
            <div className="d-flex gap-3 align-items-center ">
              <div className="w-100">
                <span className="create-event-label">Location</span>
                <input
                  type="text"
                  className="w-100"
                  placeholder="Type Online if the event is Online"
                  ref={LocationRef}
                />
              </div>
            </div>
            <div className="d-flex row m-0 mt-2">
              <p className="m-0 p-0 create-event-label">Description</p>
              <textarea
                ref={descriptionRef}
                cols="30"
                rows="10"
                className="des-tag"
                placeholder="Enter Description"
              ></textarea>
            </div>
          </div>
        </div>
        <div className="w-100 mt-3">
          <h1 className="create-title-event">Category</h1>
          <div className="d-flex align-items-center gap-5 w-100">
            <div>
              <label htmlFor="" className="create-event-label">
                Select Category
              </label>
              <select ref={categoryRef} className="dropdown w-100">
                <option value="" selected disabled>
                  Category
                </option>
                <option value="Music">Music</option>
                <option value="Party">Party</option>
                <option value="Sports">Sports</option>
              </select>
            </div>
            <div className="d-flex row">
              <label htmlFor="" className="create-event-label">
                Tags
              </label>
              <input placeholder="give space for each tag" ref={tagsRef} />
            </div>
          </div>
          <div className="pricing-cate mt-3">
            <h1 className="create-title-event">Pricing</h1>
            <div className="d-flex justify-content-between">
              <p className="m-0 create-event-label">Free</p>
              <label className="switch">
                <input type="checkbox" onClick={handleFreeToggle} />
                <span className="slider round"></span>
              </label>
            </div>
            <div>
              <p className="m-0 create-event-label">Regular</p>
              <div className="d-flex justify-content-between">
                <input
                  ref={regularPriceRef}
                  disabled={isFree}
                  placeholder="Enter Regular Price"
                />
              </div>
            </div>
            <div>
              <p className="m-0 create-event-label">VIP</p>
              <div className="d-flex justify-content-between">
                <input
                  ref={vipPriceRef}
                  disabled={isFree}
                  placeholder="Enter VIP Price"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex gap-3 mt-5">
          <button
            className="btn-sign-in"
            type="button"
            onClick={() => navigate("/event")}
          >
            Cancel
          </button>
          <button className="btn-sign-up" type="submit" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create"}
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateEvents;
