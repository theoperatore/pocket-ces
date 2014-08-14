exports.name = 'input-shoot';
exports.reqs = ['position', 'player-controlled'];
exports.actionEach = function(pkt, entity, position) {

  var input = pkt.firstData('input-manager');

  // basic shot - space bar
  if (input.pressed[32]) {
    
    pkt.entity(null, {
      'bullet' : null,
      'position' : {
        x : position.p.x + 20,
        y : position.p.y,
        ddx : 0.002
      },
      'shape' : {
        os_points : [
          {x:  10, y:  0},
          {x:  10, y: -5},
          {x: -10, y: -5},
          {x: -10, y:  5},
          {x:  10, y:  5}
        ]
      },
      'aabb' : {
        anchor : { x:position.p.x + 20, y:position.p.y }
      }
    });

  }


}