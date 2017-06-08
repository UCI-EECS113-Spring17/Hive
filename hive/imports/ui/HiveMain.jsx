import React, {PropTypes, Component} from 'react';

import ons from 'onsenui';
import {Page, Toolbar, ToolbarButton, Icon, Splitter, SplitterSide,SplitterContent, List, ListItem, Tabbar, Tab} from 'react-onsenui';
import HiveAudio from './HiveAudio.jsx'
import HiveMotion from './HiveMotion.jsx'
import HiveLight from './HiveLight.jsx'
import HiveTemp from './HiveTemp.jsx'

import {Temp} from '../api/temp.js';


export default class HiveMain extends Component{
  constructor(props){
    super(props);
    this.state = {
      index: 0
    };
  }

  renderToolbar(){
    return(
      <Toolbar>
        <div className = 'center'>Hive</div>
      </Toolbar>
    );
  }
  renderTabs(){
    return [
      {
        content: <HiveAudio/>,
      tab: <Tab key = 'HiveAudio' label = 'Noise Detection' icon = 'md-mic'/>
  },
  {
    content: <HiveMotion />,
  tab: <Tab key = 'HiveMotion' label = 'Motion Detection' icon = 'md-arrows'/>
},
{
  content: <HiveLight/>,
tab: <Tab key = 'HiveLight' label = 'Light Detection' icon = 'md-flare'/>
},
{
  content: <HiveTemp/>,
tab: <Tab key = 'HiveTemp' label = 'Temperature Detection' icon = 'md-fire'/>
}
    ];
  }


  render(){
    return(

      <Page renderToolbar = {this.renderToolbar}>
        <Tabbar
          position = 'top'
          index= {this.state.index}
          onPreChange = {(e)=>
            {
              if(e.index != this.state.index){
                this.setState({index: e.index});
              }
            }
          }
          renderTabs = {this.renderTabs}
          />

      </Page>
    );
  }

}

HiveMain.propTypes = {
  navigator: PropTypes.object
};
