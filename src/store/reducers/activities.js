/* eslint-disable import/prefer-default-export */

const initState = {
  items: [],
  selectedActivityIndex: -1
};

export const activities = (state = initState, action) => {
  const newState = { ...state };
  switch (action.type) {
    default: return state;
    case 'ACTIVITIES_FETCHED':
      newState.items = action.activities;
      break;
    case 'ACTIVITY_SET_INDEX':
      newState.selectedActivityIndex = action.activityIndex;
      break;
    case 'ACTIVITY_ADD':
      newState.items.push(action.activity);
      break;
    case 'ACTIVITY_MODIFY':
      newState.items[action.activityIndex] = action.activityDetails;
      break;
    case 'ACTIVITY_DELETE':
      newState.items.splice(action.activityIndex, 1);
      break;
  }
  return newState;
};
