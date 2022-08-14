import { httpRequest } from './httpRequestInstance'

export const logInApi = async (config) => {
    try {
        const res = await httpRequest.get('/iomr2egc/login', config)
        return res.data
    } catch (error) {
        throw new Error(error)
    }
}
export const logOutApi = httpRequest.get('/iomr2egc/logout')
