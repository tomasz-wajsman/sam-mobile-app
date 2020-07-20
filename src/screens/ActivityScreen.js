import React, { useState } from 'react';
import { View, Text } from 'react-native';
import styles from '../styles';
import ActivitiesList from '../components/ActivitiesList';
import ActivityDetailsModal from '../components/modals/ActivityDetailsModal';

const defaultActivities = [
  { _id: '111111111111111111111111', name: 'Swimming', category: 'swimming', startDate: 123, endDate: 456, distance: 5000 },
  { _id: '111111111111111111111112', name: 'Cycling in mountains', category: 'cycling', startDate: 123, endDate: 456, distance: 45000 },
  { _id: '111111111111111111111113', name: 'Football match', category: 'football', startDate: 123, endDate: 456 },
];

const ActivityScreen = () => {
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  
  const [activities, setActivities] = useState(defaultActivities);
  const [selectedActivityID, setSelectedActivityID] = useState('')

  const findActivityIndexByID = activityID => activities.findIndex(activity => activity['_id'] === activityID);
  const handleShowDetails = activityID => {
    // show activity details
    setSelectedActivityID(findActivityIndexByID(activityID));
    setDetailsModalVisible(true);
  };
  const handleAdd = () => {
    // add an activity
    
  }
  const handleEdit = activityID => {
    // edit an activity
    handleDismissModal();
  };
  const handleDismissDetailsModal = () => {
    setDetailsModalVisible(false);
  };

  return (
    <View style={styles.layout.container}>
      <ActivityDetailsModal
        details={activities[selectedActivityID]}
        visible={detailsModalVisible}
        onEdit={handleEdit}
        onDismiss={handleDismissDetailsModal}
      />
      <ActivitiesList
        items={activities}
        onPressAdd={handleAdd}
        onPressDetails={handleShowDetails}
      />
    </View>
  )
};
export default ActivityScreen;
