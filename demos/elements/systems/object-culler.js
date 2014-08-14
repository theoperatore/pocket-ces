exports.name = 'object-culler';
exports.reqs = ['position', 'aabb'];
exports.actionEach = function(pkt, entity, position, aabb) {

  var target = pkt.firstData('ctx');

  if ( 
      position.p.x > target.cvs.width  + 500 ||
      position.p.y > target.cvs.height + 500 ||
      position.p.x < -500 ||
      position.p.y < -500
     ) 
  {

    pkt.destroyEntityById(entity.id);

  }


}