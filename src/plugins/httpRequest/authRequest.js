import { httpRequest } from './httpRequestInstance'
const LOGIN_API = '/iomr2egc/login'
const LOGOUT_API = '/iomr2egc/logout'

export const loginApi = (config) => httpRequest.get(LOGIN_API, config)

export const logoutApi = () => httpRequest.get(LOGOUT_API)
