// import zustand
import {create} from 'zustand';
import { devtools, persist } from 'zustand/middleware'


{/* 🐼 project id공유 용 ⬇️*/}
let PjtStore = (set => ({
  projectName: null,
  projectId : null,
  setPjtName: (name) => set({ projectName: name }),
  setPjtId : (id) => set({ projectId: id })
}));

PjtStore = devtools(PjtStore)
PjtStore = persist(PjtStore, { name: 'modal_received' })

export const usePjtFromModalStore  = create(PjtStore)


{/* 🐼mypage detailshow 공유 용 ⬇️*/}
let detailStore = (set) => ({
  recentImg : '',
  changeRCImg : (img) =>
    set((state) => ({ recentImg : img}))
})

detailStore = devtools(detailStore)
detailStore = persist(detailStore, { name: 'mypage_clicked' })

export const useDetailStore = create(detailStore)

{/* 🐼login시 받아온 email 공유 용 ⬇️*/}
let userStore = (set) => ({
  userEmail : '',
  setUserEmail : (email) => 
    set((state) => ({ userEmail : email}))
})

userStore = devtools(userStore)
userStore = persist(userStore, { name: 'userEmail' })

export const useUserStore = create(userStore)
