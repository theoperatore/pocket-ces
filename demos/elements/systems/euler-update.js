exports.name = 'euler-update';
exports.reqs = ['position', 'aabb'];
exports.actionEach = function(pkt, entity, position, aabb) {

  position.v.x += position.a.x * pkt.dt;
  position.v.y += position.a.y * pkt.dt;

  position.p.x += (0.5) * position.a.x * Math.pow(pkt.dt, 2) + position.v.x * pkt.dt;
  position.p.y += (0.5) * position.a.y * Math.pow(pkt.dt, 2) + position.v.y * pkt.dt;

  // update aabb
  aabb.anchor = position.p;
  aabb.computeAABB();

  // update spring on target, if attached
  if (pkt.indexedData('spring')[entity.id]) {

    var spring = pkt.indexedData('spring')[entity.id],
        vec = {};

    vec.x = spring.target.x - position.p.x;
    vec.y = spring.target.y - position.p.y;

    position.v.x += spring.stiff * vec.x;
    position.v.y += spring.stiff * vec.y;

    position.v.x *= spring.damp;
    position.v.y *= spring.damp;

  }
}