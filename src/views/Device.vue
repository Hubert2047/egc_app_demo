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
                            class="shadow-sm"
                        >
                            <template slot="prepend">搜尋</template>
                        </el-input>
                    </div>
                </div>
            </div>
            <!-- action box -->

            <div class="actions d-flex justify-content-start">
                <!-- reload btn -->
                <el-tooltip class="item" effect="dark" content="重新資料" placement="top-start">
                    <el-button type="primary" class="mt-3 mb-2 p-1 shadow" @click="handleReloadDevice">
                        <b-icon v-if="isReloadingDevice" icon="arrow-repeat" animation="spin" font-scale="1.5"></b-icon>
                        <b-icon v-else icon="arrow-repeat" font-scale="1.5"></b-icon>
                    </el-button>
                </el-tooltip>
            </div>
            <!-- device table -->
            <el-table
                border
                max-height="500px"
                class="shadow-sm"
                highlight-current-row
                :data="displayDeviceData"
                :default-sort="{ prop: 'name', order: 'descending' }"
            >
                <el-table-column prop="number" align="center" label="設備編號" sortable min-width="150">
                </el-table-column>
                <el-table-column prop="name" align="center" label="設備名稱" sortable min-width="150">
                </el-table-column>
                <el-table-column prop="ip" align="center" label="IP" sortable min-width="150"> </el-table-column>
                <el-table-column prop="port" align="center" label="Port" sortable min-width="120"> </el-table-column>
                <el-table-column prop="connectionName" align="center" label="連線名稱" sortable width="150">
                </el-table-column>
                <el-table-column prop="brand" align="center" label="廠牌" sortable min-width="120"> </el-table-column>
                <el-table-column prop="status" align="center" label="狀態" sortable min-width="120"> </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import Header from '@/components/Header.vue'
import connectionRequest from '@/plugins/httpRequest/connectionRequest'
import deviceRequest from '@/plugins/httpRequest/deviceRequest'
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
                    device.connectionName.toLowerCase().includes(this.searchWord.toLowerCase().trim()) ||
                    device.brand.toLowerCase().includes(this.searchWord.toLowerCase().trim())
                )
            })
        },
    },
    methods: {
        async handleGetDevices() {
            try {
                const [devices, connections] = await Promise.all([deviceRequest.get(), connectionRequest.get()])
                const connectionById = this.getConnectionById(connections)
                this.deviceData = devices.map((device) => {
                    return {
                        ...device,
                        ip: connectionById[device.conId].ip,
                        connectionName: connectionById[device.conId].name,
                        status: device.status == 1 ? '正常' : '停機/斷線',
                    }
                })
                // console.log(devices, connections)
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
            //transform connections array to an object, with each key of item = id of item
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
