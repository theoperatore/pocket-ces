module.exports = function(pkt) {
  return pkt.entity(null, {
    'player-controlled' : null,
    'input-manager': null,
    'position' : {
      x : 60
    },
    'shape' : {
      os_points : [
        {x:   0, y:   0},
        {x:  20, y:   0},
        //{x: -20, y: -40},
        //{x:   0, y:   0},
        {x: -20, y:  40}
      ]
    },
    'thrust' : null,
    'aabb' : {
      anchor : pkt.firstData('ctx').center,
      width : 40,
      height: 80
    },
    'destructable' : {
      value : 1
    },
    'score' : null,
    'color' : null,
    'upgrade' : null,
    'bullet-shape' : {
      points : [
        {x:  10, y:  0},
        {x:  10, y: -5},
        {x: -10, y: -5},
        {x: -10, y:  5},
        {x:  10, y:  5}
      ],
      width: 20,
      height: 10
    }
  });
};