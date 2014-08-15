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

      var player = pkt.entitiesMatching('player-controlled')[0];
      var damage = pkt.indexedData('upgrade')[player.id].totals['void'].current;
      eHP.value -= damage;
      if (eHP.value <= 0) {

        var scores = pkt.indexedData('score');
        scores[player.id].value += 10;

        var num = Math.round(Math.random() * 100);
        if (num <= 50) {

          var elemNum = Math.round(Math.random() * 3);
          var elem = 'white';
          switch(elemNum) {
            case 0: color = "red"; elem = "fire"; break;
            case 1: color = "blue"; elem = "water"; break;
            case 2: color = "yellow"; elem = "earth"; break;
            case 3: color = "green"; elem = "air"; break;
          }

          var voidNum = Math.round(Math.random() * 100);
          if (voidNum <= 5) {
            elem = "void";
            color = "purple";
          }

          pkt.entity(null, {
            'powerup' : null,
            'position' : {
              x  : bAABB.anchor.x,
              y  : bAABB.anchor.y,
              dx : -0.125
            },
            'shape' : {
              os_points : [
                {x :  10, y :   0},
                {x :   0, y : -10},
                {x : -10, y :   0},
                {x :   0, y :  10}
              ]
            },
            'aabb' : {
              anchor : bAABB.anchor,
              width : 20,
              height : 20
            },
            'color' : {
              value : color
            },
            'element' : {
              value : elem
            }
          });
        }
        pkt.destroyEntityById(e.id);
      }

      pkt.destroyEntityById(b.id);
      break;

    }

  }

}