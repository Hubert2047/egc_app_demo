import { httpRequest } from './httpRequestInstance'

export const loginApi = (config) => httpRequest.get('/iomr2egc/login', config)

export const logoutApi = () => httpRequest.get('/iomr2egc/logout')
