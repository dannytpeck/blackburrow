import React, { useEffect } from 'react';

import TrumbowygBox from './trumbowyg_box';

/* globals $ */
function ChallengeContent({ challengeTitle, activityText, shortDescription, longDescription }) {

  // Make airtable calls when app starts
  useEffect(() => {

    // Enable all tooltips on the page
    $(function() {
      $('[data-toggle="tooltip"]').tooltip();
    });

  }, []); // Pass empty array to only run once on mount

  return (
    <section id="challengeContent" className="row">
      <div className="col-6">

        <h3 className="mb-5">Challenge Content</h3>

        <div className="form-group">
          <label htmlFor="challengeTitle">Challenge Title</label>
          <input type="text" className="form-control" id="challengeTitle" placeholder="Lorem Ipsum Dolor sit Amet" />
          <small className="form-text text-muted">0/100 Characters</small>
        </div>

        <div className="form-group">
          <label htmlFor="activityText">Activity Text</label>
          <input type="text" className="form-control" id="activityText" placeholder="do the activity in the description" />
          <small className="form-text text-muted">0/100 Characters</small>
        </div>

        <div className="form-group">
          <label htmlFor="shortDescription">Short Description</label>
          <p>A concise statement describing what the participant must do to earn points. Recommendation is no more than one or two sentences.</p>
          <textarea className="form-control" id="shortDescription" rows="5" placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum gravida at dui at auctor. Mauris pulvinar posuere exe, at fermentum dui volutpat ut. Carabitur nec iaculis lectus."></textarea>
          <small className="form-text text-muted">0/600 Characters</small>
        </div>

        <div className="form-group">
          <label htmlFor="longDescription">Long Description</label>
          <p>Expand on the details and guidelines of the challenge, why this challenge is important, and what pertinent information a participant will need in order to complete the challenge.</p>

          <TrumbowygBox placeholder="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Morbi sagittis odio in semper accumsan. Sed blandit dolor sapien, at porta ipsum aliquet non." />

          <small className="form-text text-muted">0/2000 Characters</small>
        </div>

      </div>
      <div className="col-6">

        <div className="border" id="tilePreview">
          <header className="preview-header">
            <h3>Challenge Preview</h3>
          </header>
          <div className="image-wrapper">
            <img src="http://via.placeholder.com/540x270" />
          </div>
          <div className="content-wrapper">
            <h3>{challengeTitle}</h3>
            <p>To complete this, <strong>{activityText}</strong></p>
            <hr />
            <h5>About this activity</h5>
            <p>{shortDescription}</p>
            <h5>More information</h5>
            <p>{longDescription}</p>
          </div>
        </div>

      </div>
    </section>
  );

}

export default ChallengeContent;
