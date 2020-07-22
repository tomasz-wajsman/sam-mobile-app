import React, { useState } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import styles from '../styles';
import ActivitiesList from '../components/ActivitiesList';
import ActivityEditorModal from '../components/modals/ActivityEditorModal';
import util from '../util';
import { connect } from 'react-redux';

import { setActivityIndex, addActivity, modifyActivity, deleteActivity } from '../../store/actions';

const ActivityScreen = ({ activities, selectedActivityIndex, setActivityIndex, addActivity, modifyActivity, deleteActivity }) => {
  const [modifyModalVisible, setModifyModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const getActivityIndexByID = activityID => activities.findIndex(activity => activity['_id'] === activityID);
  const getActivityIdByIndex = activityIndex => activities[activityIndex]['_id'];
  
  const handleAdd = activityDetails => {
    // add an activity
    const details = { ...activityDetails };
    // convert dates to Unix
    details.startDate = util.date.dateToUnix(activityDetails.startDate);
    details.endDate = util.date.dateToUnix(activityDetails.endDate);
    details['_id'] = activityDetails.name; // TO-DO: change it
    addActivity(details);
  };
  const handleEdit = (activityID, activityDetails) => {
    // modify an activity
    const details = { ...activityDetails };
    // convert dates to Unix
    details.startDate = util.date.dateToUnix(activityDetails.startDate);
    details.endDate = util.date.dateToUnix(activityDetails.endDate);
    details['_id'] = activityID; // TO-DO: change it
    modifyActivity(selectedActivityIndex, details);
  };
  const handleDelete = activityID => {
    // delete an activity
    deleteActivity(getActivityIndexByID(activityID));
  };
  const handleDismissEditorModal = () => {
    setModifyModalVisible(false);
  };

  const handleModify = (mode, activityID) => {
    if (mode === 'add') {
      // add mode
      setEditMode(false);
      setActivityIndex(-1);
    } else if (mode == 'edit') {
      // edit mode
      setEditMode(true);
      console.log(getActivityIndexByID(activityID))
      setActivityIndex(getActivityIndexByID(activityID));
    }
    setModifyModalVisible(true);
  };

  const renderModal = () => {
    if (editMode) {
      // edit mode
      return (
        <ActivityEditorModal
          details={activities[selectedActivityIndex] || {}}
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

const mapStateToProps = state => {
  return {
    activities: state.activities.items,
    selectedActivityIndex: state.activities.selectedActivityIndex
  }
};
const mapDispatchToProps = {
  addActivity,
  modifyActivity,
  deleteActivity,
  setActivityIndex
};

export default connect(mapStateToProps, mapDispatchToProps)(ActivityScreen);
