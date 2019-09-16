import React, { useEffect } from 'react';
import moment from 'moment';
import Airtable from 'airtable';
const base = new Airtable({ apiKey: 'keyCxnlep0bgotSrX' }).base('appN1J6yscNwlzbzq');

import TrumbowygBox from './trumbowyg_box';
import TilePreview from './tile_preview';

/* globals $ */
function EditorView({
  tileType,
  setTileType,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  pointValue,
  setPointValue,
  featuredActivity,
  setFeaturedActivity,
  targeting,
  setTargeting,
  specificDemographicText,
  setSpecificDemographicText,
  imageUrl,
  setImageUrl,
  challengeTitle,
  setChallengeTitle,
  activityText,
  setActivityText,
  activityGoalNumber,
  setActivityGoalNumber,
  shortDescription,
  setShortDescription,
  longDescription,
  setLongDescription
}) {

  // Make airtable calls when app starts
  useEffect(() => {
    const recordId = window.location.hash.slice(22);

    base('Calendars').find(recordId, function(err, record) {
      if (err) {
        console.error(err);
        return;
      }

      console.log('Retrieved', record);
      setTileType(record.fields['Reward Occurrence'] + ' ' + record.fields['Verified']);
      setStartDate(record.fields['Start date']);
      setEndDate(record.fields['End date']);
      setPointValue(record.fields['Points']);
      record.fields['Limeade Image Url'] ? setImageUrl(record.fields['Limeade Image Url']) : setImageUrl(record.fields['Header Image']);
      setChallengeTitle(record.fields['Title'] ? record.fields['Title'] : '');
      setActivityText(record.fields['Activity Goal Text'] ? record.fields['Activity Goal Text'] : '');
      setFeaturedActivity(record.fields['Featured Activity'] === 'yes' ? record.fields['Featured Activity'] : '');
      setTargeting(record.fields['Targeted Activity'] === 'yes' ? 'Specific Demographic' : 'Entire Population');
      setSpecificDemographicText(record.fields['Targeting Notes'] ? record.fields['Targeting Notes'] : '');
      setShortDescription(record.fields['Instructions'] ? record.fields['Instructions'] : '');
      setLongDescription(record.fields['More Information Html'] ? record.fields['More Information Html'] : '');

    });

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
          <span>Targeting Notes: </span><span>{specificDemographicText}</span>
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
          <label htmlFor="challengeTitle">Title</label>
          <input type="text" className="form-control" id="challengeTitle" value={challengeTitle} onChange={handleChallengeTitleChange} />
          <small className="form-text text-muted">{challengeTitle.length}/100 Characters</small>
        </div>

        <div className="form-group">
          <label htmlFor="activityText">Activity Text</label>
          <input type="text" className="form-control" id="activityText" value={activityText} onChange={handleActivityTextChange} />
          <small className="form-text text-muted">{activityText.length}/50 Characters</small>
        </div>

        <div className="form-group">
          <label htmlFor="shortDescription">Short Description</label>
          <p>A concise statement describing what the participant must do to earn points. Recommendation is no more than one or two sentences.</p>
          <textarea className="form-control" id="shortDescription" rows="5" value={shortDescription} onChange={handleShortDescriptionChange}></textarea>
          <small className="form-text text-muted">{shortDescription.length}/600 Characters</small>
        </div>

        <div className="form-group">
          <label htmlFor="longDescription">Long Description</label>
          <p>List all important details and information a participant will need.</p>
          <TrumbowygBox longDescription={longDescription} setLongDescription={setLongDescription} />
          <small className="form-text text-muted">{longDescription.length}/2000 Characters</small>
        </div>

        {/* Hiding Additional Resources for now
        <label>Attachments:</label>
        <ul>
          <li>corn-challenge-document 07-30-2019.pdf</li>
          <li>Lower Your Carbon Footprint.pdf</li>
        </ul>
        */}

      </div>
      <div className="col-6">
        <TilePreview tileType={tileType} imageUrl={imageUrl} challengeTitle={challengeTitle} activityText={activityText} activityGoalNumber={activityGoalNumber} shortDescription={shortDescription} longDescription={longDescription} />
      </div>
    </section>
  );

}

export default EditorView;
