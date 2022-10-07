import type { TransitionConfig, EasingFunction } from 'svelte/transition';
import { cubicInOut } from 'svelte/easing';

export interface JumpParams {
  delay?: number,
  duration?: number,
  easing?: EasingFunction,
  size?: number
}

export function jump(node: Element, params?: JumpParams): TransitionConfig {
  const max_translate = params?.size || 32;

  return {
    delay: params?.delay || 0,
    duration: params?.duration || 300,
    easing: params?.easing || cubicInOut,
    css: (t) => {
      const translateY = max_translate - t * max_translate;
      return `transform: translateY(${translateY}px); opacity:${t}`;
    }
  };
}