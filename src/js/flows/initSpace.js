/* @flow */
import type {Thunk} from "../state/types"
import {globalDispatch} from "../state/GlobalContext"
import ErrorFactory from "../models/ErrorFactory"
import Notice from "../state/Notice"
import Search from "../state/Search"
import SearchBar from "../state/SearchBar"
import Spaces from "../state/Spaces"
import Tab from "../state/Tab"
import brim from "../brim"
import submitSearch from "./submitSearch"

export const initSpace = (spaceId: string): Thunk => (
  dispatch,
  getState,
  {zealot}
) => {
  const clusterId = Tab.clusterId(getState())
  return zealot.spaces
    .get(spaceId)
    .then(brim.interop.spacePayloadToSpace)
    .then((space) => {
      globalDispatch(Spaces.setDetail(clusterId, space))
      dispatch(Search.setSpace(space.id))
      dispatch(Search.setSpanArgs(brim.space(space).everythingSpan()))
      dispatch(SearchBar.removeAllSearchBarPins())
      dispatch(SearchBar.changeSearchBarInput(""))
      dispatch(submitSearch({history: false, investigation: false}))
    })
    .catch((error) => {
      console.error(error)
      dispatch(Notice.set(ErrorFactory.create(error)))
    })
}
