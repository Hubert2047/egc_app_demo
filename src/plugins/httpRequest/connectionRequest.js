import { httpRequest } from './httpRequestInstance'
const CONNECTION_API = '/iomr2egc/connection'
export const getConnections = async (config) => {
    try {
        const res = await httpRequest.get(CONNECTION_API, config)
        return res.data
    } catch (error) {
        throw new Error(error)
    }
}

const connectionRequest = {
    get: getConnections,
}
export default connectionRequest
