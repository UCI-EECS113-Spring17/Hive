import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';

export const Motion = new Meteor.Collection('motion');

if(Meteor.isServer){
  Meteor.publish('motion-list', function tasksPublication(){
    return Motion.find();
  });
}
