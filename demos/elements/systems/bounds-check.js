exports.name = 'bounds-check';
exports.reqs = ['position', 'aabb', 'player-controlled'];
exports.actionEach = function(pkt, entity, position, aabb) {

  var cvs = pkt.firstData('ctx').cvs;

  if (aabb.left < 0) {
    position.p.x = 5;
    position.v.x *= -0.5;
    
    aabb.anchor = position.p;
    aabb.computeAABB();
  }

  if (aabb.right > (cvs.width / 2)) {
    position.p.x = (cvs.width / 2) - (aabb.width / 2) - 2;
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

  if (aabb.bottom > (cvs.height / 2)) {
    position.p.y = (cvs.height / 2) - (aabb.height / 2) - 2;
    position.v.y *= -0.5;

    aabb.anchor = position.p;
    aabb.computeAABB();
  }

}