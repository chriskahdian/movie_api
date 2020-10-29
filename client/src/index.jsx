import React from 'react';
import ReactDOM from 'react-dom';

import {MainView} from './components/main-view/main-view.jsx';

//import statement to indicate that you need to bundle '/.index.scss'
import './index.scss';

//main componenet (will eventually use all the others)
class MyFlixApplication extends React.Component {
    render() {
        return <MainView/>;
    }
}

//find the root of app
const container = document.getElementsByClassName('app-container')[0];

//tells react to render app in root of DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);