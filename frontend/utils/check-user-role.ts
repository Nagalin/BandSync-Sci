import useUserStore from "@/zustand/user-role";

export const isBackstage = () => {
  const { roles } = useUserStore()
  return !!roles.find(curr => curr.role === 'backstage')
}