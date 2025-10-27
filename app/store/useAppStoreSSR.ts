// app/store/useAppStoreSSR.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

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
interface LoginState {
  id: string;
  email: string;
  phone: string;
  profile: string;
}

interface AppState {
  alert: AlertState | null;
  setAlert: (alert: AlertState | null) => void;
  
  confirm: ConfirmState | null;
  setConfirm: (confirm: ConfirmState | null) => void;
  
  login: LoginState | null;
  setLogin: (login: LoginState | null) => void;
  
  configMenuIndex: number;
  setConfigMenuIndex: (index: number) => void;
}

// 아래는 client 전용 zustand hook
let store: ReturnType<typeof createAppStore> | null = null;

// SSR-safe
function createAppStore(preloadedState?: Partial<AppState>) {
  return create<AppState>()(
    persist(
      (set, get) => ({
        alert: null,
        setAlert: (alert) => set({ alert }),

        confirm: null,
        setConfirm: (confirm) => set({ confirm }),

        login: preloadedState?.login ?? null,
        setLogin: (login) => set({ login }),

        configMenuIndex: preloadedState?.configMenuIndex ?? 0,
        setConfigMenuIndex: (index) => set({ configMenuIndex: index }),
      }),
      {
        name: "zustand-session-storage",
        storage: createJSONStorage(() => sessionStorage),
        partialize: (state) => ({
          login: state.login,
          configMenuIndex: state.configMenuIndex,
        }),
      }
    )
  );
}

export const useAppStore = (preloadedState?: Partial<AppState>) => {
  if (typeof window !== "undefined") {
    if (!store) {
      store = createAppStore(preloadedState);
    }
    return store;
  }

  // SSR에서는 store를 생성하지 않음 (hook은 사용 불가)
  throw new Error("useAppStore()는 클라이언트에서만 사용할 수 있습니다.");
};
