export function useHardwareConcurrency() {
  return navigator.hardwareConcurrency || 1;
}
