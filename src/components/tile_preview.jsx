import React from 'react';

/* global $ */
function TilePreview({
  tileType,
  imageUrl,
  challengeTitle,
  activityText,
  activityGoalNumber,
  shortDescription,
  longDescription
}) {

  let previewActivityText = activityText;
  if (tileType === 'Steps Challenge') {
    previewActivityText = `${activityText} ${activityGoalNumber} steps`;
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
        <p>To complete this, <strong>{previewActivityText}</strong>.</p>
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
