import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRef, useEffect, useMemo } from "react";
import { COLLIDERS, BOUNDARY, CAR_RADIUS } from "./colliders";

const WHEEL_KEYWORDS = ["wheel", "tire", "tyre", "rim"];
const BODY_KEYWORDS = ["body", "door", "bumper", "hood", "viper", "railings", "logo", "chest"];

const MAX_SPEED = 18;
const MAX_REVERSE = 8;
const ENGINE = 14;
const BRAKE = 30;
const DRAG = 0.6;
const ROLL_RESIST = 4;
const WHEEL_BASE = 2.7;
const MAX_STEER = 0.5;
const WHEEL_RADIUS = 0.5;

export default function DrivableCar({ model = "/car.glb", color = "#e74c3c", carState }) {
  const { scene } = useGLTF(model);
  const group = useRef();
  const tilt = useRef();
  const spot = useRef();
  const spotTarget = useRef();
  const wheels = useRef([]);
  const bodyMats = useRef([]);
  const keys = useRef({});
  const smooth = useRef({ steer: 0, pitch: 0, roll: 0 });

  const { center, bottom, scale } = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const bottom = center.y - size.y / 2;
    const maxDim = Math.max(size.x, size.y, size.z);
    return { center, bottom, scale: 5 / maxDim };
  }, [scene]);

  useEffect(() => {
    wheels.current = [];
    bodyMats.current = [];
    scene.traverse((child) => {
      if (!child.isMesh || !child.material) return;
      const n = child.name.toLowerCase();
      if (WHEEL_KEYWORDS.some((k) => n.includes(k))) {
        wheels.current.push({
          mesh: child,
          base: child.rotation.clone(),
          front: child.position.z > center.z,
        });
      }
      if (BODY_KEYWORDS.some((k) => n.includes(k))) {
        bodyMats.current.push(child.material);
      }
    });
    if (spot.current && spotTarget.current) {
      spot.current.target = spotTarget.current;
    }
  }, [scene, center]);

  useEffect(() => {
    bodyMats.current.forEach((m) => m.color.set(color));
  }, [color, scene]);

  useEffect(() => {
    const down = (e) => (keys.current[e.key.toLowerCase()] = true);
    const up = (e) => (keys.current[e.key.toLowerCase()] = false);
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  useFrame((_, dt) => {
    const s = carState.current;
    const k = keys.current;
    const sm = smooth.current;
    const clamp = THREE.MathUtils.clamp;
    dt = Math.min(dt, 0.05);

    const throttle = (k["w"] ? 1 : 0) - (k["s"] ? 1 : 0);
    const steerInput = (k["a"] ? 1 : 0) - (k["d"] ? 1 : 0);

    if (throttle > 0) {
      if (s.speed < 0) s.speed += BRAKE * dt;
      else s.speed += ENGINE * dt * (1 - s.speed / MAX_SPEED);
    } else if (throttle < 0) {
      if (s.speed > 0) s.speed -= BRAKE * dt;
      else s.speed -= ENGINE * 0.6 * dt * (1 - Math.abs(s.speed) / MAX_REVERSE);
    } else {
      const dec = (ROLL_RESIST + Math.abs(s.speed) * DRAG) * dt;
      if (Math.abs(s.speed) <= dec) s.speed = 0;
      else s.speed -= Math.sign(s.speed) * dec;
    }
    s.speed = clamp(s.speed, -MAX_REVERSE, MAX_SPEED);

    const speedAbs = Math.abs(s.speed);
    const steerFalloff = 1 / (1 + speedAbs * 0.05);
    const targetSteer = steerInput * MAX_STEER * steerFalloff;
    sm.steer += (targetSteer - sm.steer) * Math.min(1, dt * 8);

    if (speedAbs > 0.05) {
      const dir = s.speed >= 0 ? 1 : -1;
      s.heading += (s.speed / WHEEL_BASE) * Math.tan(sm.steer) * dt * dir;
    }

    const forward = new THREE.Vector3(Math.sin(s.heading), 0, Math.cos(s.heading));
    s.pos.addScaledVector(forward, s.speed * dt);

    // Keep the car from leaving the showroom area
    const distFromCenter = Math.hypot(s.pos.x, s.pos.z);
    if (distFromCenter > BOUNDARY) {
      const nx = s.pos.x / distFromCenter;
      const nz = s.pos.z / distFromCenter;
      s.pos.x = nx * BOUNDARY;
      s.pos.z = nz * BOUNDARY;
      s.speed *= 0.2;
    }

    // Collide with obstacles (showroom, people) and slide/stop
    for (const c of COLLIDERS) {
      const dx = s.pos.x - c.x;
      const dz = s.pos.z - c.z;
      const dist = Math.hypot(dx, dz);
      const minD = c.r + CAR_RADIUS;
      if (dist < minD && dist > 0.0001) {
        const nx = dx / dist;
        const nz = dz / dist;
        s.pos.x = c.x + nx * minD;
        s.pos.z = c.z + nz * minD;
        s.speed *= 0.2;
      }
    }

    if (group.current) {
      group.current.position.set(s.pos.x, 0, s.pos.z);
      group.current.rotation.y = s.heading;
    }

    const targetRoll = clamp(-sm.steer * s.speed * 0.02, -0.16, 0.16);
    const targetPitch = clamp(-throttle * 0.04 + (s.speed === 0 ? 0 : 0), -0.06, 0.06);
    sm.roll += (targetRoll - sm.roll) * Math.min(1, dt * 6);
    sm.pitch += (targetPitch - sm.pitch) * Math.min(1, dt * 6);
    if (tilt.current) {
      tilt.current.rotation.z = sm.roll;
      tilt.current.rotation.x = sm.pitch;
    }

    const spin = (s.speed * dt) / WHEEL_RADIUS;
    wheels.current.forEach((w) => {
      w.mesh.rotation.x = w.base.x + spin;
      w.mesh.rotation.y = w.base.y + (w.front ? sm.steer : 0);
    });
  });

  return (
    <group ref={group}>
      <spotLight
        ref={spot}
        position={[0, 1.2, 2]}
        angle={0.6}
        penumbra={0.5}
        intensity={6}
        distance={40}
        color="#fff2c0"
      />
      <object3D ref={spotTarget} position={[0, 0.4, 12]} />
      <group ref={tilt}>
        <group
          position={[-center.x * scale, -bottom * scale + 0.2, -center.z * scale]}
          scale={[scale, scale, scale]}
        >
          <primitive object={scene} castShadow receiveShadow />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/car.glb");
useGLTF.preload("/car2.glb");
useGLTF.preload("/car3.glb");