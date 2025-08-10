import { create } from 'zustand';

const useStore = create((set) => ({
  user: null, // 登录用户信息
  setUser: (user) => set({ user }),

  isMenuOpen: true, // 左侧菜单展开/收缩
  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),

  sharedData: null, // 全局共享数据
  setSharedData: (data) => set({ sharedData: data }),
}));

export default useStore;
