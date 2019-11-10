import { TOKEN_KEY } from '../constants/local-storage-const';

const auth = {
  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },

  setToken(token) {
    return localStorage.setItem(TOKEN_KEY, token);
  },

  signOut() {
    if (localStorage) {
      localStorage.clear();
    }
  }
};

export default auth;
