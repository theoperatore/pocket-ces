exports.name = 'handle-player-upgrades';
exports.reqs = ['shape', 'destructable', 'upgrade', 'player-controlled'];
exports.actionEach = function(pkt, entity, shape, hp, upgrades) {

  // handle hp upgrades - blue
  if (hp.value === 1) {
    shape.os_points = [
      {x:   0, y:   0},
      {x:  20, y:   0},
      {x: -20, y:  40}
    ];
    shape.up_points = null;
  }
  else if (hp.value === 2) {
    shape.os_points = [
      {x:  20, y:   0},
      {x: -20, y: -40},
      {x:   0, y:   0},
      {x: -20, y:  40}
    ];
    shape.up_points = null;
  }
  else if (hp.value === 3) {
    //shape.up_color = '#00bfff';
    shape.up_points = [
      {x: 20, y:   0},
      {x:  0, y: -60},
      {x:  0, y:   0}
    ];
  }
  else if (hp.value === 4) {
    shape.up_points = [
      {x: 20, y:   0},
      {x:  0, y: -60},
      {x:  0, y:   0},
      {x:  0, y:  60}
    ];
  }
  else if (hp.value === 5) {
    shape.up_points = [
      {x:  20, y:   0},
      {x:   0, y: -60},
      {x:   0, y:   0},
      {x:   0, y:  60},
      {x:  20, y:   0},
      {x: -40, y: -40},
      {x:   0, y:   0}
    ];
  }
  else if (hp.value === 6) {
    shape.up_points = [
      {x:  20, y:   0},
      {x:   0, y: -60},
      {x:   0, y:   0},
      {x:   0, y:  60},
      {x:  20, y:   0},
      {x: -40, y: -40},
      {x:   0, y:   0},
      {x: -40, y:  40}
    ];
  }
  else if (hp.value === 7) {
    shape.up_points = [
      {x:  20, y:   0},
      {x:   0, y: -60},
      {x:   0, y:   0},
      {x:   0, y:  60},
      {x:  20, y:   0},
      {x: -40, y: -40},
      {x:   0, y:   0},
      {x: -40, y:  40},
      {x:  20, y:   0},
      {x:   0, y: -10},
      {x: -60, y:   0},
      {x:   0, y:  10}
    ]; 
  }

  // handle option upgrades - green

  // handle shield? upgrades - yellow

  // handle bullet shape upgrades - red

  // handle damage upgrades - purple

}