import { produce } from 'immer';

const INITIAL_STATE = {
  profile: null,
  barStyle: null,
  backgroundColor: null,
};

export default function user(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN_SUCCESS': {
        draft.profile = action.payload.user;
        break;
      }
      case '@auth/SIGN_OUT': {
        draft.profile = null;
        break;
      }
      case '@user/COLOR': {
        draft.barStyle = action.payload.styleBar;
        draft.backgroundColor = action.payload.backgroundColor;
        break;
      }
      default:
    }
  });
}
