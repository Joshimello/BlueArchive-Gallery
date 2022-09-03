let weapon
const loadWeapon = name => {
    gltfLoader.load(`./assets/weapon/${name}/scene.gltf`, gltf => {
        weapon = gltf.scene
        weapon.scale.set(7, 7, 7)
        weapon.position.set(0, 0, 0)
        weapon.rotation.set(Math.PI, Math.PI, Math.PI / 2 > Math.PI * (window.innerWidth / 1500) ? Math.PI / 2 : Math.PI * (window.innerWidth / 1500))
        scene.add(weapon)
        animate()
    })
}

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

    animateIcon()

    camera.position.x = - (mouseX / window.innerWidth * 0.4 - 0.3)
    camera.position.y = (mouseY / window.innerHeight * 0.3 - 0.4)

    if (weapon) {
        weapon.rotation.x = Math.PI / 2 + (mouseY / window.innerHeight) * Math.PI * 0.1 + Math.PI * 0.45
        weapon.rotation.y = Math.PI / 2 - (mouseX / window.innerWidth) * Math.PI * 0.1 - Math.PI * 0.45
    }
    
    renderer.render(scene, camera)
}