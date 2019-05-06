import copy from './dom/copy.js';
import callPhone from './dom/phone.js';
import browser from './dom/browser.js';
import {
  parseTime,
  formatTime,
} from './fn/time.js'
import getSafe from './fn/getSafe.js'

import MyDb, { getStore, setStore } from './h5/db.js';

export {
  copy,
  setStore,
  getStore,
  callPhone,
  MyDb,
  browser,
  getSafe,
  parseTime,
  formatTime,
}
