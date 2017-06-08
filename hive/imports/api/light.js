import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';

export const Light = new Meteor.Collection('light');

if(Meteor.isServer){
  Meteor.publish('light-list', function tasksPublication(){
    return Light.find();
  });
}
