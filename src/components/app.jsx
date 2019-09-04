import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Airtable from 'airtable';
const base = new Airtable({ apiKey: 'keyCxnlep0bgotSrX' }).base('appN1J6yscNwlzbzq');

import Header from './header';
import Footer from './footer';
import Home from './home';
import NetNew from './net_new';
import Historical from './historical';
import ChallengeContent from './challenge_content';
import AdditionalDetails from './additional_details';
import ConfirmChallengeDetails from './confirm_challenge_details';
import StepConfiguration from './step_configuration';
import ConfirmSubmitModal from './confirm_submit_modal';
import EditorView from './editor_view';

/* globals $ */
function App() {
  const [calendar, setCalendar] = React.useState(null);
  const [step, setStep] = React.useState('Home');

  // Home
  const [accountManager, setAccountManager] = React.useState('');
  const [accountManagerWrikeId, setAccountManagerWrikeId] = React.useState('');
  const [accountManagers, setAccountManagers] = React.useState([]);
  const [newOrHistorical, setNewOrHistorical] = React.useState('NetNew');

  // NetNew
  const [tileType, setTileType] = React.useState('One-Time Self-Report Challenge');
  console.log({ tileType });
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');
  const [pointValue, setPointValue] = React.useState('');

  // Historical
  const [limeadeChallenges, setLimeadeChallenges] = React.useState([]);
  const [historicalEdits, setHistoricalEdits] = React.useState('No');

  // ChallengeContent
  const [imageUrl, setImageUrl] = React.useState('http://via.placeholder.com/2000x1000');
  const [challengeTitle, setChallengeTitle] = React.useState('');
  const [activityText, setActivityText] = React.useState('');
  const [shortDescription, setShortDescription] = React.useState('');
  const [longDescription, setLongDescription] = React.useState('');

  // StepConfiguration
  const [individualOrTeam, setIndividualOrTeam] = React.useState('Individual');
  const [teamMin, setTeamMin] = React.useState();
  const [teamMax, setTeamMax] = React.useState();
  const [activityGoalNumber, setActivityGoalNumber] = React.useState('');
  console.log({ activityGoalNumber });

  // AdditionalDetails
  const [featuredActivity, setFeaturedActivity] = React.useState(false);
  const [targeting, setTargeting] = React.useState('Entire Population');
  const [specificDemographicText, setSpecificDemographicText] = React.useState('');

  const calendarHash = window.location.hash.slice(2, 16);

  // Make airtable calls when app starts
  React.useEffect(() => {
    const editing = window.location.hash.includes('edit');

    if (editing) {
      setStep('EditorView');
    }

    base('Calendars').select({
      filterByFormula: `{hash}='${calendarHash}'`
    }).eachPage((records, fetchNextPage) => {
      const calendar = records[0];

      setCalendar(calendar);

      fetchNextPage();
    }, (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });

  }, []); // Pass empty array to only run once on mount

  function submitToWrike(record) {
    console.log(record);
    const today = moment().format('YYYY-MM-DD');
    
    const wrikeStartDate = moment(startDate).subtract(21, 'days').format('YYYY-MM-DD');
    const wrikeDueDate = moment(wrikeStartDate).add(14, 'days').format('YYYY-MM-DD');
    let customTileType = '';

    switch (newOrHistorical) {
      case 'NetNew':
        customTileType = 'Net New';
        break;
      case 'Historical':
        switch (historicalEdits) {
          case 'Yes':
            customTileType = 'Revised';
            break;
          case 'No':
            customTileType = 'Rerun';
            break;
        }
        break;
    }

    const responsibleAm = accountManagerWrikeId;
    const responsibleEditor = 'KUAEFOGT'; // Meredith
    const responsibleAmy = 'KUAFS43Q'; // Amy

    const calendarUrl = `https://calendarbuilder.dev.adurolife.com/calendar-builder/#/${calendarHash}`;
    const editorUrl = `https://calendarbuilder.dev.adurolife.com/blackburrow/#/${calendarHash}/edit/${record.id}`;

    const description = `
      <p>Client Name: ${calendar.fields['client']}</p>
      <p>Tile Type: ${customTileType}</p>
      <p>Tile Name: ${challengeTitle}</p>
      <p>Start Date: ${moment(startDate).format('L')}</p>
      <br/>
      <p>Editor View: <a href="${editorUrl}">${editorUrl}</a></p>
      <p>Client Challenge Calendar: <a href="${calendarUrl}">${calendarUrl}</a></p>
      <p>Tile Image: <a href="${imageUrl}">${imageUrl}</p>
      <br/>

      <p>A new custom challenge has been created in Blackburrow... View it here: <a href="${editorUrl}">${editorUrl}</a></p>
      <p>View the client's <a href="${calendarUrl}">program Calendar</a>.</p>
      <p>Download the image from <a href="${imageUrl}">${imageUrl}</a></p>
    `;

    const data = {
      title: `${calendar.fields['client']} - ${challengeTitle} - ${startDate}`,
      description: description,
      dates: {
        start: wrikeStartDate,
        due: wrikeDueDate
      },
      responsibles: [responsibleAm, responsibleEditor]
    };

    $.ajax({
      type: 'POST',
      url: 'https://www.wrike.com/api/v4/folders/IEAAX5JZI4KS73DO/tasks',
      data: JSON.stringify(data),
      dataType: 'json',
      contentType: 'application/json',
      headers: {
        Authorization: 'Bearer eyJ0dCI6InAiLCJhbGciOiJIUzI1NiIsInR2IjoiMSJ9.eyJkIjoie1wiYVwiOjc4MzY3MyxcImlcIjo2NDQ1NjI3LFwiY1wiOjQ2MTI5ODEsXCJ1XCI6NjM4OTA3MSxcInJcIjpcIlVTXCIsXCJzXCI6W1wiV1wiLFwiRlwiLFwiSVwiLFwiVVwiLFwiS1wiLFwiQ1wiLFwiQVwiLFwiTFwiXSxcInpcIjpbXSxcInRcIjowfSIsImlhdCI6MTU2NTEyMDE5Nn0.ZhznMJNLBBCqq43v4W0T_OFW-OJpBiXCLM6-7aJtiWU'
      }
    })
    .done(data => {
      const url = data.data[0].permalink;
      const confirmationText = `
        <p>View it in your <a href="${calendarUrl}" target="_blank">Calendar Builder</a> or submit <a href="https://calendarbuilder.dev.adurolife.com/blackburrow/#/${calendarHash}">another request</a>.</p>
        <p>Wrike task created successfully (keeping this here for testing for now): <a href="${url}" target="_blank">${url}</a></p>
      `;
      $('#confirmSubmitModal .modal-body').append(confirmationText);
    });
  }

  function submitToAirtable() {
    const acknowledgementChecked = $('#acknowledgement').prop('checked');
    const isFeatured = featuredActivity ? 'yes' : 'no';
    const isTargeted = (targeting === 'Specific Demographic') ? 'yes' : 'no';
    const activityGoal = activityGoalNumber ? activityGoalNumber.toString() : '';

    let customTileType = '';
    switch (newOrHistorical) {
      case 'NetNew':
        customTileType = 'Net New';
        break;
      case 'Historical':
        switch (historicalEdits) {
          case 'Yes':
            customTileType = 'Revised';
            break;
          case 'No':
            customTileType = 'Rerun';
            break;
        }
        break;
    }
    console.log('customTileType = ' + customTileType);

    $('#confirmSubmitModal').modal();
    if (acknowledgementChecked) {

      const phase = 'Yearlong';
      base('Challenges').create({
        'Title': challengeTitle,
        'Calendar': calendar.fields['hash'],
        'EmployerName': calendar.fields['client'],
        'Phase': phase,
        'Start date': startDate,
        'End date': endDate,
        'Verified': tileType === 'Verified' ? 'Verified' : 'Self-Report',
        'Points': pointValue,
        'Total Points': pointValue,
        'Team Activity': individualOrTeam === 'Team' ? 'yes' : 'no',
        'Reward Occurrence': 'Once',
        'Category': 'Health and Fitness',
        'Instructions': shortDescription,
        'More Information Html': longDescription,
        'Featured Activity': isFeatured,
        'Targeted Activity': isTargeted,
        'Targeting Notes': specificDemographicText,
        'Subgroup': null,
        'Targeting Column 1': null,
        'Targeting Value 1': '',
        'Targeting Column 2': null,
        'Targeting Value 2': '',
        'Targeting Column 3': null,
        'Targeting Value 3': '',
        'Custom Tile Type': customTileType,
        'Activity Tracking Type': tileType === 'Steps Challenge' ? 'Units' : 'Event',
        'Activity Goal': activityGoal,
        'Activity Goal Text': activityText,
        'Device Enabled': tileType === 'Steps Challenge' ? 'yes' : 'no',
        'Device Units': tileType === 'Steps Challenge' ? 'steps' : '',
        'Header Image': imageUrl,
        'Limeade Image Url': newOrHistorical === 'Historical' ? imageUrl : '',
        'Team Size Minimum': teamMin.toString(),
        'Team Size Maximum': teamMax.toString()
      }, (err, record) => {
        if (err) {
          console.error(err);
          return;
        }

        $('#confirmSubmitModal .modal-body').html('<p>Your request has been received!</p>');

        // Submit to wrike using record details
        submitToWrike(record);

        // Update "updated" field in calendar with the current date
        base('Calendars').update(calendar.id, {
          'updated': moment().format('l')
        }, function(err, record) {
          if (err) {
            console.error(err);
            return;
          }
        });

      });

    } else {
      $('#confirmSubmitModal .modal-body').html('<p>You must check the acknowledgement to submit your request.</p>');
    }
  }

  // Basic validation (is a value present?)
  // TODO: this is currently just for NetNew as a demo, add for all Steps and improve
  function validatedFields() {
    const $startDate = $('#startDate');
    const $endDate = $('#endDate');
    const $pointValue = $('#pointValue');
    const $searchPreviousChallenge = $('#searchPreviousChallenge');
    const $challengeTitle = $('#challengeTitle');
    const $activityText = $('#activityText');
    const $shortDescription = $('#shortDescription');

    let allInputsAreValid = true;

    function validate($element) {
      if ($element.val()) {
        $element.removeClass('is-invalid');
      } else {
        $element.addClass('is-invalid');
        allInputsAreValid = false;
      }
    }

    switch (step) {
      case 'NetNew':
        validate($startDate);
        validate($endDate);
        validate($pointValue);
        break;
      case 'Historical':
        validate($searchPreviousChallenge);
        validate($startDate);
        validate($endDate);
        validate($pointValue);
        break;
      case 'ChallengeContent':
        validate($challengeTitle);
        validate($activityText);
        validate($shortDescription);
        break;
    }

    return allInputsAreValid;
  }

  function previousStep() {
    switch (step) {
      case 'NetNew':
        setStep('Home');
        break;
      case 'Historical':
        setStep('Home');
        break;
      case 'ChallengeContent':
        if (limeadeChallenges.length > 0) {
          setStep('Historical');
        } else {
          setStep('NetNew');
        }
        break;
      case 'AdditionalDetails':
        setStep('ChallengeContent');
        break;
      case 'ConfirmChallengeDetails':
        if (limeadeChallenges.length > 0) {
          setStep('Historical');
        } else {
          setStep('AdditionalDetails');
        }
        break;
      case 'StepConfiguration':
        setStep('ChallengeContent');
        break;
    }
  }

  function nextStep() {
    switch (step) {
      case 'Home':
        if (!calendar) {
          alert('Check your url, a calendar ID is required');
        } if (!accountManager) {
          alert('Select an Account Manager to Continue');
        } else {
          setStep(newOrHistorical);
        }
        break;
      case 'NetNew':
        if (validatedFields()) {
          setStep('ChallengeContent');
        }
        break;
      case 'Historical':
        if (validatedFields()) {
          if (historicalEdits === 'Yes') {
            setStep('ChallengeContent');
          } else if (historicalEdits === 'No') {
            setStep('ConfirmChallengeDetails');
          }
        }
        break;
      case 'ChallengeContent':
        switch (tileType) {
          case 'One-Time Self-Report Challenge':
          case 'Verified Challenge':
          case 'Informational Tile':
            if (validatedFields()) {
              setStep('AdditionalDetails');
            }
            break;
          case 'Steps Challenge':
            if (validatedFields()) {
              setStep('StepConfiguration');
            }
            break;
        }
        break;
      case 'AdditionalDetails':
        setStep('ConfirmChallengeDetails');
        break;
      case 'StepConfiguration':
        setStep('AdditionalDetails');
        break;
    }
  }

  function renderStep() {
    switch (step) {

      case 'Home':
        return <Home
          accountManager={accountManager}
          setAccountManager={setAccountManager}
          accountManagerWrikeId={accountManagerWrikeId}
          setAccountManagerWrikeId={setAccountManagerWrikeId}
          accountManagers={accountManagers}
          setAccountManagers={setAccountManagers}
          newOrHistorical={newOrHistorical}
          setNewOrHistorical={setNewOrHistorical}
        />;

      case 'NetNew':
        return <NetNew
          tileType={tileType}
          setTileType={setTileType}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          pointValue={pointValue}
          setPointValue={setPointValue}
        />;

      case 'Historical':
        return <Historical
          calendar={calendar}
          limeadeChallenges={limeadeChallenges}
          setLimeadeChallenges={setLimeadeChallenges}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          pointValue={pointValue}
          setPointValue={setPointValue}
          historicalEdits={historicalEdits}
          setHistoricalEdits={setHistoricalEdits}
          tileType={tileType}
          setTileType={setTileType}
          activityGoalNumber={activityGoalNumber}
          setActivityGoalNumber={setActivityGoalNumber}
          setTeamMin={setTeamMin}
          setTeamMax={setTeamMax}
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          challengeTitle={challengeTitle}
          setChallengeTitle={setChallengeTitle}
          activityText={activityText}
          setActivityText={setActivityText}
          shortDescription={shortDescription}
          setShortDescription={setShortDescription}
          longDescription={longDescription}
          setLongDescription={setLongDescription}
        />;

      case 'ChallengeContent':
        return <ChallengeContent
          tileType={tileType}
          imageUrl={imageUrl}
          challengeTitle={challengeTitle}
          setChallengeTitle={setChallengeTitle}
          activityText={activityText}
          setActivityText={setActivityText}
          activityGoalNumber={activityGoalNumber}
          shortDescription={shortDescription}
          setShortDescription={setShortDescription}
          longDescription={longDescription}
          setLongDescription={setLongDescription}
        />;

      case 'AdditionalDetails':
        return <AdditionalDetails
          tileType={tileType}
          featuredActivity={featuredActivity}
          setFeaturedActivity={setFeaturedActivity}
          targeting={targeting}
          setTargeting={setTargeting}
          specificDemographicText={specificDemographicText}
          setSpecificDemographicText={setSpecificDemographicText}
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          challengeTitle={challengeTitle}
          activityText={activityText}
          activityGoalNumber={activityGoalNumber}
          shortDescription={shortDescription}
          longDescription={longDescription}
        />;

      case 'ConfirmChallengeDetails':
        return <ConfirmChallengeDetails
          accountManager={accountManager}
          tileType={tileType}
          individualOrTeam={individualOrTeam}
          teamMin={teamMin}
          teamMax={teamMax}
          startDate={startDate}
          endDate={endDate}
          pointValue={pointValue}
          featuredActivity={featuredActivity}
          targeting={targeting}
          specificDemographicText={specificDemographicText}
          imageUrl={imageUrl}
          challengeTitle={challengeTitle}
          activityText={activityText}
          activityGoalNumber={activityGoalNumber}
          shortDescription={shortDescription}
          longDescription={longDescription}
        />;

      case 'StepConfiguration':
        return <StepConfiguration
          tileType={tileType}
          imageUrl={imageUrl}
          challengeTitle={challengeTitle}
          activityText={activityText}
          activityGoalNumber={activityGoalNumber}
          setActivityGoalNumber={setActivityGoalNumber}
          endDate={endDate}
          shortDescription={shortDescription}
          longDescription={longDescription}
          individualOrTeam={individualOrTeam}
          setIndividualOrTeam={setIndividualOrTeam}
          setTeamMin={setTeamMin}
          setTeamMax={setTeamMax}
        />;

      case 'EditorView':
        return <EditorView
          tileType={tileType}
          setTileType={setTileType}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          pointValue={pointValue}
          setPointValue={setPointValue}
          featuredActivity={featuredActivity}
          setFeaturedActivity={setFeaturedActivity}
          targeting={targeting}
          setTargeting={setTargeting}
          specificDemographicText={specificDemographicText}
          setSpecificDemographicText={setSpecificDemographicText}
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          challengeTitle={challengeTitle}
          setChallengeTitle={setChallengeTitle}
          activityText={activityText}
          setActivityText={setActivityText}
          activityGoalNumber={activityGoalNumber}
          setActivityGoalNumber={setActivityGoalNumber}
          shortDescription={shortDescription}
          setShortDescription={setShortDescription}
          longDescription={longDescription}
          setLongDescription={setLongDescription}
        />;

      default:
        throw new Error(`Cannot render step: ${step}`);
    }
  }

  return (
    <div className="app">
      <Header />
      {renderStep()}
      <Footer step={step} previousStep={previousStep} nextStep={nextStep} submitToAirtable={submitToAirtable} />
      <ConfirmSubmitModal />
    </div>
  );
}

export default App;
