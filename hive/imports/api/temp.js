import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';

export const Temp = new Meteor.Collection('temp');

if(Meteor.isServer){
  Meteor.publish('temp-list', function tasksPublication(){
    return Temp.find();
  });
}
