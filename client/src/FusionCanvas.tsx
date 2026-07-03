import { useEffect, useRef } from "react";
import * as THREE from "three";

import { FusionRenderer } from "../../core/rendering/FusionRenderer";
import { FusionScene } from "../../core/scene/FusionScene";
import { FusionComponentType } from "../../core/component/FusionComponentType";

export default function FusionCanvas() {

    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {

        if (!mountRef.current) return;

        //
        // THREE.JS SETUP
        //

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x0b0d13);

        const camera = new THREE.PerspectiveCamera(
            60,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );

        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer({
            antialias: true
        });

        renderer.setSize(window.innerWidth, window.innerHeight);

        mountRef.current.appendChild(renderer.domElement);

        //
        // LIGHTING
        //

        const ambientLight = new THREE.AmbientLight(0xffffff, 1);

        scene.add(ambientLight);

        //
        // FUSION ENGINE
        //

        const fusionScene = new FusionScene();

        fusionScene.add({

            id: "plasma",

            type: FusionComponentType.Plasma,

            name: "Demo Plasma",

            parent: undefined,

            children: [],

            visible: true,

            enabled: true,

            metadata: {}

        });

        const fusionRenderer = new FusionRenderer(scene);

        fusionRenderer.render(fusionScene);

        //
        // RENDER LOOP
        //

        function animate() {

            requestAnimationFrame(animate);

            renderer.render(scene, camera);

        }

        animate();

        //
        // CLEANUP
        //

        return () => {

            mountRef.current?.removeChild(renderer.domElement);

            renderer.dispose();

        };

    }, []);

    return (
        <div
            ref={mountRef}
            style={{
                width: "100vw",
                height: "100vh"
            }}
        />
    );

}