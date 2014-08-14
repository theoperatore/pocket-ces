exports.name = 'bounds-check';
exports.reqs = ['position', 'aabb', 'player-controlled'];
exports.actionEach = function(pkt, entity, position, aabb) {

  var bounds = pkt.firstData('ctx');

  if (aabb.left < 0) {
    position.p.x = 5;
    position.v.x *= -0.5;
    
    aabb.anchor = position.p;
    aabb.computeAABB();
  }

  if (aabb.right > bounds.width) {
    position.p.x = bounds.width - (aabb.width / 2) - 2;
    position.v.x *= -0.5;

    aabb.anchor = position.p;
    aabb.computeAABB();
  }

  if (aabb.top < 0) {
    position.p.y = 5;
    position.v.y *= -0.5;

    aabb.anchor = position.p;
    aabb.computeAABB();
  }

  if (aabb.bottom > bounds.height) {
    position.p.y = bounds.height - (aabb.height / 2) - 2;
    position.v.y *= -0.5;

    aabb.anchor = position.p;
    aabb.computeAABB();
  }

}