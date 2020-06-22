// Ships' positions
//
// id採用 "SizeXNumber" 之形式 ∴ "4x3" 第四船 4th ship in among 3cell ships
// findStatus → "not-found ", "found", "killed"
// rotation →: 0 (vert), 1 (horiz)
// celArray -  id of the cells, occupied by ship
var Ship = Backbone.Model.extend({
    defaults: {
      id: null,
      rotation: 0,
      isKilled: false,
      celArray: []
    },
    generate: function(num, length) {
      var startX = _.random(0,9);
      var startY = _.random(0,9);
      var rot = _.random(0,1);
      var celId = startX+"x"+startY;
      var cels = [celId];
      for(var i=1; i<length; i++) {
        celId = rot==0 ? (startX+i)+"x"+startY : startX+"x"+(startY+i);
        cels.push(celId);
      }
      this.set({id: (num+"x"+length), rotation: rot, celArray: cels});
    }
});

var ShipCollection = Backbone.Collection.extend({
  model: Ship
});
