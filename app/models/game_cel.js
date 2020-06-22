// Gamecells 
//
// useStatus -  status:
// - "use" - cell with a ship (shipId its id among all othe other ships)
// - "free" - free cell, can be used
// - "locked" - empty cell, can't be used because there is a ship on the next cell.
//
// findStatus - dicovery state:
// - "undefined" - cell unknown
// - "locked" - known that the cell is empty since there is a ship next to it
// - "unuse" - is checked and empty
// - "use" - part of the beaten ship
// - "ship" - beaten ship

var GameCel = Backbone.Model.extend({
   defaults: {
      id: null,    // id has "XxY" eg "2x8"
      useStatus: "free",
      findStatus: "undefined",
      shipId: null
   }
});

// 100 elements(10*10).
var GameCelCollection = Backbone.Collection.extend({
  model: GameCel,

  initialize: function() {
    var self = this;
    for(var y=0; y<10; y++) {
      for(var x=0; x<10; x++) {
        self.add({id: (x+"x"+y)}, {silent: true});
      }
    }
  },

  // if the cell is available to set a ship
  validation: function(newShip) {
    var cels = newShip.get("celArray");
    var tmpCel;
    for(var i=0; i<cels.length; i++) {
      tmpCel = this.get(cels[i]);
      if(_.isEmpty(tmpCel)) return false;
      if(tmpCel.get("useStatus")!=="free") return false;
    }
    return true;
  },

  // 設定船的位置 (+checking which ones are not available)
  placing: function(newShip) {
    var cels = newShip.get("celArray");
    var tmpCel, x, y, tmp1Cel, lst, ids;
    var self = this;
    for(var i=0; i<cels.length; i++) {
      tmpCel = this.get(cels[i]);
      tmpCel.set({useStatus: "use", shipId: newShip.get("id")});
      lst = cels[i].split("x");
      x = lst[0]*1;
      y = lst[1]*1;
      ids = _.map([[0,-1], [1,-1], [1,0], [1,1], [0,1], [-1,-1], [-1,0], [-1,1]], function(delta) {return ((x+delta[0])+"x"+(y+delta[1]));})
      _.each(ids, function(id) {
        tmp1Cel = self.get(id);
        if( !_.isEmpty(tmp1Cel) && tmp1Cel.get("useStatus")==="free" ) {
          tmp1Cel.set({useStatus: "locked"});
        }
      });
    }
    return true;
  },

  // 畫出不可有船的cells (when searched)
  lockPosition: function(celId) {
    var self = this;
    var lst = celId.split("x");
    var x = lst[0]*1;
    var y = lst[1]*1;
    _.each([[1,-1], [1,1], [-1,-1], [-1,1]], function(delta) {
      var cId = ((x+delta[0])+"x"+(y+delta[1]));
      var cel = self.get(cId);
      if( !_.isEmpty(cel) && cel.get("findStatus")==="undefined") {
        cel.set({findStatus: "locked"});
      }
    });
  }

});
