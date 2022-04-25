import * as THREE from "../libs/build/three.module.js"
import { OrbitControls } from "../libs/jsm/controls/OrbitControls.js"
import {
  CSS2DRenderer,
  CSS2DObject,
} from "../libs/jsm/renderers/CSS2DRenderer.js"

// 声明全局变量

let camera, scene, renderer, labelRenderer
let moon, earth
let clock = new THREE.Clock()
// 实例化纹理加载器
const textureLoader = new THREE.TextureLoader()

function init() {
  // 地球和月球半径大小
  const EARTH_RADIUS = 2.5
  const MOON_RADIUS = 0.27

  // 实例化相机
  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    200
  )

  camera.position.set(10, 5, 10)
  // 实例化场景
  scene = new THREE.Scene()
  // 创建聚光灯源创建和添加
  const dirLigh = new THREE.SpotLight(0xffffff)
  dirLigh.position.set(0, 0, 10)
  dirLigh.intensity = 2
  dirLigh.castShadow = true
  scene.add(dirLigh)

  //添加环境光
  const aLight = new THREE.AmbientLight(0xffffff)
  aLight.intensity = 0.3
  scene.add(aLight)
  // 创建月球
  const moonGeometry = new THREE.SphereGeometry(MOON_RADIUS, 16, 16)
  const moonMaterial = new THREE.MeshPhongMaterial({
    map: textureLoader.load("textures/planets/moon_1024.jpg"),
  })
  moon = new THREE.Mesh(moonGeometry, moonMaterial)
  moon.receiveShadow = true
  moon.castShadow = true
  scene.add(moon)

  // 创建月球标签
  const moonDiv = document.createElement("div")
  moonDiv.className = "label"
  moonDiv.textContent = "Moon"
  const moonLabel = new CSS2DObject(moonDiv)
  moonLabel.position.set(0, MOON_RADIUS + 0.5, 0)
  moon.add(moonLabel)

  // 创建地球
  const earthGeometry = new THREE.SphereGeometry(EARTH_RADIUS, 16, 16)
  const earthMaterial = new THREE.MeshPhongMaterial({
    shininess: 5,
    map: textureLoader.load("textures/planets/earth_atmos_2048.jpg"),
    specularMap: textureLoader.load("textures/planets/earth_specular_2048.jpg"),
    normalMap: textureLoader.load("textures/planets/earth_normal_2048.jpg"),
  })

  earth = new THREE.Mesh(earthGeometry, earthMaterial)
  earth.receiveShadow = true
  earth.castShadow = true
  scene.add(earth)
  const earthDiv = document.createElement("div")
  earthDiv.className = "label"
  earthDiv.textContent = "Earch"
  const eartchLabel = new CSS2DObject(earthDiv)
  eartchLabel.position.set(0, EARTH_RADIUS + 0.5, 0)
  earth.add(eartchLabel)
  // 创建渲染器
  renderer = new THREE.WebGL1Renderer({
    alpha: true,
  })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  // 渲染阴影
  renderer.updateShadowMap.enabled = true
  document.body.appendChild(renderer.domElement)
  // 标签渲染器
  labelRenderer = new CSS2DRenderer()
  labelRenderer.setSize(window.innerWidth, window.innerHeight)
  labelRenderer.domElement.style.position = "absolute"
  labelRenderer.domElement.style.top = "0px"
  document.body.appendChild(labelRenderer.domElement)
  // 绑定控制 和摄像头
  const controls = new OrbitControls(camera, renderer.domElement)
}

let outtime = 0
function animate() {
  const elapsed = clock.getElapsedTime()
  moon.position.set(Math.sin(elapsed) * 5, 0, Math.cos(elapsed) * 5)

  // 地球自转
  var axis = new THREE.Vector3(0, 1, 0)
  earth.rotateOnAxis(axis, ((elapsed - outtime) * Math.PI) / 10)
  outtime = elapsed
  renderer.render(scene, camera)
  labelRenderer.render(scene, camera)
  requestAnimationFrame(animate)
}

init()
animate()

// 根据、、窗口大小 调整尺寸
window.onresize = () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}
