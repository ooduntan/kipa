export const initialState = {
  success: false,
  error: '',
  displayLoader: 'hide-element',
  userCreated: false,
  createUserError: '',
  shouldRedirect: false,
  userData: {},
  displayFeedBack: 'none',
  feedBack: 'Oops!!! An error occured.',
  feedBackColor: '#dd0404',
  editPreLoader: true,
  editFormState: true,
  docs: [],
  sharedDocs: {
    doc: []
  },
  viewDoc: {
    title: '',
    content: '',
    access: '',
    creator: ''
  },
  docSuccess: false,
  editDocumentData: {
    title: '',
    content: '',
    access: []
  },
  deleteDoc: {
    title: '',
    content: '',
    access: []
  },
  editSuccess: false,
  search: [],
  lazyLoading: false,
  fullOwnedDoc: false,
  redirect: false,
  header: 'MY DOCUMENTS',
  roles: [],
  refreshed: true,
  updateSearch: false,
  searchTerm: ''
};
