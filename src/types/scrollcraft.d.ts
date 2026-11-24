export interface ScrollCraftInstance {
  layout: () => void;
  read: () => void;
  destroy: () => void;
  acts: unknown[];
  worlds: unknown[];
  clips: unknown[];
  lerp: number;
}

export interface ScrollCraftGlobal {
  mount: (root?: HTMLElement | Document | string | null, opts?: { lerp?: number }) => ScrollCraftInstance;
  reduce: boolean;
  instances: ScrollCraftInstance[];
}

declare global {
  interface Window {
    ScrollCraft?: ScrollCraftGlobal;
  }
}

export {};
