import { Meteor } from 'meteor/meteor';

import {Temp} from '../imports/api/temp.js';
import {Light} from '../imports/api/light.js';
import {Motion} from '../imports/api/motion.js';
import {Noise} from '../imports/api/noise.js';
Meteor.startup(() => {
  // code to run on server at startup
  return Meteor.methods({
    removeAllTemp:function(){
      return Temp.remove({});
    },
    removeAllLight: function(){
      return Light.remove({});
    },
    removeAllMotion: function(){
      return Motion.remove({});
    },
    removeAllNoise: function(){
      return Noise.remove({});
    }
  })

});
