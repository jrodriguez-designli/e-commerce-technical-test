//Hasher config

export const SALT_ROUNDS = 10
export const HASHER_SERVICE = Symbol('HASHER_SERVICE')

//jwt config
export const JWT_STRATEGY = 'jwt'
export const JWT_SECRET = process.env.JWT_SECRET || 'secret'
export const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '1d'
export const IS_PUBLIC = 'isPublic'

//Roles config
export const ROLES_KEY = Symbol('ROLES_KEY')
export const RolesKey = 'roles'
