const themes = {
  prairie: 'prairie',
  desert: 'desert',
  arctic: 'arctic',
  mountain: 'mountain',

  nextLevel(theme) {
    if (theme === this.prairie) {
      return this.desert;
    }
    if (theme === this.desert) {
      return this.arctic;
    }
    if (theme === this.arctic) {
      return this.mountain;
    }
    return false;
  },

};

export default themes;
