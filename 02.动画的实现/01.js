function init() {
  // 创建场景
  let scene = new THREE.Scene()
  // 设置摄像机
  let camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerWidth,
    0.1,
    2000
  )
  // 创建渲染器
  let renderer = new THREE.WebGLRenderer()
  // 设置渲染器的初始颜色
  renderer.setClearColor(new THREE.Color(0xeeeeee))
  // 设置输出 canvas 画面的大小
  renderer.setSize(window.innerWidth, window.innerHeight)
  // 设置渲染物体阴影
  renderer.shadowMapEnabled = true
  //显示三维坐标系 绿色是y轴， 红色 x 轴， 蓝色是 z 轴
  let axes = new THREE.AxisHelper(20)

  // 添加坐标系到场景中
  scene.add(axes)
  // 创建地面的几何体
  let planeGeometry = new THREE.PlaneBufferGeometry(60, 20)
  // 给地面物体上色
  let planeMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff })
  // 创建地面
  let plane = new THREE.Mesh(planeGeometry, planeMaterial)
  // 物体移动位置
  plane.rotation.x = -0.5 * Math.PI
  plane.position.x = 0
  plane.position.y = 0
  plane.position.z = 0
  plane.castShadow = true

  // 接收阴影
  plane.receiveShadow = true

  //将地面添加到场景中
  scene.add(plane)

  // 球体
  let spherGeometry = new THREE.SphereGeometry(4, 20, 20)
  let spherMeterial = new THREE.MeshLambertMaterial({ color: 0xffff00 })
  let sphere = new THREE.Mesh(spherGeometry, spherMeterial)
  sphere.position.y = 4
  sphere.position.x = 10
  sphere.position.z = 10

  scene.add(sphere)
  // 添加立方体
  let cubeGeometry = new THREE.BoxGeometry(4, 4, 4)
  let cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 })
  let cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
  cube.position.x = 4
  cube.position.y = 4
  cube.position.z = 4

  // 对象是否渲染阴贴图中
  cube.castShadow = true

  scene.add(cube)

  // 创建聚光灯
  let spotLight = new THREE.SpotLight(0xffffff)

  spotLight.position.set(130, 130, -130)
  spotLight.castShadow = true
  //添加聚光灯

  scene.add(spotLight)

  // 定位相机，并且指向场景中心
  camera.position.x = 40
  camera.position.y = 40
  camera.position.z = 40
  camera.lookAt(scene.position)

  // 将渲染器输出到 html元素中
  document.getElementById("webgl-output").appendChild(renderer.domElement)
  renderer.render(scene, camera)
  let T0 = new Date()
  function render() {
    let T1 = new Date()
    let t = T1 - T0
    T0 = T1
    renderer.render(scene, camera)
    // 每次围绕 y 轴渲染0.01 弧度
    // 每一毫米渲染 0.001 度
    cube.rotateY(0.001 * t)
    window.requestAnimationFrame(render)
  }

  // setInterval(render, 16)

  window.requestAnimationFrame(render)
}

window.onload = init
