import React, { useEffect } from 'react';

import TilePreview from './tile_preview';

/* globals $ */
function ConfirmChallengeDetails({ challengeTitle, activityText, shortDescription, longDescription }) {

  // Make airtable calls when app starts
  useEffect(() => {

    // Enable all tooltips on the page
    $(function() {
      $('[data-toggle="tooltip"]').tooltip();
    });

  }, []); // Pass empty array to only run once on mount

  return (
    <section id="confirmChallengeDetails" className="row">
      <div className="col-6">

        <h3 className="mb-5">Confirm Challenge Details</h3>

        <label>Primary Account Manager:</label>
        <p>Aaron D.</p>

        <label>Tile Type:</label>
        <p>One-Time Self-Report</p>

        <div className="row">
          <div className="col">
            <label>Start Date:</label>
            <p>01/10/2020</p>
          </div>

          <div className="col">
            <label>End Date:</label>
            <p>01/25/2020</p>
          </div>
        </div>

        <label>Points:</label>
        <p>100</p>

        <label>Featured Activity:</label>
        <p>No</p>

        <label>Targeting:</label>
        <p>Entire Population</p>

        <label>Additional Resources:</label>
        <ul>
          <li>corn-challenge-document 07-30-2019.pdf</li>
          <li>Lower Your Carbon Footprint.pdf</li>
          <li>https://example.com/eat-weight-veggies.pdf</li>
        </ul>

        <div className="form-group mt-5">
          <label>Lorem Ipsum</label>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="acknowledgement" />
            <label className="form-check-label" htmlFor="acknowledgement">I acknowledge that my content will be reviewed by an ADURO Content Manager for basic spelling and grammatical errors prior to loading to my wellness platform.</label>
          </div>
        </div>

      </div>
      <div className="col-6">
        <TilePreview challengeTitle={challengeTitle} activityText={activityText} shortDescription={shortDescription} longDescription={longDescription} />
      </div>
    </section>
  );

}

export default ConfirmChallengeDetails;
