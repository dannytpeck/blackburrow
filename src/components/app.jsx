import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Airtable from 'airtable';
const base = new Airtable({ apiKey: 'keyCxnlep0bgotSrX' }).base('appN1J6yscNwlzbzq');

import Header from './header';
import Home from './home';
import NetNew from './net_new';
import Historical from './historical';
import ChallengeContent from './challenge_content';
import AdditionalDetails from './additional_details';
import ConfirmChallengeDetails from './confirm_challenge_details';

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
        'Title': 'Created in Blackburrow',
        'Calendar': calendar.fields['hash'],
        'EmployerName': calendar.fields['client'],
        'Phase': phase,
        'Start date': calendar.fields[`${phase} Start Date`],
        'End date': calendar.fields[`${phase} End Date`],
        'Verified': 'Self-Report',
        'Points': '50',
        'Total Points': '50',
        'Team Activity': 'no',
        'Reward Occurrence': 'Once',
        'Category': 'Health and Fitness',
        'Instructions': 'Supplement your exercise routine with new equipment or structure.',
        'More Information Html': '<h3 id="tagline" class="brandingBckgrndColor" style="padding: 10px; color: #fff; text-transform: uppercase;">Variety is the Spice of Life</h3><div id="moreInformation"><p>Feeling bored at the gym? Not reaching the results you had achieved when you first started exercising? Time to spice up your routine! Implement at least one of the suggestions below to add a challenge back into your physical fitness.</p> <p>Consider investing in your health and purchase a few of the items listed below:</p> <p></p><ul><li>Kettle bells<br></li><li>Dumbbells<br></li><li>Resistant bands<br></li><li>Slam balls<br></li><li>Jump rope<br></li><li>Sliders<br></li><li>Bosu ball<br></li><li>Speed ladder<br></li><li>Balance boards<br></li><li>Barbell set<br></li><li>Pull up bar<br></li><li>TRX<br></li><li>Fitness class(es)<br></li></ul><p></p><p>Or, register for a fitness event, such as a 5k running race, marathon, Spartan race, Tough Mudder race, triathlon, or open water swim to create a structured goal with a definitive end point.</p></div><span class="coachinginfo"><a href="/api/Redirect?url=https%3A%2F%2Fwellmetricssurveys.secure.force.com%2FEvent%2FCoachingEventCheckin%3Fp%3D%5Be%5D%26cpName%3DGet%20Moving%26participantCode%3D%5Bparticipantcode%5D%26eventType%3DIgnite%20Your%20Life" target="_blank"><img id="coachingMessageImage" src="https://mywellnessnumbers.com/ChallengeBank/coaching-messages/2017/ADURO_Challenge_CoachingMessages_General.png" style="width:100%" alt="healthcoach"></a></span><img id="bottomImage" src="https://mywellnessnumbers.com/ChallengeBank/inline-images/CB_Device%20Tracking_web.png" alt="Health and Fitness" style="width: 100%;"><p style="font-size: 9px;"><span>&copy; Copyright 2017 </span><a href="http://www.adurolife.com" target="_blank" style="text-decoration: none;">ADURO, INC.</a><span> All rights reserved.</span></p>',
        'Activity Tracking Type': 'Event',
        'Activity Goal': '',
        'Activity Goal Text': 'do the activity in the description',
        'Device Enabled': 'No',
        'Device Units': '',
        'Header Image': 'https://mywellnessnumbers.com/thelibrary/wp-content/uploads/2018/04/SpiceUpYourExercise_Challenge.png',
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
        setStep('AdditionalDetails');
        break;
      case 'AdditionalDetails':
        setStep('ConfirmChallengeDetails');
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

      default:
        throw new Error(`Cannot render step: ${step}`);
    }
  }

  return (
    <div className="app">
      <Header />

      {renderStep()}

      <footer id="footer">
        {
          step === 'Home' ?
          <a href={`https://calendarbuilder.dev.adurolife.com/calendar-builder/#/${calendarHash}`}>Back to Calendar</a> :
          <button type="button" className="btn btn-outline-primary" onClick={previousStep}>Back</button>
        }
        {
          step === 'ConfirmChallengeDetails' ?
          <button type="button" className="btn btn-primary ml-5" onClick={submitToAirtable}>Submit</button> :
          <button type="button" className="btn btn-primary ml-5" onClick={nextStep}>Next</button>
        }
      </footer>

    </div>
  );
}

export default App;
