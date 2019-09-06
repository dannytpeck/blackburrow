import React from 'react';
import Airtable from 'airtable';
const base = new Airtable({ apiKey: 'keyCxnlep0bgotSrX' }).base('appN1J6yscNwlzbzq');

const calendarHash = window.location.hash.slice(2, 16);
let clientName = '';

function Header() {

  base('Calendars').select({
    filterByFormula: `{hash}='${calendarHash}'`
  }).eachPage((records) => {
    clientName = records[0].fields['client'];
  });

  return (
    <header id="header">
      <div className="row">
        <div className="col-6 offset-3">
            <img className="logo" src="images/ADURO-Logo-Horizontal.png" />
            <h1 className="my-1">Custom Tile Request Tool</h1>
        </div>
        <div className="col-3">
            <p className="client-name">Client Name: {clientName}</p>
        </div>
      </div>
    </header>
  );
}

export default Header;
