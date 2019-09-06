import React, { useEffect } from 'react';

import TrumbowygBox from './trumbowyg_box';
import TilePreview from './tile_preview';

/* globals $ */
function ChallengeContent({
  tileType,
  imageUrl,
  challengeTitle,
  setChallengeTitle,
  activityText,
  activityGoalNumber,
  setActivityText,
  shortDescription,
  setShortDescription,
  longDescription,
  setLongDescription
}) {

  // Make airtable calls when app starts
  useEffect(() => {

    // Enable all tooltips on the page
    $(function() {
      $('[data-toggle="tooltip"]').tooltip();
    });

  }, []); // Pass empty array to only run once on mount

  function handleChallengeTitleChange(e) {
    setChallengeTitle(e.target.value);
  }

  function handleActivityTextChange(e) {
    setActivityText(e.target.value);
  }
  if (tileType === 'Steps Challenge') {
    setActivityText('exercise');
  }

  function handleShortDescriptionChange(e) {
    setShortDescription(e.target.value);
  }

  return (
    <section id="challengeContent" className="row">
      <div className="col-6">

         <h3 className="mb-5">Tile Content</h3>

        <div className="form-group">
          <label htmlFor="challengeTitle">Title</label>
          <input type="text" className="form-control" id="challengeTitle" placeholder="" value={challengeTitle} onChange={handleChallengeTitleChange} />
          <small className="form-text text-muted">{challengeTitle.length}/100 Characters</small>
        </div>

        <div className="form-group">
          <label htmlFor="activityText">Call to Action</label>

          <input type="text" className="form-control" id="activityText" placeholder="To complete this activity..." value={activityText} onChange={handleActivityTextChange} readOnly={tileType === 'Steps Challenge' ? true : false} />
          <small className="form-text text-muted">{activityText.length}/50 Characters</small>
          <ul className="text-caption-list">
            <li><small>Example 1: To complete this activity... go to the dentist.</small></li>
            <li><small>Example 2: To complete this activity... participate in the holiday food drive..</small></li>
          </ul>
        </div>

        <div className="form-group">
          <label htmlFor="shortDescription">Short Description</label>
          <p>A concise statement describing what the participant must do to earn points. Recommendation is no more than one or two sentences.</p>
          <textarea className="form-control" id="shortDescription" rows="5" placeholder="" value={shortDescription} onChange={handleShortDescriptionChange}></textarea>
          <small className="form-text text-muted">{shortDescription.length}/600 Characters</small>
        </div>

        <div className="form-group">
          <label htmlFor="longDescription">Long Description</label>
          <p>List all important details and information a participant will need.</p>
          <TrumbowygBox longDescription={longDescription} setLongDescription={setLongDescription} />
          <small className="form-text text-muted">{longDescription.length}/2000 Characters</small>
        </div>
      </div>
      <div className="col-6">
        <TilePreview tileType={tileType} imageUrl={imageUrl} challengeTitle={challengeTitle} activityText={activityText} activityGoalNumber={activityGoalNumber} shortDescription={shortDescription} longDescription={longDescription} />
      </div>
    </section>
  );

}

export default ChallengeContent;
