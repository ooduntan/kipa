import expect from 'expect';
import * as actionTypes from '../../actions/actionType';
import * as documentActions from '../../actions/documentAction';

describe('User actions', () => {
  const docs = {
    id: 1,
    content: 'This is the content',
    title: 'This is the title'
  };

  it('Should update store with user searched documents', () => {
    const expectedResult = {
      type: actionTypes.SHARED_DOCUMENTS,
      data: {
        sharedDocs: docs
      }
    };
    const action = documentActions.getSharedDocSuccess(docs);

    expect(action).toEqual(expectedResult);
  });

  it('Should dispatch searching user docs', () => {
    const expectedResult = {
      type: actionTypes.GETTING_USER_DOCS,
    };
    const action = documentActions.gettingUserDocs();

    expect(action).toEqual(expectedResult);
  });

  it('Should update store with user document', () => {
    const docStore = {doc: docs};
    const expectedResult = {
      type: actionTypes.USER_DOCS_SUCCESS,
      data: {
        docSuccess: true,
        docs: docs,
        editSuccess: false
      }
    };
    const action = documentActions.getDocsSuccess(docStore);

    expect(action).toEqual(expectedResult);
  });

  it('Should dispatch CREATING_DOC to show preloader', () => {
    const expectedResult = {
      type: actionTypes.CREATING_DOC,
      data: {
        docSuccess: false
      }
    };
    const action = documentActions.savingDoc();

    expect(action).toEqual(expectedResult);
  });

  it('Should update store with new docuemnts', () => {
    const newDoc = {newDoc: docs};
    const expectedResult = {
      type: actionTypes.UPDATE_STORE_WITH_NEW_DOC,
      data: {
        newDoc: [docs],
        successState: true
      }
    };
    const action = documentActions.updateStoreWithNewDoc(newDoc);

    expect(action).toEqual(expectedResult);
  });

  it('Should update store with document data for edit', () => {
    const expectedResult = {
      type: actionTypes.PREPARE_EDIT_PAGE,
      data: {
        editDocumentData: docs
      }
    };
    const action = documentActions.preparePageForEdit(docs);

    expect(action).toEqual(expectedResult);
  });

  it('Should update store', () => {
    const expectedResult = {
      type: actionTypes.DELETE_DOC_SUCCESS,
      data: {
        docs: docs
      }
    };
    const action = documentActions.docDeleted(docs);

    expect(action).toEqual(expectedResult);
  });


  it('Should update store', () => {
    const expectedResult = {
      type: actionTypes.UPDATING_DOC_DATA,
      data: {
        editPreLoader: false
      }
    };
    const action = documentActions.updatingDocData();

    expect(action).toEqual(expectedResult);
  });
  
  it('Should update store', () => {
    const expectedResult = {
      type: actionTypes.DELETE_DOC_SUCCESS,
      data: {
        sharedDocs: docs
      }
    };
    const action = documentActions.sharedDocsDeleted(docs);

    expect(action).toEqual(expectedResult);
  });

  it('Should update store', () => {
    const expectedResult = {
      type: actionTypes.CREATE_DOC_SUCCESS,
      data: {
        docSuccess: true
      }
    };
    const action = documentActions.createDocSuccess();

    expect(action).toEqual(expectedResult);
  });

  it('Should update store', () => {
    const expectedResult = {
      type: actionTypes.UPDATE_STORE_WITH_USER_DATA,
      data: {
        userData: docs
      }
    };
    const action = documentActions.updateStoreWithUserData(docs);

    expect(action).toEqual(expectedResult);
  });

  it('Should update store', () => {
    const expectedResult = {
      type: actionTypes.UPDATED_DOCUMENT_DATA,
      data: {
        editPreLoader: true,
        editSuccess: true,
        editDocumentData: {
          title: '',
          content: '',
          access: ''
        }
      }
    };
    const action = documentActions.editDocSuccess(docs);

    expect(action).toEqual(expectedResult);
  });
  
  it('Should update store', () => {
    const expectedResult = {
      type: actionTypes.UPDATE_SEARCH_RESULT,
      data: {
        updateSearch: true
      }
    };
    const action = documentActions.updateSearch();

    expect(action).toEqual(expectedResult);
  });
  
  it('Should update store', () => {
    const expectedResult = {
      type: actionTypes.REDIRECT_USER,
      data: {redirect: true}
    };
    const action = documentActions.InvalidUser();

    expect(action).toEqual(expectedResult);
  });

  it('Should update store', () => {
    const expectedResult = {
      type: actionTypes.CREATE_MODAL_FOR_DELETE,
      data: {
        deleteDoc: docs
      }
    };
    const action = documentActions.createModalData(docs);

    expect(action).toEqual(expectedResult);
  });
  
  it('Should update store', () => {
    const expectedResult = {
      type: actionTypes.ADDING_MORE_DOC_TO_STORE,
      data: {lazyLoading: true}
    };
    const action = documentActions.addingMoreDocToStore();

    expect(action).toEqual(expectedResult);
  });
  
  it('Should update store', () => {
    let result = {doc: docs}
    const expectedResult = {
      type: actionTypes.ADD_MORE_DOC_TO_STORE,
      data: {
        docs: result.doc,
        lazyLoading: false
      }
    };
    const action = documentActions.updatedStoreWithMoreDocs(result);

    expect(action).toEqual(expectedResult);
  });
  
  it('Should update store', () => {
    let result = {doc: docs}
    const expectedResult = {
      type: actionTypes.ADD_MORE_SHARED_DOCS,
      data: {
        docs: result.doc,
        lazyLoading: false
      }
    };
    const action = documentActions.updatedStoreWithSharedDocs(result);

    expect(action).toEqual(expectedResult);
  });
});