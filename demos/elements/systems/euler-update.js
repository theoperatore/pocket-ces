exports.name = 'euler-update';
exports.reqs = ['position', 'aabb'];
exports.actionEach = function(pkt, entities, position, aabb) {

  position.v.x += position.a.x * pkt.dt;
  position.v.y += position.a.y * pkt.dt;

  position.p.x += (0.5) * position.a.x * Math.pow(pkt.dt, 2) + position.v.x * pkt.dt;
  position.p.y += (0.5) * position.a.y * Math.pow(pkt.dt, 2) + position.v.y * pkt.dt;

  // update aabb
  aabb.anchor = position.p;
  aabb.computeAABB();
}