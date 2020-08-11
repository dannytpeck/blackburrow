import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Airtable from 'airtable';
const base = new Airtable({ apiKey: 'keyCxnlep0bgotSrX' }).base('appN1J6yscNwlzbzq');
const baseClients = new Airtable({ apiKey: 'keylwZtbvFbcT3sgw' }).base('appHXXoVD1tn9QATh');
const baseConfigQueue = new Airtable({ apiKey: 'keylwZtbvFbcT3sgw' }).base('appxbO9j8z9KEnUCH');

import Header from './header';
import Footer from './footer';
import Home from './home';
import NetNew from './net_new';
import Historical from './historical';
import ChallengeContent from './challenge_content';
import AdditionalDetails from './additional_details';
import ConfirmChallengeDetails from './confirm_challenge_details';
import StepConfiguration from './step_configuration';
import ConfirmDeleteModal from './confirm_delete_modal';
import ConfirmSubmitModal from './confirm_submit_modal';
import EditorView from './editor_view';
import UploadModal from './upload_modal';
import SaveNotification from './save_notification';

/* globals $ */
function App() {
  const [calendar, setCalendar] = React.useState(null);
  const [client, setClient] = React.useState(null);
  const [clientName, setClientName] = React.useState('');
  const [clientDomain, setClientDomain] = React.useState('');
  const [clientLimeadeAccessToken, setClientLimeadeAccessToken] = React.useState('');
  const [step, setStep] = React.useState('Home');

  // Home
  const [accountManager, setAccountManager] = React.useState('');
  const [accountManagerId, setAccountManagerId] = React.useState('');
  const [accountManagers, setAccountManagers] = React.useState([]);
  const [newOrHistorical, setNewOrHistorical] = React.useState('NetNew');

  // NetNew
  const [tileType, setTileType] = React.useState('One-Time Self-Report Challenge');
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');
  const [pointValue, setPointValue] = React.useState('');

  // Historical
  const [limeadeChallenges, setLimeadeChallenges] = React.useState([]);
  const [historicalEdits, setHistoricalEdits] = React.useState('No');
  const [weekly, setWeekly] = React.useState(false);
  const [cieId, setCieId] = React.useState('');

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

  // AdditionalDetails
  const [featuredActivity, setFeaturedActivity] = React.useState(false);
  const [maxOccurrence, setMaxOccurrence] = React.useState('1');
  const [targeting, setTargeting] = React.useState('Entire Population');
  const [specificDemographicText, setSpecificDemographicText] = React.useState('');
  
  // ConfirmChallengeDetails
  const [notes, setNotes] = React.useState('');
  const [contactName, setContactName] = React.useState('');
  const [contactEmail, setContactEmail] = React.useState('');

  // EditorView
  const [challengeType, setChallengeType] = React.useState('');
  const [customTileType, setCustomTileType] = React.useState('');
  const [targetingType, setTargetingType] = React.useState('');
  const [subgroup, setSubgroup] = React.useState('');
  const [targetingColumn1, setTargetingColumn1] = React.useState('');
  const [targetingValue1, setTargetingValue1] = React.useState('');
  const [targetingColumn2, setTargetingColumn2] = React.useState('');
  const [targetingValue2, setTargetingValue2] = React.useState('');
  const [targetingColumn3, setTargetingColumn3] = React.useState('');
  const [targetingValue3, setTargetingValue3] = React.useState('');


  const calendarHash = window.location.hash.slice(2, 16);

  // Make airtable calls when app starts
  React.useEffect(() => {
    const editing = window.location.hash.includes('edit');

    if (editing) {
      setStep('EditorView');
    }

    // get calendar
    base('Calendars').select({
      filterByFormula: `{hash}='${calendarHash}'`
    }).eachPage((records, fetchNextPage) => {
      const calendar = records[0];

      setCalendar(calendar);

      fetchNextPage();

      // get client
      baseClients('Clients').select({
        filterByFormula: `{Limeade e=}='${calendar.fields['client']}'`
      }).eachPage((records, fetchNextPage) => {
        const client = records[0];

        setClient(client);

        setClientName(client.fields['Account Name']);
        setClientDomain(client.fields['Domain']);
        setClientLimeadeAccessToken(client.fields['LimeadeAccessToken']);

      });
    }, (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });



  }, []); // Pass empty array to only run once on mount

  // sanitization
  const sanitize = (code) => {
    let sanitized = code
      .replace(/\r?\n|\r/g, ' ')     // Strip out carriage returns and newlines
      .replace(/\u2018/g, '\'')      // Left single quote
      .replace(/\u2019/g, '\'')      // Right single quote
      .replace(/\u201C/g, '"')       // Left double quote
      .replace(/\u201D/g, '"')       // Right double quote
      .replace(/\u2026/g, '...')     // Ellipsis
      .replace(/\u2013/g, '&ndash;') // Long dash
      .replace(/\u2014/g, '&mdash;') // Longer dash
      .replace(/\u00A9/g, '&copy;');  // Copyright symbol
    return sanitized;
  };

  function createTask(record) {
    const taskStartDate = moment(startDate).subtract(28, 'days').format('L');
    const taskDueDate = moment(taskStartDate).add(21, 'days').format('L');

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

    const calendarUrl = `https://calendarbuilder.dev.adurolife.com/calendar-builder/#/${calendarHash}`;
    const ctrtUrl = `https://calendarbuilder.dev.adurolife.com/ctrt/#/${calendarHash}`;
    const editorUrl = `https://calendarbuilder.dev.adurolife.com/ctrt/#/${calendarHash}/edit/${record.id}`;

    // Note: the formatting below is ugly to accommodate airtable's rich text.
    // I imagine there's a better way to do it, but this works and that's enough for me.
    const description = `[${editorUrl}](${editorUrl})
Please Note:
The following tiles will remain as CIEs (and keep the same ID if available):
- Any historical CIEs
- Any Verified Challenge with Max Occurrence of more than 1
- ID 3: Track Your Progress
- ID 7: Complete a Health Screening
- ID 10: Well-being Assessment
- ID 22: Know Your Numbers
- RAS Programs (i.e. Breathe Easy, My Health Matters, etc.)
- Any CIE tied to an integration or workflow (i.e. Naturally Slim)

Client Details
Account Manager: ${accountManager}
Client Name: ${clientName}
Client Contact Name: ${contactName}
Client Contact Email: ${contactEmail}

Tile Details
Title: ${challengeTitle}
Start Date: ${moment(startDate).format('L')}
End Date: ${moment(endDate).format('L')}
Notes: ${notes}

Net-New or Historical: ${customTileType}
Tile Type: ${tileType} ${cieId ? '(historical CIE) ' : ''} ${maxOccurrence > 1 ? '(max occurrence CIE)' : ''}
${cieId ? `CIE ID: ${cieId}` : ''}
Max Occurrence: ${maxOccurrence}

Editing Details
Editor View: [${editorUrl}](${editorUrl})
Challenge Calendar: [${editorUrl}](${calendarUrl})
Tile Image: [${imageUrl}](${imageUrl})`;

    baseConfigQueue('Queue').create({
        'Attachments': [
          {
            'url': imageUrl
          }
        ],
        'Challenge Title': challengeTitle,
        'Client': clientName,
        'Requestor': [
          {
            'id': accountManagerId,
          }
        ],
        'Priority': 'Normal',
        'Start Date': taskStartDate,
        'Due Date': taskDueDate,
        'Status': 'Todo',
        'Task Type': 'CTRT',
        'Task Details': description
      }, (err, record) => {
        if (err) {
          console.error(err);
          return;
        }
        const confirmationText = `
          <p>View it in your <a href="${calendarUrl}" target="_blank">Calendar Builder</a> or submit <a href="${ctrtUrl}" target="_blank">another request</a>.</p>
        `;
        $('#confirmSubmitModal .modal-body').append(confirmationText);
    });
  }

  function openDeleteConfirmModal() {
    // open confirmation modal
    $('#confirmDeleteModal').modal();
    $('#confirmDeleteModal .modal-footer .btn-danger').off('click');
    $('#confirmDeleteModal .modal-footer .btn-danger').click(() => deleteChallengeFromAirtable());
  }

  function deleteChallengeFromAirtable() {
    // get recordId to update
    const recordId = window.location.hash.slice(22);

    // Make update in Airtable
    $('#saveNotification').show().html('Saving...');
    base('Challenges').destroy(recordId, (err, deletedRecord) => {
      if (err) {
        console.error(err);
        return;
      }
      $('#saveNotification').html('Deleted ' + challengeTitle).delay(800).fadeOut(2000);
      console.log(`Deleted ${challengeTitle} - ${recordId}`);
    });

    // close the delete modal
    $('#confirmDeleteModal').modal('hide');

    alert('Tile has been deleted');
 
  }

  function submitToAirtable() {
    const acknowledgementChecked = $('#acknowledgement').prop('checked');
    const rewardOccurrence = weekly === true ? 'Weekly' : 'Once';
    const isFeatured = featuredActivity ? 'yes' : 'no';
    const isTargeted = (targeting === 'Specific Demographic') ? 'yes' : 'no';
    const activityGoal = activityGoalNumber ? activityGoalNumber.toString() : '';

    let activityTrackingType = '';
    switch (tileType) {
      case 'One-Time Self-Report Challenge':
      case 'Verified Challenge':
      case 'Informational Tile':
        activityTrackingType = 'Event';
        break;
      case 'Weekly Days':
        activityTrackingType = 'Days';
        break;
      case 'Weekly Units':
      case 'Steps Challenge':
        activityTrackingType = 'Units';
        break;
    }

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
    
    let verified = '';
    switch (tileType) {
      case 'One-Time Self-Report Challenge':
      case 'Weekly Days':
      case 'Weekly Units':
      case 'Steps Challenge':
        verified = 'Self-Report';
        break;
      case 'Verified Challenge':
      case 'Informational Tile':
        verified = 'Points Upload';
        break;
    }

    $('#confirmSubmitModal').modal();
    if (acknowledgementChecked && contactName && contactEmail) {

      const phase = 'Yearlong';
      base('Challenges').create({
        'Title': challengeTitle,
        'Calendar': calendar.fields['hash'],
        'EmployerName': calendar.fields['client'],
        'Phase': phase,
        'Start date': startDate,
        'End date': endDate,
        'Verified': verified,
        'Points': pointValue,
        'Total Points': pointValue,
        'Team Activity': individualOrTeam === 'Team' ? 'yes' : 'no',
        'Reward Occurrence': rewardOccurrence,
        'Category': 'NA',
        'Instructions': sanitize(shortDescription),
        'More Information Html': sanitize(longDescription),
        'Featured Activity': isFeatured,
        'Comment': notes,
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
        'Activity Tracking Type': activityTrackingType,
        'Activity Goal': activityGoal,
        'Activity Goal Text': activityText,
        'Device Enabled': tileType === 'Steps Challenge' ? 'yes' : 'no',
        'Device Units': tileType === 'Steps Challenge' ? 'steps' : '',
        'Header Image': imageUrl,
        'Limeade Image Url': newOrHistorical === 'Historical' ? imageUrl : '',
        'Team Size Minimum': individualOrTeam === 'Team' ? teamMin.toString() : '',
        'Team Size Maximum': individualOrTeam === 'Team' ? teamMax.toString() : ''
      }, (err, record) => {
        if (err) {
          console.error(err);
          return;
        }

        $('#confirmSubmitModal .modal-body').html('<p>Your request has been received!</p>');

        // create task in Config Queue using record details
        createTask(record);

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

    } else if (acknowledgementChecked === false) {
      $('#confirmSubmitModal .modal-body').html('<p>You must check the acknowledgement to submit your request.</p>');
    } else {
      $('#confirmSubmitModal .modal-body').html('<p>Please enter your name and email.</p>');
    }
  }

  // Editor View submission function
  function submitEditsToAirtable() {
    // get recordId to update
    const recordId = window.location.hash.slice(22);

    // create translation variables
    const rewardOccurrence = weekly === true ? 'Weekly' : 'Once';
    const isFeatured = featuredActivity ? 'yes' : 'no';
    const isTargeted = (targeting === 'Specific Demographic') ? 'yes' : 'no';
    const activityGoal = activityGoalNumber ? activityGoalNumber.toString() : '';

    let activityTrackingType = '';
    switch (tileType) {
      case 'One-Time Self-Report Challenge':
      case 'Verified Challenge':
      case 'Informational Tile':
        activityTrackingType = 'Event';
        break;
      case 'Weekly Days':
        activityTrackingType = 'Days';
        break;
      case 'Weekly Units':
      case 'Steps Challenge':
        activityTrackingType = 'Units';
        break;
    }

    let verified = '';
    switch (tileType) {
      case 'One-Time Self-Report Challenge':
      case 'Weekly Days':
      case 'Weekly Units':
      case 'Steps Challenge':
        verified = 'Self-Report';
        break;
      case 'Verified Challenge':
      case 'Informational Tile':
        verified = 'Points Upload';
        break;
    }

    // update airtable record
    base('Challenges').update(recordId, 
      {
        'Title': challengeTitle,
        'Start date': startDate,
        'End date': endDate,
        'Verified': verified,
        'Team Activity': individualOrTeam === 'Team' ? 'yes' : 'no',
        'Team Size Minimum': teamMin,
        'Team Size Maximum': teamMax,
        'Reward Occurrence': rewardOccurrence,
        'Points': pointValue,
        'Total Points': pointValue,
        'Device Enabled': tileType === 'Steps Challenge' ? 'yes' : 'no',
        'Category': 'NA',
        'Activity Tracking Type': activityTrackingType,
        'Activity Goal': activityGoal,
        'Activity Goal Text': activityText,
        'Device Units': tileType === 'Steps Challenge' ? 'steps' : '',
        'Header Image': imageUrl,
        'Limeade Image Url': imageUrl,
        'Instructions': sanitize(shortDescription),
        'More Information Html': sanitize(longDescription),
        'Featured Activity': isFeatured,
        'Targeted Activity': isTargeted,
        'Targeting Notes': specificDemographicText,
        'Subgroup': targetingType === 'Subgroups' ? subgroup : '',
        'Targeting Column 1': targetingType === 'Tags' ? targetingColumn1 : '',
        'Targeting Value 1': targetingType === 'Tags' ? targetingValue1 : '',
        'Targeting Column 2': targetingType === 'Tags' ? targetingColumn2 : '',
        'Targeting Value 2': targetingType === 'Tags' ? targetingValue2 : '',
        'Targeting Column 3': targetingType === 'Tags' ? targetingColumn3 : '',
        'Targeting Value 3': targetingType === 'Tags' ? targetingValue3 : '',
        'Custom Tile Type': customTileType
      }, function(err, record) {
      if (err) {
        console.error(err);
        return;
      }
      console.log('Updated', record);
      $('#saveNotification').html('Saved ' + challengeTitle).delay(800).fadeOut(2000);
    });
  }

  // upload to Limeade function
  function uploadChallenge() {
    const editUrl = '/admin/program-designer/activities/activity/';

    // Open the modal
    $('#uploadModal').modal();
    $('#uploadModal .modal-body').html('Loading...');

    // create some variables for ease of use when uploading
    let isPartner = false;
    if (tileType === 'Verified Challenge' || tileType === 'Informational Tile') {
      isPartner = true;
    } else {
      isPartner = false;
    }

    let frequency = '';
    if (tileType === 'Steps Challenge') {
      frequency = 'Daily';
    } else if (weekly === true) {
      frequency = 'Weekly'; // this order is intentional, since Weekly Steps have Frequency of Weekly
    } else {
      frequency = 'None';
    }

    // most of the time, Activity Type is the activityText, unless it's a weekly units non-device challenge
    let activityType = '';
    if (tileType === 'Weekly Units') {
      activityType = '';
    } else {
      activityType = activityText;
    }
    
    let amountUnit = 'times';
    switch (tileType) {
      case 'Steps Challenge':
        amountUnit = 'steps';
        break;
      case 'Weekly Units':
        amountUnit = activityText;
        break;
      case 'One-Time Self-Report Challenge':
      case 'Verified Challenge':
      case 'Informational Tile':
      case 'Weekly Days':
        amountUnit = 'times';
    }

    let tagValues1 = [];
    let tagValues2 = [];
    let tagValues3 = [];

    // conditionally setting the tags in case there are fewer than 3 targeting columns
    let tags = [];
    function makeTags() {
      targetingColumn1 ? tags.push({
        'TagName': targetingColumn1 ? targetingColumn1 : '',
        'TagValues':
          targetingValue1 ? tagValues1.concat(targetingValue1.split('|').map(tag => tag.trim())) : '' // splitting tags on the | like Limeade, also trimming out whitespace just in case
      }) : null;
      targetingColumn2 ? tags.push({
        'TagName': targetingColumn2 ? targetingColumn2 : '',
        'TagValues':
          targetingValue2 ? tagValues2.concat(targetingValue2.split('|').map(tag => tag.trim())) : ''
      }) : null;
      targetingColumn3 ? tags.push({
        'TagName': targetingColumn3 ? targetingColumn3 : '',
        'TagValues':
          targetingValue3 ? tagValues3.concat(targetingValue3.split('|').map(tag => tag.trim())) : ''
      }) : null;
      return tags;
    }

    const data = {
      'AboutChallenge': sanitize(longDescription),
      'ActivityReward': {
        'Type': 'IncentivePoints',
        'Value': pointValue
      },
      'ActivityType': activityType,
      'AmountUnit': amountUnit,
      'ButtonText': isPartner ? 'CLOSE' : '',
      'ChallengeLogoThumbURL': imageUrl,
      'ChallengeLogoURL': imageUrl,
      'ChallengeTarget': activityGoalNumber,
      'ChallengeType': challengeType,
      'DefaultPrivacyFlag': tileType === 'Verified Challenge' ? 1 : 'Unspecified',
      'Dimensions': [],
      'DisplayInProgram': startDate === moment(Date) ? true : false,  // sets true if the challenge starts today
      'DisplayPriority': null,
      'EndDate': endDate,
      'EventCode': '',
      'Frequency': frequency,
      'IsDeviceEnabled': tileType === 'Steps Challenge' ? true : false,
      'IsFeatured': featuredActivity === 'yes' || featuredActivity === 'Yes' ? true : false,
      'FeaturedData': {
        'Description': featuredActivity === 'yes' || featuredActivity === 'Yes' ? shortDescription : false,
        'ImageUrl': featuredActivity === 'yes' || featuredActivity === 'Yes' ? imageUrl : false
      },
      'IsSelfReportEnabled': isPartner ? false : true,
      'IsTeamChallenge': individualOrTeam === 'Team' ? true : false,
      'Name': challengeTitle,
      'PartnerId': isPartner ? 1 : 0, 
      'ShortDescription': sanitize(shortDescription),
      'ShowExtendedDescription': isPartner ? true : false,
      'ShowWeeklyCalendar': false,
      'StartDate': startDate,
      'TargetUrl': isPartner ? '/Home?sametab=true' : '',
      'Targeting': targeting === 'Specific Demographic' ? [
        {
          'SubgroupId': subgroup ? subgroup : '0', // if no subgroup, use 0 aka none
          'Name': '', // let's hope this is optional since How would we know the Subgroup Name?
          'IsImplicit': targetingType === 'Tags' ? true : false, // not sure what this does. Seems to be true for tags and false for subgroups.
          'IsPHI': false,
          'Tags': 
            targetingType === 'Tags' ? makeTags() : null
        }
      ] : [], // if no targeting, use an empty array
      'TeamSize': individualOrTeam === 'Team' ? { MaxTeamSize: teamMax, MinTeamSize: teamMin } : null
    };
    console.log({ data });

    $.ajax({
      url: 'https://api.limeade.com/api/admin/activity',
      type: 'POST',
      dataType: 'json',
      data: JSON.stringify(data),
      headers: {
        Authorization: 'Bearer ' + clientLimeadeAccessToken
      },
      contentType: 'application/json; charset=utf-8'
    }).done((result) => {
        $('#uploadModal .modal-body').html(`
          <div class="alert alert-success" role="alert">
            <p>Uploaded ${challengeTitle} for <strong>${clientName}</strong></p>
            <p class="mb-0"><strong>Challenge Id</strong></p>
            <p><a href=${clientDomain + editUrl + result.Data.ChallengeId} target="_blank">${result.Data.ChallengeId}</a></p>
          </div>
        `);
        console.log(result.Data);
    }).fail((xhr, textStatus, error) => {
      console.error(xhr.responseText);
      $('#uploadModal .modal-body').html(`
          <div class="alert alert-danger" role="alert">
            <p>Error uploading ${challengeTitle} for <strong>${clientName}</strong></p>
            <p>${xhr.responseText}</p>
          </div>
        `);
    });
  }


  // Basic validation (is a value present?)
  function validatedFields() {
    const $startDate = $('#startDate');
    const $endDate = $('#endDate');
    const $pointValue = $('#pointValue');
    const $searchPreviousChallenge = $('#searchPreviousChallenge');
    const $challengeTitle = $('#challengeTitle');
    const $activityText = $('#activityText');
    const $shortDescription = $('#shortDescription');
    const $specificDemographicText = $('#targetingDetails');

    let allInputsAreValid = true;

    function validate($element) {
      if ($element.val()) {
        $element.removeClass('is-invalid');
      } else {
        $element.addClass('is-invalid');
        allInputsAreValid = false;
      }
    }

    // validation for start and end date timing
    function validateStartIsBeforeEndDate() {
      if (moment(endDate).isBefore(startDate)) {
        alert('Error: The Start Date must be before the End Date.');
        $startDate.addClass('is-invalid');
        $endDate.addClass('is-invalid');
        allInputsAreValid = false;
      } else {
        $startDate.removeClass('is-invalid');
        $endDate.removeClass('is-invalid');
      }
    }

    switch (step) {
      case 'NetNew':
        validate($startDate);
        validate($endDate);
        validate($pointValue);
        validateStartIsBeforeEndDate();
        break;
      case 'Historical':
        validate($searchPreviousChallenge);
        validate($startDate);
        validate($endDate);
        validate($pointValue);
        validateStartIsBeforeEndDate();
        break;
      case 'ChallengeContent':
        validate($challengeTitle);
        validate($activityText);
        validate($shortDescription);
        break;
      case 'AdditionalDetails':
        targeting === 'Specific Demographic' ? validate($specificDemographicText) : '';
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
      case 'StepConfiguration':
        if (limeadeChallenges.length > 0) {
          setStep('Historical');
        } else {
          setStep('NetNew');
        }
        break;
      case 'ChallengeContent':
        if (limeadeChallenges.length > 0) {
          switch (tileType) {
            case 'One-Time Self-Report Challenge':
            case 'Verified Challenge':
            case 'Informational Tile':
            case 'Weekly Days':
              setStep('Historical');
              break;
            case 'Steps Challenge':
              setStep('StepConfiguration');
              break;
          }
        } else {
          switch (tileType) {
            case 'One-Time Self-Report Challenge':
            case 'Verified Challenge':
            case 'Informational Tile':
            case 'Weekly Days':
              setStep('NetNew');
              break;
            case 'Steps Challenge':
              setStep('StepConfiguration');
              break;
          }
        }
        break;
      case 'AdditionalDetails':
        setStep('ChallengeContent');
        break;
      case 'ConfirmChallengeDetails':
        if (limeadeChallenges.length > 0) {
          if (historicalEdits === 'Yes') {
            setStep('AdditionalDetails');
          } else if (historicalEdits === 'No') {
            setStep('Historical');
          }
        } else {
          setStep('AdditionalDetails');
        }
        break;
      
    }
  }

  function nextStep() {
    switch (step) {
      case 'Home':
        if (!calendar || !accountManager) {
          if (!calendar) {
            alert('Check your url, a calendar ID is required');
          } 
          if (!accountManager) {
            alert('Select an Account Manager to Continue');
          }
        } else {
            setStep(newOrHistorical);
          }
        
        break;
      case 'NetNew':
        if (validatedFields()) {
          switch (tileType) {
            case 'One-Time Self-Report Challenge':
            case 'Verified Challenge':
            case 'Informational Tile':
            case 'Weekly Days':
              if (validatedFields()) {
                setStep('ChallengeContent');
              }
              break;
            case 'Steps Challenge':
              if (validatedFields()) {
                setStep('StepConfiguration');
              }
              break;
          }
        }
        break;
      case 'Historical':
        if (validatedFields()) {
          if (historicalEdits === 'Yes') {
            switch (tileType) {
              case 'One-Time Self-Report Challenge':
              case 'Verified Challenge':
              case 'Informational Tile':
              case 'Weekly Days':
              case 'Weekly Units':
                if (validatedFields()) {
                  setStep('ChallengeContent');
                }
                break;
              case 'Steps Challenge':
                if (validatedFields()) {
                  setStep('StepConfiguration');
                }
                break;
            }
          } else if (historicalEdits === 'No') {
            setStep('ConfirmChallengeDetails');
          }
        }
        break;
      case 'StepConfiguration':
        setStep('ChallengeContent');
        break;
      case 'ChallengeContent':
        setStep('AdditionalDetails');
        break;
      case 'AdditionalDetails':
        if (validatedFields()) {
          setStep('ConfirmChallengeDetails');
        }
        break;
    }
    // force the user to the top of the page at each step
    window.scrollTo(0, 0);
  }

  function renderStep() {
    switch (step) {

      case 'Home':
        return <Home
          accountManager={accountManager}
          setAccountManager={setAccountManager}
          accountManagerId={accountManagerId}
          setAccountManagerId={setAccountManagerId}
          accountManagers={accountManagers}
          setAccountManagers={setAccountManagers}
          newOrHistorical={newOrHistorical}
          setNewOrHistorical={setNewOrHistorical}
        />;

      case 'NetNew':
        return <NetNew
          tileType={tileType}
          setTileType={setTileType}
          activityText={activityText}
          setActivityText={setActivityText}
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
          weekly={weekly}
          setWeekly={setWeekly}
          cieId={cieId}
          setCieId={setCieId}
          pointValue={pointValue}
          setPointValue={setPointValue}
          historicalEdits={historicalEdits}
          setHistoricalEdits={setHistoricalEdits}
          tileType={tileType}
          setTileType={setTileType}
          activityGoalNumber={activityGoalNumber}
          setActivityGoalNumber={setActivityGoalNumber}
          individualOrTeam={individualOrTeam}
          setIndividualOrTeam={setIndividualOrTeam}
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
          weekly={weekly}
          setWeekly={setWeekly}
          imageUrl={imageUrl}
          challengeTitle={challengeTitle}
          setChallengeTitle={setChallengeTitle}
          activityText={activityText}
          setActivityText={setActivityText}
          activityGoalNumber={activityGoalNumber}
          individualOrTeam={individualOrTeam}
          shortDescription={shortDescription}
          setShortDescription={setShortDescription}
          longDescription={longDescription}
          setLongDescription={setLongDescription}
        />;

      case 'AdditionalDetails':
        return <AdditionalDetails
          tileType={tileType}
          weekly={weekly}
          setWeekly={setWeekly}
          featuredActivity={featuredActivity}
          setFeaturedActivity={setFeaturedActivity}
          maxOccurrence={maxOccurrence}
          setMaxOccurrence={setMaxOccurrence}
          individualOrTeam={individualOrTeam}
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
          weekly={weekly}
          setWeekly={setWeekly}
          cieId={cieId}
          individualOrTeam={individualOrTeam}
          teamMin={teamMin}
          teamMax={teamMax}
          startDate={startDate}
          endDate={endDate}
          pointValue={pointValue}
          featuredActivity={featuredActivity}
          maxOccurrence={maxOccurrence}
          targeting={targeting}
          specificDemographicText={specificDemographicText}
          contactName={contactName}
          setContactName={setContactName}
          contactEmail={contactEmail}
          setContactEmail={setContactEmail}
          notes={notes}
          setNotes={setNotes}
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
          weekly={weekly}
          setWeekly={setWeekly}
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
          customTileType={customTileType}
          setCustomTileType={setCustomTileType}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          pointValue={pointValue}
          setPointValue={setPointValue}
          weekly={weekly}
          setWeekly={setWeekly}
          cieId={cieId}
          setCieId={setCieId}
          individualOrTeam={individualOrTeam}
          setIndividualOrTeam={setIndividualOrTeam}
          teamMin={teamMin}
          setTeamMin={setTeamMin}
          teamMax={teamMax}
          setTeamMax={setTeamMax}
          featuredActivity={featuredActivity}
          setFeaturedActivity={setFeaturedActivity}
          targeting={targeting}
          setTargeting={setTargeting}
          specificDemographicText={specificDemographicText}
          setSpecificDemographicText={setSpecificDemographicText}
          notes={notes}
          setNotes={setNotes}
          challengeType={challengeType}
          setChallengeType={setChallengeType}
          targetingType={targetingType}
          setTargetingType={setTargetingType}
          subgroup={subgroup}
          setSubgroup={setSubgroup}
          targetingColumn1={targetingColumn1}
          setTargetingColumn1={setTargetingColumn1}
          targetingValue1={targetingValue1}
          setTargetingValue1={setTargetingValue1}
          targetingColumn2={targetingColumn2}
          setTargetingColumn2={setTargetingColumn2}
          targetingValue2={targetingValue2}
          setTargetingValue2={setTargetingValue2}
          targetingColumn3={targetingColumn3}
          setTargetingColumn3={setTargetingColumn3}
          targetingValue3={targetingValue3}
          setTargetingValue3={setTargetingValue3}
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
      <SaveNotification />
      <Header clientName={clientName} />
      {renderStep()}
      <Footer step={step} previousStep={previousStep} nextStep={nextStep} openDeleteConfirmModal={openDeleteConfirmModal} submitToAirtable={submitToAirtable} submitEditsToAirtable={submitEditsToAirtable} uploadChallenge={uploadChallenge} />
      <ConfirmDeleteModal />
      <ConfirmSubmitModal deleteChallengeFromAirtable={deleteChallengeFromAirtable} />
      <UploadModal />
    </div>
  );
}

export default App;
