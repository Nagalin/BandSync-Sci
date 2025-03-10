interface Role {
    roleId: string;
    role: 'vocalist' | 'guitarist' | 'bassist' | 'drummer' | 'keyboardist' | 'extra' | 'percussionist' | 'backstage' | 'staff';
  }

  import { create } from 'zustand';

interface UserStore {
  roles: Role[];
  addRole: (newRole: Role) => void;
  removeRole: (roleId: string) => void;
  setRoles: (roles: Role[]) => void;
}

const useUserStore = create<UserStore>((set) => ({
  roles: [],
  addRole: (newRole) => set((state) => ({ roles: [...state.roles, newRole] })),
  removeRole: (roleId) => set((state) => ({
    roles: state.roles.filter((role) => role.roleId !== roleId),
  })),
  setRoles: (roles) => set({ roles }),
}));

export default useUserStore;
