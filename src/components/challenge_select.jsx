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
      <img id="spinner" src="images/spinner.svg" />
      <div className="dropdown">
        <div className="challenge-search input-group">
          <input id="searchPreviousChallenge" value={searchText} onChange={handleChange} type="text" className="form-control" placeholder="Search for a challenge by name" />
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
