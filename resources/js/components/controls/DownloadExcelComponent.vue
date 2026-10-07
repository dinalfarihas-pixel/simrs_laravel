<template>
    <span style="cursor:pointer" @click="download">
        <slot />
    </span>
</template>

<script>
import * as XLSX from 'xlsx';

export default {
    props: {
        data:   { type: Array,  required: true },
        name:   { type: String, default: 'export.xlsx' },
        type:   { type: String, default: 'xlsx' },
        fields: { type: Object, default: null },
        header: { type: [String, Array], default: null },
    },
    methods: {
        download() {
            if (!this.data || !this.data.length) return;

            let rows = this.data;

            // If fields mapping provided, remap keys
            if (this.fields) {
                rows = this.data.map(row => {
                    const mapped = {};
                    Object.entries(this.fields).forEach(([label, key]) => {
                        mapped[label] = typeof key === 'function' ? key(row) : row[key];
                    });
                    return mapped;
                });
            }

            const ws = XLSX.utils.json_to_sheet(rows);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

            // Ensure filename has extension
            const ext = this.type === 'csv' ? '.csv' : '.xlsx';
            const filename = this.name.endsWith(ext) || this.name.endsWith('.xls')
                ? this.name.replace(/\.xls$/, '.xlsx')
                : this.name + ext;

            XLSX.writeFile(wb, filename);
        }
    }
};
</script>
