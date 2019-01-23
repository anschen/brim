/* @flow */

import React from "react"
import ReactDOM from "react-dom"
import * as Doc from "../lib/Doc"
import {CSSTransition} from "react-transition-group"

type Props = {
  children: *,
  style: Object,
  isOpen: boolean,
  onClose: Function
}

export default class Portal extends React.Component<Props, Object> {
  render() {
    if (!this.props.isOpen) return null
    return ReactDOM.createPortal(
      <div className="portal-overlay" onClick={this.props.onClose}>
        <CSSTransition
          classNames="portal-item"
          in={true}
          timeout={{enter: 150}}
          appear
        >
          <div className="portal-item" style={this.props.style}>
            {this.props.children}
          </div>
        </CSSTransition>
      </div>,
      Doc.id("context-menu-root")
    )
  }
}
