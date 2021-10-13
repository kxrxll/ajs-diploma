export default class GameStateService {
  constructor(storage) {
    this.storage = storage;
  }

  save(state) {
    if (this.storage.state) {
      this.storage.removeItem('state');
    }
    this.storage.setItem('state', JSON.stringify(state));
  }

  load() {
    try {
      return JSON.parse(this.storage.getItem('state'));
    } catch (e) {
      throw new Error('Invalid state');
    }
  }
}
