import React, { useEffect } from 'react';

/* globals $ */
function NetNew({
  tileType,
  setTileType,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  pointValue,
  setPointValue
}) {

  // Make airtable calls when app starts
  useEffect(() => {

    // Enable all tooltips on the page
    $(function() {
      $('[data-toggle="tooltip"]').tooltip();
    });

  }, []); // Pass empty array to only run once on mount

  function handleTileTypeChange(e) {
    setTileType(e.target.value);
  }

  function handleStartDateChange(e) {
    setStartDate(e.target.value);
  }

  function handleEndDateChange(e) {
    setEndDate(e.target.value);
  }

  function handlePointValueChange(e) {
    setPointValue(e.target.value);
  }
  if (tileType === 'Informational Tile') {
    setPointValue('0');
  }

  return (
    <section id="netNew" className="row">
      <div className="col-6">

        <h3 className="mb-5">Tile Information</h3>

        <div className="form-group">
          <label htmlFor="tileType">Tile Type</label>
          <img className="tooltip-icon" src="images/tooltip.svg" data-toggle="tooltip" data-html="true" data-placement="auto" title="<strong>One-Time Self-Report Challenge:</strong><p>A single action or activity. Participant tracks their own participation and claims their points once, manually, on the platform.</p><strong>Steps Challenge:</strong><p>A walking or exercise challenge that can be tracked both manually, and/or automatically by syncing an activity device (ie: Fitbit), Team or Individual.</p><strong>Verified Challenge:</strong><p>A participant can not 'self-report' their participation. Points are awarded via an Incentive Points Upload in Client Center, or by a third party vendor integration. Integrations require additional collaboration with your Account Manager and may have costs associated. Please reach out to your AM for more information.</p><strong>Information Tile:</strong><p>A static tile with zero (0) points associated.</p>" />
          <select className="form-control" id="tileType" value={tileType} onChange={handleTileTypeChange}>
            <option>One-Time Self-Report Challenge</option>
            <option>Steps Challenge</option>
            <option>Verified Challenge</option>
            <option>Informational Tile</option>
          </select>
        </div>

        <div className="form-row mt-5">

          <div className="col">
            <div className="form-group">
              <label htmlFor="startDate">Start Date</label>
              <img className="tooltip-icon" src="images/tooltip.svg" data-html="true" data-toggle="tooltip" data-placement="auto" data-original-title="The day the tile will go live on the platform." />
              <input type="date" className="form-control" id="startDate" value={startDate} onChange={handleStartDateChange} />
            </div>
          </div>

          <div className="col">
            <div className="form-group">
              <label htmlFor="endDate">End Date</label>
              <img className="tooltip-icon" src="images/tooltip.svg" data-html="true" data-toggle="tooltip" data-placement="auto" data-original-title="<strong>Info Tiles and Verified Challenges:</strong><p>The last day a tile is visible on the platform.</p><strong>Self-Report and Steps Challenges: </strong><p>The last day a participant can join the challenge. This will be followed by a 3-day grace period in which a participant can still track completion of the challenge, to earn points. </p><p>Challenge end date should NOT be set after your program end date.</p>" />
              <input type="date" className="form-control" id="endDate" value={endDate} onChange={handleEndDateChange} />
            </div>
          </div>

        </div>

        <div className="form-row mt-5" style={{ opacity: tileType === 'Informational Tile' ? '0' : '1' }}>
          <div className="col-6">
            <div className="form-group">
              <label htmlFor="pointValue">Point Value</label>
              <img className="tooltip-icon" src="images/tooltip.svg" data-html="true" data-toggle="tooltip" data-placement="auto" data-original-title="Number of points awarded upon completion." />
              <input type="number" className="form-control" id="pointValue" value={pointValue} onChange={handlePointValueChange} />
            </div>
          </div>
        </div>

      </div>
    </section>
  );

}

export default NetNew;
