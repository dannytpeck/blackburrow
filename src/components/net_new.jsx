import React, { useEffect } from 'react';

/* globals $ */
function NetNew() {

  // Make airtable calls when app starts
  useEffect(() => {

    // Enable all tooltips on the page
    $(function() {
      $('[data-toggle="tooltip"]').tooltip();
    });

  }, []); // Pass empty array to only run once on mount

  return (
    <section id="netNew" className="row">
      <div className="col-6">

        <h3 className="mb-5">Challenge Content</h3>

        <h5 className="mb-4">Type of Request</h5>

        <div className="form-group">
          <label htmlFor="tileType">Tile Type</label>
          <img className="tooltip-icon" src="images/tooltip.svg" data-toggle="tooltip" data-original-title="Default tooltip" />
          <select className="form-control" id="tileType">
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

      </div>
    </section>
  );

}

export default NetNew;
