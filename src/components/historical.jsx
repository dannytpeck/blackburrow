import React, { useEffect } from 'react';

import Airtable from 'airtable';
const base = new Airtable({ apiKey: 'keyCxnlep0bgotSrX' }).base('appHXXoVD1tn9QATh');

/* globals $ */
function Historical({
  calendar,
  challengeTitle,
  activityText,
  shortDescription,
  longDescription,
  limeadeChallenges,
  setLimeadeChallenges,
  setHistoricalEdits
}) {

  // Make airtable calls when app starts
  useEffect(() => {

    base('Clients').select({
      filterByFormula: `{Limeade e=}='${calendar.fields['client']}'`
    }).eachPage((records, fetchNextPage) => {
      const client = records[0];

      if (client && client.fields['LimeadeAccessToken'] && limeadeChallenges.length === 0) {
        $('#spinner').show();

        $.ajax({
          url: 'https://api.limeade.com/api/admin/activity',
          type: 'GET',
          dataType: 'json',
          headers: {
            Authorization: 'Bearer ' + client.fields['LimeadeAccessToken']
          },
          contentType: 'application/json; charset=utf-8'
        }).done((result) => {
          const activities = result.Data;

          // Do stuff here
          setLimeadeChallenges(activities);
          $('#spinner').hide();

        }).fail((xhr, textStatus, error) => {
          console.error(`${client.fields['Account Name']} - GET ActivityLifecycle has failed`);
        });
      }

    });

    // Enable all tooltips on the page
    $(function() {
      $('[data-toggle="tooltip"]').tooltip();
    });

  }, []); // Pass empty array to only run once on mount

  function handleChange(e) {
    setHistoricalEdits(e.target.value);
  }

  return (
    <section id="historical" className="row">
      <div className="col-6">

        <h3 className="mb-5">Challenge Content</h3>

        <div className="form-group">
          <label htmlFor="searchPreviousChallenge">Search Previous Challenge</label>
          <img id="spinner" src="images/spinner.svg" />
          <input type="text" className="form-control" id="searchPreviousChallenge" placeholder="Lorem Ipspum Dolor sit Amet" />
        </div>

        <div className="form-row mt-5">

          <div className="col">
            <div className="form-group">
              <label htmlFor="startDate">Start Date</label>
              <img className="tooltip-icon" src="images/tooltip.svg" data-toggle="tooltip" data-original-title="Default tooltip" />
              <input type="date" className="form-control" id="startDate" />
            </div>
          </div>

          <div className="col">
            <div className="form-group">
              <label htmlFor="endDate">End Date</label>
              <img className="tooltip-icon" src="images/tooltip.svg" data-toggle="tooltip" data-original-title="Default tooltip" />
              <input type="date" className="form-control" id="endDate" />
            </div>
          </div>

        </div>

        <div className="form-row mt-5">
          <div className="col-6">
            <div className="form-group">
              <label htmlFor="pointValue">Point Value</label>
              <img className="tooltip-icon" src="images/tooltip.svg" data-toggle="tooltip" data-original-title="Default tooltip" />
              <input type="text" className="form-control" id="pointValue" />
            </div>
          </div>
        </div>

        <div className="form-row mt-5">
          <div className="col-6">
            <div className="form-group">
              <label htmlFor="editContentImage">Lorem...edit content image</label>
              <select className="form-control" id="editContentImage" onChange={handleChange}>
                <option>Select</option>
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>
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

export default Historical;
