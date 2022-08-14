import { httpRequest } from './httpRequestInstance'
export const getDevices = async (config) => {
    try {
        const res = await httpRequest.get('/iomr2egc/device', config)
        return res.data
    } catch (error) {
        throw new Error(error)
    }
}
