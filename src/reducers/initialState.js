export const initialState = {
  success: false,
  error: '',
  displayLoader: 'hide-element',
  shouldRedirect: false,
  userData: {},
  displayFeedBack: 'none',
  feedBack:'Oops!!! An error occured.',
  feedBackColor: '#dd0404',
  editPreLoader: true,
  editFormState: true,
  docs: [],
  sharedDocs: [],
  docSuccess: false,
  modalData: {
    title: 'Create new document',
    actionText: 'Create',
    labelClass: '',
    docData: {
      title: '',
      content: '',
      access: ''
    }
  },
  redirect: false,
  header: 'MY DOCUMENTS',
  roles: []
};
