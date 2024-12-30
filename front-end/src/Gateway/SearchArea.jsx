import React, { useState, useEffect } from "react";
import "../Styles/SearchArea.css";
const SearchArea = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState([]);
  const [priceRange, setPriceRange] = useState("");

  const handleApplyFilters = () => {
    console.log({
      searchTerm,
      location,
      date,
      category,
      tags,
      priceRange,
    });
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setLocation("");
    setDate("");
    setCategory("");
    setTags([]);
    setPriceRange("");
  };
  return (
    <>
      <main className="search-div">
        <div className="text-center">
          <input
            type="text"
            id="text"
            placeholder="Search events"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-bar m-0"
          />
        </div>
        <div className="d-flex flex-wrap gap-lg-4 gap-2 align-items-center mt-3 justify-content-center">
          <div className=" ">
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="dropdown"
            >
              <option value=""> Location</option>
              <option value="location1">Location 1</option>
              <option value="location2">Location 2</option>
            </select>
          </div>
          <div className="filter ">
            <select
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="dropdown"
            >
              <option value=""> Date</option>
              <option value="date1">Date 1</option>
              <option value="date2">Date 2</option>
            </select>
          </div>
          <div className="filter  ">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="dropdown"
            >
              <option value=""> Category</option>
              <option value="music">Music</option>
              <option value="art">Art</option>
              <option value="sports">Sports</option>
            </select>
          </div>
          <div className="filter  ">
            <select
              value={tags}
              onChange={(e) => setTags([...tags, e.target.value])}
              className="dropdown"
            >
              <option value=""> Tags</option>
              <option value="tag1">Tag 1</option>
              <option value="tag2">Tag 2</option>
            </select>
          </div>
          <div className="filter  ">
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="dropdown"
            >
              <option value="">Price</option>
              <option value="Free">Free</option>
              <option value="Paid">Paid</option>
            </select>
          </div>
          <button onClick={handleApplyFilters} className="apply-button">
            Apply
          </button>
          <button onClick={handleResetFilters} className="reset-button">
            Reset Filters
          </button>
        </div>
      </main>
    </>
  );
};

export default SearchArea;
