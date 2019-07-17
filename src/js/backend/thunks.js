/* @flow */
import type {Cluster} from "../state/clusters/types"
import type {Span} from "../BoomClient/types"
import type {Thunk} from "../state/types"
import {createError} from "../state/errors"
import {setClusterError} from "../state/clusters/actions"
import ErrorFactory from "../models/ErrorFactory"

export function fetchSearch(program: string, span: Span, space: string): Thunk {
  return (dispatch, g, boom) =>
    boom
      .search(program, {searchSpan: span, searchSpace: space})
      .error((e) => handleError(e, dispatch))
}

export function fetchSpaces() {
  return promise((boom) => boom.spaces.list())
}

export function fetchSpace(name: string) {
  return promise((boom) => boom.spaces.get(name))
}

export function createSpace(name: string): Thunk {
  return promise((boom) => boom.spaces.create({name}))
}

export function testConnection(cluster: Cluster): Thunk {
  return function(dispatch, _, boom) {
    boom.setOptions({
      host: cluster.host,
      port: parseInt(cluster.port),
      username: cluster.username,
      password: cluster.password
    })
    return dispatch(fetchSpaces())
  }
}

export function inspectSearch(lookytalk: string): Thunk {
  return function(_, __, boom) {
    try {
      return boom.inspectSearch(lookytalk)
    } catch {
      return null
    }
  }
}

function promise(request): Thunk {
  return function(dispatch, _, boom) {
    return new Promise((resolve, reject) => {
      request(boom)
        .done((...args) => {
          dispatch(setClusterError(""))
          resolve(...args)
        })
        .error((e) => {
          handleError(e, dispatch)
          reject(e)
        })
    })
  }
}

function handleError(e, dispatch) {
  let appError = ErrorFactory.create(e)
  dispatch(setClusterError(appError.message()))
  dispatch(createError(e))
}