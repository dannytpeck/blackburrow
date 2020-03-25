import React, { useEffect } from 'react';

import TrumbowygBox from './trumbowyg_box';
import TilePreview from './tile_preview';

/* globals $ */
function ChallengeContent({
  tileType,
  weekly,
  imageUrl,
  challengeTitle,
  setChallengeTitle,
  activityText,
  activityGoalNumber,
  individualOrTeam,
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
    let { value } = e.target;

    if (value.length <= 50) {
      setActivityText(value);
    }
  }

  function handleShortDescriptionChange(e) {
    setShortDescription(e.target.value);
  }

  // TODO: Improve this at some point, since there's no way to change the tileType at this point, so this could be handled upstream
  if (tileType === 'Steps Challenge') {
    setActivityText('exercise');
  } else if (tileType === 'Verified Challenge') {
    setActivityText('do the activity in the description');
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

        {/* hide the call to action/activity text if the tile is a Verified Challenge or Informational Tile */}
        <div className="form-group" style={{ display: tileType === 'Verified Challenge' || tileType === 'Informational Tile' ? 'none' : 'block' }}>
          <label htmlFor="activityText">Call to Action</label>
          <input type="text" className="form-control" id="activityText" placeholder="To complete this..." value={activityText} onChange={handleActivityTextChange} readOnly={tileType === 'Steps Challenge' || tileType === 'Verified Challenge' ? true : false} />
          <small className={'form-text ' + (activityText.length === 50 ? 'text-danger' : 'text-muted') }>{activityText.length}/50 Characters</small>
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
        <TilePreview tileType={tileType} weekly={weekly} imageUrl={imageUrl} challengeTitle={challengeTitle} activityText={activityText} activityGoalNumber={activityGoalNumber} individualOrTeam={individualOrTeam} shortDescription={shortDescription} longDescription={longDescription} />
      </div>
    </section>
  );

}

export default ChallengeContent;
