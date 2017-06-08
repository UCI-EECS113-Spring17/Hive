import React, {Component} from 'react';

import {Navigator, Page, Toolbar, ToolbarButton, Icon, Splitter, SplitterSide,SplitterContent, List, ListItem} from 'react-onsenui';
import HiveMain from './HiveMain.jsx';


// App component - initial point of app with parent navigator
//for stack navigations

export default class App extends Component{
  constructor(props)
  {
    super(props);

  }

  renderPage(route, navigator) {
    return (<route.component key = {route.key} navigator = {navigator}{...route.props}/>);
  }

  render(){
    return (
      <Navigator
        renderPage = {this.renderPage}
        initialRoute = {{component: HiveMain, key: 'HIVE_MAIN', hasBackButton : true}}
      />


    );
  }
}
