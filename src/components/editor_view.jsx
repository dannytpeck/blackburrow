import React, { useEffect } from 'react';
import moment from 'moment';

import TrumbowygBox from './trumbowyg_box';
import TilePreview from './tile_preview';

/* globals $ */
function EditorView({
  tileType,
  setTileType,
  startDate,
  setStateDate,
  endDate,
  setEndDate,
  pointValue,
  setPointValue,
  featuredActivity,
  targeting,
  specificDemographicText,
  imageUrl,
  setImageUrl,
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

  function handleImageChange(e) {

    console.log(e.target.files);
    const imageFile = e.target.files[0];

    const formData = new FormData();
    formData.append('image', imageFile);

    fetch('https://api.imgur.com/3/image', {
      method: 'POST',
      headers: {
        Authorization: 'Client-ID a27c82776f2c9f3',
      },
      body: formData
    }).then(response => {
      return response.json();
    }).then(json => {
      console.log(json);
      setImageUrl(json.data.link);
    });

  }

  return (
    <section id="editorView" className="row">
      <div className="col-6">

        <h3 className="mb-5">Editor View</h3>

        <h3 className="mb-3">Challenge Details</h3>

        <label>Tile Type:</label>
        <p>{tileType}</p>

        <div className="row">
          <div className="col">
            <label>Start Date:</label>
            <p>{moment(startDate).format('L')}</p>
          </div>

          <div className="col">
            <label>End Date:</label>
            <p>{moment(endDate).format('L')}</p>
          </div>
        </div>

        <label>Points:</label>
        <p>{pointValue}</p>

        <label>Featured Activity:</label>
        <p>{featuredActivity ? 'Yes' : 'No'}</p>

        <label>Targeting:</label>
        <p>{targeting}</p>

        <p>
          <span>Targeting Notes:</span><span>{specificDemographicText}</span>
        </p>

        <div className="form-check">
          <input className="form-check-input" type="radio" name="subgroupsOrTagsRadios" id="subgroups" defaultChecked />
          <label className="form-check-label" htmlFor="subgroups">Subgroups</label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="radio" name="subgroupsOrTagsRadios" id="tags" />
          <label className="form-check-label" htmlFor="tags">Tags</label>
        </div>

        <div className="form-group mt-3 mb-5">
          <label htmlFor="subgroupIdNumber">Subgroup</label>
          <input type="number" className="form-control" id="subgroupIdNumber" min="1" max="8" defaultValue="1" />
        </div>

        <h3 className="mb-3">Challenge Content</h3>

        <div className="form-group">
          <label>Replace or Change Image</label>
          <div className="choose-image">
            <div className="form-group">
              <input type="file" className="form-control-file" id="uploadImage" onChange={handleImageChange} />
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="challengeTitle">Challenge Title</label>
          <input type="text" className="form-control" id="challengeTitle" placeholder="Lorem Ipsum Dolor sit Amet" value={challengeTitle} onChange={handleChallengeTitleChange} />
          <small className="form-text text-muted">{challengeTitle.length}/100 Characters</small>
        </div>

        <div className="form-group">
          <label htmlFor="activityText">Activity Text</label>
          <input type="text" className="form-control" id="activityText" placeholder="do the activity in the description" value={activityText} onChange={handleActivityTextChange} />
          <small className="form-text text-muted">{activityText.length}/50 Characters</small>
        </div>

        <div className="form-group">
          <label htmlFor="shortDescription">Short Description</label>
          <p>A concise statement describing what the participant must do to earn points. Recommendation is no more than one or two sentences.</p>
          <textarea className="form-control" id="shortDescription" rows="5" placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit..." value={shortDescription} onChange={handleShortDescriptionChange}></textarea>
          <small className="form-text text-muted">{shortDescription.length}/600 Characters</small>
        </div>

        <div className="form-group">
          <label htmlFor="longDescription">Long Description</label>
          <p>Expand on the details and guidelines of the challenge, why this challenge is important, and what pertinent information a participant will need in order to complete the challenge.</p>

          <TrumbowygBox longDescription={longDescription} setLongDescription={setLongDescription} />

          <small className="form-text text-muted">{longDescription.length}/2000 Characters</small>
        </div>

        <label>Attachments:</label>
        <ul>
          <li>corn-challenge-document 07-30-2019.pdf</li>
          <li>Lower Your Carbon Footprint.pdf</li>
        </ul>

      </div>
      <div className="col-6">
        <TilePreview imageUrl={imageUrl} challengeTitle={challengeTitle} activityText={activityText} shortDescription={shortDescription} longDescription={longDescription} />
      </div>
    </section>
  );

}

export default EditorView;
