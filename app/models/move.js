// Описание хода

var Move = Backbone.Model.extend({
    defaults: {
      celId: null,            // cell id 
      isSelf: null,           // player's turn
      findStatus: "undefined" // statuses same as in GameCel
    }
});

