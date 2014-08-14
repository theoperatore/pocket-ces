exports.name = 'renderer-clear';
exports.reqs = ['ctx'];
exports.actionEach = function(pkt, entities, cmp) {

  cmp.ctx.clearRect(0,0, cmp.cvs.width, cmp.cvs.height);

};