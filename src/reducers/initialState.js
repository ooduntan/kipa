export const saveUser = {
  success: false,
  error: '',
  displayLoader: 'hide-element',
  shouldRedirect: false,
  userData: {}
};

export const userDocs = {
  docs: [],
  sharedDocs: [],
  success: false,
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
  header: 'MY DOCUMENTS'
};

export const roles = {
  roles: []
};
