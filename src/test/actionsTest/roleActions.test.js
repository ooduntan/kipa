import expect from 'expect';
import * as actionTypes from '../../actions/actionType';
import * as roleActions from '../../actions/roleActions';

describe('User actions', () => {
  it('Should add roles to the store', () => {
    const roleData = {id: 1, role: 'Fellow'};
    const expectedResult = {
      type: actionTypes.FETCH_ROLES_SUCCESS,
      data: roleData
    };
    const action = roleActions.getDocsSuccess(roleData);

    expect(action).toEqual(expectedResult);
  });
});