import { combineReducers } from 'redux'

import currentUser from './currentUser'
import userTabs from './userTabs'
import tabEditor from './tabEditor'

const rootReducer = combineReducers({
  currentUser,
  userTabs,
  tabEditor
})

export default rootReducer
