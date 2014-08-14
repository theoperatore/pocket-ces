exports.name = 'enemy-birth';
exports.reqs = ['position', 'timer', 'enemy-factory'];
exports.actionEach = function(pkt, entity, position, timer) {

  if (timer.count >= timer.max) {

    // birth enemy in current location!
    pkt.entity(null, {
      'enemy' : null,
      'position' : {
        x  : position.p.x,
        y  : position.p.y,
        dx : -0.25
      },
      'aabb' : {
        anchor : position.p,
        height : 20,
        width  : 20
      },
      'shape' : {
        os_points : [
          {x:  10, y:  0},
          {x:  10, y: -10},
          {x: -10, y: -10},
          {x: -10, y:  10},
          {x:  10, y:  10}
        ]
      },
      'destructable' : {
        value : 1
      },
      'color' : null
    });

    //move to a different location!
    position.p.y = Math.round(Math.random() * pkt.firstData('ctx').height);

    //reset timer
    timer.count = 0;
    timer.max = 0.5 * 60;
  }
  else {
    timer.count++;
  }

}