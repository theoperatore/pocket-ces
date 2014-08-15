exports.name = 'handle-player-upgrades';
exports.reqs = ['aabb', 'shape', 'destructable', 'upgrade', 'bullet-shape', 'player-controlled'];
exports.actionEach = function(pkt, entity, aabb, shape, hp, upgrades, bShape) {

  // handle hp upgrades - blue
  if (hp.value === 1) {
    shape.os_points = [
      {x:   0, y:   0},
      {x:  20, y:   0},
      {x: -20, y:  40}
    ];
    shape.up_points = null;
    aabb.height = 20;
    aabb.width = 40;
    aabb.computeAABB();
  }
  else if (hp.value === 2) {
    shape.os_points = [
      {x:  20, y:   0},
      {x: -20, y: -40},
      {x:   0, y:   0},
      {x: -20, y:  40}
    ];
    shape.up_points = null;
    aabb.height = 80;
    aabb.width = 40;
    aabb.computeAABB();
  }
  else if (hp.value === 3) {
    //shape.up_color = '#00bfff';
    shape.up_points = [
      {x: 20, y:   0},
      {x:  0, y: -60},
      {x:  0, y:   0}
    ];
    aabb.height = 80;
    aabb.computeAABB();
  }
  else if (hp.value === 4) {
    shape.up_points = [
      {x: 20, y:   0},
      {x:  0, y: -60},
      {x:  0, y:   0},
      {x:  0, y:  60}
    ];
    aabb.height = 120;
    aabb.width = 40;
    aabb.computeAABB();
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
    aabb.width = 60;
    aabb.computeAABB();
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
  if (upgrades.totals.fire.current === 2) {
    bShape.points = [
      {x:  15, y:   0},
      {x:  -5, y: -15},
      {x:  -5, y:  15}
    ];
    bShape.height = 30;
    bShape.width = 20;
  }

  //kamehameha blast!
  else if (upgrades.totals.fire.current === 3) {
    bShape.points = [
      {x:  20, y:   0},
      {x: -30, y: -30},
      {x: -15, y:  -5},
      {x: -20, y: -15},
      {x:  -5, y:  -5},
      {x: -40, y:   0},
      {x:  -5, y:   5},
      {x: -20, y:  15},
      {x: -15, y:   5},
      {x: -30, y:  30}
    ];
    bShape.height = 60;
    bShape.width = 40;
  }

  //rapid fire?
  else if (upgrades.totals.fire.current === 4) {}

  // handle damage upgrades - purple
  // change color of bullets to indicate damage?
  // damage increase is pulled directly from void current
  if (upgrades.totals['void'].current === 2) {}
  else if (upgrades.totals['void'].current === 3) {}
  else if (upgrades.totals['void'].current === 4) {}
  else if (upgrades.totals['void'].current === 5) {}

}