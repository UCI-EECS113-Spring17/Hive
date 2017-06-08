import React, {PropTypes, Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import ons from 'onsenui';
import {Card, Page, Toolbar, ToolbarButton, Icon, Splitter, SplitterSide, List, ListItem,ListHeader, Range} from 'react-onsenui';
import {Motion} from '../api/motion.js';
import {Meteor} from 'meteor/meteor';
import {Chart} from 'chart.js';

export default class HiveMotion extends Component{
  constructor(props){
    super(props);
    this.state = {
      threshold : 40
    };
    this.onChangeThreshold = this.onChangeThreshold.bind(this);
  }

  onChangeThreshold(e)
  {
    this.setState({threshold: e.target.value});
  }


  render(){
    return(
      <MotionContainer changeHandler = {this.onChangeThreshold} threshold = {this.state.threshold}/>
    );
  }

}

class PureHiveMotion extends Component {
  componentDidUpdate()
  {
    let chartCanvas = this.refs.chart;
    var data = {};
    data.datasets = [{
        data: [],
        label: "Motion",
        borderColor: "#3e95cd",
        fill: false
      }];
    this.props.graphmotion.map((entry)=>{
      data.datasets[0].data.push(Number(entry.text));
    });

    let myChart = new Chart(chartCanvas,{
      type:'line',
      data: data,
      options:{

      }
    });
  }
  renderRow(row, index)
  {
    return(
      <ListItem key = {index}>
        <div className = 'center'>Alert! Motion: {row.text}</div>
        <div className = 'right'>{row.createdAt.toJSON()}</div>
      </ListItem>
    );
  }
  render(){
    return (
      <Page>
        <Card>
          <canvas ref = {'chart'} data = {this.props.currentmotion} height = {'100'} width = {'200'}></canvas>
          <List
            dataSource = {this.props.currentmotion}
            renderRow = {this.renderRow}
            renderHeader = {() =><ListHeader>Threshold Alerts</ListHeader> }
            />

        </Card>
      </Page>


    );
  }
}
let MotionContainer = createContainer((props)=>{
  Meteor.subscribe('motion-list');
  return{
    currentmotion: Motion.find({}, {sort: {createdAt : -1}}).fetch(),
    graphmotion: Motion.find({}, {sort: {createdAt : 1}}).fetch()
  }
}, PureHiveMotion);

PureHiveMotion.propTypes = {
  navigator: PropTypes.object,
  currentmotion: PropTypes.array
};
