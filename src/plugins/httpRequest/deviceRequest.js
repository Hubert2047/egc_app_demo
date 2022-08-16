import { httpRequest } from './httpRequestInstance'
const DEVICE_API = '/iomr2egc/device'
export const getDevices = async (config) => {
    try {
        const res = await httpRequest.get(DEVICE_API, config)
        return res.data
    } catch (error) {
        throw new Error(error)
    }
}

const deviceRequest = {
    get: getDevices,
}
export default deviceRequest
