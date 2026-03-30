const DOUBLE_CLICK_THRESHOLD = 300;

export function createDoubleClickDetector() {
  const lastClicks: Record<number, number> = {};

  return (ctrl: number) => {
    const now = Date.now();
    const last = lastClicks[ctrl];

    if (last && now - last < DOUBLE_CLICK_THRESHOLD) {
      delete lastClicks[ctrl];

      return true;
    }

    lastClicks[ctrl] = now;

    return false;
  };
}
