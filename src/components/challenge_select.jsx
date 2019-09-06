import React from 'react';
import moment from 'moment';

function ChallengeSelect({ challenges, setChallenge }) {
  const [open, setOpen] = React.useState(false);
  const [searchText, setSearchText] = React.useState('');

  function handleChange(e) {
    if (e.target.value) {
      setOpen(true);
      setSearchText(e.target.value);
    } else {
      setOpen(false);
      setSearchText('');
    }
  }

  function selectChallenge(challenge) {
    setOpen(false);
    setSearchText(challenge.Name);
    setChallenge(challenge);
  }

  function renderChallenge(challenge) {
    return (
      <span className="dropdown-item" key={challenge.ChallengeId} onClick={() => selectChallenge(challenge)}>
        {challenge.Name} <span className="text-black-50">({moment(challenge.StartDate).format('L')} - {moment(challenge.EndDate).format('L')})</span>
      </span>
    );
  }

  const filteredChallenges = challenges.filter(challenge => {
    const name = challenge.Name.toLowerCase();
    return name.includes(searchText.toLowerCase());
  });

  return (
    <div className="challenge-select form-group">
      <label htmlFor="searchPreviousChallenge">Search Previous Challenge</label>
      <img className="tooltip-icon" src="images/tooltip.svg" data-html="true" data-toggle="tooltip" data-original-title="<p>Search your tile history by beginning to type of the name of previous run tile. You will see the tile name and it's orginal start and end dates.</p><p>Note: you may have run a tile in more than one program year. We recommend selecting the most recently run version of the tile.</p>" />
      <img id="spinner" src="images/spinner.svg" />
      <div className="dropdown">
        <div className="challenge-search input-group">
          <input id="searchPreviousChallenge" value={searchText} onChange={handleChange} type="text" className="form-control" placeholder="Begin typing a tiel name here..." />
          <span className="oi oi-magnifying-glass"></span>
        </div>

        <div className={'challenge-list dropdown-menu ' + (open ? 'show' : '')}>
          {filteredChallenges.length ? filteredChallenges.map(challenge => renderChallenge(challenge)) : ''}
        </div>
      </div>
    </div>
  );
}

export default ChallengeSelect;
