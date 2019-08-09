import React from 'react';

function Footer({ step, previousStep, nextStep, submitToAirtable }) {
  const calendarHash = window.location.hash.slice(2);

  return (
    <footer id="footer">
      {
        step === 'Home' ?
        <a href={`https://calendarbuilder.dev.adurolife.com/calendar-builder/#/${calendarHash}`}>Back to Calendar</a> :
        <button type="button" className="btn btn-outline-primary" onClick={previousStep}>Back</button>
      }
      {
        step === 'ConfirmChallengeDetails' ?
        <button type="button" className="btn btn-primary ml-5" onClick={submitToAirtable}>Submit</button> :
        <button type="button" className="btn btn-primary ml-5" onClick={nextStep}>Next</button>
      }
    </footer>
  );
}

export default Footer;
