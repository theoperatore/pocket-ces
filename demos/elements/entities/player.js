module.exports = function(pkt) {
  return pkt.entity(null, {
    'player-controlled' : null,
    'input-manager': null,
    'position' : null,
    'shape' : {
      os_points : [
        {x:  20, y:   0},
        {x: -20, y: -40},
        {x:   0, y:   0},
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
      value : 3
    },
    'score' : null
  });
};