import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Airtable from 'airtable';
const base = new Airtable({ apiKey: 'keyCxnlep0bgotSrX' }).base('appN1J6yscNwlzbzq');

import Header from './header';

function App() {
  const [calendar, setCalendar] = React.useState({});

  // Make airtable calls when app starts
  React.useEffect(() => {
    const hash = window.location.hash.slice(2);

    base('Calendars').select({
      filterByFormula: `{hash}='${hash}'`
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
  }

  return (
    <div className="app">
      <Header />
      <button type="button" className="btn btn-primary" onClick={submitToAirtable}>Submit</button>
    </div>
  );
}

export default App;
