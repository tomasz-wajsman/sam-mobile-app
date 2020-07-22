import React from 'react';
import { View } from 'react-native';
import { Card, Title, List, Button } from 'react-native-paper';
import ActivitiesListItem from './ActivitiesListItem';
import { connect } from 'react-redux';

const ActivitiesList = ({ activities, onModify, onDeleteActivity }) => {
  const add = () => {
    onModify('add');
  };
  const modify = activityID => {
    onModify('edit', activityID);
  };

  return (
    <View>
      <Title>Activities</Title>
      {
        activities.map((activity, index) => 
        <ActivitiesListItem
          key={String(index)}
          details={activity}
          onPressEdit={() => modify(activity['_id'])}
          onDeleteActivity={onDeleteActivity}
        />)
      }
      <Button onPress={() => add()}>Add a new entry</Button>
    </View>
  );
};

const mapStateToProps = state => {
  return { activities: state.activities.items }
};
const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(ActivitiesList);
