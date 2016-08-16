import expect from 'expect';
import * as docActions from '../../actions/documentAction';
import docReducer from '../../reducers/documentReducer';
import * as searchActions from '../../actions/searchAction'

describe('Document reducer', () => {
  const initialState = {
    user: {},
    docs: [],
    sharedDocs: []
  };

  it('Should add new user document to store with USER_DOCS_SUCCESS', () => {
    const action = docActions.gettingUserDocs();
    const newState = docReducer(initialState, action);

    expect(newState).toEqual(initialState);

  });

  it('Should add new user document to store with USER_DOCS_SUCCESS', () => {
    let newUserDoc ={doc: [{id: 1, title: 'this is our title', content: 'this is content'}]};
    const action = docActions.getDocsSuccess(newUserDoc);
    const newState = docReducer(initialState, action);
    
    expect(newState.docs.length).toBe(1);
    expect(newState.docs[0].id).toBe(1);
    expect(newState.docs[0].title).toBe(newUserDoc.doc[0].title);
    expect(newState.editSuccess).toBe(false);
    expect(newState.docSuccess).toBe(true);
  });

  it('Should add new user document to store with USER_DOCS_SUCCESS', () => {
    let newUserDoc =[{id: 1, title: 'this is our title', content: 'this is content'}];
    const action = docActions.getSharedDocSuccess(newUserDoc);
    const newState = docReducer(initialState, action);

    expect(newState.docs.length).toBe(0);
    expect(newState.sharedDocs.length).toBe(1);
    expect(newState.sharedDocs[0].id).toBe(1);
    expect(newState.sharedDocs[0].title).toBe(newUserDoc[0].title);
  });

  it('Should Update the store with docSuccess status', () => {
    const action = docActions.savingDoc();
    const newState = docReducer(initialState, action);

    expect(newState.docSuccess).toBe(false);
  });

  it('Should update the store with docSuccess status', () => {
    const action = docActions.createDocSuccess();
    const newState = docReducer(initialState, action);

    expect(newState.docSuccess).toBe(true);
  });

  it('Should update the store with docSuccess status', () => {
    const action = docActions.createDocSuccess();
    const newState = docReducer(initialState, action);

    expect(newState.docSuccess).toBe(true);
  });

  it('Should update the store remaining documents', () => {
    let newUserDoc =[{id: 1, title: 'this is our title', content: 'this is content'}];
    const action = docActions.docDeleted(newUserDoc);
    const newState = docReducer(initialState, action);

    expect(newState.docs).toBe(newUserDoc);
  });

  it('Should update the store with the document to be edited', () => {
    let newUserDoc =[{id: 1, title: 'this is our title', content: 'this is content'}];
    const action = docActions.preparePageForEdit(newUserDoc);
    const newState = docReducer(initialState, action);
    
    expect(newState.editDocumentData).toBe(newUserDoc);
  });
  
  it('Should update the store with the document to be edited', () => {
    let newUserDoc ={newDoc: [{id: 1, title: 'this is our title', content: 'this is content'}]};
    const action = docActions.updateStoreWithNewDoc(newUserDoc);
    const newState = docReducer(initialState, action);

    expect(newState.docs[0]).toBe(newUserDoc.newDoc);
    expect(newState.docSuccess).toBe(true);
  });

  it('Should update the store with the lazing loading status', () => {
    const action = docActions.addingMoreDocToStore();
    const newState = docReducer(initialState, action);

    expect(newState.lazyLoading).toBe(true);
  });

  it('Should update the store with the lazing loading status', () => {
    let newUserDoc ={doc: [{id: 1, title: 'this is our title', content: 'this is content'}]};
    const action = docActions.updatedStoreWithSharedDocs(newUserDoc);
    const newState = docReducer(initialState, action);

    expect(newState.lazyLoading).toBe(false);
    expect(newState.docs).toBe(newUserDoc.doc);
  });

  it('Should update the store with the update status', () => {
    const action = docActions.updateSearch();
    const newState = docReducer(initialState, action);

    expect(newState.updateSearch).toBe(true);
  });

  it('Should update the store with the update status', () => {
    const action = docActions.updatingDocData();
    const newState = docReducer(initialState, action);

    expect(newState.editPreLoader).toBe(false);
  });

  it('Should update the store with the update status', () => {
    const action = docActions.InvalidUser();
    const newState = docReducer(initialState, action);

    expect(newState.redirect).toBe(true);
  });

  it('Should update the store with the update status', () => {
    const ModalData = {id: 1, title: 'this is our title', content: 'this is content'};
    const action = docActions.createModalData(ModalData);
    const newState = docReducer(initialState, action);

    expect(newState.deleteDoc).toBe(ModalData);
  });

  it('Should update the store with the update status', () => {
    const action = docActions.editDocSuccess();
    const newState = docReducer(initialState, action);

    expect(newState.editPreLoader).toBe(true);
    expect(newState.editSuccess).toBe(true);
    expect(newState.editDocumentData.title).toBe('');
    expect(newState.editDocumentData.content).toBe('');
    expect(newState.editDocumentData.access).toBe('');
  });

  it('Should update the store with the update status', () => {
    const searchTerm = 'Test search';
    const searchResult = {doc: [{id: 1, title: 'this is our title', content: 'this is content'}]};
    const action = searchActions.searchCompleted(searchTerm, searchResult);
    const newState = docReducer(initialState, action);

    expect(newState.updateSearch).toBe(false);
    expect(newState.refreshed).toBe(false);
    expect(newState.search).toBe(searchResult.doc);
    expect(newState.searchTerm).toBe(searchTerm);
  });
});