import { useEffect, useRef } from "react";
import * as THREE from "three";

import demoReactor from "../../assets/reactors/demo.json";
import { ReactorLoader } from "../../core/io/ReactorLoader";
import { ReactorDefinition } from "../../core/io/ReactorDefinition";
import { FusionRenderer } from "../../core/rendering/FusionRenderer";

export default function FusionCanvas() {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mountRef.current) {
            return;
        }

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

        camera.position.set(
            4,
            3,
            5
        );

        camera.lookAt(
            0,
            0,
            0
        );

        const renderer = new THREE.WebGLRenderer({
            antialias: true
        });

        renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );

        mountRef.current.appendChild(renderer.domElement);

        //
        // LIGHTING
        //

        const ambientLight = new THREE.AmbientLight(
            0xffffff,
            1
        );

        scene.add(ambientLight);

        const directionalLight =
            new THREE.DirectionalLight(
                0xffffff,
                2
            );

        directionalLight.position.set(
            5,
            5,
            5
        );

        scene.add(directionalLight);

        //
        // FUSION ENGINE
        //

        const reactorDefinition =
            demoReactor as ReactorDefinition;

        const fusionScene =
            ReactorLoader.load(reactorDefinition);

        const fusionRenderer =
            new FusionRenderer(scene);

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
            mountRef.current?.removeChild(
                renderer.domElement
            );

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