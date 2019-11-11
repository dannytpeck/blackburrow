import React from 'react';

/* global $ */
function TilePreview({
  tileType,
  weekly,
  imageUrl,
  challengeTitle,
  activityText,
  activityGoalNumber,
  individualOrTeam,
  shortDescription,
  longDescription
}) {

  let previewActivityText = activityText;
  if (tileType === 'Steps Challenge') {
    if (weekly === true) {
      previewActivityText = `${activityText} at least ${activityGoalNumber} steps each week`;
    } else if (weekly === false) {
      previewActivityText = `${individualOrTeam === 'Team' ? 'collectively ' : ''}${activityText} at least ${activityGoalNumber} steps`;
    }
  } else if (tileType === 'Weekly Days') {
    previewActivityText = `${activityText} on at least ${activityGoalNumber} separate days each week`;
  } else if (tileType === 'Weekly Units') {
    previewActivityText = `complete ${activityGoalNumber} ${activityText} each week`;
  }

	return (
    <div className="border" id="tilePreview">
      <header className="preview-header">
        <h3>Preview</h3>
      </header>
      <div className="image-wrapper img-preview-aspect-ratio-container">
        <img src={imageUrl} className="img-preview-aspect-ratio" />
      </div>
      <div className="content-wrapper">
        <h3>{challengeTitle}</h3>
        <p style={{ display: tileType === 'Verified Challenge' || tileType === 'Informational Tile' ? 'none' : 'block' }}>To complete this{individualOrTeam === 'Team' ? ' team challenge' : ''}, <strong>{previewActivityText}</strong>.</p>
        <hr />
        <h5 style={{ display: tileType === 'Verified Challenge' || tileType === 'Informational Tile' ? 'none' : 'block' }}>About this activity</h5>
        <p>{shortDescription}</p>
        <h5 style={{ display: tileType === 'Verified Challenge' || tileType === 'Informational Tile' ? 'none' : 'block' }}>More information</h5>
        <p dangerouslySetInnerHTML={{ __html: longDescription }}></p>
      </div>
    </div>
  );

}

export default TilePreview;
