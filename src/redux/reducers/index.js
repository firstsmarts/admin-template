import {HIGHLIGHT} from '../actions/actionTypes'

let currentPath = location.pathname.slice(1)
const changeHightLight = (state=currentPath.indexOf('learn') >= 0 || currentPath == '' || currentPath.indexOf('lesson') >= 0 ? 'index' : currentPath.indexOf('result') >= 0 ? 'result' : currentPath,action) => {
    switch(action.type){
        case HIGHLIGHT:
        return action.payload
        break
        default:
        return state
    }
}


export default changeHightLight