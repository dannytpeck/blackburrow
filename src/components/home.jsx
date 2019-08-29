import React, { useEffect } from 'react';

/* globals $ */
function Home({ accountManager, setAccountManager, newOrHistorical, setNewOrHistorical }) {
  // TODO: Add state to hold account manager list from airtable

  // Make airtable calls when app starts
  useEffect(() => {

    // TODO: Add airtable call that pulls in a list of account managers

    // Enable all tooltips on the page
    $(function() {
      $('[data-toggle="tooltip"]').tooltip();
    });

  }, []); // Pass empty array to only run once on mount

  function handleAccountManagerChange(e) {
    setAccountManager(e.target.value);
  }

  function handleNewOrHistoricalChange(e) {
    setNewOrHistorical(e.target.value);
  }

  return (
    <section className="border" id="home">
      <h3 className="mb-5">Welcome</h3>

      <p>Please complete this form to submit a custom platform tile request.</p>
      <p>The standard tile creation process can take up to 30 days.</p>

      <div className="form-group mt-5">
        <label htmlFor="primaryAccountManager">Primary Account Manager</label>
        <select className="form-control" id="primaryAccountManager" value={accountManager} onChange={handleAccountManagerChange}>
          <option>Select an Account Manager</option>
          <option>Aaron D.</option>
          <option>Alison D.</option>
          <option>Ardith F.</option>
          <option>Cara C.</option>
          <option>Erin H.</option>
          <option>Jack U.</option>
          <option>James W.</option>
          <option>Jeremy K.</option>
          <option>Jill R.</option>
          <option>Katie D.</option>
        </select>
      </div>

      <label>Will this be a brand new tile or would you like to search your tile history for previously used content?</label>
        <img className="tooltip-icon" src="images/tooltip.svg" data-toggle="tooltip" data-html="true" data-placement="auto" title="<strong>Net New: </strong><p>Create a brand new tile for your platform.</p><strong>Historical: </strong><p>Search your platform history and rerun or revise your tiles from previous program years.</p>"/>
      <div className="form-check">
        <input className="form-check-input" type="radio" name="netNewOrHistoricalRadios" id="netNew" value="NetNew" onChange={handleNewOrHistoricalChange} checked={newOrHistorical === 'NetNew'} />
        <label className="form-check-label" htmlFor="netNew">Net New</label>
      </div>
      <div className="form-check">
        <input className="form-check-input" type="radio" name="netNewOrHistoricalRadios" id="historical" value="Historical" onChange={handleNewOrHistoricalChange} checked={newOrHistorical === 'Historical'} />
        <label className="form-check-label" htmlFor="historical">Historical</label>
      </div>

    </section>
  );

}

export default Home;
