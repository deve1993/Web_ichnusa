"use client";

import { useRef, useState, useCallback, RefObject } from "react";

export function useHover<T extends HTMLElement = HTMLDivElement>(): [
  RefObject<T | null>,
  boolean
] {
  const ref = useRef<T>(null);
  const [isHovered, setIsHovered] = useState(false);

  const onMouseEnter = useCallback(() => setIsHovered(true), []);
  const onMouseLeave = useCallback(() => setIsHovered(false), []);

  return [ref, isHovered];
}

export function useMagneticHover<T extends HTMLElement = HTMLDivElement>(
  strength: number = 0.3
): [RefObject<T | null>, { x: number; y: number }, { onMouseMove: (e: React.MouseEvent) => void; onMouseLeave: () => void }] {
  const ref = useRef<T>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      setOffset({ x: deltaX, y: deltaY });
    },
    [strength]
  );

  const onMouseLeave = useCallback(() => {
    setOffset({ x: 0, y: 0 });
  }, []);

  return [ref, offset, { onMouseMove, onMouseLeave }];
}

interface TiltState {
  rotateX: number;
  rotateY: number;
  scale: number;
}

export function useTiltEffect<T extends HTMLElement = HTMLDivElement>(
  maxTilt: number = 10,
  scale: number = 1.02
): [RefObject<T | null>, TiltState, { onMouseMove: (e: React.MouseEvent) => void; onMouseLeave: () => void }] {
  const ref = useRef<T>(null);
  const [tilt, setTilt] = useState<TiltState>({ rotateX: 0, rotateY: 0, scale: 1 });

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const percentX = (e.clientX - centerX) / (rect.width / 2);
      const percentY = (e.clientY - centerY) / (rect.height / 2);

      setTilt({
        rotateX: -percentY * maxTilt,
        rotateY: percentX * maxTilt,
        scale,
      });
    },
    [maxTilt, scale]
  );

  const onMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0, scale: 1 });
  }, []);

  return [ref, tilt, { onMouseMove, onMouseLeave }];
}

interface SpotlightState {
  x: number;
  y: number;
  opacity: number;
}

export function useSpotlightEffect<T extends HTMLElement = HTMLDivElement>(): [
  RefObject<T | null>,
  SpotlightState,
  { onMouseMove: (e: React.MouseEvent) => void; onMouseEnter: () => void; onMouseLeave: () => void }
] {
  const ref = useRef<T>(null);
  const [spotlight, setSpotlight] = useState<SpotlightState>({
    x: 0,
    y: 0,
    opacity: 0,
  });

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    setSpotlight({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      opacity: 1,
    });
  }, []);

  const onMouseEnter = useCallback(() => {
    setSpotlight((prev) => ({ ...prev, opacity: 1 }));
  }, []);

  const onMouseLeave = useCallback(() => {
    setSpotlight((prev) => ({ ...prev, opacity: 0 }));
  }, []);

  return [ref, spotlight, { onMouseMove, onMouseEnter, onMouseLeave }];
}

export function useImageReveal<T extends HTMLElement = HTMLDivElement>(): [
  RefObject<T | null>,
  boolean,
  () => void
] {
  const ref = useRef<T>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  const reveal = useCallback(() => {
    setIsRevealed(true);
  }, []);

  return [ref, isRevealed, reveal];
}
