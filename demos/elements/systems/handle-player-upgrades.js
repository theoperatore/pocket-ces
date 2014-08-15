exports.name = 'handle-player-upgrades';
exports.reqs = ['position', 'aabb', 'shape', 'destructable', 'upgrade', 'bullet-shape', 'player-controlled'];
exports.actionEach = function(pkt, entity, position, aabb, shape, hp, upgrades, bShape) {

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
  if (upgrades.totals.air.current >= 1) {
    if (!pkt.firstEntity('option1')) {
      pkt.entity(null, {
        'option1' : null,
        'player-controlled' : null,
        'position' : {
          x : position.p.x - 30,
          y : position.p.y - 100
        },
        'aabb' : {
          anchor : position.p,
          height : 50,
          width : 50
        },
        'thrust' : {
          value : 0.002,
          drag : 0.95
        },
        'shape' : {
          os_points : [
            {x:  25, y:   0},
            {x: -25, y: -25},
            {x:   0, y:   0},
            {x: -25, y:  25},
          ]
        },
        'color' : null
      });
    }
  }
  if (upgrades.totals.air.current >= 2) {
    if (!pkt.firstEntity('option2')) {
      pkt.entity(null, {
        'option2' : null,
        'player-controlled' : null,
        'position' : {
          x : position.p.x - 30,
          y : position.p.y + 100
        },
        'aabb' : {
          anchor : position.p,
          height : 50,
          width : 50
        },
        'thrust' : {
          value : 0.002,
          drag : 0.95
        },
        'shape' : {
          os_points : [
            {x:  25, y:   0},
            {x: -25, y: -25},
            {x:   0, y:   0},
            {x: -25, y:  25},
          ]
        },
        'color' : null
      });
    }
  }
  else if (upgrades.totals.air.current === 3) {}

  // handle shield? upgrades - yellow
  if (upgrades.totals.earth.current === 1) {}
  else if (upgrades.totals.earth.current === 2) {}
  else if (upgrades.totals.earth.current === 3) {}

  // handle bullet shape upgrades - red
  if (upgrades.totals.fire.current === 2) {
    bShape.points = [
      {x:  15, y:   0},
      {x:  -5, y: -30},
      {x:  -5, y:  30}
    ];
    bShape.height = 60;
    bShape.width = 20;
  }

  //kamehameha blast!
  else if (upgrades.totals.fire.current === 3) {
    bShape.points = [
      {x:  40, y:   0},
      {x: -10, y: -60},
      {x:   5, y:  -5},
      {x:   0, y: -15},
      {x:  15, y:  -5},
      {x: -20, y:   0},
      {x:  15, y:   5},
      {x:   0, y:  15},
      {x:   5, y:   5},
      {x: -10, y:  60}
    ];
    bShape.height = 120;
    bShape.width = 40;
  }

  // handle damage upgrades - purple
  // change color of bullets to indicate damage?
  // damage increase is pulled directly from void current
  if (upgrades.totals['void'].current === 2) {}
  else if (upgrades.totals['void'].current === 3) {}
  else if (upgrades.totals['void'].current === 4) {}
  else if (upgrades.totals['void'].current === 5) {}

}