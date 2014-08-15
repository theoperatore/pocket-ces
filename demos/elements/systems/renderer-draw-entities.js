exports.name = 'renderer-draw-entities';
exports.reqs = ['position','shape', 'color'];
exports.action = function(pkt, entities, positions, shapes, colors) {

  var ctx = pkt.firstData('ctx');

  for (var i = 0, e, pos, shape; i < entities.length; i++) {

    e = entities[i];
    pos = positions[e.id];
    shape = shapes[e.id];

    //draw upgrade points if shape has them
    if (shape.up_points) {
      ctx.ctx.beginPath();
      ctx.ctx.moveTo(pos.p.x+shape.up_points[0].x, pos.p.y+shape.up_points[0].y);

      for (var p = 1, point, ax, ay; p < shape.up_points.length; p++) {

        ax = pos.p.x;
        ay = pos.p.y;
        point = shape.up_points[p];

        ctx.ctx.lineTo(ax+point.x, ay+point.y);
      }

      ctx.ctx.fillStyle = shape.up_color;
      ctx.ctx.fill();
    }

    // draw base shape
    ctx.ctx.beginPath();
    ctx.ctx.moveTo(pos.p.x+shape.os_points[0].x, pos.p.y+shape.os_points[0].y);

    for (var p = 1, point, ax, ay; p < shape.os_points.length; p++) {
      ax = pos.p.x;
      ay = pos.p.y;
      point = shape.os_points[p];

      ctx.ctx.lineTo(ax+point.x, ay+point.y);

    }

    ctx.ctx.fillStyle = colors[e.id].value;
    ctx.ctx.fill();
  }
};