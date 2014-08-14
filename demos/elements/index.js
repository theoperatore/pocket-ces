var Pocket = require('../../lib/pocket'),
    p = new Pocket();

// bind components to pocket
require("./components/")(p);

// build entities
p.entity(null, {'ctx' : null });
require('./entities/player')(p);
require('./entities/enemy-factory')(p);

// build systems
p.sysFromObj(require('./systems/euler-update'));
p.sysFromObj(require('./systems/input-accelerate'));
p.sysFromObj(require('./systems/input-shoot'));
p.sysFromObj(require('./systems/object-culler'));
p.sysFromObj(require('./systems/enemy-birth'));
p.sysFromObj(require('./systems/bounds-check'));
p.sysFromObj(require('./systems/renderer-clear'));
p.sysFromObj(require('./systems/renderer-draw'));

p.tick(16);

(function engage() { 
  requestAnimationFrame(engage);
  p.tick(16); 
})();