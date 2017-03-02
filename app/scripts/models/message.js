var Backbone = require('backbone');

var Message = Backbone.Model.extend({
 idAttribute: "_id",
 defaults: {
   user: 'anonymous'
 }
});

var MessageCollection = Backbone.Collection.extend({
  model: Message,
  url: 'https://tiny-parse-server.herokuapp.com/classes/Message'
});

module.exports = {
  Message,
  MessageCollection
};
