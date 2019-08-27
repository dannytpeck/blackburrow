import React, { useEffect } from 'react';

import Airtable from 'airtable';
const base = new Airtable({ apiKey: 'keyCxnlep0bgotSrX' }).base('appHXXoVD1tn9QATh');

import ChallengeSelect from './challenge_select';
import TilePreview from './tile_preview';

/* globals $ */
function Historical({
  calendar,
  limeadeChallenges,
  setLimeadeChallenges,
  startDate,
  setStateDate,
  endDate,
  setEndDate,
  pointValue,
  setPointValue,
  historicalEdits,
  setHistoricalEdits,
  imageUrl,
  setImageUrl,
  challengeTitle,
  setChallengeTitle,
  activityText,
  setActivityText,
  shortDescription,
  setShortDescription,
  longDescription,
  setLongDescription
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

  function setChallenge(challenge) {
    console.log(challenge);

    setImageUrl(challenge.ChallengeLogoURL);
    setChallengeTitle(challenge.Name);
    setActivityText(challenge.ActivityType);
    setShortDescription(challenge.ShortDescription.replace(/<[^>]*>?/g, ''));
    setLongDescription(challenge.AboutChallenge);

  }

  function handleStartDateChange(e) {
    setStateDate(e.target.value);
  }

  function handleEndDateChange(e) {
    setEndDate(e.target.value);
  }

  function handleChange(e) {
    setHistoricalEdits(e.target.value);
  }

  return (
    <section id="historical" className="row">
      <div className="col-6">

        <h3 className="mb-5">Challenge Content</h3>

        <ChallengeSelect challenges={limeadeChallenges} setChallenge={setChallenge} />

        <div className="form-row mt-5">

          <div className="col">
            <div className="form-group">
              <label htmlFor="startDate">Start Date</label>
              <img className="tooltip-icon" src="images/tooltip.svg" data-toggle="tooltip" data-original-title="Default tooltip" />
              <input type="date" className="form-control" id="startDate" value={startDate} onChange={handleStartDateChange} />
            </div>
          </div>

          <div className="col">
            <div className="form-group">
              <label htmlFor="endDate">End Date</label>
              <img className="tooltip-icon" src="images/tooltip.svg" data-toggle="tooltip" data-original-title="Default tooltip" />
              <input type="date" className="form-control" id="endDate" value={endDate} onChange={handleEndDateChange} />
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
              <select className="form-control" id="editContentImage" onChange={handleChange} value={historicalEdits}>
                <option>Select</option>
                <option>Yes</option>
                <option>No</option>
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

export default Historical;
