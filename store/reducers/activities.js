/* eslint-disable import/prefer-default-export */
const initState = {
  items: [],
  selectedActivityID: -1
};

export const activities = (state = initState, action) => {
  const newState = { ...state };
  switch (action.type) {
    default: return state;
    case 'ACTIVITY_SET_ID':
      console.log('activity set ID');
      console.log(action)
      newState.selectedActivityID = action.activityIndex;
      break;
    case 'ACTIVITY_ADD':
      console.log('activity add');
      newState.items.push(action.activity);
      break;
    case 'ACTIVITY_MODIFY':
      console.log('activity modify');
      console.log(action)
      newState.items[action.activityIndex] = action.activity;
      break;
    case 'ACTIVITY_DELETE':
      console.log('activity delete');
      newState.items.splice(action.activityIndex, 1);
      break;
  }
  return newState;
};
