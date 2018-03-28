import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {browserHistory} from 'react-router'
import Bundle from './utils/bundles'
import Index from 'bundle-loader?lazy&name=index!@/index'
import Basic from 'bundle-loader?lazy&name=basic!@components/basic'

const createComponent = (Com) => (props) => (
    <Bundle load={Com}>
        {(Com) => Com
            ? <Com {...props} />
            : ''
}
    </Bundle>
)

const getRouter = () => {
    return (
        <Router history={browserHistory}>
            <div>
                <Route path="/" component={createComponent(Basic)}/>
            </div>
        </Router>
    )
}

export default getRouter