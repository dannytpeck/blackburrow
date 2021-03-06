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
  customTileType,
  setCustomTileType,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  pointValue,
  setPointValue,
  weekly,
  setWeekly,
  cieId,
  setCieId,
  individualOrTeam,
  setIndividualOrTeam,
  teamMin,
  setTeamMin,
  teamMax,
  setTeamMax,
  featuredActivity,
  setFeaturedActivity,
  targeting,
  setTargeting,
  specificDemographicText,
  setSpecificDemographicText,
  notes,
  setNotes,
  imageUrl,
  setImageUrl,
  challengeType,
  setChallengeType,
  targetingType,
  setTargetingType,
  subgroup,
  setSubgroup,
  targetingColumn1,
  setTargetingColumn1,
  targetingValue1,
  setTargetingValue1,
  targetingColumn2,
  setTargetingColumn2,
  targetingValue2,
  setTargetingValue2,
  targetingColumn3,
  setTargetingColumn3,
  targetingValue3,
  setTargetingValue3,
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
        if (err.error === 'NOT_FOUND') {
          alert('Record not found: Tile has been deleted');
        }
        return;
      }

      console.log('Retrieved', record);

      // translate airtable values into tileType
      switch (record.fields['Verified']) {
        case 'Points Upload':
        case 'System Awarded':
        case 'Verified':
          if (record.fields['Points'] > 0) {
            setTileType('Verified Challenge');
          } else {
            setTileType('Informational Tile');
          }
          break;
        case 'Self-Report':
          switch (record.fields['Device Enabled']) {
            case 'Yes':
            case 'yes':
              setTileType('Steps Challenge');
              break;
            case 'No':
            case 'no':
              if (record.fields['Reward Occurrence'] === 'Weekly' || record.fields['Reward Occurrence'] === 'weekly') {
                if (record.fields['Activity Tracking Type'] === 'Days' || record.fields['Activity Tracking Type'] === 'days') {
                  setTileType('Weekly Days');
                } else {
                    setTileType('Weekly Units');
                }
              } else if (record.fields['Reward Occurrence'] === 'Once' || record.fields['Reward Occurrence'] === 'One Time') {
                setTileType('One-Time Self-Report Challenge');
              }
              break;
          }
      }

      setCustomTileType(record.fields['Custom Tile Type']);
      setStartDate(record.fields['Start date']);
      setEndDate(record.fields['End date']);
      setPointValue(record.fields['Points']);
      setImageUrl(record.fields['Limeade Image Url'] ? record.fields['Limeade Image Url'] : record.fields['Header Image']);
      validateLimeadeImage();
      setChallengeTitle(record.fields['Title'] ? record.fields['Title'] : '');
      setWeekly(record.fields['Reward Occurrence'] === 'Weekly' || record.fields['Reward Occurrence'] === 'weekly' ? true : false);
      setIndividualOrTeam(record.fields['Team Activity'] === 'yes' ? 'Team' : 'Individual');
      setTeamMin(record.fields['Team Size Minimum'] ? record.fields['Team Size Minimum'] : '');
      setTeamMax(record.fields['Team Size Maximum'] ? record.fields['Team Size Maximum'] : '');
      setActivityGoalNumber(record.fields['Activity Goal'] ? record.fields['Activity Goal'] : '');
      setActivityText(record.fields['Activity Goal Text'] ? record.fields['Activity Goal Text'] : '');
      setFeaturedActivity(record.fields['Featured Activity'] === 'yes' ? record.fields['Featured Activity'] : '');
      setTargeting(record.fields['Targeted Activity'] === 'yes' ? 'Specific Demographic' : 'Entire Population');
      setSpecificDemographicText(record.fields['Targeting Notes'] ? record.fields['Targeting Notes'] : '');
      setNotes(record.fields['Comment']);
      setTargetingType(record.fields['Subgroup'] ? 'Subgroups' : 'Tags');
      setSubgroup(record.fields['Subgroup'] ? record.fields['Subgroup'] : '');
      setTargetingColumn1(record.fields['Targeting Column 1']);
      setTargetingValue1(record.fields['Targeting Value 1'] ? record.fields['Targeting Value 1'] : '');
      setTargetingColumn2(record.fields['Targeting Column 2']);
      setTargetingValue2(record.fields['Targeting Value 2'] ? record.fields['Targeting Value 2'] : '');
      setTargetingColumn3(record.fields['Targeting Column 3']);
      setTargetingValue3(record.fields['Targeting Value 3'] ? record.fields['Targeting Value 3'] : '');
      setShortDescription(record.fields['Instructions'] ? record.fields['Instructions'] : '');
      setLongDescription(record.fields['More Information Html'] ? record.fields['More Information Html'] : '');
      $('.editor').html(record.fields['More Information Html']);

      // use record.fields['Activity Tracking Type'] to determine challengeType for later upload
      switch (record.fields['Activity Tracking Type']) {
        case 'Event':
          setChallengeType('OneTimeEvent');
          break;
        case 'Days':
          setChallengeType('YesNoDaily');
          break;
        case 'Units':
          setChallengeType('AddAllNumbers');
          break;
      }

    });

    // Enable all tooltips on the page
    $(function() {
      $('[data-toggle="tooltip"]').tooltip();
    });

    

  }, []); // Pass empty array to only run once on mount

  function handleTileTypeChange(e) {
    setTileType(e.target.value);
  }

  function handleCustomTileTypeChange(e) {
    setCustomTileType(e.target.value);
  }

  function handleStartDateChange(e) {
    setStartDate(e.target.value);
  }

  function handleEndDateChange(e) {
    setEndDate(e.target.value);
  }

  function handlePointValueChange(e) {
    setPointValue(e.target.value);
  }

  function handleIndividualOrTeamChange(e) {
    setIndividualOrTeam(e.target.value);
  }

  function handleTeamMinChange(e) {
    setTeamMin(e.target.value);
  }

  function handleTeamMaxChange(e) {
    setTeamMax(e.target.value);
  }

  function handleFeaturedActivityChange(e) {
    setFeaturedActivity(e.target.checked);
  }

  function handleTargetingChange(e) {
    setTargeting(e.target.value);
    if (e.target.value === 'Entire Population') {
      // clearing out the other targeting values so they won't interfere on upload
      setSubgroup('');
      setTargetingColumn1('');
      setTargetingValue1('');
      setTargetingColumn2('');
      setTargetingValue2('');
      setTargetingColumn3('');
      setTargetingValue3('');
    }
  }

  function handleSpecificDemographicText(e) {
    setSpecificDemographicText(e.target.value);
  }

  function handleTargetingTypeChange(e) {
    setTargetingType(e.target.value);
    // clearing out the other targeting values so they won't interfere on upload
    if (e.target.value === 'Tags') {
      setSubgroup('');
    } else if (e.target.value === 'Subgroups') {
      setTargetingColumn1('');
      setTargetingValue1('');
      setTargetingColumn2('');
      setTargetingValue2('');
      setTargetingColumn3('');
      setTargetingValue3('');
    }
  }

  function handleSubgroupChange(e) {
    setSubgroup(e.target.value);
  }

  function handleTargetingColumn1Change(e) {
    setTargetingColumn1(e.target.value);
  }

  function handleTargetingValue1Change(e) {
    setTargetingValue1(e.target.value);
  }

  function handleTargetingColumn2Change(e) {
    setTargetingColumn2(e.target.value);
  }

  function handleTargetingValue2Change(e) {
    setTargetingValue2(e.target.value);
  }

  function handleTargetingColumn3Change(e) {
    setTargetingColumn3(e.target.value);
  }

  function handleTargetingValue3Change(e) {
    setTargetingValue3(e.target.value);
  }

  function handleChallengeTitleChange(e) {
    setChallengeTitle(e.target.value);
  }

  function handleActivityTextChange(e) {
    setActivityText(e.target.value);
  }

  function handleActivityGoalNumberChange(e) {
    setActivityGoalNumber(e.target.value);
  }

  function handleShortDescriptionChange(e) {
    setShortDescription(e.target.value);
  }

  // adding for textarea Long Description changing while debugging Trumbowyg
  function handleLongDescriptionChange(e) {
    setLongDescription(e.target.value);
  }

  function handleNotesChange(e) {
    setNotes(e.target.value);
  }

  function handleLimeadeImageChange(e) {
    setImageUrl(e.target.value);
    validateLimeadeImage(e.target.value);
  }

  function validateLimeadeImage() {
    if ($('#limeadeImage').val().includes('/PDW/') === true) {
      $('#limeadeImage').removeClass('is-invalid');
    } else {
      $('#limeadeImage').addClass('is-invalid');
    }
  }

  return (
    <section id="editorView" className="row">
      <div className="col-6">

        <h3 className="mb-5">Editor View</h3>

        <h3 className="mb-3">Challenge Details</h3>

        <div className="row mb-3 tile-type">
          <div className="col-6">
            <label>Tile Type:</label>
            {/* if One-Time Self Report Challenge or Verified Challenge, show option-select for changing between
                if other tileType, show as text */}
            {
              (tileType === 'One-Time Self-Report Challenge' || tileType === 'Verified Challenge') ?
                <select className="form-control" id="tileType" value={tileType} onChange={handleTileTypeChange}>
                  <option>One-Time Self-Report Challenge</option>
                  <option>Verified Challenge</option>
                </select>
                : <p>{tileType}</p>
            }
          </div>
        </div>

        <div className="row mb-3 custom-tile-type">
          <div className="col-6">
            <label>Net New or Historical:</label>
            <select className="form-control" id="customTileType" value={customTileType} onChange={handleCustomTileTypeChange}>
              <option>Net New</option>
              <option>Revised</option>
              <option>Rerun</option>
            </select>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col">
            <label>Start Date:</label>
            <input type="date" className="form-control" id="startDate" value={startDate} onChange={handleStartDateChange} />
          </div>
          <div className="col">
            <label>End Date:</label>
            <input type="date" className="form-control" id="endDate" value={endDate} onChange={handleEndDateChange} />
          </div>
        </div>

        <div className="form-row">
          <div className="col-6">
            <div className="form-group">
              <label htmlFor="pointValue">Point Value</label>
              <input type="number" className="form-control" id="pointValue" value={pointValue} onChange={handlePointValueChange} />
            </div>
          </div>
        </div>

        <div className="form-group">
          <label className="mb-0">Is this an Individual or Team Challenge?</label>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="individualOrTeamRadios" id="individualChallenge" value="Individual" onChange={handleIndividualOrTeamChange} checked={individualOrTeam === 'Individual'} />
            <label className="form-check-label" htmlFor="individualChallenge">Individual Challenge</label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="individualOrTeamRadios" id="teamChallenge" value="Team" onChange={handleIndividualOrTeamChange} checked={individualOrTeam === 'Team'} />
            <label className="form-check-label" htmlFor="teamChallenge">Team Challenge</label>
          </div>
        </div>

        <div className="form-row mt-2" style={{ display: individualOrTeam === 'Team' ? 'block' : 'none' }}>
          <div className="col-8">
            <div className="form-group">
              <label className="mb-0" htmlFor="teamSize">Team Size</label>
              <small className="form-text text-muted text-left">Team sizes can be between 2 and 20 people.</small>
                <div className="row">
                  <div className="col">
                    <label htmlFor="teamMin">Team Minimum</label>
                    <select className="form-control" id="teamMin" value={teamMin} onChange={handleTeamMinChange}>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </select>
                  </div>
                  <div className="col">
                    <label htmlFor="teamMax">Team Maximum</label>
                    <select className="form-control" id="teamMax" value={teamMax} onChange={handleTeamMaxChange}>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                      <option>6</option>
                      <option>7</option>
                      <option>8</option>
                      <option>9</option>
                      <option>10</option>
                      <option>11</option>
                      <option>12</option>
                      <option>13</option>
                      <option>14</option>
                      <option>15</option>
                      <option>16</option>
                      <option>17</option>
                      <option>18</option>
                      <option>19</option>
                      <option>20</option>
                    </select>
                  </div>
                </div>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label>Featured Activity:</label>
          <div id="featuredActivityCheck" className="form-check mt-2">
            <input className="form-check-input" type="checkbox" id="featuredActivityYes" checked={featuredActivity} onChange={handleFeaturedActivityChange} />
            <label className="form-check-label" htmlFor="featuredActivityYes">
              <span className="mr-2 align-middle"></span>
              <span className="align-middle">Yes</span>
            </label>
          </div>
        </div>

        <div className="form-group">  
          <label>Targeting:</label>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="targetingRadios" id="entirePopulation" value="Entire Population" onChange={handleTargetingChange} checked={targeting === 'Entire Population'} />
            <label className="form-check-label" htmlFor="entirePopulation">Entire Population</label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="targetingRadios" id="specificDemographic" value="Specific Demographic" onChange={handleTargetingChange} checked={targeting === 'Specific Demographic'} />
            <label className="form-check-label" htmlFor="specificDemographic">Specific Demographic</label>
          </div>
        </div>

        <div className="form-group" style={{ display: targeting === 'Specific Demographic' ? 'block' : 'none' }}>
          <label htmlFor="notes">Targeting Notes</label>
          <textarea className="form-control" id="notes" rows="2" placeholder="" value={specificDemographicText} onChange={handleSpecificDemographicText} ></textarea>

          <div className="form-check">
            <input className="form-check-input" type="radio" name="subgroupsOrTagsRadios" id="subgroups" value="Subgroups" onChange={handleTargetingTypeChange} checked={targetingType === 'Subgroups'} />
            <label className="form-check-label" htmlFor="subgroups">Subgroups</label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="subgroupsOrTagsRadios" id="tags" value="Tags" onChange={handleTargetingTypeChange} checked={targetingType === 'Tags'} />
            <label className="form-check-label" htmlFor="tags">Tags</label>
          </div>

          <div className="form-group mt-3 mb-5 subgroup-targeting" style={{ display: targetingType === 'Subgroups' ? 'block' : 'none' }}>
            <label htmlFor="subgroupIdNumber">Subgroup</label>
            <input type="number" className="form-control" id="subgroupIdNumber" min="1" max="8" value={subgroup} onChange={handleSubgroupChange} />
          </div>

          <div className="form-group mt-3 mb-5 tags-targeting" style={{ display: targetingType === 'Tags' ? 'block' : 'none' }}>
            <div className="row">
              <small className="ml-3 text-muted">To create AND targeting, use separate columns (e.g., CurrentWalking and Location)</small>
              <small className="ml-3 text-muted">To create OR targeting, use | for separating values (e.g., Seattle | Portland)</small>
              <div className="col-md-6">
                <label htmlFor="targetingColumn1">Targeting Column 1</label>
                <select className="form-control" id="targetingColumn1" value={targetingColumn1} onChange={handleTargetingColumn1Change}>
                  <option></option>
                  <option>AgeRange</option>
                  <option>BargainingUnit</option>
                  <option>Class</option>
                  <option>Country</option>
                  <option>CurrentWalking</option>
                  <option>Department</option>
                  <option>District</option>
                  <option>Division</option>
                  <option>Facility</option>
                  <option>Group</option>
                  <option>HealthPlan</option>
                  <option>IncentiveLevel</option>
                  <option>JobCode</option>
                  <option>Location</option>
                  <option>Region</option>
                  <option>RelationshipCode</option>
                  <option>Status</option>
                  <option>Store</option>
                </select>
              </div>
              <div className="col-md-6">
                <label htmlFor="targetingValue1">Targeting Value 1</label>
                <input type="text" className="form-control" id="targetingValue1" value={targetingValue1} onChange={handleTargetingValue1Change}/>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <label htmlFor="targetingColumn2">Targeting Column 2</label>
                <select className="form-control" id="targetingColumn2" value={targetingColumn2} onChange={handleTargetingColumn2Change}>
                  <option></option>
                  <option>AgeRange</option>
                  <option>BargainingUnit</option>
                  <option>Class</option>
                  <option>Country</option>
                  <option>CurrentWalking</option>
                  <option>Department</option>
                  <option>District</option>
                  <option>Division</option>
                  <option>Facility</option>
                  <option>Group</option>
                  <option>HealthPlan</option>
                  <option>IncentiveLevel</option>
                  <option>JobCode</option>
                  <option>Location</option>
                  <option>Region</option>
                  <option>RelationshipCode</option>
                  <option>Status</option>
                  <option>Store</option>
                </select>
              </div>
              <div className="col-md-6">
                <label htmlFor="targetingValue2">Targeting Value 2</label>
                <input type="text" className="form-control" id="targetingValue2" value={targetingValue2} onChange={handleTargetingValue2Change}/>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <label htmlFor="targetingColumn3">Targeting Column 3</label>
                <select className="form-control" id="targetingColumn3" value={targetingColumn3} onChange={handleTargetingColumn3Change}>
                  <option></option>
                  <option>AgeRange</option>
                  <option>BargainingUnit</option>
                  <option>Class</option>
                  <option>Country</option>
                  <option>CurrentWalking</option>
                  <option>Department</option>
                  <option>District</option>
                  <option>Division</option>
                  <option>Facility</option>
                  <option>Group</option>
                  <option>HealthPlan</option>
                  <option>IncentiveLevel</option>
                  <option>JobCode</option>
                  <option>Location</option>
                  <option>Region</option>
                  <option>RelationshipCode</option>
                  <option>Status</option>
                  <option>Store</option>
                </select>
              </div>
              <div className="col-md-6">
                <label htmlFor="targetingValue3">Targeting Value 3</label>
                <input type="text" className="form-control" id="targetingValue3" value={targetingValue3} onChange={handleTargetingValue3Change}/>
              </div>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="notes">Client Notes</label>
          <textarea className="form-control" id="notes" rows="2" placeholder="" value={notes} onChange={handleNotesChange} readOnly="readonly"></textarea>
        </div>

        <h3 className="mt-5 mb-3">Challenge Content</h3>

        <div className="form-group">
          <label>Limeade Image URL</label>
          <div className="choose-image">
            <div className="form-group">
              <input type="text" className="form-control" id="limeadeImage" placeholder="Enter Limeade Image URL" value={imageUrl} onChange={handleLimeadeImageChange} />
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
          <input type="text" className="form-control" id="activityText" value={activityText} onChange={handleActivityTextChange} readOnly={tileType === 'Steps Challenge' ? true : false} />
          <small className="form-text text-muted">{activityText.length}/50 Characters</small>
        </div>

        <div className="form-group">
          <label htmlFor="activityGoalNumber">Activity Goal Number (or steps count)</label>
          <input type="number" className="form-control" id="activityGoalNumber" min="1" value={activityGoalNumber} onChange={handleActivityGoalNumberChange} />
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
        <TilePreview tileType={tileType} weekly={weekly} imageUrl={imageUrl} challengeTitle={challengeTitle} activityText={activityText} activityGoalNumber={activityGoalNumber} individualOrTeam={individualOrTeam} shortDescription={shortDescription} longDescription={longDescription} />
      </div>

    </section>

  );

}

export default EditorView;
