import { create } from "zustand";

// 生成随机ID的方法，入参是位数，比如16位ID
function generateRandomString(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from(crypto.getRandomValues(new Uint8Array(length)))
    .map(byte => chars[byte % chars.length])
    .join('');
}

const useUserStore = create((set,get) => ({
    users: [
        {id: 'Kho5GIoLa3irqGRt', name: '张三', email: 'admin@163.com'},
        {id: 'BvwQzKClL50gI2sA', name: '李四', email: 'user@163.com'},
        {id: 'BvwQzKClL123I2sA', name: '王五', email: 'guest@163.com'},
    ],
      // 添加用户
      addUser: (newUser) =>{
        set(state => ({ users: [...state.users, {...newUser, id: generateRandomString(16) }] }) )
    },
    // 更新用户
    updateUser: (upUser) =>{
        set(state => ({
            users: state.users.map(user => user.id=== upUser.id ? upUser : user)
        }) )
    },
    // 删除用户
    deleteUser: (cid) =>{
        set(state => ({ users: state.users.filter(v=>v.id!==cid) }) )
    },
    getAllUsers: () =>{
        return get().users;
    },
}))

export default useUserStore;