//Texture loader
const loader = new THREE.TextureLoader()
const star = loader.load('../img/star.png')

// Scene
const scene = new THREE.Scene();

// Objects
const geometry = new THREE.BoxGeometry(0.5,0.5,0.5);

const particlesGeometry = new THREE.BufferGeometry;
const particlesCnt = 5000;

const posArray = new Float32Array(particlesCnt * 3);
//xyz, xyz, xyz, xyz
for(let i = 0; i < particlesCnt*3; i++){
    // posArray[i] = Math.random()
    // posArray[i] = Math.random() - 0.5
    // posArray[i] = Math.random() - 0.5 * 5
    posArray[i] = (Math.random() - 0.5) * (Math.random()*5)

}
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

// Materials
// const material = new THREE.MeshBasicMaterial( { color: 0x663388 } );
const material = new THREE.MeshStandardMaterial();
material.metalness = 0.7;
material.roughness = 0.2;
material.color = new THREE.Color(0x663388);

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.005,
    map: star,
    transparent: true,
})

// Mesh
const cube = new THREE.Mesh( geometry, material );
const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(cube, particlesMesh);

// Lights
// const pointLight = new THREE.PointLight(0xffffff, 0.1)
// pointLight.position.x = 2
// pointLight.position.y = 3
// pointLight.position.z = 4
// scene.add(pointLight)
const pointLight2 = new THREE.PointLight(0xff0000, 2)
pointLight2.position.set(-0.82,0.18,0.23)
pointLight2.intensity = 10

scene.add(pointLight2)

const pointLight3 = new THREE.PointLight(0x460f6e, 2)
pointLight3.position.set(1.91,-0.63,0.56)
pointLight3.intensity = 10

scene.add(pointLight3)


// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 2;
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement ); 


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})


//Mouse

document.addEventListener('mousemove', animateParticles);

let mouseX = 0
let mouseY = 0

function animateParticles(event){
    mouseY = event.clientY
    mouseX = event.clientX
}

// Interaction


// Animate

const clock = new THREE.Clock();

const tick = () => 
{
    const elapsedTime = clock.getElapsedTime()

    //Update objects
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    particlesMesh.rotation.y = -.1 * elapsedTime;
    if(mouseX > 0) {
        particlesMesh.rotation.x = mouseY * (elapsedTime * 0.00008)
        particlesMesh.rotation.y = mouseX * (elapsedTime * 0.00008)
    }

    // cube.rotation.y = 0.01 * elapsedTime;
    // cube.rotation.x = 0.01 * elapsedTime;

    // targetX = mouseX * .001
    // targetY = mouseY * .001

    // cube.rotation.y += .5 * (targetX - cube.rotation.y)
    // cube.rotation.x += .05 * (targetY - cube.rotation.x)

    //Render
    renderer.render( scene, camera );

    window.requestAnimationFrame( tick );

}

tick();