import expect from 'expect';
import * as actionTypes from '../../actions/actionType';
import * as searchActions from '../../actions/searchAction';

describe('User actions', () => {
  const userData = {id: 1, username: 'Stephen', password: 'Odunnnnnta'};

  it('Should update the store search result', () => {
    const doc = {id: 1, title: 'Fellow', content: 'this is a mock content'};
    const searchResult = {doc : doc};
    const searchTerm = 'This is search';
    const expectedResult = {
      type: actionTypes.SEARCH_COMPLETED,
      data: {
        updateSearch: false,
        refreshed: false,
        search: doc,
        searchTerm: searchTerm
      }
    };
    const action = searchActions.searchCompleted(searchTerm, searchResult);

    expect(action).toEqual(expectedResult);
  });
});