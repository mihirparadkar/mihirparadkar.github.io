//The scene with human activities
(function (){
  //Boilerplate to add the scene, camera, renderer,
  //and fit into the designated DOM element
  var scene = new THREE.Scene();

  var camera = new THREE.PerspectiveCamera(75,
    0.2/0.4 * window.innerWidth/window.innerHeight, 0.1, 1000);

  var renderer = new THREE.WebGLRenderer();

  var light = new THREE.PointLight( 0xffffff, 1, 100 );
  light.position.set( 0, 0, 2);
  scene.add( light );

  renderer.setSize( window.innerWidth*0.2, window.innerHeight*0.4 );

  document.getElementById("viz0").appendChild( renderer.domElement );

  renderer.setClearColor( 0xffffff, 1);

  camera.position.z = 0.9;

  var render = function () {
    requestAnimationFrame( render );
    human.rotation.y += 0.01;
    sphere2.rotation.y += 0.01;
    renderer.render(scene, camera);
  };

  //make a human variable in this scope and asynchronously load the human head
  var human, font;
  var humanLoader = new THREE.JSONLoader();
  humanLoader.load('../models/humanheadmin.js',function(geometry, materials){
    humangeo = geometry;
    human = new THREE.Mesh( geometry, new THREE.MultiMaterial(materials) );
    scene.add(human);
  });

  //make a sphere to represent air consumption while running
  var sphgeo = new THREE.SphereGeometry(m3toRadius(0.05), 18, 18);
  var sphgeo2 = new THREE.SphereGeometry(m3toRadius(0.05), 4, 3);
  var sphmat = new THREE.MeshBasicMaterial({color: 0x9999ee,
      transparent: true, opacity: 0.5});
  var sphmat2 = new THREE.MeshBasicMaterial({color: 0xaaaaff,
      transparent: false, wireframe: true});
  var sphere = new THREE.Mesh( sphgeo, sphmat);
  var sphere2 = new THREE.Mesh( sphgeo2, sphmat2);

  scene.add(sphere2);
  scene.add(sphere);
  //Event listeners to add interactivity
  var down = false;
      var sx = 0,
          sy = 0;

  document.getElementById("viz0").onmousedown = function(ev) {
    down = true;
    sx = ev.clientX;
    sy = ev.clientY;
  };

  document.getElementById("viz0").onmouseup = function() {
      down = false;
  };

  document.getElementById("viz0").onmousemove = function(ev) {
      if (down) {
          var dx = ev.clientX - sx;
          var dy = ev.clientY - sy;
          human.rotation.y += dx * 0.01;
          human.rotation.x += dy * 0.01;
          sphere.rotation.y += dx * 0.01;
          sphere.rotation.x += dy * 0.01;
          sphere2.rotation.y += dx * 0.01;
          sphere2.rotation.x += dy * 0.01;
          sx += dx;
          sy += dy;
      }
  };

  render();
})();
