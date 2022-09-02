import '../css/style.css'
import $ from 'jquery'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene()
scene.background = new THREE.Color(0xffffff)

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(0, 0, 10)

const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#bg'), antialias: true })
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.outputEncoding = THREE.sRGBEncoding

window.addEventListener( 'resize', function () {
	const width = window.innerWidth
	const height = window.innerHeight
	renderer.setSize(width, height)
	camera.aspect = width / height
	camera.updateProjectionMatrix()
	weapon.rotation.set(Math.PI, Math.PI, Math.PI / 2 > Math.PI * (window.innerWidth / 1500) ? Math.PI / 2 : Math.PI * (window.innerWidth / 1500))
})

const controls = new OrbitControls(camera, renderer.domElement)

const ambientLight = new THREE.AmbientLight(0x404040, 1)
const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
directionalLight.position.set(0, 20, 20)
scene.add(directionalLight, ambientLight)

const gltfLoader = new GLTFLoader()
let weapon
gltfLoader.load('./assets/weapon/kagami_chihiro/scene.gltf', gltf => {
	weapon = gltf.scene
    weapon.scale.set(7, 7, 7)
    weapon.position.set(0, 0, 0)
    weapon.rotation.set(Math.PI, Math.PI, Math.PI / 2 > Math.PI * (window.innerWidth / 1500) ? Math.PI / 2 : Math.PI * (window.innerWidth / 1500))
    scene.add(weapon)

    animate()
})

/*
document.body.onscroll = function(e){
    const t = document.body.getBoundingClientRect().top
    weapon.rotation.z = t * 0.01
}
*/

var mouseX = 0
var mouseY = 0
onmousemove = function(e){
    mouseX = e.clientX
    mouseY = e.clientY
}

const animate = () => {
    requestAnimationFrame(animate)

    camera.position.x = - (mouseX / window.innerWidth * 0.4 - 0.3)
    camera.position.y = (mouseY / window.innerHeight * 0.3 - 0.4)
    weapon.rotation.x = Math.PI / 2 + (mouseY / window.innerHeight) * Math.PI * 0.1 + Math.PI * 0.45
    weapon.rotation.y = Math.PI / 2 - (mouseX / window.innerWidth) * Math.PI * 0.1 - Math.PI * 0.45

    renderer.render(scene, camera)
}