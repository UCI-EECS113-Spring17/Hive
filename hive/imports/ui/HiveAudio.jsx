import React, {PropTypes, Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import ons from 'onsenui';
import {Card, Page, Toolbar, ToolbarButton, Icon, Splitter, SplitterSide, List, ListItem,ListHeader, Range} from 'react-onsenui';
import {Noise} from '../api/noise.js';
import {Meteor} from 'meteor/meteor';
import {Chart} from 'chart.js';

export default class HiveAudio extends Component{
  constructor(props){
    super(props);
    this.state = {
      threshold : 20
    };
    this.onChangeThreshold = this.onChangeThreshold.bind(this);
  }

  onChangeThreshold(e)
  {
    this.setState({threshold: e.target.value});
  }


  render(){
    return(
      <NoiseContainer changeHandler = {this.onChangeThreshold} threshold = {this.state.threshold}/>
    );
  }

}

class PureHiveAudio extends Component {
  componentDidUpdate()
  {
    let chartCanvas = this.refs.chart;
    var data = {};
    data.datasets = [{
        data: [],
        label: "Noise",
        borderColor: "#3e95cd",
        fill: false
      }];
    this.props.graphnoise.map((entry)=>{
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
        <div className = 'center'>Alert! Noise: {row.text}</div>
        <div className = 'right'>{row.createdAt.toJSON()}</div>
      </ListItem>
    );
  }
  render(){
    return (
      <Page>
        <Card>
          <canvas ref = {'chart'} data = {this.props.currentnoise} height = {'100'} width = {'200'}></canvas>
          <div className = "title right">Current Noise: {this.props.currentnoise.length >0 ? this.props.currentnoise[0].text : ''}</div>
          <span>-100</span>
          <Range
            onChange = {this.props.changeHandler}
            value = {Number(this.props.threshold)}
            min = {-100}
            max = {100}
            />
          <span>+100</span>
          <p>
            Threshold : {this.props.threshold}
          </p>
          <List
            dataSource = {this.props.alertnot}
            renderRow = {this.renderRow}
            renderHeader = {() =><ListHeader>Threshold Alerts</ListHeader> }
            />

        </Card>
      </Page>


    );
  }
}
let NoiseContainer = createContainer((props)=>{
  Meteor.subscribe('noise-list');
  return{
    currentnoise: Noise.find({}, {sort: {createdAt : -1}}).fetch(),
    graphnoise: Noise.find({}, {sort: {createdAt : 1}}).fetch(),
    alertnot: Noise.find({noisevalue:{$gt: Number(props.threshold)}}).fetch(),
    changeHandler: props.changeHandler,
    threshold: props.threshold,
  }
}, PureHiveAudio);

PureHiveAudio.propTypes = {
  navigator: PropTypes.object,
  currentnoise: PropTypes.array
};
