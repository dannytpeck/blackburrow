import React, { useEffect } from 'react';

/* globals $ */
function ChallengeContent() {

  // Make airtable calls when app starts
  useEffect(() => {

    // Enable all tooltips on the page
    $(function() {
      $('[data-toggle="tooltip"]').tooltip();
    });

  }, []); // Pass empty array to only run once on mount

  return (
    <section id="netNew" className="row">
      <div className="col-6">

        <h3 className="mb-5">Challenge Content</h3>

        <div class="form-group">
          <label for="challengeTitle">Challenge Title</label>
          <input type="text" className="form-control" id="challengeTitle" placeholder="Lorem Ipsum Dolor sit Amet" />
          <small id="challengeTitleHelp" className="form-text text-muted">0/100 Characters</small>
        </div>

      </div>
    </section>
  );

}

export default ChallengeContent;
