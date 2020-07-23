import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Card, Title, List, Button, Headline, Paragraph } from 'react-native-paper';

import ActivitiesListItem from './ActivitiesListItem';
import styles from '../styles';

const ActivitiesList = ({ activities, onModify, onDeleteActivity }) => {
  const add = () => {
    onModify('add');
  };
  const modify = activityID => {
    onModify('edit', activityID);
  };

  if (activities.length === 0) {
    // show no activities message
    return (
      <>
        <Paragraph>No activities added.</Paragraph>
        <Button
          style={styles.layout.button}
          mode="contained"
          onPress={() => add()}
        >
          Add a new entry
        </Button>
      </>
    );
  }
  return (
    <>
      {
        activities.map((activity, index) =>
          <ActivitiesListItem
            key={String(index)}
            details={activity}
            onPressEdit={() => modify(activity['_id'])}
            onDeleteActivity={onDeleteActivity}
          />)
      }
      <Button
        style={styles.layout.button}
        mode="contained"
        onPress={() => add()}
      >
        Add a new entry
        </Button>
    </>
  );
};

const mapStateToProps = state => {
  return { activities: state.activities.items }
};
const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(ActivitiesList);
