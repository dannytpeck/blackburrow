import React, { useEffect } from 'react';

import TrumbowygBox from './trumbowyg_box';
import TilePreview from './tile_preview';

/* globals $ */
function ChallengeContent({
  imageUrl,
  challengeTitle,
  setChallengeTitle,
  activityText,
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

  function handleShortDescriptionChange(e) {
    setShortDescription(e.target.value);
  }

  return (
    <section id="challengeContent" className="row">
      <div className="col-6">

        <h3 className="mb-5">Challenge Content</h3>

        <div className="form-group">
          <label htmlFor="challengeTitle">Challenge Title</label>
          <input type="text" className="form-control" id="challengeTitle" placeholder="Lorem Ipsum Dolor sit Amet" value={challengeTitle} onChange={handleChallengeTitleChange} />
          <small className="form-text text-muted">0/100 Characters</small>
        </div>

        <div className="form-group">
          <label htmlFor="activityText">Activity Text</label>
          <input type="text" className="form-control" id="activityText" placeholder="do the activity in the description" value={activityText} onChange={handleActivityTextChange} />
          <small className="form-text text-muted">0/50 Characters</small>
        </div>

        <div className="form-group">
          <label htmlFor="shortDescription">Short Description</label>
          <p>A concise statement describing what the participant must do to earn points. Recommendation is no more than one or two sentences.</p>
          <textarea className="form-control" id="shortDescription" rows="5" placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit..." value={shortDescription} onChange={handleShortDescriptionChange}></textarea>
          <small className="form-text text-muted">0/600 Characters</small>
        </div>

        <div className="form-group">
          <label htmlFor="longDescription">Long Description</label>
          <p>Expand on the details and guidelines of the challenge, why this challenge is important, and what pertinent information a participant will need in order to complete the challenge.</p>

          <TrumbowygBox longDescription={longDescription} setLongDescription={setLongDescription} />

          <small className="form-text text-muted">0/2000 Characters</small>
        </div>

      </div>
      <div className="col-6">
        <TilePreview imageUrl={imageUrl} challengeTitle={challengeTitle} activityText={activityText} shortDescription={shortDescription} longDescription={longDescription} />
      </div>
    </section>
  );

}

export default ChallengeContent;
