'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Laptop, Headphones, Cpu, RotateCcw, Eye, Sparkles, Box } from 'lucide-react';

export type EngineerModelType = 'all' | 'laptop' | 'headphones' | 'cpu';

interface EngineerWorkstation3DProps {
  className?: string;
  initialModel?: EngineerModelType;
}

export default function EngineerWorkstation3D({
  className = '',
  initialModel = 'all',
}: EngineerWorkstation3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeModel, setActiveModel] = useState<EngineerModelType>(initialModel);
  const [wireframe, setWireframe] = useState<boolean>(false);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);

  const stateRef = useRef({
    activeModel,
    wireframe,
    autoRotate,
    pointer: { x: 0, y: 0, targetX: 0, targetY: 0 },
    isDragging: false,
    dragStart: { x: 0, y: 0 },
    manualRotation: { x: 0, y: 0 },
  });

  useEffect(() => {
    stateRef.current.activeModel = activeModel;
    stateRef.current.wireframe = wireframe;
    stateRef.current.autoRotate = autoRotate;
  }, [activeModel, wireframe, autoRotate]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return true;
      }
    })();

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x060c14, 0.04);

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 480;

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 7.8);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    container.replaceChildren(renderer.domElement);

    // Master 3D Group
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // ==========================================
    // 1. PROCEDURAL 3D LAPTOP MODEL
    // ==========================================
    const laptopGroup = new THREE.Group();
    rootGroup.add(laptopGroup);

    // Base chassis (bottom half)
    const baseGeo = new THREE.BoxGeometry(2.8, 0.08, 1.9);
    const chassisMat = new THREE.MeshStandardMaterial({
      color: 0x111928,
      metalness: 0.85,
      roughness: 0.25,
    });
    const laptopBase = new THREE.Mesh(baseGeo, chassisMat);
    laptopBase.position.y = -0.4;
    laptopGroup.add(laptopBase);

    // Trackpad
    const trackpadGeo = new THREE.BoxGeometry(0.85, 0.01, 0.55);
    const trackpadMat = new THREE.MeshStandardMaterial({
      color: 0x1f2a3c,
      metalness: 0.9,
      roughness: 0.35,
    });
    const trackpad = new THREE.Mesh(trackpadGeo, trackpadMat);
    trackpad.position.set(0, -0.35, 0.5);
    laptopGroup.add(trackpad);

    // Keyboard well
    const keywellGeo = new THREE.BoxGeometry(2.4, 0.015, 0.95);
    const keywellMat = new THREE.MeshStandardMaterial({
      color: 0x0a0f1d,
      roughness: 0.5,
      metalness: 0.3,
    });
    const keywell = new THREE.Mesh(keywellGeo, keywellMat);
    keywell.position.set(0, -0.35, -0.25);
    laptopGroup.add(keywell);

    // Keys representation (mini grid)
    const keysCount = 40;
    const keyGeo = new THREE.BoxGeometry(0.18, 0.02, 0.12);
    const keyMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.4,
      metalness: 0.5,
    });
    const keysGroup = new THREE.Group();
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 10; col++) {
        const key = new THREE.Mesh(keyGeo, keyMat);
        key.position.set(
          -1.0 + col * 0.22,
          -0.34,
          -0.55 + row * 0.2
        );
        keysGroup.add(key);
      }
    }
    laptopGroup.add(keysGroup);

    // Screen Lid (angled at ~115 degrees)
    const screenLidGroup = new THREE.Group();
    screenLidGroup.position.set(0, -0.36, -0.95);
    screenLidGroup.rotation.x = Math.PI * 0.15; // angled back
    laptopGroup.add(screenLidGroup);

    const lidCoverGeo = new THREE.BoxGeometry(2.8, 1.85, 0.06);
    const lidCover = new THREE.Mesh(lidCoverGeo, chassisMat);
    lidCover.position.set(0, 0.92, 0);
    screenLidGroup.add(lidCover);

    // Procedural Screen Texture (Simulating glowing systems code & telemetry)
    const screenCanvas = document.createElement('canvas');
    screenCanvas.width = 512;
    screenCanvas.height = 320;
    const ctx = screenCanvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#050a12';
      ctx.fillRect(0, 0, 512, 320);

      // Top IDE status bar
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, 512, 28);
      ctx.fillStyle = '#34d399';
      ctx.font = 'bold 12px monospace';
      ctx.fillText('divya_bharat::aether_cache.rs [active] · Raft Cluster', 16, 18);

      // Code text simulation
      ctx.font = '11px monospace';
      const lines = [
        'fn handle_raft_append_entries(term: u64, leader_id: NodeId) -> Result<(), ConsensusError> {',
        '    let mut state = state_machine.lock().await;',
        '    if term < state.current_term { return Err(ConsensusError::TermStale); }',
        '    // Zero-copy ring buffer ingest telemetry',
        '    state.commit_index = std::cmp::max(state.commit_index, leader_commit);',
        '    telemetry::emit_qps_metric(1_240_000);',
        '    Ok(())',
        '}',
        '// Status: P99 0.42ms · 64 Nodes Scaled · Divya Bharat Engine',
      ];
      lines.forEach((line, i) => {
        ctx.fillStyle = i === 5 ? '#38bdf8' : i === 7 ? '#a7f3d0' : '#e2e8f0';
        ctx.fillText(line, 16, 56 + i * 22);
      });
    }

    const screenTexture = new THREE.CanvasTexture(screenCanvas);
    screenTexture.colorSpace = THREE.SRGBColorSpace;
    const screenGeo = new THREE.PlaneGeometry(2.6, 1.65);
    const screenMat = new THREE.MeshBasicMaterial({
      map: screenTexture,
    });
    const screenDisplay = new THREE.Mesh(screenGeo, screenMat);
    screenDisplay.position.set(0, 0.92, 0.035);
    screenLidGroup.add(screenDisplay);

    // Hinge
    const hingeGeo = new THREE.CylinderGeometry(0.04, 0.04, 2.7, 16);
    const hingeMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      metalness: 0.95,
      roughness: 0.1,
    });
    const hinge = new THREE.Mesh(hingeGeo, hingeMat);
    hinge.rotation.z = Math.PI / 2;
    hinge.position.set(0, -0.36, -0.95);
    laptopGroup.add(hinge);

    // ==========================================
    // 2. PROCEDURAL 3D STUDIO HEADPHONES MODEL
    // ==========================================
    const headphonesGroup = new THREE.Group();
    rootGroup.add(headphonesGroup);

    // Curved Headband (Torus arc)
    const headbandGeo = new THREE.TorusGeometry(1.2, 0.05, 16, 60, Math.PI);
    const headbandMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.8,
      roughness: 0.25,
    });
    const headband = new THREE.Mesh(headbandGeo, headbandMat);
    headband.rotation.z = Math.PI;
    headphonesGroup.add(headband);

    // Headband Leather Cushion
    const cushionGeo = new THREE.TorusGeometry(1.15, 0.07, 16, 40, Math.PI * 0.7);
    const cushionMat = new THREE.MeshStandardMaterial({
      color: 0x090e17,
      roughness: 0.6,
      metalness: 0.2,
    });
    const headbandCushion = new THREE.Mesh(cushionGeo, cushionMat);
    headbandCushion.rotation.z = Math.PI * 0.85;
    headbandCushion.position.y = 0.05;
    headphonesGroup.add(headbandCushion);

    // Left and Right Earcup Assemblies
    const earcupMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.85,
      roughness: 0.2,
    });
    const padMat = new THREE.MeshStandardMaterial({
      color: 0x0a0f18,
      roughness: 0.75,
      metalness: 0.1,
    });
    const accentRingMat = new THREE.MeshStandardMaterial({
      color: 0x10b981, // Emerald Accent Ring
      emissive: 0x059669,
      emissiveIntensity: 0.4,
      metalness: 0.9,
      roughness: 0.2,
    });

    const createEarAssembly = (isRight: boolean) => {
      const earGroup = new THREE.Group();
      earGroup.position.set(isRight ? 1.25 : -1.25, 0, 0);

      // Outer cup dome
      const cupGeo = new THREE.CylinderGeometry(0.38, 0.38, 0.22, 32);
      const cup = new THREE.Mesh(cupGeo, earcupMat);
      cup.rotation.z = Math.PI / 2;
      earGroup.add(cup);

      // Metallic trim ring
      const ringGeo = new THREE.TorusGeometry(0.385, 0.02, 16, 32);
      const ring = new THREE.Mesh(ringGeo, accentRingMat);
      ring.rotation.y = Math.PI / 2;
      ring.position.x = isRight ? 0.08 : -0.08;
      earGroup.add(ring);

      // Soft acoustic ear pad
      const padGeo = new THREE.TorusGeometry(0.35, 0.1, 16, 32);
      const pad = new THREE.Mesh(padGeo, padMat);
      pad.rotation.y = Math.PI / 2;
      pad.position.x = isRight ? -0.1 : 0.1;
      earGroup.add(pad);

      // Slider mount bracket
      const bracketGeo = new THREE.BoxGeometry(0.08, 0.35, 0.08);
      const bracket = new THREE.Mesh(bracketGeo, headbandMat);
      bracket.position.y = 0.28;
      earGroup.add(bracket);

      return earGroup;
    };

    const leftEar = createEarAssembly(false);
    const rightEar = createEarAssembly(true);
    headphonesGroup.add(leftEar);
    headphonesGroup.add(rightEar);

    // ==========================================
    // 3. PROCEDURAL 3D HIGH-PERFORMANCE CPU CHIP
    // ==========================================
    const cpuGroup = new THREE.Group();
    rootGroup.add(cpuGroup);

    // Green/Black PCB Substrate with gold perimeter notches
    const pcbGeo = new THREE.BoxGeometry(2.0, 0.06, 2.0);
    const pcbMat = new THREE.MeshStandardMaterial({
      color: 0x064e3b, // Deep circuit emerald
      roughness: 0.4,
      metalness: 0.6,
    });
    const pcb = new THREE.Mesh(pcbGeo, pcbMat);
    cpuGroup.add(pcb);

    // Gold corner key triangle
    const keyPinGeo = new THREE.ConeGeometry(0.08, 0.04, 3);
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.95,
      roughness: 0.15,
    });
    const keyPin = new THREE.Mesh(keyPinGeo, goldMat);
    keyPin.position.set(-0.85, 0.04, -0.85);
    keyPin.rotation.x = Math.PI / 2;
    cpuGroup.add(keyPin);

    // Integrated Heat Spreader (IHS) - Nickel-plated copper
    const ihsGeo = new THREE.BoxGeometry(1.5, 0.12, 1.5);
    const ihsMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8, // Brushed nickel
      metalness: 0.92,
      roughness: 0.22,
    });
    const ihs = new THREE.Mesh(ihsGeo, ihsMat);
    ihs.position.y = 0.08;
    cpuGroup.add(ihs);

    // Silicon Die / Central Neural Matrix
    const dieGeo = new THREE.BoxGeometry(0.85, 0.04, 0.85);
    const dieMat = new THREE.MeshStandardMaterial({
      color: 0x10b981, // Silicon emerald
      emissive: 0x059669,
      emissiveIntensity: 0.45,
      metalness: 0.9,
      roughness: 0.15,
    });
    const die = new THREE.Mesh(dieGeo, dieMat);
    die.position.y = 0.15;
    cpuGroup.add(die);

    // Laser-etched laser markings canvas on the IHS
    const cpuCanvas = document.createElement('canvas');
    cpuCanvas.width = 256;
    cpuCanvas.height = 256;
    const cpuCtx = cpuCanvas.getContext('2d');
    if (cpuCtx) {
      cpuCtx.fillStyle = '#64748b';
      cpuCtx.fillRect(0, 0, 256, 256);
      cpuCtx.fillStyle = '#cbd5e1';
      cpuCtx.font = 'bold 20px monospace';
      cpuCtx.fillText('DIVYA-CORE', 48, 60);
      cpuCtx.font = '14px monospace';
      cpuCtx.fillText('ARCH-X64 · 2027', 48, 90);
      cpuCtx.fillStyle = '#10b981';
      cpuCtx.font = '12px monospace';
      cpuCtx.fillText('64-CORE HYPERTHREAD', 48, 120);
      cpuCtx.fillText('RAFT PROTOCOL ASIC', 48, 140);
      // Outer border
      cpuCtx.strokeStyle = '#94a3b8';
      cpuCtx.lineWidth = 6;
      cpuCtx.strokeRect(12, 12, 232, 232);
    }
    const cpuTexture = new THREE.CanvasTexture(cpuCanvas);
    cpuTexture.colorSpace = THREE.SRGBColorSpace;
    const labelGeo = new THREE.PlaneGeometry(1.3, 1.3);
    const labelMat = new THREE.MeshStandardMaterial({
      map: cpuTexture,
      roughness: 0.3,
      metalness: 0.7,
    });
    const labelMesh = new THREE.Mesh(labelGeo, labelMat);
    labelMesh.rotation.x = -Math.PI / 2;
    labelMesh.position.y = 0.142;
    cpuGroup.add(labelMesh);

    // Ambient Floating Data Particles (Engineering Swarm)
    const particleCount = isSoftwareGl ? 180 : 420;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 12;
      particlePositions[i + 1] = (Math.random() - 0.5) * 8;
      particlePositions[i + 2] = (Math.random() - 0.5) * 8;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.035,
      color: 0x34d399,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // Studio Lighting Rig
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.6);
    keyLight.position.set(6, 6, 7);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x10b981, 1.8); // Emerald tech fill
    fillLight.position.set(-6, -2, -4);
    scene.add(fillLight);

    const hemiLight = new THREE.HemisphereLight(0x38bdf8, 0x090d16, 1.3);
    scene.add(hemiLight);

    // Pointer events for dragging
    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      stateRef.current.pointer.targetX = x;
      stateRef.current.pointer.targetY = y;

      if (stateRef.current.isDragging) {
        const deltaX = e.clientX - stateRef.current.dragStart.x;
        const deltaY = e.clientY - stateRef.current.dragStart.y;
        stateRef.current.manualRotation.y += deltaX * 0.007;
        stateRef.current.manualRotation.x += deltaY * 0.007;
        stateRef.current.dragStart = { x: e.clientX, y: e.clientY };
      }
    };

    const handlePointerDown = (e: MouseEvent) => {
      stateRef.current.isDragging = true;
      stateRef.current.dragStart = { x: e.clientX, y: e.clientY };
    };

    const handlePointerUp = () => {
      stateRef.current.isDragging = false;
    };

    container.addEventListener('mousemove', handlePointerMove);
    container.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mouseup', handlePointerUp);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Render loop with performance.now
    let frameId = 0;
    let lastTime = performance.now();
    const startTime = performance.now();

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    function tick() {
      const now = performance.now();
      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      const time = (now - startTime) / 1000;
      const state = stateRef.current;

      // Pointer interpolation
      state.pointer.x += (state.pointer.targetX - state.pointer.x) * 0.06;
      state.pointer.y += (state.pointer.targetY - state.pointer.y) * 0.06;

      // Wireframe toggles
      chassisMat.wireframe = state.wireframe;
      headbandMat.wireframe = state.wireframe;
      pcbMat.wireframe = state.wireframe;
      ihsMat.wireframe = state.wireframe;

      const speed = state.autoRotate ? 1 : 0;
      rootGroup.rotation.y = state.manualRotation.y + time * 0.25 * speed + state.pointer.x * 0.35;
      rootGroup.rotation.x = state.manualRotation.x + Math.sin(time * 0.3) * 0.08 + state.pointer.y * 0.25;

      // Model layout orchestration:
      if (state.activeModel === 'all') {
        // Engineering Workstation floating triad
        laptopGroup.visible = true;
        headphonesGroup.visible = true;
        cpuGroup.visible = true;

        // Position Laptop in center-left
        laptopGroup.position.set(-1.1, -0.2, 0);
        laptopGroup.scale.setScalar(0.92);
        laptopGroup.rotation.y = Math.PI * 0.08;

        // Position Headphones on the upper right
        headphonesGroup.position.set(1.6, 0.8, -0.3);
        headphonesGroup.scale.setScalar(0.85);
        headphonesGroup.rotation.x = 0.2;
        headphonesGroup.rotation.y = -0.3;
        headphonesGroup.position.y = 0.8 + Math.sin(time * 1.5) * 0.08;

        // Position CPU on bottom right
        cpuGroup.position.set(1.4, -0.85, 0.4);
        cpuGroup.scale.setScalar(0.95);
        cpuGroup.rotation.x = 0.35;
        cpuGroup.rotation.y = time * 0.4 * speed;
      } else if (state.activeModel === 'laptop') {
        laptopGroup.visible = true;
        headphonesGroup.visible = false;
        cpuGroup.visible = false;

        laptopGroup.position.set(0, 0, 0);
        laptopGroup.scale.setScalar(1.35);
        laptopGroup.rotation.y = 0;
      } else if (state.activeModel === 'headphones') {
        laptopGroup.visible = false;
        headphonesGroup.visible = true;
        cpuGroup.visible = false;

        headphonesGroup.position.set(0, 0, 0);
        headphonesGroup.scale.setScalar(1.45);
        headphonesGroup.rotation.x = 0.15;
        headphonesGroup.position.y = Math.sin(time * 1.5) * 0.08;
      } else if (state.activeModel === 'cpu') {
        laptopGroup.visible = false;
        headphonesGroup.visible = false;
        cpuGroup.visible = true;

        cpuGroup.position.set(0, 0, 0);
        cpuGroup.scale.setScalar(1.5);
        cpuGroup.rotation.x = 0.45;
        cpuGroup.rotation.y = time * 0.6 * speed;
      }

      particleSystem.rotation.y = time * 0.02;

      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    }

    tick();

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      container.removeEventListener('mousemove', handlePointerMove);
      container.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('resize', handleResize);

      // Clean disposal
      baseGeo.dispose();
      chassisMat.dispose();
      trackpadGeo.dispose();
      trackpadMat.dispose();
      keywellGeo.dispose();
      keywellMat.dispose();
      keyGeo.dispose();
      keyMat.dispose();
      lidCoverGeo.dispose();
      screenGeo.dispose();
      screenMat.dispose();
      screenTexture.dispose();
      hingeGeo.dispose();
      hingeMat.dispose();
      headbandGeo.dispose();
      headbandMat.dispose();
      cushionGeo.dispose();
      cushionMat.dispose();
      earcupMat.dispose();
      padMat.dispose();
      accentRingMat.dispose();
      pcbGeo.dispose();
      pcbMat.dispose();
      keyPinGeo.dispose();
      goldMat.dispose();
      ihsGeo.dispose();
      ihsMat.dispose();
      dieGeo.dispose();
      dieMat.dispose();
      cpuTexture.dispose();
      labelGeo.dispose();
      labelMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className={`relative w-full h-[460px] sm:h-[500px] lg:h-[540px] rounded-3xl overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900/90 to-slate-950 border border-slate-800/80 shadow-2xl ${className}`}>
      {/* 3D WebGL Canvas */}
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing select-none"
        title="Click and drag to rotate the 3D engineer objects"
      />

      {/* Top Left Spec Indicator */}
      <div className="absolute top-4 left-4 pointer-events-none z-10 flex flex-col gap-0.5">
        <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-400">
          <span>3D ENGINEER WORKSTATION</span>
          <span className="text-slate-600">·</span>
          <span className="text-slate-400">WebGL / Three.js</span>
        </div>
        <div className="text-xs font-semibold text-slate-200">
          Laptop · Headphones · Silicon CPU
        </div>
      </div>

      {/* Top Right Quick Hint */}
      <div className="absolute top-4 right-4 pointer-events-none hidden sm:flex items-center gap-1.5 text-[11px] font-mono text-slate-400 z-10">
        <span>INTERACTIVE 3D</span>
        <span className="text-slate-600">·</span>
        <span>DRAG TO ROTATE</span>
      </div>

      {/* Bottom Switcher Dock (Unified Ergonomic Dock) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[92%] max-w-[560px] z-20">
        <div className="w-full bg-slate-950/90 border border-slate-800 rounded-2xl p-2.5 sm:p-3 shadow-xl backdrop-blur-md flex items-center justify-between gap-2 text-xs">
          {/* Model selection tabs */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setActiveModel('all')}
              className={`px-2.5 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 ${
                activeModel === 'all'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 bg-slate-900/60'
              }`}
            >
              <Box className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Workstation</span>
              <span className="sm:hidden">All</span>
            </button>

            <button
              onClick={() => setActiveModel('laptop')}
              className={`px-2.5 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 ${
                activeModel === 'laptop'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 bg-slate-900/60'
              }`}
            >
              <Laptop className="w-3.5 h-3.5" />
              <span>Laptop</span>
            </button>

            <button
              onClick={() => setActiveModel('headphones')}
              className={`px-2.5 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 ${
                activeModel === 'headphones'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 bg-slate-900/60'
              }`}
            >
              <Headphones className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Headphones</span>
            </button>

            <button
              onClick={() => setActiveModel('cpu')}
              className={`px-2.5 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 ${
                activeModel === 'cpu'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 bg-slate-900/60'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>CPU</span>
            </button>
          </div>

          {/* Action toggles */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setWireframe(!wireframe)}
              className={`p-1.5 rounded-lg border transition-colors ${
                wireframe
                  ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
              title="Toggle Wireframe mode"
              aria-label="Toggle Wireframe mode"
            >
              <Eye className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setAutoRotate(!autoRotate)}
              className={`p-1.5 rounded-lg border transition-colors ${
                autoRotate
                  ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
              title={autoRotate ? 'Pause rotation' : 'Start rotation'}
              aria-label={autoRotate ? 'Pause rotation' : 'Start rotation'}
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
