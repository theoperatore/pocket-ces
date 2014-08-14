exports.name = 'bullet-enemy-collider';
exports.reqs = ['aabb', 'destructable', 'enemy'];
exports.action = function(pkt, entities, aabbs, hps) {

  var bullets = pkt.entitiesMatching('aabb', 'bullet');

  for (var i = 0; i < entities.length; i++) {

    var e = entities[i];
    var eAABB = aabbs[e.id];
    var eHP = hps[e.id];

    for (var j = 0; j < bullets.length; j++) {

      var b = bullets[j];
      var bAABB = aabbs[b.id];

      if (bAABB.left   > eAABB.right  ||
          bAABB.top    > eAABB.bottom ||
          bAABB.right  < eAABB.left   ||
          bAABB.bottom < eAABB.top     )
      {
        continue;
      }

      eHP.value -= 1;
      pkt.destroyEntityById(b.id);

      if (eHP.value <= 0) {

        //
        //
        // TODO: Add a score to the player!
        //
        //
        
        pkt.destroyEntityById(e.id);
      }

      break;

    }

  }

}