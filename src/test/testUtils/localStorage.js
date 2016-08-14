(function (window) {
  window.localStorage = {
    token: '',
    getItem: function () {
      return this.token;
    },
    setItem: function (name, token) {
      this.token = token;
    },
    removeItem: function () {
      this.token = null;
    }
  };
}(window));