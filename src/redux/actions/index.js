import {HIGHLIGHT} from './actionTypes'

export const change = (path) => {
    return {
        type: HIGHLIGHT,
        payload: path
    }
}
