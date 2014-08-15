exports.name = 'input-shoot';
exports.reqs = ['position', 'bullet-shape', 'upgrade', 'player-controlled'];
exports.actionEach = function(pkt, entity, position, shape, upgrade) {

  var input = pkt.firstData('input-manager');

  if (upgrade.totals.fire.current >= 4) {
    shape.vulcan = true;
  }

  // basic shot - space bar
  if (input.pressed[32] && shape.vulcan) {
    
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

    shape.vulcan = false;

  }
  else if (!input.pressed[32]){
    shape.vulcan = true;
  }


}