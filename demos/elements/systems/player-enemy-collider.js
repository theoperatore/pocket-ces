exports.name = 'player-enemy-collider';
exports.reqs = ['aabb', 'shape', 'destructable', 'enemy'];
exports.action = function(pkt, entities, aabbs, shapes, hps) {

  var player = pkt.entitiesMatching('player-controlled')[0];
  var pAABB = aabbs[player.id];

  for (var i = 0, e, eAABB; i < entities.length; i++) {

    e = entities[i];
    eAABB = aabbs[e.id];

    if (pAABB.left   > eAABB.right  ||
        pAABB.top    > eAABB.bottom ||
        pAABB.right  < eAABB.left   ||
        pAABB.bottom < eAABB.top     )
    {
      continue;
    }

    var eHP = hps[e.id];
    eHP.value -= 1;
    if (eHP.value <= 0) {
      pkt.destroyEntityById(e.id);
    }

    var pHP = hps[player.id];
    pHP.value -= 1;
    if (pHP.value <= 0) {
      //pkt.destroyEntityById(player.id);
    }

    break;
  }

}