import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import styles from '../styles';
import ActivitiesList from '../components/ActivitiesList';
import ActivityEditorModal from '../components/modals/ActivityEditorModal';
import util from '../util';
import { connect } from 'react-redux';

import { setActivities, setActivityIndex, addActivity, modifyActivity, deleteActivity } from '../store/actions';

// API client
import SamClient from '../clients/sam';
import { ActivityIndicator, Paragraph, Card, Button } from 'react-native-paper';
const client = new SamClient(require('../config/config.json').api_url);

const ActivityScreen = ({
  activities,
  selectedActivityIndex,
  setActivityIndex,
  setActivities,
  addActivity,
  modifyActivity,
  deleteActivity
}) => {

  // loading
  const [loading, setLoading] = useState(true);
  const [loadingFailed, setLoadingFailed] = useState(false);
  const [loadingErrorText, setLoadingErrorText] = useState('');

  const loadActivities = () => {
    let activities;
    setLoading(true);
    client.getActivities()
      .then(res => {
        activities = res;
        setLoadingFailed(false);
      })
      .catch(err => {
        activities = [];
        setLoadingFailed(true);
        setLoadingErrorText(err);
      })
      .finally(() => {
        setLoading(false);
        setActivities(activities);
      });
  };

  useEffect(() => {
    // load the activities
    loadActivities();
  }, []);

  const [modifyModalVisible, setModifyModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const getActivityIndexByID = activityID => activities.findIndex(activity => activity['_id'] === activityID);
  const getActivityIdByIndex = activityIndex => activities[activityIndex]['_id'];

  const handleAdd = async activityDetails => {
    // add an activity
    const details = { ...activityDetails };
    try {
      // convert dates to Unix format
      details.start_date = util.date.dateToUnix(activityDetails.start_date);
      details.end_date = util.date.dateToUnix(activityDetails.end_date);
      // add the activity
      const res = await client.createActivity(details);
      if (res) {
        addActivity(res);
        setModifyModalVisible(false);
      }
    } catch (e) {
      console.error(err);
    }
  };
  const handleEdit = async (activityID, activityDetails) => {
    // modify an activity
    const details = { ...activityDetails };
    try {
      // convert dates to Unix format
      details.start_date = util.date.dateToUnix(activityDetails.start_date);
      details.end_date = util.date.dateToUnix(activityDetails.end_date);
      // modify the activity
      const res = await client.modifyActivity(activityID, details);
      if (res) {
        modifyActivity(selectedActivityIndex, details);
        setModifyModalVisible(false);
        setActivityIndex(-1);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const handleDelete = activityID => {
    // delete an activity
    console.log(activityID)
    client.deleteActivity(activityID)
      .then(res => {
        if (res) {
          deleteActivity(getActivityIndexByID(activityID));
        }
      })
      .catch(err => {
        console.error(err);
      });
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

  // render the app
  if (loading) {
    // app is loading
    return (
      <ActivityIndicator />
    );
  } else if (loadingFailed) {
    // loading has failed
    return (
      <Card>
        <Card.Title title={"Loading failed"} />
        <Card.Content>
          <Paragraph>
            {`Reason: ${loadingErrorText}`}
          </Paragraph>
          <Button onPress={loadActivities}>Retry</Button>
        </Card.Content>
      </Card>
    );
  }

  // show the list
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
  setActivities,
  addActivity,
  modifyActivity,
  deleteActivity,
  setActivityIndex
};

export default connect(mapStateToProps, mapDispatchToProps)(ActivityScreen);
