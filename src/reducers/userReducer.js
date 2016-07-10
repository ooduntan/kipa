export default function userReducer(state = {}, action) {
  switch (action.type) {
    case 'CREATE_USER':
      console.log(action.data);
      return state
      break;
    default:
    return state;
  }
}
