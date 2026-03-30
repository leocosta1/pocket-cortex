let wakeLock: WakeLockSentinel | null = null;
let isListening = false;

export const wakeLockHandler = {
  async request() {
    if (!navigator.wakeLock) return;

    if (wakeLock) return;

    try {
      wakeLock = await navigator.wakeLock.request('screen');

      wakeLock.addEventListener('release', () => {
        wakeLock = null;
      });

      this.setupReacquire();
    } catch (error) {
      console.error('Failed to acquire wake lock: ', error);
    }
  },

  async release() {
    if (!wakeLock) return;

    try {
      await wakeLock.release();
      wakeLock = null;
    } catch (error) {
      console.error('Failed to release wake lock: ', error);
    }
  },

  setupReacquire() {
    if (isListening) return;

    document.addEventListener('visibilitychange', async () => {
      if (document.visibilityState === 'visible' && !wakeLock) {
        await this.request();
      }
    });

    isListening = true;
  },
};
