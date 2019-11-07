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
  setStartDate,
  endDate,
  setEndDate,
  weekly,
  setWeekly,
  cieId,
  setCieId,
  pointValue,
  setPointValue,
  historicalEdits,
  setHistoricalEdits,
  tileType,
  setTileType,
  individualOrTeam,
  setIndividualOrTeam,
  setTeamMin,
  setTeamMax,
  imageUrl,
  setImageUrl,
  challengeTitle,
  setChallengeTitle,
  activityText,
  setActivityText,
  activityGoalNumber,
  setActivityGoalNumber,
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
    // if pulling in /cfs image, setImageUrl as limeade trophy image
    if (challenge.ChallengeLogoURL.includes('/cfs-file') === true || challenge.ChallengeLogoURL === '' || challenge.ChallengeLogoURL.includes('/images/') === true) {
      setImageUrl('https://cdn.limeade.com/images/item-image-default-small.jpg');
    }
    setPointValue(challenge.ActivityReward.Value);

    // Parse information if importing a CIE (convert it into a Verified Partner Challenge) if ID is negative (wtf Limeade)
    if (challenge.ChallengeId < 0) {
      // set tile as Verified Challenge
      setTileType('Verified Challenge');
      // set other relevant fields
      setCieId(-(challenge.ChallengeId));
      setChallengeTitle(challenge.Name);
      setActivityText('do the activity in the description');
      setShortDescription('');
      setLongDescription(challenge.AboutChallenge);

    } else if (challenge.ChallengeId > 0) { // if ID is positive, therefore Self-Report or Partner challenge
      setTileType('One-Time Self-Report Challenge');
      setCieId('');
      setChallengeTitle(challenge.Name);
      challenge.ActivityType ? setActivityText(challenge.ActivityType) : setActivityText('do the activity in the description');
      setShortDescription(challenge.ShortDescription
        .replace(/<[^>]*>?/ig, '')
        .replace(/\u00A9/g, '') // removing copyright from shortDescription
        .replace(/&copy;/g, '') // removing copyright from shortDescription
        .replace(/&nbsp;/g, ' ')
        .replace(/&lsquo;/g, "'")
        .replace(/&rsquo;/g, "'")
        .replace(/&ldquo;/g, '"')
        .replace(/&rdquo;/g, '"')
        .replace(/&#38;/g, 'and')
        .replace(/&amp;/g, 'and')
        .replace(/\u2013/g, '-')
        .replace(/\u2014/g, '-')
        .replace(/\u2019/g, '\'')
        .replace(/\u201C/g, '"')
        .replace(/\u201D/g, '"')
        .replace(/\t/g, '')
      );
      setLongDescription(challenge.AboutChallenge);
      setActivityGoalNumber(challenge.ChallengeTarget);

      if (challenge.ActivityType === 'exercise' ) {
        setTileType('Steps Challenge');
      }

      if (challenge.IsTeamChallenge === true) {
        setIndividualOrTeam('Team');
        setTeamMin(challenge.TeamSize.MinTeamSize);
        setTeamMax(challenge.TeamSize.MaxTeamSize);
      }

      // setting tile type to secret values if the historical challenge is Weekly Days or Weekly Units
      if (challenge.Frequency === 'Weekly' || challenge.Frequency === 'weekly') {
        // set the value of Weekly so we can use it later
        setWeekly(true);
        // also set the tileType based on the various Limeade possibilities
        if (challenge.ChallengeType === 'YesNoDaily') {
          setTileType('Weekly Days');
        } else if (challenge.ActivityType === 'exercise') {
          setTileType('Steps Challenge');
        } else {
          setTileType('Weekly Units');
          setActivityText(challenge.AmountUnit);
        }
      }

      // if historical challenge was a Partner Challenge, set tile as Verified
      if (challenge.PartnerId === 1) {
        setTileType('Verified Challenge');
      }

    } else {
      console.log('Challenge cannot be parsed. Check if the ChallengeId = 0');
    }

  }

  function handleStartDateChange(e) {
    setStartDate(e.target.value);
  }

  function handleEndDateChange(e) {
    setEndDate(e.target.value);
  }

  function handleChange(e) {
    setHistoricalEdits(e.target.value);
  }

  function handlePointValueChange(e) {
    setPointValue(e.target.value);
  }

  return (
    <section id="historical" className="row">
      <div className="col-6">

        <h3 className="mb-5">Search Historical Tiles</h3>

        <ChallengeSelect challenges={limeadeChallenges} setChallenge={setChallenge} />

        <div className="form-row mt-5">

          <div className="col">
            <div className="form-group">
              <label htmlFor="startDate">Start Date</label>
              <img className="tooltip-icon" src="images/tooltip.svg" data-html="true" data-toggle="tooltip" data-original-title="The day the tile will go live on the platform." />
              <input type="date" className="form-control" id="startDate" value={startDate} onChange={handleStartDateChange} />
            </div>
          </div>

          <div className="col">
            <div className="form-group">
              <label htmlFor="endDate">End Date</label>
              <img className="tooltip-icon" src="images/tooltip.svg" data-html="true" data-toggle="tooltip" data-original-title="<strong>Info Tiles and Verified Challenges:</strong><p>The last day a tile is visible on the platform.</p><strong>Self-Report and Steps Challenges: </strong><p>The last day a participant can join the challenge. This will be followed by a 3-day grace period in which a participant can still track completion of the challenge, to earn points. </p><p>Challenge end date should NOT be set after your program end date.</p>" />
              <input type="date" className="form-control" id="endDate" value={endDate} onChange={handleEndDateChange} />
            </div>
          </div>

        </div>

        <div className="form-row mt-5">
          <div className="col-6">
            <div className="form-group">
              <label htmlFor="pointValue">Point Value</label>
              <img className="tooltip-icon" src="images/tooltip.svg" data-html="true" data-toggle="tooltip" data-original-title="Number of points awarded upon completion." />
              <input type="number" className="form-control" id="pointValue" value={pointValue} onChange={handlePointValueChange} />
            </div>
          </div>
        </div>

        <div className="form-row mt-5">
          <div className="col-6">
            <div className="form-group">
              <label htmlFor="editContentImage">Would you like to make any edits to the content of this tile?</label>
              <small><p>Note: Rerun historical tiles without edits are always "free".  Revising a historical tile will require copyediting and may be counted toward your custom tile allotment.</p></small>
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
        <TilePreview tileType={tileType} weekly={weekly} imageUrl={imageUrl} challengeTitle={challengeTitle} activityText={activityText} activityGoalNumber={activityGoalNumber} individualOrTeam={individualOrTeam} shortDescription={shortDescription} longDescription={longDescription} />
      </div>
    </section>
  );

}

export default Historical;
