import { combineReducers } from 'redux';

import about from './about/reducers';
import activate from './activate/reducers';
import confirmUninstallApp from './confirm-uninstall-app/reducers';
import createCustomApp from './create-custom-app/reducers';
import preferences from './preferences/reducers';

export default combineReducers({
  about,
  activate,
  confirmUninstallApp,
  createCustomApp,
  preferences,
});
