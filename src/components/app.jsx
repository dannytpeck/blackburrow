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

/* globals $ */
function App() {
  const [calendar, setCalendar] = React.useState(null);
  const [step, setStep] = React.useState('Home');

  // Home
  const [accountManager, setAccountManager] = React.useState('');
  const [newOrHistorical, setNewOrHistorical] = React.useState('NetNew');

  // NetNew
  const [tileType, setTileType] = React.useState('One-Time Self-Report Challenge');
  const [startDate, setStateDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');
  const [pointValue, setPointValue] = React.useState(0);

  // Historical
  const [limeadeChallenges, setLimeadeChallenges] = React.useState([]);
  const [historicalEdits, setHistoricalEdits] = React.useState(null);

  // ChallengeContent
  const [imageUrl, setImageUrl] = React.useState('http://via.placeholder.com/540x270');
  const [challengeTitle, setChallengeTitle] = React.useState('');
  const [activityText, setActivityText] = React.useState('');
  const [shortDescription, setShortDescription] = React.useState('');
  const [longDescription, setLongDescription] = React.useState('');

  // AdditionalDetails
  const [featuredActivity, setFeaturedActivity] = React.useState(false);
  const [targeting, setTargeting] = React.useState('Entire Population');
  const [specificDemographicText, setSpecificDemographicText] = React.useState('');

  const calendarHash = window.location.hash.slice(2);

  // Make airtable calls when app starts
  React.useEffect(() => {
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

  function submitToAirtable() {
    const acknowledgementChecked = $('#acknowledgement').prop('checked');

    if (acknowledgementChecked) {

      const phase = 'Phase 1';

      base('Challenges').create({
        'Title': challengeTitle,
        'Calendar': calendar.fields['hash'],
        'EmployerName': calendar.fields['client'],
        'Phase': phase,
        'Start date': startDate,
        'End date': endDate,
        'Verified': 'Self-Report',
        'Points': pointValue,
        'Total Points': pointValue,
        'Team Activity': 'no',
        'Reward Occurrence': 'Once',
        'Category': 'Health and Fitness',
        'Instructions': shortDescription,
        'More Information Html': longDescription,
        'Activity Tracking Type': 'Event',
        'Activity Goal': '',
        'Activity Goal Text': activityText,
        'Device Enabled': 'No',
        'Device Units': '',
        'Header Image': imageUrl,
        'Team Size Minimum': '',
        'Team Size Maximum': ''
      }, (err, record) => {
        if (err) {
          console.error(err);
          return;
        }

        alert('Challenge added successfully!');

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
      alert('You must check the acknowledgement to submit your request.');
    }
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
          alert('Check your url, a calendar hash is required');
          throw new Error('Check your url, a calendar hash is required');
        } else {
          setStep(newOrHistorical);
        }
        break;
      case 'NetNew':
        setStep('ChallengeContent');
        break;
      case 'Historical':
        if (historicalEdits === 'Yes') {
          setStep('ChallengeContent');
        } else if (historicalEdits === 'No') {
          setStep('ConfirmChallengeDetails');
        }
        break;
      case 'ChallengeContent':
        switch (tileType) {
          case 'One-Time Self-Report Challenge':
          case 'Verified Challenge':
          case 'Informational Tile':
            setStep('AdditionalDetails');
            break;
          case 'Steps Challenge':
            setStep('StepConfiguration');
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
          setAccountManager={setAccountManager}
          setNewOrHistorical={setNewOrHistorical}
        />;

      case 'NetNew':
        return <NetNew
          tileType={tileType}
          setTileType={setTileType}
          startDate={startDate}
          setStateDate={setStateDate}
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
          setStateDate={setStateDate}
          endDate={endDate}
          setEndDate={setEndDate}
          pointValue={pointValue}
          setPointValue={setPointValue}
          setHistoricalEdits={setHistoricalEdits}
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
          imageUrl={imageUrl}
          challengeTitle={challengeTitle}
          setChallengeTitle={setChallengeTitle}
          activityText={activityText}
          setActivityText={setActivityText}
          shortDescription={shortDescription}
          setShortDescription={setShortDescription}
          longDescription={longDescription}
          setLongDescription={setLongDescription}
        />;

      case 'AdditionalDetails':
        return <AdditionalDetails
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
          shortDescription={shortDescription}
          longDescription={longDescription}
        />;

      case 'ConfirmChallengeDetails':
        return <ConfirmChallengeDetails
          accountManager={accountManager}
          tileType={tileType}
          startDate={startDate}
          endDate={endDate}
          pointValue={pointValue}
          featuredActivity={featuredActivity}
          targeting={targeting}
          imageUrl={imageUrl}
          challengeTitle={challengeTitle}
          activityText={activityText}
          shortDescription={shortDescription}
          longDescription={longDescription}
        />;

      case 'StepConfiguration':
        return <StepConfiguration
          imageUrl={imageUrl}
          challengeTitle={challengeTitle}
          activityText={activityText}
          shortDescription={shortDescription}
          longDescription={longDescription}
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
    </div>
  );
}

export default App;
