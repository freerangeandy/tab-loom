import { combineReducers } from 'redux'

import chords from './chords'
import currentUser from './currentUser'
import userTabs from './userTabs'
import tabEditor from './tabEditor'

const rootReducer = combineReducers({
  chords,
  currentUser,
  userTabs,
  tabEditor
})

export default rootReducer
