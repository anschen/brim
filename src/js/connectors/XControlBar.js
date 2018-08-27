import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import ControlBar from "../components/ControlBar"
import {getLeftSidebarIsOpen, getRightSidebarIsOpen} from "../reducers/view"
import * as actions from "../actions/view"

const stateToProps = state => ({
  leftSidebarIsOpen: getLeftSidebarIsOpen(state),
  rightSidebarIsOpen: getRightSidebarIsOpen(state)
})

export default connect(
  stateToProps,
  dispatch => bindActionCreators(actions, dispatch)
)(ControlBar)
