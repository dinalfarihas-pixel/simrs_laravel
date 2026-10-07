"""Fix files where fix_tabs2.py introduced script-section corruption."""
import re, os

BASE = r"C:\xampp\htdocs\backend_dashbord\resources\js"

def fix_file(filepath, fixes):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    original = content
    for old, new in fixes:
        content = content.replace(old, new, 1)
    if content != original:
        with open(filepath, 'w', encoding='utf-8', newline='') as f:
            f.write(content)
        print(f"Fixed: {os.path.basename(filepath)}")


# KlaimManajemenComponent.vue - remove partial first block + nested <script>
fix_file(
    BASE + r"\components\monitoring\KlaimManajemenComponent.vue",
    [(
        "    import Loading from 'vue-loading-overlay';\n"
        "    import ProgressBar from 'primevue/progressbar';\n"
        "    import Tabs from 'primevue/tabs';\n"
        "import TabList from 'primevue/tablist';\n"
        "<script>\n",
        ""
    )]
)

# LaporandistribusiComponent.vue - remove partial first block + nested <script>
fix_file(
    BASE + r"\components\persediaan\LaporandistribusiComponent.vue",
    [(
        "    import {\n"
        "        FilterMatchMode\n"
        "    } from 'primevue/api';\n"
        "    import Loading from 'vue-loading-overlay';\n"
        "    <script>\n",
        ""
    )]
)

# ObatperdpjpComponent.vue - remove partial first block + corrupted <script>
fix_file(
    BASE + r"\components\roledokter\ObatperdpjpComponent.vue",
    [(
        "    import Loading from 'vue-loading-overlay';\n"
        "    import Tabs from 'primevue/tabs';\n"
        "import TabList from 'primevue/<script>\n",
        ""
    )]
)

# DatarawatpasienranapComponenet.vue - premature </script> in middle of console.log
fix_file(
    BASE + r"\components\kunjungan\DatarawatpasienranapComponenet.vue",
    [("</script>nsole.log(error)", "            console.log(error)")]
)

# PoliklinikComponent.vue - premature </script> before async method
fix_file(
    BASE + r"\components\rawatjalan\PoliklinikComponent.vue",
    [("</script>c getnamaruangan_poli()", "        async getnamaruangan_poli()")]
)

print("Done")
