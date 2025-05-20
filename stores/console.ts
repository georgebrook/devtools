export const useConsoleStore = defineStore('console', {
  state: () => ({
    logs: [] as Array<{ type: string; args: unknown[]; timestamp: string }>,
    welcomeShown: false,
  }),
  actions: {
    addLog(type: string, ...args: unknown[]) {
      this.logs.push({ type, args, timestamp: new Date().toISOString() });
      this.saveLogs();
    },
    clearLogs() {
      this.logs = [];
      sessionStorage.removeItem('console_logs');
    },
    setWelcomeShown() {
      this.welcomeShown = true;
      sessionStorage.setItem('console_welcome_shown', 'true');
    },
    loadWelcomeState() {
      this.welcomeShown = sessionStorage.getItem('console_welcome_shown') === 'true';
    },
    loadLogs() {
      const raw = sessionStorage.getItem('console_logs');
      if (raw) {
        try {
          this.logs = JSON.parse(raw);
        } catch {
          this.logs = [];
        }
      }
    },
    saveLogs() {
      sessionStorage.setItem('console_logs', JSON.stringify(this.logs));
    },
  },
});
