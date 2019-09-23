import React from 'react';

/* global $ */
function TilePreview({
  tileType,
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
    previewActivityText = `${individualOrTeam === 'Team' ? 'collectively ' : ''}${activityText} at least ${activityGoalNumber} steps`;
  } else if (tileType === 'Weekly Days') {
    previewActivityText = `${activityText} on at least ${activityGoalNumber} separate days each week`;
  } else if (tileType === 'Weekly Units') {
    previewActivityText = `${activityText} ${activityGoalNumber} times each week`;
  }

	return (
    <div className="border" id="tilePreview">
      <header className="preview-header">
        <h3>Preview</h3>
      </header>
      <div className="image-wrapper">
        <img src={imageUrl} />
      </div>
      <div className="content-wrapper">
        <h3>{challengeTitle}</h3>
        <p>To complete this {individualOrTeam === 'Team' ? 'team ' : ''} challenge, <strong>{previewActivityText}</strong>.</p>
        <hr />
        <h5>About this activity</h5>
        <p>{shortDescription}</p>
        <h5>More information</h5>
        <p dangerouslySetInnerHTML={{ __html: longDescription }}></p>
      </div>
    </div>
  );

}

export default TilePreview;
