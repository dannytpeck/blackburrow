import React, { useEffect } from 'react';

/* globals $ */
function Home({ setNewOrHistorical }) {

  // Make airtable calls when app starts
  useEffect(() => {

    // Enable all tooltips on the page
    $(function() {
      $('[data-toggle="tooltip"]').tooltip();
    });

  }, []); // Pass empty array to only run once on mount

  function handleChange(e) {
    setNewOrHistorical(e.target.value);
  }

  return (
    <section className="border" id="home">
      <h3 className="mb-5">Welcome</h3>

      <p>Please complete this form to submit a custom platform tile request.</p>
      <p>The standard tile creation process Service Level Agreement is two (2) weeks or ten (10) business days.</p>

      <div className="form-group mt-5">
        <label htmlFor="primaryAccountManager">Primary Account Manager</label>
        <select className="form-control" id="primaryAccountManager">
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

      <label>Lorem Enim laudantium laboris but eaque?</label>
      <img className="tooltip-icon" src="images/tooltip.svg" data-toggle="tooltip" data-original-title="Default tooltip" />
      <div className="form-check">
        <input className="form-check-input" type="radio" name="netNewOrHistoricalRadios" id="netNew" value="NetNew" onChange={handleChange} defaultChecked />
        <label className="form-check-label" htmlFor="netNew">Net New</label>
      </div>
      <div className="form-check">
        <input className="form-check-input" type="radio" name="netNewOrHistoricalRadios" id="historical" value="Historical" onChange={handleChange} />
        <label className="form-check-label" htmlFor="historical">Historical</label>
      </div>

    </section>
  );

}

export default Home;
