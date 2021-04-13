import SyncStorage from 'sync-storage';

const prefix = "1594461923517";

export const Store = {
    // utilities
    set:(name,item)=> {
      SyncStorage.set(prefix+name,item);
    },
    get: (name,arg) => {
      return SyncStorage.get(prefix+name) || arg;
    },
    setUserToken: (accessToken) => {
      SyncStorage.set(prefix+"accessToken",accessToken);
    },
    setUserId: (userId) => {
      SyncStorage.set(prefix+"userId",userId);
    },
    setUser: (user) =>{
      SyncStorage.set(prefix+"user",user);
    },
    getUserToken: (arg) => {
      return SyncStorage.get(prefix+'accessToken') || arg;
    },
    getUserId: (arg) => {
      return SyncStorage.get(prefix+'userId') || arg;
    },
    getUser: (arg) => {
      return SyncStorage.get(prefix+'user') || arg;
    },
    getAllKeys: (arg)=>{
      return SyncStorage.getAllKeys() || arg
    },
    remove: (key)=>{
      return SyncStorage.remove(prefix+key);
    },
    reset(except=[]){
      SyncStorage.getAllKeys().forEach(key=>{
        if (except.findIndex(i=>(prefix+i)==key)==-1){
          SyncStorage.remove(key);
        }
      })
    },
    logoutAndReset:()=>{
      SyncStorage.remove(prefix+'user');
      SyncStorage.remove(prefix+'userId');
      SyncStorage.remove(prefix+'accessToken');
    },
}
