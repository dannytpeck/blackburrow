import React from 'react';

function Footer({ step, previousStep, nextStep, openDeleteConfirmModal, submitToAirtable, submitEditsToAirtable, uploadChallenge }) {
  const calendarHash = window.location.hash.slice(2);

  let backOrDeleteButton = '';
  if (step ==='Home') {
    backOrDeleteButton = <a href={`https://calendarbuilder.dev.adurolife.com/calendar-builder/#/${calendarHash}`}>Back to Calendar</a>;
  } else if (step === 'EditorView') {
    backOrDeleteButton = <button type="button" className="btn btn-outline-danger ml-5" onClick={openDeleteConfirmModal}>Delete</button>;
  } else {
    backOrDeleteButton = <button type="button" className="btn btn-outline-primary" onClick={previousStep}>Back</button>;
  }

  let submitButton = '';
  switch (step) {
    case 'ConfirmChallengeDetails':
      submitButton = <button type="button" id="submitButton" className="btn btn-primary ml-5" onClick={submitToAirtable}>Submit</button>;
      break;
    case 'EditorView':
      submitButton = <button type="button" className="btn btn-primary ml-5" onClick={submitEditsToAirtable}>Save</button>;
      break;
  }

  // add event listener for keystrokes to show upload button when on EditorView
  function keyMapper(keystrokeDelay) {
    let keySequence = [];
    let lastKeyTime = Date.now(); // I'm not bothering to import moment because it works without and eh

    document.addEventListener('keydown', event => {
      const key = event.key.toLowerCase();

      // clear the key sequence if too much time has passed between keystrokes
      const currentTime = Date.now();
      if (currentTime - lastKeyTime > keystrokeDelay) {
          keySequence = [];
      }

      keySequence.push(key);
      lastKeyTime = currentTime;

      // set proper key sequence
      const cheatCode = 'arrowup arrowup arrowdown arrowdown arrowleft arrowright';

      // make  upload to limemade button visible if correct sequence is entered
      if (keySequence.join(' ') === cheatCode) {
        document.querySelector('#uploadToLimeadeButton').style.visibility = 'visible';
        console.log('Config Mode enabled!');
      }

    });
  }

  // start keyMapper if in EditorView
  if (step === 'EditorView') {
    keyMapper(1000);
  }

  return (
    <footer id="footer">
      {
        backOrDeleteButton
      }
      {
        step === 'ConfirmChallengeDetails' || step === 'EditorView' ? submitButton : <button type="button" className="btn btn-primary ml-5" onClick={nextStep}>Next</button>
      }
      {
        // editor view upload button
        step === 'EditorView' ? <button type="button" id="uploadToLimeadeButton" className="btn btn-outline-primary ml-5" onClick={uploadChallenge} style={{ visibility: 'hidden' }}>Upload to Limeade</button> : ''
      }
    </footer>
  );
}

export default Footer;
