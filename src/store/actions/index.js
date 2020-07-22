/* eslint-disable import/prefer-default-export */
export const setActivities = activities => ({
  type: 'ACTIVITIES_FETCHED',
  activities
});
export const setActivityIndex = activityIndex => ({
  type: 'ACTIVITY_SET_INDEX',
  activityIndex
});
export const addActivity = activity => ({
  type: 'ACTIVITY_ADD',
  activity
});
export const modifyActivity = (activityIndex, activityDetails) => ({
  type: 'ACTIVITY_MODIFY',
  activityIndex,
  activityDetails
});
export const deleteActivity = activityIndex => ({
  type: 'ACTIVITY_DELETE',
  activityIndex
});
