const storage = {
  getUser: () => {
    return JSON.parse(window.localStorage.getItem(`user`) as string);
  },
  setUser: (user: string) => {
    window.localStorage.setItem(`user`, JSON.stringify(user));
  },
  clearUser: () => {
    window.localStorage.removeItem(`user`);
  },
};

export default storage;