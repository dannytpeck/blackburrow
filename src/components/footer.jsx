import React from 'react';

function Footer({ step, previousStep, nextStep, openDeleteConfirmModal, submitToAirtable, submitEditsToAirtable }) {
  const calendarHash = window.location.hash.slice(2);

  let backOrDeleteButton = '';
  if (step ==='Home') {
    backOrDeleteButton = <a href={`https://calendarbuilder.dev.adurolife.com/calendar-builder/#/${calendarHash}`}>Back to Calendar</a>;
  } else if (step === 'EditorView') {
    backOrDeleteButton = <button type="button" className="btn btn-outline-danger ml-5" onClick={openDeleteConfirmModal}>Delete Challenge</button>;
  } else {
    backOrDeleteButton = <button type="button" className="btn btn-outline-primary" onClick={previousStep}>Back</button>;
  }

  let submitButton = '';
  switch (step) {
    case 'ConfirmChallengeDetails':
      submitButton = <button type="button" className="btn btn-primary ml-5" onClick={submitToAirtable}>Submit</button>;
      break;
    case 'EditorView':
      submitButton = <button type="button" className="btn btn-primary ml-5" onClick={submitEditsToAirtable}>Save</button>;
      break;
  }

  return (
    <footer id="footer">
      {
        backOrDeleteButton
      }
      {
        step === 'ConfirmChallengeDetails' || step === 'EditorView' ?
          submitButton :
          <button type="button" className="btn btn-primary ml-5" onClick={nextStep}>Next</button>
      }
      {
        // // editor view upload button
        // step === 'EditorView' ? <button type="button" className="btn btn-primary ml-5" onClick={uploadChallenge}>Upload</button> : ''
      }
    </footer>
  );
}

export default Footer;
