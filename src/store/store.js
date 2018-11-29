/**
 *    Created by tomokokawase
 *    On 2018/11/28
 *    阿弥陀佛，没有bug!
 */
let store = {
  debug: true,
  state: {
    userId: null,
  },
  setLogin (newValue) {
    if (this.debug) console.log('setLogin triggered with', newValue);
    this.state.userId = newValue
  },
  clearLogin () {
    if (this.debug) console.log('clearLogin triggered');
    this.state.userId = null
  }
};

export default store;
