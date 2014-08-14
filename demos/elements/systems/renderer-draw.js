exports.name = 'renderer-draw';
exports.reqs = ['position','shape'];
exports.action = function(pkt, entities, positions, shapes) {

  var ctx = pkt.firstData('ctx');

  for (var i = 0, e, pos, shape; i < entities.length; i++) {

    e = entities[i];
    pos = positions[e.id];
    shape = shapes[e.id];

    ctx.ctx.beginPath();
    ctx.ctx.moveTo(pos.p.x+shape.os_points[0].x, pos.p.y+shape.os_points[0].y);

    for (var p = 1, point, ax, ay; p < shape.os_points.length; p++) {
      ax = pos.p.x;
      ay = pos.p.y;
      point = shape.os_points[p];

      ctx.ctx.lineTo(ax+point.x, ay+point.y);

    }

    ctx.ctx.closePath();
    ctx.ctx.fill();

  }
};