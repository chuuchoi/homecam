// app/store/useAppStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AlertState {
  message: string;
  onClose?: () => void;
}
interface ConfirmState {
  style?: number;
  message: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

interface AppStore {
  alert: AlertState | null;
  setAlert: (alert: AlertState | null) => void;

  confirm: ConfirmState | null;
  setConfirm: (confirm: ConfirmState | null) => void;

  configMenuIndex: number;
  setConfigMenuIndex: (index: number) => void;
}
export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      alert: null,
      setAlert: (alert) => set({ alert }),

      confirm: null,
      setConfirm: (confirm) => set({ confirm }),
      
      configMenuIndex: 0,
      setConfigMenuIndex: (index) => set({ configMenuIndex: index }),
    }),
    {
      name: 'zustand-session-storage', // storage key
      storage: createJSONStorage(() => sessionStorage), // storage
      // 저장할 상태 필터링 (persist할 것만)
      partialize: (state) => ({
        configMenuIndex: state.configMenuIndex,
      }),
    }
  )
);
