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
  userName  : '',
  setUserEmail : (email) => 
    set((state) => ({ userEmail : email})),
  setUserName : (name) => 
    set((state) => ({ userName : name}))
})

userStore = devtools(userStore)
userStore = persist(userStore, { name: 'userEmail' })

export const useUserStore = create(userStore)

{/* 🐼node data 용 ⬇️*/}
let nodeStore = (set) => ({
  memoData : '',
  setmemoData : (data) => 
    set((state) => ({ memoData : data})),

})

nodeStore = devtools(nodeStore)
nodeStore = persist(nodeStore, { name: 'nodestore' })

export const usenodeStore = create(nodeStore)