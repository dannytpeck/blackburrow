import React, { useEffect } from 'react';

/* global $ */
function TrumbowygBox({ placeholder }) {

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
      });
    });

  }, []); // Pass empty array to only run once on mount

	return (
		<div className="editor" placeholder={placeholder}></div>
	);

}

export default TrumbowygBox;
