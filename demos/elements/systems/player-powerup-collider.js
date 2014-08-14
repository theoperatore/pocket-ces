exports.name = 'player-powerup-collider';
exports.reqs = ['aabb', 'shape', 'element', 'powerup'];
exports.action = function(pkt, entities, aabbs, shapes, elements) {

  var p = pkt.firstEntity('player-controlled');
  for (var i = 0, e, eAABB, pAABB; i < entities.length; i++) {

    e = entities[i];
    eAABB = aabbs[e.id];
    pAABB = aabbs[p.id];

    if (pAABB.left   > eAABB.right  ||
        pAABB.top    > eAABB.bottom ||
        pAABB.right  < eAABB.left   ||
        pAABB.bottom < eAABB.top     )
    {
      continue;
    }

    var element = elements[e.id].value;

    if (element === 'fire') {
      
      // adds rapid fire / size of bullet
      var upgrades = pkt.dataFor(p, 'upgrade');
      upgrades.totals.fire.total += 1;

      if (upgrades.totals.fire.current < 5) {
        upgrades.totals.fire.current += 1;
      }

    }
    else if (element === 'water') {
      
      // gains health back / augment ship shape
      var upgrades = pkt.dataFor(p, 'upgrade'),
          hps = pkt.dataFor(p, 'destructable');

      if (hps.value < 7) {
        hps.value += 1;
        upgrades.totals.water.current = hps.value;
      }
      upgrades.totals.water.total += 1;

    }
    else if (element === 'earth') {
      
      // gains shield || larger bullets
      var upgrades = pkt.dataFor(p, 'upgrade');
      upgrades.totals.earth.total += 1;

      if (upgrades.totals.earth.current < 6) {
        upgrades.totals.earth.current += 1;
      }

    }
    else if (element === 'air') {
      
      // option and option upgrades
      var upgrades = pkt.dataFor(p, 'upgrade');
      upgrades.totals.air.total += 1;

      if (upgrades.totals.air.current < 6) {
        upgrades.totals.air.current += 1;
      }
    }
    else if (element === 'void') {
      
      // invincible? super saiyan? increase damage?
      var upgrades = pkt.dataFor(p, 'upgrade');
      upgrades.totals['void'].total += 1;

      if (upgrades.totals['void'].current < 5) {
        upgrades.totals['void'].current += 1;
      }
    }

    pkt.destroyEntityById(e.id);
    break;
  }

}