import React, { useEffect } from 'react';

/* globals $ */
function AdditionalDetails({ challengeTitle, activityText, shortDescription, longDescription }) {

  // Make airtable calls when app starts
  useEffect(() => {

    // Enable all tooltips on the page
    $(function() {
      $('[data-toggle="tooltip"]').tooltip();
    });

  }, []); // Pass empty array to only run once on mount

  return (
    <section id="additionalDetails" className="row">
      <div className="col-6">

        <h3 className="mb-5">Additional Details</h3>

        <div className="form-group">
          <label>Tile Image</label>
          <div className="choose-image">
            <div className="form-group">
              <button type="button" className="btn btn-outline-primary">Browse our Library</button>
            </div>

            <span className="mx-4 align-top">OR</span>

            <div className="form-group">
              <input type="file" className="form-control-file" id="uploadImage" />
              <small className="form-text text-muted text-left">Image dimensions must be 1000x2000 pixels<br/>Accepted file formats jpg or png</small>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label className="mb-0">Make this challenge a "Featured Activity"?</label>
          <small className="form-text text-muted text-left">Featured Activities are displayed in the rotating Featured Activity Banner at the top of the home page. Recommended limit of 4 at a time.</small>
          <div className="form-check mt-2">
            <input className="form-check-input" type="checkbox" id="featuredActivityYes" />
            <label className="form-check-label" htmlFor="featuredActivityYes">Yes</label>
          </div>
        </div>

        <div className="form-group mt-3">
          <label>Targeting</label>
          <img className="tooltip-icon" src="images/tooltip.svg" data-toggle="tooltip" data-original-title="Default tooltip" />
          <div className="form-check">
            <input className="form-check-input" type="radio" name="targetingRadios" id="entirePopulation" value="Entire Population" />
            <label className="form-check-label" htmlFor="entirePopulation">Entire Population</label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="targetingRadios" id="specificDemographic" value="Specific Demographic" />
            <label className="form-check-label" htmlFor="specificDemographic">Specific Demographic</label>
          </div>
        </div>

        <div className="form-group mt-5" htmlFor="targetingDetails">
          <label className="mb-0">Who..can see this..should this tile be visible to?</label>
          <small className="form-text text-muted text-left">Lorem...Please be as specific as possible...</small>
          <textarea className="form-control mt-4" id="targetingDetails" rows="3"></textarea>
        </div>

        <div className="form-group mt-5">
          <label className="mb-0">Additional Resources</label>
          <small className="form-text text-muted text-left">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</small>
          <div className="form-group">
            <button type="button" className="btn btn-outline-primary my-3">Add Resources</button>
          </div>
        </div>

      </div>
      <div className="col-6">

        <div className="border" id="tilePreview">
          <header className="preview-header">
            <h3>Challenge Preview</h3>
          </header>
          <div className="image-wrapper">
            <img src="http://via.placeholder.com/540x270" />
          </div>
          <div className="content-wrapper">
            <h3>{challengeTitle}</h3>
            <p>To complete this, <strong>{activityText}</strong></p>
            <hr />
            <h5>About this activity</h5>
            <p>{shortDescription}</p>
            <h5>More information</h5>
            <p>{longDescription}</p>
          </div>
        </div>

      </div>
    </section>
  );

}

export default AdditionalDetails;
