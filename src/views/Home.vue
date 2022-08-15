<template>
    <div class="container-fluid p-0">
        <Header />
        <div class="px-4 pt-4 mt-2">
            <!-- search box -->
            <div class="search">
                <div class="row">
                    <div class="col col-md-6 col-lg-5 col-xl-4">
                        <el-input
                            placeholder="設備名稱、連線名稱、廠牌"
                            clearable
                            v-model="searchWord"
                            class="border-top-0"
                        >
                            <template slot="prepend">搜尋</template>
                        </el-input>
                    </div>
                </div>
            </div>
            <!-- action box -->
            <div class="actions d-flex justify-content-start">
                <el-button type="primary" size="small" class="mt-3 mb-2 p-1" @click="handleReloadDevice">
                    <b-icon v-if="isReloadingDevice" icon="arrow-repeat" animation="spin" font-scale="1.5"></b-icon>
                    <b-icon v-else icon="arrow-repeat" font-scale="1.5"></b-icon>
                </el-button>
            </div>
            <!-- device table -->
            <el-table
                border
                max-height="500px"
                highlight-current-row
                :data="displayDeviceData"
                :default-sort="{ prop: 'name', order: 'descending' }"
            >
                <el-table-column prop="number" label="設備編號" sortable min-width="150"> </el-table-column>
                <el-table-column prop="name" label="設備名稱" sortable min-width="150"> </el-table-column>
                <el-table-column prop="ip" label="IP" sortable min-width="150"> </el-table-column>
                <el-table-column prop="port" label="Port" sortable min-width="120"> </el-table-column>
                <el-table-column prop="connectionName" label="連線名稱" sortable width="150"> </el-table-column>
                <el-table-column prop="brand" label="廠牌" sortable min-width="120"> </el-table-column>
                <el-table-column prop="connectionStatus" label="狀態" sortable min-width="120"> </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import Header from '@/components/Header.vue'
import { getConnections } from '@/plugins/httpRequest/connectionApi'
import { getDevices } from '@/plugins/httpRequest/deviceApi'
export default {
    name: 'Home',
    data() {
        return {
            isReloadingDevice: false,
            searchWord: '',
            deviceData: [],
        }
    },
    computed: {
        displayDeviceData() {
            return this.deviceData.filter((device) => {
                return (
                    this.searchWord === '' ||
                    device.name.toLowerCase().includes(this.searchWord.toLowerCase().trim()) ||
                    device.number.toLowerCase().includes(this.searchWord.toLowerCase().trim()) ||
                    device.brand.toLowerCase().includes(this.searchWord.toLowerCase().trim())
                )
            })
        },
    },
    methods: {
        async handleGetDevices() {
            try {
                const [devices, connections] = await Promise.all([getDevices(), getConnections()])
                const connectionById = this.getConnectionById(connections)
                this.deviceData = devices.map((device) => {
                    return {
                        ...device,
                        ip: connectionById[device.conId].ip,
                        connectionName: connectionById[device.conId].name,
                        connectionStatus: connectionById[device.conId].status === 1 ? '連線' : '斷線',
                    }
                })
            } catch (error) {
                this.$notify.error({
                    title: '提示訊息',
                    message: 'Network Error',
                    duration: 2000,
                    customClass: 'notification',
                })
            }
        },
        async handleReloadDevice() {
            this.isReloadingDevice = true
            await this.handleGetDevices()
            this.isReloadingDevice = false
        },
        getConnectionById(connections) {
            //transform connections array to an boject, with each key of item = id of item
            let connectionById = {}
            connections.forEach((connection) => {
                connectionById[connection.id] = connection
            })
            return connectionById
        },
    },
    mounted() {
        this.handleGetDevices()
    },
    components: { Header },
}
</script>
<style></style>
