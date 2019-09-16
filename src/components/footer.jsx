import React from 'react';

function Footer({ step, previousStep, nextStep, submitToAirtable, submitEditsToAirtable }) {
  const calendarHash = window.location.hash.slice(2);

  let submitButton = '';
  switch (step) {
    case 'ConfirmChallengeDetails':
      submitButton = <button type="button" className="btn btn-primary ml-5" onClick={submitToAirtable}>Submit</button>;
      break;
    case 'EditorView':
      submitButton = <button type="button" className="btn btn-primary ml-5" onClick={submitEditsToAirtable}>Submit</button>;
      break;
  }

  return (
    <footer id="footer">
      {
        step === 'Home' ?
        <a href={`https://calendarbuilder.dev.adurolife.com/calendar-builder/#/${calendarHash}`}>Back to Calendar</a> :
        <button type="button" className="btn btn-outline-primary" onClick={previousStep}>Back</button>
      }
      {
        step === 'ConfirmChallengeDetails' || step === 'EditorView' ?
        submitButton :
        <button type="button" className="btn btn-primary ml-5" onClick={nextStep}>Next</button>
      }
    </footer>
  );
}

export default Footer;
