module.exports = function(p) {

  // rendering canvas and context
  p.cmp('ctx', function(cmp, opts) {
    
    // setup the canvas
    cmp.cvs = document.createElement('canvas');
    cmp.ctx = cmp.cvs.getContext('2d');
    document.body.appendChild(cmp.cvs);

    // super hd awesome canvas
    var width  = window.innerWidth;
    var height = window.innerHeight;

    var dpr = window.devicePixelRatio || 1,
        bsr = cmp.ctx.webkitBackingStorePixelRatio ||
        cmp.ctx.mozBackingStorePixelRatio    ||
        cmp.ctx.msBackingStorePixelRatio     ||
        cmp.ctx.oBackingStorePixelRatio      ||
        cmp.ctx.backingStorePixelRatio       ||
        1;

    var ratio = dpr / bsr;

    if (dpr !== bsr) {

      cmp.cvs.width  = width * ratio;
      cmp.cvs.height = height * ratio;

      cmp.cvs.style.width  = (width) + "px";
      cmp.cvs.style.height = (height) + "px";

      cmp.cvs.getContext('2d').scale(ratio,ratio);
    }

    cmp.center = { 
      x: (dpr !== bsr) ? cmp.cvs.width / 4  : cmp.cvs.width / 2,
      y: (dpr !== bsr) ? cmp.cvs.height / 4 : cmp.cvs.height / 2
    }

    cmp.width = (dpr !== bsr) ? cmp.cvs.width / 2 : cmp.cvs.width;
    cmp.height = (dpr !== bsr) ? cmp.cvs.height / 2 : cmp.cvs.height;
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
  });

  p.cmp('thrust', function(cmp, opts) {
    cmp.value = opts.value || 0.002;
    cmp.drag = opts.value || 0.95;
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
    cmp.hp = opts.hp || 2;
  });

  p.cmp('label', function(cmp, opts) {
    cmp.value = opts.value || "#";
  });

  p.cmp('score', function(cmp, opts) {
    cmp.value = opts.value || 0;
  });

  p.cmp('timer', function(cmp, opts) {
    cmp.max = (opts.max * 60) || (5 * 60);
    cmp.count = opts.count || 0;
    cmp.complete = opts.complete || false;
  });
}