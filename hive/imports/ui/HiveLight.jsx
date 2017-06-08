import React, {PropTypes, Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import ons from 'onsenui';
import {Card, Page, Toolbar, ToolbarButton, Icon, Splitter, SplitterSide, List, ListItem,ListHeader, Range} from 'react-onsenui';
import {Light} from '../api/light.js';
import {Meteor} from 'meteor/meteor';
import {Chart} from 'chart.js';

export default class HiveLight extends Component{
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
      <LightContainer changeHandler = {this.onChangeThreshold} threshold = {this.state.threshold}/>
    );
  }

}

class PureHiveLight extends Component {
  componentDidUpdate()
  {
    let chartCanvas = this.refs.chart;
    var data = {};
    data.datasets = [{
        data: [],
        label: "Light",
        borderColor: "#3e95cd",
        fill: false
      }];
    this.props.graphlight.map((entry)=>{
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
        <div className = 'center'>Alert! Light: {row.text}</div>
        <div className = 'right'>{row.createdAt.toJSON()}</div>
      </ListItem>
    );
  }
  render(){
    return (
      <Page>
        <Card>
          <canvas ref = {'chart'} data = {this.props.currentlight} height = {'100'} width = {'200'}></canvas>
          <div className = "title right">Current Light: {this.props.currentlight.length >0 ? this.props.currentlight[0].text : ''}</div>
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
let LightContainer = createContainer((props)=>{
  Meteor.subscribe('light-list');
  return{
    currentlight: Light.find({}, {sort: {createdAt : -1}}).fetch(),
    graphlight: Light.find({}, {sort: {createdAt : 1}}).fetch(),
    alertnot: Light.find({lightvalue:{$lt: Number(props.threshold)}}).fetch(),
    changeHandler: props.changeHandler,
    threshold: props.threshold,
  }
}, PureHiveLight);

PureHiveLight.propTypes = {
  navigator: PropTypes.object,
  currentlight: PropTypes.array
};
