<template>
    <!-- Sidebar Menu -->
    <nav class="mt-2">
        <Loading v-if="isLoading" :active="isLoading" :is-full-page="fullPage" />

        <!-- Search Box -->
        <div class="p-3">
            <div class="input-group">
                <input
                    type="text"
                    class="form-control bg-dark border-0 text-white"
                    placeholder="Search menu..."
                    v-model="searchQuery"
                    style="border-radius: 4px;"
                >
                <div class="input-group-append">
                    <span class="input-group-text bg-dark border-0">
                        <i class="fas fa-search text-white"></i>
                    </span>
                </div>
            </div>
        </div>

        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
            <li v-for="(group, groupIndex) in filteredMenu"
                :key="groupIndex"
                class="nav-item"
                :class="{ 'menu-open': openGroups[groupIndex] }">
                <!-- Group Header -->
                <a href="#" class="nav-link" @click.prevent="toggleGroup(groupIndex)">
                    <i class="nav-icon fas fa-th"></i>
                    <p>
                        {{ group.group }}
                        <i class="right fas fa-angle-left" :class="{ 'rotate-icon': openGroups[groupIndex] }"></i>
                    </p>
                </a>
                <!-- Submenu Items -->
                <ul class="nav nav-treeview" v-show="openGroups[groupIndex]">
                    <li v-for="(menu, menuIndex) in group.menu"
                        :key="menuIndex"
                        class="nav-item">
                        <a :href="menu.url_path" class="nav-link">
                            <i class="far fa-circle nav-icon"></i>
                            <p>{{ menu.item }}</p>
                        </a>
                    </li>
                </ul>
            </li>
        </ul>
    </nav>
</template>

<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

export default {
    components: {
        Loading
    },
    props: {
        msg: String,
    },
    data() {
        return {
            fact: [],
            form: {
                startdate: '',
                enddate: '',
            },
            searchQuery: '',
            isLoading: false,
            fullPage: true,
            openGroups: {}
        };
    },
    computed: {
        filteredMenu() {
            if (!this.searchQuery) return this.fact;

            const query = this.searchQuery.toLowerCase();
            return this.fact.map(group => {
                // Create a new group object with filtered menu items
                return {
                    ...group,
                    menu: group.menu.filter(item =>
                        item.item.toLowerCase().includes(query)
                    )
                };
            }).filter(group => group.menu.length > 0);
        }
    },
    mounted() {
        var currentDate = new Date();
        this.form.startdate = currentDate;
    },
    created() {
        this.getdata_menu();
    },
    methods: {
        async getdata_menu() {
            this.isLoading = true;
            try {
                const response = await axios.post('/get_menu', '');

                // Controller returns raw string — parse if needed
                const data = typeof response.data === 'string'
                    ? JSON.parse(response.data)
                    : response.data;

                this.fact = data.response || [];

                // Buka semua group secara default
                this.openGroups = this.fact.map(() => true);
            } catch (error) {
                console.error('get_menu error:', error);
            } finally {
                this.isLoading = false;
            }
        },
        toggleGroup(index) {
            this.openGroups[index] = !this.openGroups[index];
        }
    }
};
</script>

<style scoped>
.nav-treeview {
    display: block;
    padding-left: 1rem;
}

.nav-item {
    width: 100%;
}

.rotate-icon {
    transform: rotate(-90deg);
}

.right {
    float: right;
    transition: transform 0.3s ease;
}

.nav-link {
    color: #c2c7d0;
    padding: 0.5rem 1rem;
}

.nav-link:hover {
    color: #fff;
    background-color: rgba(255, 255, 255, 0.1);
}

.menu-open > .nav-treeview {
    display: block;
}

/* Search box specific styles */
.input-group-text {
    color: #c2c7d0;
}

.form-control::placeholder {
    color: #6c757d;
}

.form-control:focus {
    box-shadow: none;
    border-color: #6c757d;
}

/* Optional: Animation for submenu */
.nav-treeview {
    transition: all 0.3s ease;
}
</style>
