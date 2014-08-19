exports.name = 'spring-updater';
exports.reqs = ['position', 'spring'];
exports.action = function(pkt, entities, positions, springs) {
  
  var player = pkt.firstEntity('player'),
      option1 = pkt.firstEntity('option1'),
      option2 = pkt.firstEntity('option2'),
      ppos = positions[player.id],
      spr;

  if (option1) {
    spr = springs[option1.id];

    spr.target.x = ppos.p.x - 30;
    spr.target.y = ppos.p.y - 100;
  }

  if (option2) {
    spr = springs[option2.id];

    spr.target.x = ppos.p.x - 30;
    spr.target.y = ppos.p.y + 100;
  }

}