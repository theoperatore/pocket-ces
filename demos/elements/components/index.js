module.exports = function(p) {

  // rendering canvas and context
  p.cmp('ctx', function(cmp, opts) {
    
    // setup the canvas
    cmp.cvs = document.createElement('canvas');
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