const schools = ['abydos', 'genhenna', 'millennium', 'trinity', 'hyakkiyako', 'shanghaijing', 'redwinter', 'valkyrie', 'arius', 'srt']

let icon
const loadIcon = name => {
    gltfLoader.load(`./assets/school_icon/${name}/scene.gltf`, gltf => {
        scene.remove(icon)
        icon = gltf.scene
        icon.scale.set(0, 0, 0)
        icon.position.set(0, 0, 0)
        icon.rotation.set(Math.PI / 2, 0, 0)
        icon.children[2].material.transparent = true
        icon.children[2].material.opacity = 0
        scene.add(icon)
        animate()

        TweenMax.to(icon.scale, 1, {x: 1, y: 1, z: 1})
        TweenMax.to(icon.children[2].material, 1, {opacity: 1})
    })
}

loadIcon('gehenna')
const navNext = () => {
    TweenMax.to(icon.scale, 1, {x: 0, y: 0, z: 0})
    TweenMax.to(icon.children[2].material, 1, {opacity: 0, onComplete: loadIcon, onCompleteParams: ['abydos']})
    $('#bg').css({backgroundPosition: '100% 200%'})
    $('.menu-text').css({opacity: 0})
    setTimeout(() => {
        $('.menu-text').text('abydos')
        $('.menu-text').css({opacity: 1})
    }, 1500)
}


const animateIcon = () => {
    if (icon) {
        icon.rotation.x = (mouseY / window.innerHeight) * Math.PI * 0.1 + Math.PI * 0.45
        icon.rotation.z = Math.PI / 2 - (mouseX / window.innerWidth) * Math.PI * 0.1 - Math.PI * 0.45
    }
}