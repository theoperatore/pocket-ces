exports.name = 'renderer-draw-overlay';
exports.reqs = ['score', 'destructable'];
exports.actionEach = function(pkt, entity, score, hp) {

  var target = pkt.firstData('ctx');

  target.ctx.beginPath();
  target.ctx.font = "30pt Arial";
  //target.ctx.fillStyle = "#00bfff";
  target.ctx.fillText(score.value, target.width/2, 40);
  target.ctx.fill();

  for (var i = 0; i < hp.value; i++) {

    target.ctx.beginPath();
    target.ctx.fillStyle = "#333333";
    target.ctx.fillRect(i * 35, 10,  30, 30);

  }

}