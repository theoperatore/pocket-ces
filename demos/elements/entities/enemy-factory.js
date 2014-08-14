module.exports = function(pkt) {
  return pkt.entity(null, {
    'enemy-factory' : null,
    'timer' : {
      max : 2
    },
    'position' : {
      x : pkt.firstData('ctx').width
    }
  });
}