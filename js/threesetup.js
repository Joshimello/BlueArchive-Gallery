const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(0, 0, 10)

const renderer = new THREE.WebGLRenderer({canvas: document.querySelector('#bg'), antialias: true, alpha: true})
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

const ambientLight = new THREE.AmbientLight(0x404040, 1)
const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
directionalLight.position.set(0, 20, 20)
scene.add(directionalLight, ambientLight)

const controls = new THREE.OrbitControls(camera, renderer.domElement)
const gltfLoader = new THREE.GLTFLoader()