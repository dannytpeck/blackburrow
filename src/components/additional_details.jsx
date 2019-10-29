import React, { useState, useEffect } from 'react';

import TilePreview from './tile_preview';

/* globals $ */
function AdditionalDetails({
  tileType,
  weekly,
  featuredActivity,
  setFeaturedActivity,
  individualOrTeam,
  targeting,
  setTargeting,
  specificDemographicText,
  setSpecificDemographicText,
  imageUrl,
  setImageUrl,
  challengeTitle,
  activityText,
  activityGoalNumber,
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

    // clear out specific demographic text if Entire Population is selected
    if (e.target.value === 'Entire Population') {
      setSpecificDemographicText('');
    }
  }

  function handleSpecificDemographicText(e) {
    setSpecificDemographicText(e.target.value);
  }

  function handleAduroChooseImageChange(e) {
    if ($('#aduroChooseImage').prop('checked')) {
      setImageUrl('https://i.imgur.com/YuzgPrF.jpg');
    } else {
      setImageUrl('http://via.placeholder.com/2000x1000');
    }
  }

  function handleImageChange(e) {
    // uncheck the Aduro to Choose Image checkbox to avoid confusion
    $('#aduroChooseImage').prop('checked', false);

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
              <small className="form-text text-muted text-left">Image dimensions must be 2000x1000 pixels. Accepted file formats jpg or png.</small>
            </div>
          </div>
          <div className="aduro-choose-image">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="aduroChooseImage" onChange={handleAduroChooseImageChange} />
              <label className="form-check-label" htmlFor="aduroChooseImage">I don't have an image. Please select one from Aduro's image gallery.</label>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label className="mb-0">Make this tile a Featured Activity?</label>
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
          <label>Who should this tile be available to?</label>
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
          <label className="mb-0">Define the targeted demographic.</label>
          <small className="form-text text-muted text-left"><p>Please be as specific as possible.<br/>Example: Employee vs spouse, Enrolled vs Non-enrolled, etc.</p></small>
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
        <TilePreview tileType={tileType} weekly={weekly} imageUrl={imageUrl} challengeTitle={challengeTitle} activityText={activityText} activityGoalNumber={activityGoalNumber} individualOrTeam={individualOrTeam} shortDescription={shortDescription} longDescription={longDescription} />
      </div>
    </section>
  );

}

export default AdditionalDetails;
