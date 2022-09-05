const icons = [
    'abydos',
    'gehenna',
    'millennium',
    'trinity',
    'hyakkiyako',
    'shanhaijing',
    'redwinter',
    'valkyrie',
    'arius',
    'srt'
]

var granimInstance = new Granim({
    element: '#gradient',
    direction: 'diagonal',
    isPausedWhenNotInView: true,
    stateTransitionSpeed: 2000,
    defaultStateName: 'abydos',
    states: {
        'abydos': {
            gradients: [
                ['#60bbdf', '#5cd1af'],
                ['#5cd1af', '#60bbdf']
            ], transitionSpeed: 2000
        },
        'gehenna': {
            gradients: [
                ['#8e2e2d', '#ef4a46'],
                ['#ef4a46', '#8e2e2d']
            ], transitionSpeed: 2000
        },
        'millennium': {
            gradients: [
                ['#69b0f0', '#a297f4'],
                ['#a297f4', '#69b0f0']
            ], transitionSpeed: 2000
        },
        'trinity': {
            gradients: [
                ['#fdb85b', '#ffe0a5'],
                ['#ffe0a5', '#fdb85b']
            ], transitionSpeed: 2000
        },
        'hyakkiyako': {
            gradients: [
                ['#ffadcf', '#fb6aaa'],
                ['#fb6aaa', '#ffadcf']
            ], transitionSpeed: 2000
        },
        'shanhaijing': {
            gradients: [
                ['#639165', '#8edba9'],
                ['#8edba9', '#639165']
            ], transitionSpeed: 2000
        },
        'redwinter': {
            gradients: [
                ['#812e4b', '#eb6d86'],
                ['#eb6d86', '#812e4b']
            ], transitionSpeed: 2000
        },
        'valkyrie': {
            gradients: [
                ['#8d93e2', '#cfc6db'],
                ['#cfc6db', '#8d93e2']
            ], transitionSpeed: 2000
        },
        'arius': {
            gradients: [
                ['#fefefd', '#aaaaaa'],
                ['#aaaaaa', '#fefefd']
            ], transitionSpeed: 2000
        },
        'srt': {
            gradients: [
                ['#878787', '#2e2e2e'],
                ['#2e2e2e', '#878787']
            ], transitionSpeed: 2000
        }
    }
})

var currentIcon = 0

// function to manage buttons
const checkBtn = () => {
    if (currentIcon == 0) {
        $('#menu-back').prop('disabled', true)
        $('#menu-back').css({ opacity: 0 })
    } else {
        $('#menu-back').removeAttr('disabled')
        $('#menu-back').css({ opacity: 1 })
    }

    if (currentIcon == icons.length - 1) {
        $('#menu-next').prop('disabled', true)
        $('#menu-next').css({ opacity: 0 })
    } else {
        $('#menu-next').removeAttr('disabled')
        $('#menu-next').css({ opacity: 1 })
    }
}

// function to load icons
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

        TweenMax.to(icon.scale, 1, { x: 1, y: 1, z: 1 })
        TweenMax.to(icon.children[2].material, 1, { opacity: 1 })
    })
}

// initial run
loadIcon(icons[currentIcon])
$('#menu-text').text(icons[currentIcon])
checkBtn()

// menu next btn onclick
const navNext = () => {
    currentIcon += 1

    $('#menu-next').prop('disabled', true)
    $('#menu-text').css({ opacity: 0 })

    TweenMax.to(icon.scale, 1, { x: 0, y: 0, z: 0 })
    TweenMax.to(icon.children[2].material, 1, { opacity: 0, onComplete: loadIcon, onCompleteParams: [icons[currentIcon]] })
    
    granimInstance.changeState(icons[currentIcon])

    setTimeout(() => {
        $('#menu-text').text(icons[currentIcon])
        $('#menu-text').css({ opacity: 1 })
        
        checkBtn()
    }, 1500)
}

// menu back btn onclick
const navBack = () => {
    currentIcon -= 1

    $('#menu-back').prop('disabled', true)
    $('#menu-text').css({ opacity: 0 })

    TweenMax.to(icon.scale, 1, { x: 0, y: 0, z: 0 })
    TweenMax.to(icon.children[2].material, 1, { opacity: 0, onComplete: loadIcon, onCompleteParams: [icons[currentIcon]] })
    
    granimInstance.changeState(icons[currentIcon])

    setTimeout(() => {
        $('#menu-text').text(icons[currentIcon])
        $('#menu-text').css({ opacity: 1 })
        checkBtn()
    }, 1500)
}

// constant animation every tick
const animateIcon = () => {
    if (icon) {
        icon.rotation.x = (mouseY / window.innerHeight) * Math.PI * 0.1 + Math.PI * 0.45
        icon.rotation.z = Math.PI / 2 - (mouseX / window.innerWidth) * Math.PI * 0.2 - Math.PI * 0.4
    }
}

// enter section
const navEnter = () => {
    $('#menu-text').prop('disabled', true)
    $('#menu-text').css({ opacity: 0 })
    setTimeout(() => {
        $('#menu-text').css({ display: 'none' })
    }, 500)



}