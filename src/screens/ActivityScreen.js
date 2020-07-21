import React, { useState } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import styles from '../styles';
import ActivitiesList from '../components/ActivitiesList';
import ActivityEditorModal from '../components/modals/ActivityEditorModal';

const defaultActivities = [
  { _id: '111111111111111111111111', name: 'Swimming', category: 'swimming', startDate: 123, endDate: 456, distance: 5000 },
  { _id: '111111111111111111111112', name: 'Cycling in mountains', category: 'cycling', startDate: 123, endDate: 456, distance: 45000 },
  { _id: '111111111111111111111113', name: 'Football match', category: 'football', startDate: 123, endDate: 456 },
];

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
    details['_id'] = activityDetails.name; // TO-DO: change it
    temp.push(details);
    setActivities(temp);
  };
  const handleEdit = (activityID, activityDetails) => {
    // edit an activity
    const temp = [...activities];
    const details = activityDetails;
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
    setModifyModalVisible(true);
  };

  const renderModal = () => {
    if (editMode) {
      // edit mode
      return (
        <ActivityEditorModal
          details={null}
          editing={true}
          visible={modifyModalVisible}
          onDismiss={handleDismissEditorModal}
          onAddActivity={handleAdd}
        />
      );
    }
    // add mode
    return (
      <ActivityEditorModal
        editing={false}
        visible={modifyModalVisible}
        onDismiss={handleDismissEditorModal}
        onEditActivity={handleEdit}
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
