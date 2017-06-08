import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';

export const Noise = new Meteor.Collection('noise');

if(Meteor.isServer){
  Meteor.publish('noise-list', function tasksPublication(){
    return Noise.find();
  });
}
