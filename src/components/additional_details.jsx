import React, { useState, useEffect } from 'react';

import TilePreview from './tile_preview';

/* globals $ */
function AdditionalDetails({
  featuredActivity,
  setFeaturedActivity,
  targeting,
  setTargeting,
  specificDemographicText,
  setSpecificDemographicText,
  imageUrl,
  setImageUrl,
  challengeTitle,
  activityText,
  shortDescription,
  longDescription
}) {

  // Make airtable calls when app starts
  useEffect(() => {

    // Enable all tooltips on the page
    $(function() {
      $('[data-toggle="tooltip"]').tooltip();
    });

  }, []); // Pass empty array to only run once on mount

  function handleFeaturedActivityChange(e) {
    setFeaturedActivity(e.target.checked);
  }

  function handleTargetingChange(e) {
    setTargeting(e.target.value);
  }

  function handleSpecificDemographicText(e) {
    setSpecificDemographicText(e.target.value);
  }

  function handleImageChange(e) {

    console.log(e.target.files);
    const imageFile = e.target.files[0];

    const formData = new FormData();
    formData.append('image', imageFile);

    fetch('https://api.imgur.com/3/image', {
      method: 'POST',
      headers: {
        Authorization: 'Client-ID a27c82776f2c9f3',
      },
      body: formData
    }).then(response => {
      return response.json();
    }).then(json => {
      console.log(json);
      setImageUrl(json.data.link);
    });

  }

  return (
    <section id="additionalDetails" className="row">
      <div className="col-6">

        <h3 className="mb-5">Additional Details</h3>

        <div className="form-group">
          <label>Tile Image</label>
          <div className="choose-image">
            <div className="form-group">
              <input type="file" className="form-control-file" id="uploadImage" onChange={handleImageChange} />
              <small className="form-text text-muted text-left">Image dimensions must be 1000x2000 pixels<br/>Accepted file formats jpg or png</small>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label className="mb-0">Make this challenge a "Featured Activity"?</label>
          <small className="form-text text-muted text-left">Featured Activities are displayed in the rotating Featured Activity Banner at the top of the home page. Recommended limit of 4 at a time.</small>
          <div id="featuredActivityCheck" className="form-check mt-2">
            <input className="form-check-input" type="checkbox" id="featuredActivityYes" checked={featuredActivity} onChange={handleFeaturedActivityChange} />
            <label className="form-check-label" htmlFor="featuredActivityYes">
              <span className="mr-2 align-middle"></span>
              <span className="align-middle">Yes</span>
            </label>
          </div>
        </div>

        <div className="form-group mt-3">
          <label>Targeting</label>
          <img className="tooltip-icon" src="images/tooltip.svg" data-toggle="tooltip" data-original-title="Default tooltip" />
          <div className="form-check">
            <input className="form-check-input" type="radio" name="targetingRadios" id="entirePopulation" value="Entire Population" onChange={handleTargetingChange} checked={targeting === 'Entire Population'} />
            <label className="form-check-label" htmlFor="entirePopulation">Entire Population</label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="targetingRadios" id="specificDemographic" value="Specific Demographic" onChange={handleTargetingChange} checked={targeting === 'Specific Demographic'} />
            <label className="form-check-label" htmlFor="specificDemographic">Specific Demographic</label>
          </div>
        </div>

        <div className="form-group mt-5" htmlFor="targetingDetails" style={{ opacity: targeting === 'Specific Demographic' ? '1' : '0' }}>
          <label className="mb-0">Who..can see this..should this tile be visible to?</label>
          <small className="form-text text-muted text-left">Lorem...Please be as specific as possible...</small>
          <textarea className="form-control mt-4" id="targetingDetails" rows="3" value={specificDemographicText} onChange={handleSpecificDemographicText}></textarea>
        </div>

        {/* Hiding Additional Resources section for now
        <div className="form-group mt-5">
          <label className="mb-0">Additional Resources</label>
          <small className="form-text text-muted text-left">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</small>
          <div className="form-group">
            <button type="button" className="btn btn-outline-primary my-3">Add Resources</button>
          </div>
        </div>
        */}

      </div>
      <div className="col-6">
        <TilePreview imageUrl={imageUrl} challengeTitle={challengeTitle} activityText={activityText} shortDescription={shortDescription} longDescription={longDescription} />
      </div>
    </section>
  );

}

export default AdditionalDetails;
