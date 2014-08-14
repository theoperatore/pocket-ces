exports.name = 'input-accelerate';
exports.reqs = ['position', 'thrust', 'player-controlled'];
exports.actionEach = function(pkt, entity, position, thrust) {

  var input = pkt.firstData('input-manager');

  // up - w
  if (input.pressed[87]) {
    position.a.y = -thrust.value;
  }

  // down - s
  else if (input.pressed[83]) {
    position.a.y = thrust.value;
  }

  // y-accel released
  else {
    position.a.y = 0;
    position.v.y *= thrust.drag;
  }

  // left - a
  if (input.pressed[65]) {
    position.a.x = -thrust.value; 
  }

  // right - d
  else if (input.pressed[68]) { 
    position.a.x = thrust.value; 
  }

  // x-accel released
  else {
    position.a.x = 0
    position.v.x *= thrust.drag;
  }

};