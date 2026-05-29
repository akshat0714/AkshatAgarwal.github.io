/* =========================================================
   3D neural-network background (Three.js r128, global THREE)
   - nodes (soft round points) + proximity edges
   - gentle auto-rotation + cursor parallax
   - respects prefers-reduced-motion, pauses when tab hidden
   - silently no-ops if WebGL/THREE unavailable (CSS bg remains)
   ========================================================= */
(function () {
  "use strict";
  var canvas = document.getElementById("bg-canvas");
  if (!canvas || typeof window.THREE === "undefined") return;

  var THREE = window.THREE;
  var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
  } catch (e) { return; } // no WebGL → CSS background carries the look

  var W = window.innerWidth, H = window.innerHeight;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  renderer.setSize(W, H, false);
  renderer.setClearColor(0x000000, 0);

  var scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x0e0e12, 55, 145);

  var camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 400);
  camera.position.set(0, 0, 64);

  // soft round dot texture
  function dotTexture() {
    var c = document.createElement("canvas"); c.width = c.height = 64;
    var g = c.getContext("2d");
    var grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    grd.addColorStop(0, "rgba(255,255,255,1)");
    grd.addColorStop(0.35, "rgba(255,255,255,0.85)");
    grd.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = grd; g.beginPath(); g.arc(32, 32, 32, 0, Math.PI * 2); g.fill();
    var t = new THREE.CanvasTexture(c); t.needsUpdate = true; return t;
  }
  var sprite = dotTexture();

  // --- build node positions (rounded volume) ---
  var COUNT = W < 700 ? 150 : 240;
  var R = 42;
  var pts = [];
  for (var i = 0; i < COUNT; i++) {
    // random point biased toward a flattened ellipsoid
    var u = Math.random(), v = Math.random(), w = Math.random();
    var theta = u * Math.PI * 2;
    var phi = Math.acos(2 * v - 1);
    var rad = R * Math.cbrt(w);
    var x = rad * Math.sin(phi) * Math.cos(theta) * 1.25;
    var y = rad * Math.sin(phi) * Math.sin(theta) * 0.85;
    var z = rad * Math.cos(phi);
    pts.push(new THREE.Vector3(x, y, z));
  }

  var group = new THREE.Group();
  scene.add(group);

  // --- regular + accent node splits ---
  var regPos = [], accPos = [];
  for (var n = 0; n < pts.length; n++) {
    (n % 5 === 0 ? accPos : regPos).push(pts[n].x, pts[n].y, pts[n].z);
  }

  function makePoints(arr, color, size, additive, opacity) {
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(arr, 3));
    var m = new THREE.PointsMaterial({
      color: color, size: size, map: sprite, transparent: true,
      opacity: opacity, depthWrite: false, sizeAttenuation: true,
      blending: additive ? THREE.AdditiveBlending : THREE.NormalBlending
    });
    return new THREE.Points(g, m);
  }
  group.add(makePoints(regPos, 0xf3efe6, 2.4, false, 0.55));
  group.add(makePoints(accPos, 0xff5436, 4.0, true, 0.95));

  // --- proximity edges ---
  var edgePos = [];
  var THRESH = 16, MAX_EDGES = 520, made = 0;
  for (var a = 0; a < pts.length && made < MAX_EDGES; a++) {
    for (var b = a + 1; b < pts.length && made < MAX_EDGES; b++) {
      if (pts[a].distanceTo(pts[b]) < THRESH) {
        edgePos.push(pts[a].x, pts[a].y, pts[a].z, pts[b].x, pts[b].y, pts[b].z);
        made++;
      }
    }
  }
  var eg = new THREE.BufferGeometry();
  eg.setAttribute("position", new THREE.Float32BufferAttribute(edgePos, 3));
  var em = new THREE.LineBasicMaterial({ color: 0xf3efe6, transparent: true, opacity: 0.12, depthWrite: false });
  group.add(new THREE.LineSegments(eg, em));

  // --- interaction ---
  var targetX = 0, targetY = 0, curX = 0, curY = 0;
  window.addEventListener("pointermove", function (e) {
    targetX = (e.clientX / window.innerWidth - 0.5);
    targetY = (e.clientY / window.innerHeight - 0.5);
  }, { passive: true });

  var running = true;
  document.addEventListener("visibilitychange", function () {
    running = !document.hidden;
    if (running && !reduced) requestAnimationFrame(loop);
  });

  function resize() {
    W = window.innerWidth; H = window.innerHeight;
    camera.aspect = W / H; camera.updateProjectionMatrix();
    renderer.setSize(W, H, false);
  }
  var rt;
  window.addEventListener("resize", function () { clearTimeout(rt); rt = setTimeout(resize, 150); });

  var t0 = performance.now();
  function loop() {
    if (!running) return;
    var t = (performance.now() - t0) * 0.001;
    curX += (targetX - curX) * 0.04;
    curY += (targetY - curY) * 0.04;
    group.rotation.y = t * 0.05 + curX * 0.6;
    group.rotation.x = Math.sin(t * 0.12) * 0.08 + curY * 0.4;
    renderer.render(scene, camera);
    requestAnimationFrame(loop);
  }

  if (reduced) {
    group.rotation.y = 0.4; group.rotation.x = 0.1;
    renderer.render(scene, camera); // single static frame
  } else {
    requestAnimationFrame(loop);
  }
})();
