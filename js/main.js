import '../css/style.css'
import $ from 'jquery'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene()
scene.background = new THREE.Color(0x2f4751)
scene.fog = new THREE.Fog(0x2f4751, 10, 50)

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(7, 3, 7)

const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#bg'), antialias: true })
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.outputEncoding = THREE.sRGBEncoding
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

const pmremGenerator = new THREE.PMREMGenerator(renderer)
pmremGenerator.compileEquirectangularShader()

window.addEventListener( 'resize', function () {
	const width = window.innerWidth
	const height = window.innerHeight
	renderer.setSize(width, height)
	camera.aspect = width / height
	camera.updateProjectionMatrix()
})

const controls = new OrbitControls(camera, renderer.domElement)

const hlight = new THREE.AmbientLight(0x404040, 1)
scene.add(hlight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
directionalLight.castShadow = true
directionalLight.shadow.camera.top = 4
directionalLight.shadow.camera.bottom = - 4
directionalLight.shadow.camera.left = - 4
directionalLight.shadow.camera.right = 4
directionalLight.shadow.camera.near = 0.1
directionalLight.shadow.camera.far = 40
directionalLight.shadow.camera.far = 40
directionalLight.shadow.bias = - 0.002
directionalLight.position.set(0, 20, 20)
scene.add(directionalLight)

const mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(100, 100), new THREE.MeshPhongMaterial({ color: 0x1e3137, depthWrite: false }))
mesh.rotation.x = - Math.PI / 2
mesh.position.set(0, -5, 0)
mesh.receiveShadow = true
scene.add(mesh)

const gltfLoader = new GLTFLoader()
let weapon
gltfLoader.load('./assets/weapon/asagao_hanae/scene.gltf', gltf => {
	weapon = gltf.scene
    weapon.rotation.set(Math.PI, 0, Math.PI / 2)
    weapon.scale.set(7, 7, 7)
    weapon.position.set(0, -1, 0)
    weapon.castShadow = true
    weapon.recieveShadow = true
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

    weapon.rotation.y += 0.005

    renderer.render(scene, camera)
}