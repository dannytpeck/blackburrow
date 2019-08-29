import React, { useEffect } from 'react';
import moment from 'moment';

import TilePreview from './tile_preview';

/* globals $ */
function ConfirmChallengeDetails({
  accountManager,
  tileType,
  individualOrTeam,
  teamMin,
  teamMax,
  startDate,
  endDate,
  pointValue,
  featuredActivity,
  targeting,
  imageUrl,
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

  return (
    <section id="confirmChallengeDetails" className="row">
      <div className="col-6">

        <h3 className="mb-5">Confirm Challenge Details</h3>

        <label>Primary Account Manager:</label>
        <p>{accountManager}</p>

        <label>Tile Type:</label>
        <p>{tileType}</p>

        {/* Show team size and steps if tileType=Steps Challenge */}
        <div className="row" style={{ display: tileType === 'Steps Challenge' ? 'block' : 'none' }}>
          <div className="col">
            <label>Individual or Team:</label>
            <p>{individualOrTeam}</p>
          </div>
        </div>

        <div className="row" style={{ display: individualOrTeam === 'Team' ? 'block' : 'none' }}>
          <div className="col">
            <label>Team Size</label>
            <p>{teamMin} - {teamMax} people</p>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <label>Start Date:</label>
            <p>{moment(startDate).format('L')}</p>
          </div>

          <div className="col">
            <label>End Date:</label>
            <p>{moment(endDate).format('L')}</p>
          </div>
        </div>

        <div style={{ display: tileType === 'Informational Tile' ? 'none' : 'block' }}>
          <label>Points:</label>
          <p>{pointValue}</p>
        </div>

        <label>Featured Activity:</label>
        <p>{featuredActivity ? 'Yes' : 'No'}</p>

        <label>Targeting:</label>
        <p>{targeting}</p>

        {/* Hiding Additional Resources section for now
        <label>Additional Resources:</label>
        <ul>
          <li>corn-challenge-document 07-30-2019.pdf</li>
          <li>Lower Your Carbon Footprint.pdf</li>
          <li>https://example.com/eat-weight-veggies.pdf</li>
        </ul>
        */}

        <div className="form-group mt-5">
          <label>Acknowledgement</label>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="acknowledgement" />
            <label className="form-check-label" htmlFor="acknowledgement">I acknowledge that my content will be reviewed by an ADURO Content Manager for basic spelling and grammatical errors prior to loading to my wellness platform.</label>
          </div>
        </div>

      </div>
      <div className="col-6">
        <TilePreview imageUrl={imageUrl} challengeTitle={challengeTitle} activityText={activityText} shortDescription={shortDescription} longDescription={longDescription} />
      </div>
    </section>
  );

}

export default ConfirmChallengeDetails;
