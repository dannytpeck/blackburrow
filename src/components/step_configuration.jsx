import React, { useEffect } from 'react';
import moment from 'moment';

import TilePreview from './tile_preview';

/* globals $ */
function StepConfiguration({
  tileType,
  imageUrl,
  challengeTitle,
  activityText,
  activityGoalNumber,
  setActivityGoalNumber,
  endDate,
  shortDescription,
  longDescription,
  individualOrTeam,
  setIndividualOrTeam,
  setTeamMin,
  teamMin,
  setTeamMax,
  teamMax
}) {

  // Make airtable calls when app starts
  useEffect(() => {

    // Enable all tooltips on the page
    $(function() {
      $('[data-toggle="tooltip"]').tooltip();
    });

  }, []); // Pass empty array to only run once on mount

  function handleIndividualOrTeamChange(e) {
    setIndividualOrTeam(e.target.value);

    // Set initial team size values in case people don't change them
    // there's probably a better day to do this, Good First Commit
    e.target.value === 'Team' ? setTeamMin('4') : setTeamMin('');
    e.target.value === 'Team' ? setTeamMax('12') : setTeamMax('');
  }

  function handleTeamMinChange(e) {
    setTeamMin(e.target.value);
  }

  function handleTeamMaxChange(e) {
    setTeamMax(e.target.value);
  }

  function handleStepsGoalChange(e) {
    setActivityGoalNumber(e.target.value);
  }

  return (
    <section id="stepConfiguration" className="row">
      <div className="col-6">

        <h3 className="mb-5">Challenge Configuration</h3>

        <label className="mb-0">Is this an Individual or Team Challenge?</label>

        <div className="form-check">
          <input className="form-check-input" type="radio" name="individualOrTeamRadios" id="individualChallenge" value="Individual" onChange={handleIndividualOrTeamChange} checked={individualOrTeam === 'Individual'} />
          <label className="form-check-label" htmlFor="individualChallenge">Individual Challenge</label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="radio" name="individualOrTeamRadios" id="teamChallenge" value="Team" onChange={handleIndividualOrTeamChange} checked={individualOrTeam === 'Team'} />
          <label className="form-check-label" htmlFor="teamChallenge">Team Challenge</label>
        </div>

        <label className="mt-5 mb-0">Number of steps needed to earn points</label>
        <small className="form-text text-muted text-left"><p><strong>Weekly (available for Individual Challenges Only):</strong> Track XX steps each week during the challenge period. Goal resets each Monday. Points are awarded weekly, after the steps-goal is met. </p><p><strong>By End Date:</strong> Track XX steps before the end of the challenge. Points are awarded once, after the steps-goal is met.</p></small>
        <div className="row">
          <div className="col">
            <div className="form-group">
              <input type="text" className="form-control" placeholder="50,000" onChange={handleStepsGoalChange} />
            </div>
          </div>
          <div className="col">
            <div className="form-group">
              <select className="form-control">
                <option>Select</option>
                <option>By End Date ({moment(endDate).format('L')})</option>
                { individualOrTeam === 'Individual' ? <option>Each Week</option> : '' }
              </select>
            </div>
          </div>
        </div>

        <div className="form-row mt-5" style={{ display: individualOrTeam === 'Team' ? 'block' : 'none' }}>
          <div className="col-8">
            <div className="form-group">
              <label htmlFor="teamSize">Team Size</label>
              <small className="form-text text-muted text-left">Team sizes can be between 2 and 20 people.</small>
                <div className="row">
                  <div className="col">
                    <label htmlFor="teamMin">Team Minimum</label>
                    <select className="form-control" id="teamMin" defaultValue='4' onChange={handleTeamMinChange}>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </select>
                  </div>
                  <div className="col">
                    <label htmlFor="teamMax">Team Maximum</label>
                    <select className="form-control" id="teamMax" defaultValue='12' onChange={handleTeamMaxChange}>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                      <option>6</option>
                      <option>7</option>
                      <option>8</option>
                      <option>9</option>
                      <option>10</option>
                      <option>11</option>
                      <option>12</option>
                      <option>13</option>
                      <option>14</option>
                      <option>15</option>
                      <option>16</option>
                      <option>17</option>
                      <option>18</option>
                      <option>19</option>
                      <option>20</option>
                    </select>
                  </div>
                </div>
            </div>
          </div>
        </div>

      </div>
      <div className="col-6">
        <TilePreview tileType={tileType} imageUrl={imageUrl} challengeTitle={challengeTitle} activityText={activityText} activityGoalNumber={activityGoalNumber} shortDescription={shortDescription} longDescription={longDescription} />
      </div>
    </section>
  );

}

export default StepConfiguration;
