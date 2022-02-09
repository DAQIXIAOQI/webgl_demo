import './index.scss'
import React, {useEffect} from 'react'
import createScene from './main'
// import * as BABYLON from 'babylonjs'
// import 'babylonjs-loaders'

// const createScene = function (canvas: any, engine: any) {
//   // Create a basic BJS Scene object.
//   const scene = new BABYLON.Scene(engine)

//   // Create a FreeCamera, and set its position to (x:0, y:5, z:-10).
//   const camera = new BABYLON.FreeCamera('camera', new BABYLON.Vector3(0, 5, -10), scene)

//   // Target the camera to scene origin.
//   camera.setTarget(BABYLON.Vector3.Zero())

//   // Attach the camera to the canvas.
//   camera.attachControl(canvas, false)

//   // Create a basic light, aiming 0,1,0 - meaning, to the sky.
//   const light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene)

//   // Create a built-in "sphere" shape.
//   const sphere = BABYLON.MeshBuilder.CreateSphere('sphere', {segments: 16, diameter: 2}, scene)

//   // Move the sphere upward 1/2 of its height.
//   sphere.position.y = 1

//   // Create a built-in "ground" shape.
//   const ground = BABYLON.MeshBuilder.CreateGround('ground1', {height: 6, width: 6, subdivisions: 2}, scene)

//   // Return the created scene.
//   return scene
// }

const BabyLon = () => {
  useEffect(() => {
    let sceneToRender: any = null
    const canvas = document.getElementById('renderCanvas')
    const engine =
      canvas &&
      new BABYLON.Engine(canvas as HTMLCanvasElement, true, {
        preserveDrawingBuffer: true,
        stencil: true,
        disableWebGL2Support: false,
      })
    const scene = engine && new BABYLON.Scene(engine)
    engine &&
      engine.runRenderLoop(function () {
        if (sceneToRender && sceneToRender.activeCamera) {
          sceneToRender.render()
        }
      })

    if (scene) {
      // // Create a default skybox with an environment.
      // var hdrTexture = BABYLON.CubeTexture.CreateFromPrefilteredData("http://bdgamelive.com:5000/textures/environment.dds", scene);
      // var currentSkybox = scene.createDefaultSkybox(hdrTexture, true);
      const light = new BABYLON.PointLight('pointLight', new BABYLON.Vector3(0, 0, 0), scene)
      light.setEnabled(true)
    }

    BABYLON.SceneLoader.Append(
      'http://172.29.137.109:5000/AnimatedCube/',
      'AnimatedCube.gltf',
      scene,
      function (scene: any) {
        // Create a default arc rotate camera and light.
        scene.createDefaultCameraOrLight(true, true, true)
        const light = new BABYLON.DirectionalLight('DirectionalLight', new BABYLON.Vector3(0.1, 1, 0), scene)
        light.setEnabled(true)
        light.diffuse = new BABYLON.Color3(1, 1, 1)
        // The default camera looks at the back of the asset.
        // Rotate the camera by 180 degrees to the front of the asset.
        if (scene && scene.activeCamera) scene.activeCamera.alpha += Math.PI

        sceneToRender = scene
      },
    )
    // 静态demo
    // const scene = createScene(canvas, engine)
    // engine &&
    //   engine.runRenderLoop(function () {
    //     scene.render()
    //   })
    // window.addEventListener('resize', function () {
    //   engine && engine.resize()
    // })
  }, [])
  return (
    <div className="App">
      <canvas id="renderCanvas"></canvas>
    </div>
  )
}

export default BabyLon
