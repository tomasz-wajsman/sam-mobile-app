import React, { useState } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import styles from '../styles';
import ActivitiesList from '../components/ActivitiesList';
import ActivityEditorModal from '../components/modals/ActivityEditorModal';
import util from '../util';

const defaultActivities = [];

const ActivityScreen = () => {
  const [modifyModalVisible, setModifyModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  
  const [activities, setActivities] = useState(defaultActivities);
  const [selectedActivityID, setSelectedActivityID] = useState('');

  const findActivityIndexByID = activityID => activities.findIndex(activity => activity['_id'] === activityID);
  const handleAdd = activityDetails => {
    // add an activity
    const temp = [...activities];
    const details = {...activityDetails};
    // convert dates to Unix
    details.startDate = util.date.dateToUnix(activityDetails.startDate);
    details.endDate = util.date.dateToUnix(activityDetails.endDate);
    console.log(util.date.dateToUnix(activityDetails.startDate), util.date.dateToUnix(activityDetails.endDate), 'handleesijhodtfjdfgiuhndfijijhdf')
    details['_id'] = activityDetails.name; // TO-DO: change it
    temp.push(details);
    setActivities(temp);
  };
  const handleEdit = (activityID, activityDetails) => {
    // edit an activity
    const temp = [...activities];
    const details = activityDetails;
    // convert dates to Unix
    details.startDate = util.date.dateToUnix(activityDetails.startDate);
    details.endDate = util.date.dateToUnix(activityDetails.endDate);
    details['_id'] = activityID; // TO-DO: change it
    temp[findActivityIndexByID(activityID)] = activityDetails;
    setActivities(temp);
  };
  const handleDelete = activityID => {
    // delete an activity
    const temp = [...activities];
    temp.splice(findActivityIndexByID(activityID), 1);
    setActivities(temp);
  };
  const handleDismissEditorModal = () => {
    setModifyModalVisible(false);
  };

  const handleModify = (mode, activityID) => {
    if (mode === 'add') {
      // add mode
      setEditMode(false);
    } else if (mode == 'edit') {
      // edit mode
      setEditMode(true);
    }
    setSelectedActivityID(findActivityIndexByID(activityID));
    setModifyModalVisible(true);
  };

  const renderModal = () => {
    if (editMode) {
      // edit mode
      return (
        <ActivityEditorModal
          details={activities[selectedActivityID] || {}}
          editing={true}
          visible={modifyModalVisible}
          onDismiss={handleDismissEditorModal}
          onConfirm={handleEdit}
        />
      );
    }
    // add mode
    return (
      <ActivityEditorModal
        details={{}}
        editing={false}
        visible={modifyModalVisible}
        onDismiss={handleDismissEditorModal}
        onConfirm={handleAdd}
      />
    );
  };

  return (
    <ScrollView style={styles.layout.container}>
      {renderModal()}
      <ActivitiesList
        items={activities}
        onModify={handleModify}
        onDeleteActivity={handleDelete}
      />
    </ScrollView>
  )
};
export default ActivityScreen;
