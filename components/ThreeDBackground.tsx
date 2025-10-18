"use client";

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ThreeDBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true 
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0); // Transparent background
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Create floating 3D objects
    const objects: THREE.Mesh[] = [];
    const geometryTypes = [
      new THREE.IcosahedronGeometry(1, 0),
      new THREE.OctahedronGeometry(1, 0),
      new THREE.TorusGeometry(1, 0.4, 16, 100),
      new THREE.ConeGeometry(1, 2, 8),
      new THREE.TetrahedronGeometry(1, 0)
    ];

    // Material with theme-aware colors
    const createMaterial = () => {
      return new THREE.MeshPhongMaterial({
        color: new THREE.Color().setHSL(Math.random() * 0.1 + 0.5, 0.6, 0.6),
        transparent: true,
        opacity: 0.1,
        shininess: 100,
        specular: new THREE.Color(0x222222)
      });
    };

    // Create multiple floating objects
    for (let i = 0; i < 15; i++) {
      const geometry = geometryTypes[Math.floor(Math.random() * geometryTypes.length)];
      const material = createMaterial();
      const mesh = new THREE.Mesh(geometry, material);

      // Random position and scale
      mesh.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10
      );
      
      mesh.scale.setScalar(Math.random() * 0.8 + 0.3);
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );

      scene.add(mesh);
      objects.push(mesh);
    }

    // Camera position
    camera.position.z = 5;

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      // Animate objects
      objects.forEach((obj, index) => {
        obj.rotation.x += 0.002 * (index % 3 + 1);
        obj.rotation.y += 0.003 * (index % 2 + 1);
        
        // Floating animation
        obj.position.y += Math.sin(Date.now() * 0.001 + index) * 0.002;
        obj.position.x += Math.cos(Date.now() * 0.001 + index) * 0.001;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      
      // Dispose geometries and materials
      geometryTypes.forEach(geometry => geometry.dispose());
      objects.forEach(obj => {
        if (obj.material instanceof THREE.Material) {
          obj.material.dispose();
        }
      });
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ 
        background: 'transparent',
        mixBlendMode: 'multiply' 
      }}
    />
  );
};