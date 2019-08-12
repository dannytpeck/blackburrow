import React, { useEffect } from 'react';

/* global $ */
function TrumbowygBox({ longDescription, setLongDescription }) {

  // Make airtable calls when app starts
  useEffect(() => {

    // Enable trumbowyg
    $(function() {
      $('.editor').trumbowyg({
        btns: [
          ['viewHTML'],
          ['undo', 'redo'], // Only supported in Blink browsers
          ['formatting'],
          ['strong', 'em', 'del'],
          ['superscript', 'subscript'],
          ['link'],
          ['foreColor', 'backColor'],
          ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
          ['unorderedList', 'orderedList'],
          ['horizontalRule'],
          ['removeformat']
        ]
      })
      .on('tbwchange', (e) => {
        setLongDescription(e.target.innerHTML);
      });
    });

    $('.editor').html(longDescription);

  }, []); // Pass empty array to only run once on mount

	return (
		<div className="editor" placeholder="Lorem ipsum dolor sit amet, consectetuer adipiscing elit..."></div>
	);

}

export default TrumbowygBox;
