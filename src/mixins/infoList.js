export default {
    data() {
        return {
            page: 1,
            total: 10,
            pageSize: 10,
            tableData: [],
            searchInfo: {},
            perPage: [
                { label: '10条', value: 10 },
                { label: '20条', value: 20 },
                { label: '50条', value: 50 },
                { label: '100条', value: 100 },
                { label: '200条', value: 200 },
            ]
        }
    },
    methods: {
        pageSizeChange(val) {
            this.pageSize = val
            this.getTableData()
        },
        currentChange(val) {
            this.page = val
            this.getTableData()
        },
        async getTableData(page = this.page, pageSize = this.pageSize) {
            const table = await this.listApi({ page, pageSize, ...this.searchInfo })
            if (table.code == 0) {
                this.tableData = table.data.list
                this.total = table.data.total
                this.page = table.data.page
                this.pageSize = table.data.pageSize
            }
        }
    }
}