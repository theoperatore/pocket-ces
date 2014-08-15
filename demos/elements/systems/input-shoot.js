exports.name = 'input-shoot';
exports.reqs = ['position', 'bullet-shape', 'player-controlled'];
exports.actionEach = function(pkt, entity, position, shape) {

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
        os_points : shape.points
      },
      'aabb' : {
        anchor : { x:position.p.x + 20, y:position.p.y },
        height : shape.height,
        width : shape.width
      },
      'color' : shape.color
    });

  }


}