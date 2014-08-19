module.exports = function(pkt) {
  return pkt.entity(null, {
    'enemy-factory' : null,
    'difficulty' : null,
    'timer' : {
      max : 2
    },
    'position' : {
      x : pkt.firstData('ctx').width
    }
  });
}