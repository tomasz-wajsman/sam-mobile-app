import React, { useState } from 'react';
import { View, Text } from 'react-native';
import styles from '../styles';
import ActivitiesList from '../components/ActivitiesList';
import ActivityModal from '../components/modals/ActivityModal';

const defaultActivities = [
  { _id: '111111111111111111111111', name: 'Swimming', category: 'swimming', startDate: 123, endDate: 456, distance: 5000 },
  { _id: '111111111111111111111112', name: 'Cycling in mountains', category: 'cycling', startDate: 123, endDate: 456, distance: 45000 },
  { _id: '111111111111111111111113', name: 'Football match', category: 'football', startDate: 123, endDate: 456 },
];

const ActivityScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [activities, setActivities] = useState(defaultActivities);
  const [selectedActivityID, setSelectedActivityID] = useState('')

  const findActivityIndexByID = activityID => activities.findIndex(activity => activity['_id'] === activityID);
  const handlePressItem = activityID => {
    setSelectedActivityID(findActivityIndexByID(activityID));
    setModalVisible(true);
  };
  const handleDismissModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.layout.container}>
      <ActivityModal
        details={activities[selectedActivityID]}
        visible={modalVisible}
        onDismiss={handleDismissModal}
      />
      <ActivitiesList
        items={activities}
        onPressItem={handlePressItem}
      />
    </View>
  )
};
export default ActivityScreen;
