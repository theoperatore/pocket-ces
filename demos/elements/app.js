(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function(p) {

  // rendering canvas and context
  p.cmp('ctx', function(cmp, opts) {
    
    // setup the canvas
    cmp.cvs = document.createElement('canvas');

    cmp.cvs.width = window.innerWidth;
    cmp.cvs.height = window.innerWidth;
    
    document.body.appendChild(cmp.cvs);
    
    var hdify = require('hd-canvas');
    cmp.cvs = hdify(cmp.cvs, window.innerWidth, window.innerHeight);
    cmp.ctx = cmp.cvs.getContext('2d');

    cmp.width  = parseInt(cmp.cvs.style.width)  || cmp.cvs.width;
    cmp.height = parseInt(cmp.cvs.style.height) || cmp.cvs.height;

    cmp.center = {
      x : cmp.width / 2,
      y : cmp.height / 2
    };

    // handle canvas resize
    window.addEventListener('resize', function(ev) {
      cmp.cvs = hdify(cmp.cvs, window.innerWidth, window.innerHeight);
      cmp.width  = parseInt(cmp.cvs.style.width)  || cmp.cvs.width;
      cmp.height = parseInt(cmp.cvs.style.height) || cmp.cvs.height;

      cmp.center = {
        x : cmp.width / 2,
        y : cmp.height / 2
      };

    });

  });
  
  p.cmp('input-manager', function(cmp, opts) {
    cmp.pressed = {};
    function keydown(ev) {
      cmp.pressed[ev.keyCode] = true;
    }
    function keyup(ev) {
      cmp.pressed[ev.keyCode] = false;
    }
    document.addEventListener('keydown', keydown, false);
    document.addEventListener('keyup', keyup, false);
  });

  p.cmp('position', function(cmp, opts) {
    cmp.p = { x: opts.x   || 30, y: opts.y   || p.firstData('ctx').center.y };
    cmp.v = { x: opts.dx  || 0,  y: opts.dy  || 0};
    cmp.a = { x: opts.ddx || 0,  y: opts.ddy || 0};
  });

  p.cmp('shape', function(cmp, opts) {
    cmp.os_points = opts.os_points || [];
    cmp.up_points = opts.up_points || null;
    cmp.up_color  = opts.up_color || "#333333";
  });

  p.cmp('thrust', function(cmp, opts) {
    cmp.value = opts.value || 0.002;
    cmp.drag = opts.drag || 0.95;
  });

  p.cmp('spring', function(cmp, opts) {
    cmp.stiff = opts.stiff || 0.01;
    cmp.damp = opts.damp || 0.9;
    cmp.target = opts.target || {x : 0, y: 0};
  });

  p.cmp('aabb', function(cmp, opts) {
    cmp.anchor = opts.anchor || {x: 0, y: 0};
    cmp.height = opts.height || 10;
    cmp.width = opts.width || 10;
    cmp.left = opts.left || cmp.anchor.x - (cmp.width / 2);
    cmp.right = opts.right || cmp.anchor.x + (cmp.width / 2);
    cmp.top = opts.top || cmp.anchor.y - (cmp.height / 2);
    cmp.bottom = opts.bottom || cmp.anchor.y + (cmp.height / 2);
    cmp.computeAABB = function() {

      this.left = this.anchor.x - (this.width / 2);
      this.right = this.anchor.x + (this.width / 2);
      this.top = this.anchor.y - (this.height / 2);
      this.bottom = this.anchor.y + (this.height / 2);

    }
  });

  p.cmp('destructable', function(cmp, opts) {
    cmp.value = opts.value || 2;
  });

  p.cmp('upgrade', function(cmp, opts) {
    cmp.totals = {
      'fire'  : { current : 1, total : 0},
      'water' : { current : 1, total : 0},
      'earth' : { current : 0, total : 0},
      'air'   : { current : 0, total : 0},
      'void'  : { current : 1, total : 0},
    };
  });

  p.cmp('bullet-shape', function(cmp, opts) {
    cmp.points = opts.points || [];
    cmp.width = opts.width || 20;
    cmp.height = opts.height || 10;
    cmp.color = opts.color || "#333333";
    cmp.vulcan = opts.vulcan || true;
  });

  p.cmp('score', function(cmp, opts) {
    cmp.value = opts.value || 0;
  });

  p.cmp('color', function(cmp, opts) {
    cmp.value = opts.value || "#333333";
  });

  p.cmp('element', function(cmp, opts) {
    cmp.value = opts.value || "white";
  });

  p.cmp('timer', function(cmp, opts) {
    cmp.max = (opts.max * 60) || (5 * 60);
    cmp.count = opts.count || 0;
    cmp.complete = opts.complete || false;
  });

  p.cmp('difficulty', function(cmp, opts) {
    cmp.timer_max = opts.timer_max || 1 * 60;
    cmp.enemy_speed = opts.enemy_speed || -0.25;
    cmp.enemy_health = opts.enemy_health || 1;
  });
}
},{"hd-canvas":22}],2:[function(require,module,exports){
module.exports = function(pkt) {
  return pkt.entity(null, {
    'enemy-factory' : null,
    'difficulty' : null,
    'timer' : {
      max : 2
    },
    'position' : {
      x : pkt.firstData('ctx').width
    }
  });
}
},{}],3:[function(require,module,exports){
module.exports = function(pkt) {
  return pkt.entity(null, {
    'player' : null,
    'player-controlled' : null,
    'input-manager': null,
    'position' : {
      x : 60
    },
    'shape' : {
      os_points : [
        {x:   0, y:   0},
        {x:  20, y:   0},
        //{x: -20, y: -40},
        //{x:   0, y:   0},
        {x: -20, y:  40}
      ]
    },
    'thrust' : null,
    'aabb' : {
      anchor : pkt.firstData('ctx').center,
      width : 40,
      height: 80
    },
    'destructable' : {
      value : 1
    },
    'score' : null,
    'color' : null,
    'upgrade' : null,
    'bullet-shape' : {
      points : [
        {x:  10, y:  0},
        {x:  10, y: -5},
        {x: -10, y: -5},
        {x: -10, y:  5},
        {x:  10, y:  5}
      ],
      width: 20,
      height: 10
    }
  });
};
},{}],4:[function(require,module,exports){
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
},{"../../lib/pocket":20,"./components/":1,"./entities/enemy-factory":2,"./entities/player":3,"./systems/bounds-check":5,"./systems/bullet-enemy-collider":6,"./systems/enemy-birth":7,"./systems/euler-update":8,"./systems/handle-player-upgrades":9,"./systems/input-accelerate":10,"./systems/input-shoot":11,"./systems/object-culler":12,"./systems/player-enemy-collider":13,"./systems/player-powerup-collider":14,"./systems/renderer-clear":15,"./systems/renderer-draw-entities":16,"./systems/renderer-draw-overlay":17,"./systems/spring-updater":18}],5:[function(require,module,exports){
exports.name = 'bounds-check';
exports.reqs = ['position', 'aabb', 'player-controlled'];
exports.actionEach = function(pkt, entity, position, aabb) {

  var bounds = pkt.firstData('ctx');

  if (aabb.left <= 0) {
    position.p.x = (aabb.width / 2) + 1;
    position.v.x *= -0.25;
    
    aabb.anchor = position.p;
    aabb.computeAABB();
  }

  if (aabb.right >= bounds.width) {
    position.p.x = bounds.width - (aabb.width / 2) - 2;
    position.v.x *= -0.25;

    aabb.anchor = position.p;
    aabb.computeAABB();
  }

  if (aabb.top <= 0) {
    position.p.y = (aabb.height / 2) + 1;
    position.v.y *= -0.25;

    aabb.anchor = position.p;
    aabb.computeAABB();
  }

  if (aabb.bottom >= bounds.height) {
    position.p.y = bounds.height - (aabb.height / 2) - 2;
    position.v.y *= -0.25;

    aabb.anchor = position.p;
    aabb.computeAABB();
  }

}
},{}],6:[function(require,module,exports){
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
        if (num <= 6) {

          var elemNum = Math.round(Math.random() * 3);
          var elem = 'white';
          switch(elemNum) {
            case 0: color = "red"; elem = "fire"; break;
            case 1: color = "blue"; elem = "water"; break;
            case 2: color = "yellow"; elem = "earth"; break;
            case 3: color = "green"; elem = "air"; break;
          }

          var voidNum = Math.round(Math.random() * 100);
          if (voidNum <= 4) {
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
},{}],7:[function(require,module,exports){
exports.name = 'enemy-birth';
exports.reqs = ['position', 'timer', 'difficulty', 'enemy-factory'];
exports.actionEach = function(pkt, entity, position, timer, difficulty) {

  if (timer.count >= timer.max) {

    // birth enemy in current location!
    pkt.entity(null, {
      'enemy' : null,
      'position' : {
        x  : position.p.x,
        y  : position.p.y,
        //dx : -0.25
        dx : difficulty.enemy_speed
      },
      'aabb' : {
        anchor : position.p,
        height : 20,
        width  : 20
      },
      'shape' : {
        os_points : [
          {x:  10, y:  0},
          {x:  10, y: -10},
          {x: -10, y: -10},
          {x: -10, y:  10},
          {x:  10, y:  10}
        ]
      },
      'destructable' : {
        value : difficulty.enemy_health
      },
      'color' : null
    });

    //move to a different location!
    position.p.y = Math.round(Math.random() * pkt.firstData('ctx').height);

    //reset timer
    timer.count = 0;
    //timer.max = 0.5 * 60;
    timer.max = difficulty.timer_max;
  }
  else {
    timer.count++;
  }

}
},{}],8:[function(require,module,exports){
exports.name = 'euler-update';
exports.reqs = ['position', 'aabb'];
exports.actionEach = function(pkt, entity, position, aabb) {

  position.v.x += position.a.x * pkt.dt;
  position.v.y += position.a.y * pkt.dt;

  position.p.x += (0.5) * position.a.x * Math.pow(pkt.dt, 2) + position.v.x * pkt.dt;
  position.p.y += (0.5) * position.a.y * Math.pow(pkt.dt, 2) + position.v.y * pkt.dt;

  // update aabb
  aabb.anchor = position.p;
  aabb.computeAABB();

  // update spring on target, if attached
  if (pkt.indexedData('spring')[entity.id]) {

    var spring = pkt.indexedData('spring')[entity.id],
        vec = {};

    vec.x = spring.target.x - position.p.x;
    vec.y = spring.target.y - position.p.y;

    position.v.x += spring.stiff * vec.x;
    position.v.y += spring.stiff * vec.y;

    position.v.x *= spring.damp;
    position.v.y *= spring.damp;

  }
}
},{}],9:[function(require,module,exports){
exports.name = 'handle-player-upgrades';
exports.reqs = ['position', 'aabb', 'shape', 'destructable', 'upgrade', 'bullet-shape', 'player-controlled'];
exports.actionEach = function(pkt, entity, position, aabb, shape, hp, upgrades, bShape) {

  // handle hp upgrades - blue
  if (hp.value === 1) {
    shape.os_points = [
      {x:   0, y:   0},
      {x:  20, y:   0},
      {x: -20, y:  40}
    ];
    shape.up_points = null;
    aabb.height = 20;
    aabb.width = 40;
    aabb.computeAABB();
  }
  else if (hp.value === 2) {
    shape.os_points = [
      {x:  20, y:   0},
      {x: -20, y: -40},
      {x:   0, y:   0},
      {x: -20, y:  40}
    ];
    shape.up_points = null;
    aabb.height = 80;
    aabb.width = 40;
    aabb.computeAABB();
  }
  else if (hp.value === 3) {
    //shape.up_color = '#00bfff';
    shape.up_points = [
      {x: 20, y:   0},
      {x:  0, y: -60},
      {x:  0, y:   0}
    ];
    aabb.height = 80;
    aabb.computeAABB();
  }
  else if (hp.value === 4) {
    shape.up_points = [
      {x: 20, y:   0},
      {x:  0, y: -60},
      {x:  0, y:   0},
      {x:  0, y:  60}
    ];
    aabb.height = 120;
    aabb.width = 40;
    aabb.computeAABB();
  }
  else if (hp.value === 5) {
    shape.up_points = [
      {x:  20, y:   0},
      {x:   0, y: -60},
      {x:   0, y:   0},
      {x:   0, y:  60},
      {x:  20, y:   0},
      {x: -40, y: -40},
      {x:   0, y:   0}
    ];
    aabb.width = 60;
    aabb.computeAABB();
  }
  else if (hp.value === 6) {
    shape.up_points = [
      {x:  20, y:   0},
      {x:   0, y: -60},
      {x:   0, y:   0},
      {x:   0, y:  60},
      {x:  20, y:   0},
      {x: -40, y: -40},
      {x:   0, y:   0},
      {x: -40, y:  40}
    ];
  }
  else if (hp.value === 7) {
    shape.up_points = [
      {x:  20, y:   0},
      {x:   0, y: -60},
      {x:   0, y:   0},
      {x:   0, y:  60},
      {x:  20, y:   0},
      {x: -40, y: -40},
      {x:   0, y:   0},
      {x: -40, y:  40},
      {x:  20, y:   0},
      {x:   0, y: -10},
      {x: -60, y:   0},
      {x:   0, y:  10}
    ];
  }

  // handle option upgrades - green
  if (upgrades.totals.air.current >= 1) {
    if (!pkt.firstEntity('option1')) {
      pkt.entity(null, {
        'option1' : null,
        'player-controlled' : null,
        'position' : {
          x : position.p.x - 30,
          y : position.p.y - 100
        },
        'aabb' : {
          anchor : position.p,
          height : 50,
          width : 50
        },
        'spring' : {
          target : {
            x : position.p.x - 30,
            y : position.p.y - 100
          }
        },
        'thrust' : {
          value : 0.002,
          drag : 0.95
        },
        'shape' : {
          os_points : [
            {x:  25, y:   0},
            {x: -25, y: -25},
            {x:   0, y:   0},
            {x: -25, y:  25},
          ]
        },
        'color' : null
      });
    }
  }
  if (upgrades.totals.air.current >= 2) {
    if (!pkt.firstEntity('option2')) {
      pkt.entity(null, {
        'option2' : null,
        'player-controlled' : null,
        'position' : {
          x : position.p.x - 30,
          y : position.p.y + 100
        },
        'aabb' : {
          anchor : position.p,
          height : 50,
          width : 50
        },
        'spring' : {
          target : {
            x : position.p.x - 30,
            y : position.p.y + 100
          }
        },
        'thrust' : {
          value : 0.002,
          drag : 0.95
        },
        'shape' : {
          os_points : [
            {x:  25, y:   0},
            {x: -25, y: -25},
            {x:   0, y:   0},
            {x: -25, y:  25},
          ]
        },
        'color' : null
      });
    }
  }

  //rotate options around player?
  else if (upgrades.totals.air.current === 3) {}

  // handle shield? upgrades - yellow
  if (upgrades.totals.earth.current === 1) {}
  else if (upgrades.totals.earth.current === 2) {}
  else if (upgrades.totals.earth.current === 3) {}

  // handle bullet shape upgrades - red
  if (upgrades.totals.fire.current === 2) {
    bShape.points = [
      {x:  15, y:   0},
      {x:  -5, y: -30},
      {x:  -5, y:  30}
    ];
    bShape.height = 60;
    bShape.width = 20;
  }

  //kamehameha blast!
  else if (upgrades.totals.fire.current === 3) {
    bShape.points = [
      {x:  40, y:   0},
      {x: -10, y: -60},
      {x:   5, y:  -5},
      {x:   0, y: -15},
      {x:  15, y:  -5},
      {x: -20, y:   0},
      {x:  15, y:   5},
      {x:   0, y:  15},
      {x:   5, y:   5},
      {x: -10, y:  60}
    ];
    bShape.height = 120;
    bShape.width = 40;
  }

  // handle damage upgrades - purple
  // change color of bullets to indicate damage?
  // damage increase is pulled directly from void current
  if (upgrades.totals['void'].current === 2) {}
  else if (upgrades.totals['void'].current === 3) {}
  else if (upgrades.totals['void'].current === 4) {}
  else if (upgrades.totals['void'].current === 5) {}

}
},{}],10:[function(require,module,exports){
exports.name = 'input-accelerate';
exports.reqs = ['position', 'thrust', 'player-controlled'];
exports.actionEach = function(pkt, entity, position, thrust) {

  var input = pkt.firstData('input-manager');

  // up - w
  if (input.pressed[87]) {
    position.a.y = -thrust.value;
  }

  // down - s
  else if (input.pressed[83]) {
    position.a.y = thrust.value;
  }

  // y-accel released
  else {
    position.a.y = 0;
    position.v.y *= thrust.drag;
  }

  // left - a
  if (input.pressed[65]) {
    position.a.x = -thrust.value; 
  }

  // right - d
  else if (input.pressed[68]) { 
    position.a.x = thrust.value; 
  }

  // x-accel released
  else {
    position.a.x = 0
    position.v.x *= thrust.drag;
  }

};
},{}],11:[function(require,module,exports){
exports.name = 'input-shoot';
exports.reqs = ['position', 'bullet-shape', 'upgrade', 'player-controlled'];
exports.actionEach = function(pkt, entity, position, shape, upgrade) {

  var input = pkt.firstData('input-manager');

  if (upgrade.totals.fire.current >= 4) {
    shape.vulcan = true;
  }

  // basic shot - space bar
  if (input.pressed[32] && shape.vulcan) {
    
    pkt.entity(null, {
      'bullet' : null,
      'position' : {
        x : position.p.x + 20,
        y : position.p.y,
        ddx : 0.002
      },
      'shape' : {
        os_points : shape.points
      },
      'aabb' : {
        anchor : { x:position.p.x + 20, y:position.p.y },
        height : shape.height,
        width : shape.width
      },
      'color' : shape.color
    });

    if (upgrade.totals.air.current >= 1) {

      var option = pkt.firstEntity('option1');
      var o_pos = pkt.dataFor(option,'position');

      pkt.entity(null, {
        'bullet' : null,
        'position' : {
          x : o_pos.p.x + 20,
          y : o_pos.p.y,
          ddx : 0.002
        },
        'shape' : {
          os_points : shape.points
        },
        'aabb' : {
          anchor : { x: o_pos.p.x + 20, y:o_pos.p.y },
          height : shape.height,
          width : shape.width
        },
        'color' : shape.color
      });
    }

    if (upgrade.totals.air.current >= 2) {
      var option = pkt.firstEntity('option2');
      var o_pos = pkt.dataFor(option,'position');

      pkt.entity(null, {
        'bullet' : null,
        'position' : {
          x : o_pos.p.x + 20,
          y : o_pos.p.y,
          ddx : 0.002
        },
        'shape' : {
          os_points : shape.points
        },
        'aabb' : {
          anchor : { x: o_pos.p.x + 20, y:o_pos.p.y },
          height : shape.height,
          width : shape.width
        },
        'color' : shape.color
      });
    }

    shape.vulcan = false;

  }
  else if (!input.pressed[32]){
    shape.vulcan = true;
  }


}
},{}],12:[function(require,module,exports){
exports.name = 'object-culler';
exports.reqs = ['position', 'aabb'];
exports.actionEach = function(pkt, entity, position, aabb) {

  var target = pkt.firstData('ctx');

  if ( 
      position.p.x > target.cvs.width  + 500 ||
      position.p.y > target.cvs.height + 500 ||
      position.p.x < -500 ||
      position.p.y < -500
     ) 
  {

    pkt.destroyEntityById(entity.id);

  }


}
},{}],13:[function(require,module,exports){
exports.name = 'player-enemy-collider';
exports.reqs = ['aabb', 'shape', 'destructable', 'enemy'];
exports.action = function(pkt, entities, aabbs, shapes, hps) {

  var player = pkt.entitiesMatching('player-controlled')[0];
  var pAABB = aabbs[player.id];

  for (var i = 0, e, eAABB; i < entities.length; i++) {

    e = entities[i];
    eAABB = aabbs[e.id];

    if (pAABB.left   > eAABB.right  ||
        pAABB.top    > eAABB.bottom ||
        pAABB.right  < eAABB.left   ||
        pAABB.bottom < eAABB.top     )
    {
      continue;
    }

    var pHP = hps[player.id];
    pHP.value -= 1;
    if (pHP.value <= 0) {
      //pkt.immediatelyDestroyEntityById(player.id);
    }
    
    pkt.destroyEntityById(e.id);
    break;
  }

}
},{}],14:[function(require,module,exports){
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
},{}],15:[function(require,module,exports){
exports.name = 'renderer-clear';
exports.reqs = ['ctx'];
exports.actionEach = function(pkt, entities, cmp) {

  cmp.ctx.clearRect(0,0, cmp.cvs.width, cmp.cvs.height);

};
},{}],16:[function(require,module,exports){
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
},{}],17:[function(require,module,exports){
exports.name = 'renderer-draw-overlay';
exports.reqs = ['score', 'destructable'];
exports.actionEach = function(pkt, entity, score, hp) {

  var target = pkt.firstData('ctx');

  target.ctx.beginPath();
  target.ctx.font = "30pt Arial";
  target.ctx.fillStyle = "#333333";
  target.ctx.fillText(score.value, target.width/2, 40);

  for (var i = 0; i < hp.value; i++) {

    target.ctx.beginPath();
    target.ctx.fillStyle = "#333333";
    target.ctx.fillRect(i * 35, 10,  30, 30);

  }

}
},{}],18:[function(require,module,exports){
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
},{}],19:[function(require,module,exports){
function Entity(id) {
  this.id = id;
}

module.exports = Entity;
},{}],20:[function(require,module,exports){
var System = require('./system');
var Entity = require('./entity');

function Pocket() {
  this.componentTypes = {};

  this.systems = [];
  this.components = {};
  this.entities = {};

  this.idCounter = 0;

  this.entityIdsToDestroy = {};

  this.indexedData = this.indexedData.bind(this)
}

Pocket.prototype.nextId = function() {
  return this.idCounter++;
}

Pocket.prototype.tick = function(dt) {

  // Actually destroy queued entities, to avoid undefined components
  // during the tick in which they are destroyed.
  var self = this;
  Object.keys(this.entityIdsToDestroy).forEach(function(id) {
    self.immediatelyDestroyEntityById(id);
    delete self.entityIdsToDestroy[id];
  })

  this.dt = dt;

  for (var i = 0; i < this.systems.length; i++) {

    var system = this.systems[i];

    // datas contain all entities that have any of the names, not
    // an intersection.
    var datas = system.requiredComponents.map(this.indexedData)

    // entities is an intersection.
    var entities = this.entitiesMatching.apply(this, system.requiredComponents);

    // No data matches this system's requirements.
    if (!entities.length && system.requiredComponents.length > 0) continue;

    // Prepare to be used as arguments.
    datas.unshift(entities);
    datas.unshift(this);
    system.action.apply(system, datas);
  }
}

Pocket.prototype.sysFromObj = function(obj) {

  // Allow a system to operate on each individual entity instead of the
  // collection of entities to save on boilerplate.
  if (obj.actionEach) {
    obj.action = function(pkt, entities) {
      for (var i = 0, args = []; i < arguments.length; i++) args[i] = arguments[i];
      var components = args.slice(0);
      var entity;

      for(var i = 0; i < entities.length; i++) {
        entity = entities[i];
        args[1] = entity;

        for (var j = 2; j < components.length; j++) {
          args[j] = components[j][entity.id];
        }

        obj.actionEach.apply(this, args);
      }
    }
  }

  return this.systems.push(new System(obj.name, obj.reqs, obj.action));
}

Pocket.prototype.cmp =
Pocket.prototype.component = function(name, initializer) {
  this.componentTypes[name] = initializer;
}

Pocket.prototype.entity = function(id, componentsValues) {
  if (!id) {
    id = this.nextId();
  }

  var entity = this.entities[id];

  if (!entity) {
    entity
      = this.entities[id]
      = new Entity(id);

    Object.keys(componentsValues).forEach(function(cmpName) {
      this.addComponentToEntity(id, cmpName, componentsValues[cmpName]);
    }, this)
  }

  return entity;
}

Pocket.prototype.destroyEntityById = function(id) {
  this.entityIdsToDestroy[id] = true;
}

Pocket.prototype.immediatelyDestroyEntityById = function(id) {
  var self = this;
  var found = this.entities[id];

  if (!found) {
    throw new Error('Entity with id ' + id + ' already destroyed');
  }

  delete this.entities[id];

  Object.keys(this.components).forEach(function(name) {
    delete self.components[name][id];
  })
}

Pocket.prototype.addComponentToEntity = function(id, componentName, opt_props) {
  var entity = this.entities[id];
  if (!entity) {
    throw new Error('Could not find entity with id "' + id + '"');
  }

  var initializer = this.componentTypes[componentName];

  // this.components['verlet-position'][id] = { cpos: ..., ppos: ..., ... }

  var others = this.components[componentName]
    || (this.components[componentName] = {});

  var cmp = others[id];

  if (!cmp) {
    cmp = others[id] = {};

    if (initializer) {
      initializer(cmp, opt_props || {})
    } else {
      console.log('Found no component initializer for '
        + '"' + componentName + '"'
        + ', assuming it is a label.');
    }
  }
}

Pocket.prototype.indexedData = function(name) {
  return this.components[name] || {};
}

Pocket.prototype.firstData = function(name) {
  var data = this.components[name] || {};
  return data[Object.keys(data)[0]];
}

Pocket.prototype.dataFor = function(entity, name) {
  return this.components[name][entity.id];
}

Pocket.prototype.firstEntity = function(name1, name2, nameN) {
  for (var i = 0, args = []; i < arguments.length; i++) args[i] = arguments[i];
  var entities = this.entitiesMatching.apply(this, args);
  return entities[0];
}

Pocket.prototype.entitiesMatching = function(name1, name2, nameN) {
  var self = this;
  var all = {};
  var args = [];

  for (var i = 0; i < arguments.length; i++) {
    args[i] = arguments[i];
    var others = this.components[arguments[i]];
    if (!others) continue;

    Object.keys(others)
      .forEach(markIdAsHavingData)
  }

  return Object.keys(all)
    .filter(checkIdScore)
    .map(pluckEntities);

  function markIdAsHavingData(id) {
    all[id] = (all[id] || 0) + 1;
  }

  function checkIdScore(id) {
    return all[id] === args.length;
  }

  function pluckEntities(id) {
    return self.entities[id];
  }
}

module.exports = Pocket;
},{"./entity":19,"./system":21}],21:[function(require,module,exports){
function System(name, requiredComponents, action) {
  this.name = name;
  this.action = action;
  this.requiredComponents = requiredComponents;
}

module.exports = System;
},{}],22:[function(require,module,exports){
"use strict";
module.exports = function(targetCanvas, cssWidth, cssHeight) {

  if (!targetCanvas) {
    throw new Error("Must specify a target!");
  }

  var ctx = targetCanvas.getContext('2d'),
      ratio;

  var dpr = window.devicePixelRatio || 1,
      bsr = ctx.webkitBackingStorePixelRatio ||
            ctx.mozBackingStorePixelRatio    ||
            ctx.msBackingStorePixelRatio     ||
            ctx.oBackingStorePixelRatio      ||
            ctx.backingStorePixelRatio       ||
            1;

  ratio = dpr / bsr;

  if (dpr !== bsr) {

    var width  = cssWidth  || targetCanvas.width,
        height = cssHeight || targetCanvas.height;

    targetCanvas.width  = width  * ratio;
    targetCanvas.height = height * ratio;

    targetCanvas.style.width  = width + "px";
    targetCanvas.style.height = height + "px";

    ctx.scale(ratio,ratio);
  }

  return targetCanvas;
}
},{}]},{},[4]);
