export function createUser(user) {
  return {
    type: 'CREATE_USER',
    data: user
  };
}
