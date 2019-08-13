import React, { useEffect } from 'react';
import moment from 'moment';

import TilePreview from './tile_preview';

/* globals $ */
function StepConfiguration({
  imageUrl,
  challengeTitle,
  activityText,
  endDate,
  shortDescription,
  longDescription,
}) {

  // Make airtable calls when app starts
  useEffect(() => {

    // Enable all tooltips on the page
    $(function() {
      $('[data-toggle="tooltip"]').tooltip();
    });

  }, []); // Pass empty array to only run once on mount

  return (
    <section id="stepConfiguration" className="row">
      <div className="col-6">

        <h3 className="mb-5">Challenge Configuration</h3>

        <label className="mb-0">Is this a Team Challenge?</label>
        <small className="form-text text-muted text-left">Lorem Team challenges etc. etc.</small>
        <small className="form-text text-muted text-left">Team sizes can be between 2 and 20 people.</small>

        <div className="form-check">
          <input className="form-check-input" type="radio" name="individualOrTeamRadios" id="individualChallenge" defaultChecked />
          <label className="form-check-label" htmlFor="individualChallenge">Individual Challenge</label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="radio" name="individualOrTeamRadios" id="teamChallenge" />
          <label className="form-check-label" htmlFor="teamChallenge">Team Challenge</label>
        </div>

        <label className="mt-5 mb-0">Number of steps needed to earn points</label>
        <small className="form-text text-muted text-left">Lorem steps needed to win points.</small>
        <small className="form-text text-muted text-left">Lorem participants can keep tracking after they have enough points until the End Date.</small>

        <div className="row">
          <div className="col">
            <div className="form-group">
              <input type="text" className="form-control" placeholder="50,000" />
            </div>
          </div>
          <div className="col">
            <div className="form-group">
              <select className="form-control">
                <option>Select</option>
                <option>By {moment(endDate).format('L')}</option>
                <option>Each Week</option>
              </select>
            </div>
          </div>
        </div>

      </div>
      <div className="col-6">
        <TilePreview imageUrl={imageUrl} challengeTitle={challengeTitle} activityText={activityText} shortDescription={shortDescription} longDescription={longDescription} />
      </div>
    </section>
  );

}

export default StepConfiguration;
