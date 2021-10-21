import * as THREE from './build/three.module.js';
import { GLTFLoader } from './examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from './examples/jsm/controls/OrbitControls.js';

let scene1 = new THREE.Scene();
let scene2 = new THREE.Scene();

let camera1 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
camera1.position.set(0, 5, 0);
camera1.rotation.y = Math.PI / 2;

let camera2 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
camera2.position.set(0, 0, 5);

let light = new THREE.AmbientLight(0xFFFFFF, 1.3);

var renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setClearColor(0x000000, 0);
renderer.autoClear = false;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.domElement.addEventListener('click', onClick, false);

window.addEventListener('resize', function () {
    let width = window.innerWidth;
    let height = window.innerHeight;
    renderer.setSize(width, height);
    camera1.aspect = width / height;
    camera1.updateProjectionMatrix();
    camera2.aspect = width / height;
    camera2.updateProjectionMatrix();
});

let controls = new OrbitControls(camera1, renderer.domElement);
controls.enableDamping = true;
controls.screenSpacePanning = false;
controls.minDistance = 1;
controls.maxDistance = 10;
controls.maxPolarAngle = Math.PI / 2;
controls.update();

let loader = new GLTFLoader();
let loadAsync = url => {
    return new Promise(resolve => {
        loader.load(url, gltf => {
            resolve(gltf)
        });
    });
}

let Selected = document.getElementById("display"); 
Selected.addEventListener("change",function() { 
  localStorage.setItem("type",this.value);
}); 
let type = localStorage.getItem("type");   
console.log(type); 

    Promise.all([
        loadAsync('static/model/taipei.glb'),
        loadAsync('static/model/newtaipei.glb'),
        loadAsync('static/model/keelung.glb'),
        loadAsync('static/model/taoyuan.glb'),
        loadAsync('static/model/hsinchu.glb'),
        loadAsync('static/model/miaoli.glb'),
        loadAsync('static/model/taichung.glb'),
        loadAsync('static/model/changhua.glb'),
        loadAsync('static/model/nantou.glb'),
        loadAsync('static/model/yunlin.glb'),
        loadAsync('static/model/chiayi.glb'),
        loadAsync('static/model/tainan.glb'),
        loadAsync('static/model/kaohsiung.glb'),
        loadAsync('static/model/pingtung.glb'),
        loadAsync('static/model/yilan.glb'),
        loadAsync('static/model/hualien.glb'),
        loadAsync('static/model/taitung.glb'),
        loadAsync('static/model/2014' + type + '.glb'),
        loadAsync('static/model/2015' + type + '.glb'),
        loadAsync('static/model/2016' + type + '.glb'),
        loadAsync('static/model/2017' + type + '.glb'),
        loadAsync('static/model/2018' + type + '.glb'),
        loadAsync('static/model/2019' + type + '.glb'),
        loadAsync('static/model/2020' + type + '.glb')]).then(models => {

            let taipei = models[0].scene;
            let newtaipei = models[1].scene;
            let keelung = models[2].scene;
            let taoyuan = models[3].scene;
            let hsinchu = models[4].scene;
            let miaoli = models[5].scene;
            let taichung = models[6].scene;
            let changhua = models[7].scene;
            let nantou = models[8].scene;
            let yunlin = models[9].scene;
            let chiayi = models[10].scene;
            let tainan = models[11].scene;
            let kaohsiung = models[12].scene;
            let pingtung = models[13].scene;
            let yilan = models[14].scene;
            let hualien = models[15].scene;
            let taitung = models[16].scene;

            let display_2014 = models[17].scene;
            let display_2015 = models[18].scene;
            let display_2016 = models[19].scene;
            let display_2017 = models[20].scene;
            let display_2018 = models[21].scene;
            let display_2019 = models[22].scene;
            let display_2020 = models[23].scene;

            scene1.add(taipei);
            scene1.add(newtaipei);
            scene1.add(keelung);
            scene1.add(taoyuan);
            scene1.add(hsinchu);
            scene1.add(miaoli);
            scene1.add(taichung);
            scene1.add(changhua);
            scene1.add(nantou);
            scene1.add(yunlin);
            scene1.add(chiayi);
            scene1.add(tainan);
            scene1.add(kaohsiung);
            scene1.add(pingtung);
            scene1.add(yilan);
            scene1.add(hualien);
            scene1.add(taitung);

            let slider1 = document.getElementById("timeline");
            let output1 = document.getElementById("year");
            output1.innerHTML = slider1.value;
            slider1.oninput = function () {
                output1.innerHTML = this.value;
                localStorage.setItem('year', this.value);

                let timelineYear = localStorage.getItem('year');
                if (timelineYear == 2014) {
                    scene2.remove(scene2.children[0]);
                    scene2.add(display_2014);
                } else if (timelineYear == 2015) {
                    scene2.remove(scene2.children[0]);
                    scene2.add(display_2015);
                } else if (timelineYear == 2016) {
                    scene2.remove(scene2.children[0]);
                    scene2.add(display_2016);
                } else if (timelineYear == 2017) {
                    scene2.remove(scene2.children[0]);
                    scene2.add(display_2017);
                } else if (timelineYear == 2018) {
                    scene2.remove(scene2.children[0]);
                    scene2.add(display_2018);
                } else if (timelineYear == 2019) {
                    scene2.remove(scene2.children[0]);
                    scene2.add(display_2019);
                } else if (timelineYear == 2020) {
                    scene2.remove(scene2.children[0]);
                    scene2.add(display_2020);
                }
            }
        });

let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();
function onClick(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera1);
    let intersects = raycaster.intersectObjects(scene1.children, true);
    if (intersects.length > 0) {
        localStorage.setItem('location', intersects[0].object.userData.name)
    }
}

function animate() {
    requestAnimationFrame(animate);
    renderer.clear();
    scene1.add(light);
    renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);
    renderer.render(scene1, camera1);

    renderer.clearDepth();
    scene2.add(light);
    renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);
    renderer.render(scene2, camera1);
    controls.update();
}

animate();