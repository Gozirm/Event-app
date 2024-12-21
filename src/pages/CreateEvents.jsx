import React from "react";
import "../Styles/CreateEvents.css";
import preImg from "../assets/choosePic.svg";
import { useState } from "react";
import { useRef } from "react";
const CreateEvents = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isFree, setIsFree] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isOnline, setIsOnline] = useState(false);

  
  const dateRef = useRef();
  const timeStartRef = useRef();
  const timeEndRef = useRef();
  const LocationRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();
  const tagsRef = useRef();
  const regularPriceRef = useRef();
  const vipPriceRef = useRef();

  const handleActivate = () => {
    setIsDisabled((prev) => !prev);
    setIsOnline((prev) => !prev);
  };
  const handleFreeToggle = () => {
    setIsFree((prev) => !prev);
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    setUploadedFile(file);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      uploadedFile: uploadedFile ? uploadedFile.name : null,
      date: dateRef.current.value,
      startTime: timeStartRef.current.value,
      endTime: timeEndRef.current.value,
      location: LocationRef.current.value,
      description: descriptionRef.current.value,
      category: categoryRef.current.value,
      tags: tagsRef.current.value,
      isFree,
      regular: regularPriceRef.current.value || regularPriceRef.current.checked,
      vip: vipPriceRef.current.value || vipPriceRef.current.checked,
    };
    if (isOnline && !formData.location) {
      console.log("Location: Online");
    } else {
      console.log("Location:", formData.location);
    }

    console.log(formData);
  };
  return (
    <>
      <main className="create-events">
        <form action="" onSubmit={handleSubmit}>
          <h1 className="create-event mb-4">Create Events</h1>
          <div className="position-relative">
            <h1 className="upload-photo">Upload Photo</h1>
            <div className="position-relative">
              <img src={imagePreview || preImg} alt="" className="img-pre" />
              <input
                required
                type="file"
                className=" position-absolute top-50 start-0 translate-middle-y opacity-0 img-pre"
                role="button"
                onChange={handleImageChange}
              />
            </div>
          </div>
          <div className="mt-4">
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
                    type=""
                    className="w-100"
                    placeholder="Location"
                    disabled={isDisabled}
                    ref={LocationRef}
                  />
                </div>
                <div className="d-flex gap-2 mt-4">
                  <p className="m-0 create-event-label">Online</p>
                  <label class="switch">
                    <input type="checkbox" onClick={handleActivate} />
                    <span class="slider round"></span>
                  </label>
                </div>
              </div>
              <div className="d-flex row m-0 mt-2">
                <p className="m-0 p-0 create-event-label">Description</p>
                <textarea
                  name=""
                  id=""
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
                <select
                  ref={categoryRef}
                  name=""
                  id=""
                  className="dropdown w-100"
                >
                  <option value="Option 1" selected disabled>
                    Category
                  </option>
                  <option value="Option 1">Option 1</option>
                  <option value="Option 2">Option 2</option>
                  <option value="Option 3">Option 3</option>
                </select>
              </div>
              <div className="d-flex row">
                <label htmlFor="" className="create-event-label">
                  Tags
                </label>
                <input name="" id="" ref={tagsRef} />
              </div>
            </div>
            <div className="pricing-cate mt-3">
              <h1 className="create-title-event">Pricing</h1>
              <div className="d-flex justify-content-between">
                <p className="m-0 create-event-label">Free</p>
                <label class="switch">
                  <input type="checkbox" onClick={handleFreeToggle} />
                  <span class="slider round"></span>
                </label>
              </div>
              <div>
                <p className="m-0 create-event-label">Regular</p>
                <div className="d-flex justify-content-between">
                  <input
                    name=""
                    ref={regularPriceRef}
                    id=""
                    disabled={isFree}
                  />
                  <label className="switch mt-3">
                    <input type="checkbox" disabled={isFree} />
                    <span className="slider round"></span>
                  </label>
                </div>
              </div>
              <div>
                <p className="m-0 create-event-label">VIP</p>
                <div className="d-flex justify-content-between">
                  <input name="" ref={vipPriceRef} id="" disabled={isFree} />
                  <label className="switch mt-3">
                    <input type="checkbox" disabled={isFree} />
                    <span className="slider round"></span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex gap-3 mt-5">
            <button className="btn-sign-in">Cancel</button>
            <button className="btn-sign-up" type="submit">
              Create
            </button>
          </div>
        </form>
      </main>
    </>
  );
};

export default CreateEvents;
