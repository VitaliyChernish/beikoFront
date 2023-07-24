export const AUTH = 'AUTH';
export const ADMIN_AUTH = 'ADMIN_AUTH'

export const auth = (role) => ({
    type: AUTH,
    role
})
// export const adminAuth = (role) => ({
//     type: ADMIN_AUTH,
//     role
// })