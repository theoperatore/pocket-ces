var Pocket = require('../../lib/pocket'),
    p = new Pocket(),
    gameover = new Pocket();

// bind components to pocket
require("./components/")(p);

// build entities
p.entity(null, {'ctx' : null });
require('./entities/player')(p);
require('./entities/enemy-factory')(p);
require('./entities/enemy-factory')(p);
require('./entities/enemy-factory')(p);
require('./entities/enemy-factory')(p);
require('./entities/enemy-factory')(p);
require('./entities/enemy-factory')(p);

// build systems
p.sysFromObj(require('./systems/euler-update'));
p.sysFromObj(require('./systems/input-accelerate'));
p.sysFromObj(require('./systems/input-shoot'));
p.sysFromObj(require('./systems/object-culler'));
p.sysFromObj(require('./systems/spring-updater'));
p.sysFromObj(require('./systems/bullet-enemy-collider'));
p.sysFromObj(require('./systems/player-enemy-collider'));
p.sysFromObj(require('./systems/player-powerup-collider'));
p.sysFromObj(require('./systems/handle-player-upgrades'));
p.sysFromObj(require('./systems/enemy-birth'));
p.sysFromObj(require('./systems/bounds-check'));
p.sysFromObj(require('./systems/renderer-clear'));
p.sysFromObj(require('./systems/renderer-draw-entities'));
p.sysFromObj(require('./systems/renderer-draw-overlay'));

// initial update
p.tick(16);

// bind components to gameover pocket
// build gameover entities
// build gameover systems

(function engage() { 
  requestAnimationFrame(engage);
  if (p.firstEntity('player-controlled')) {
    p.tick(16); 
  }
  else {
    gameover.tick(16);
  }
})();