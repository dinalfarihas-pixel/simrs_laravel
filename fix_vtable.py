"""
Fix v-table (vuejs-smart-table) usage to plain HTML tables for Vue 3.
For each file:
  1. Find <v-table :data="VARNAME" ...> and replace with <table ...>
  2. Remove slot="head" and slot="body" from thead/tbody
  3. Remove slot-scope="{displayData}" from tbody
  4. Replace v-for="... in displayData" with v-for="... in VARNAME"
  5. Replace </v-table> with </table>
"""

import re
import os
import glob

BASE = r"C:\xampp\htdocs\backend_dashbord\resources\js"


def fix_vtable_block(content):
    """
    Process a file's content. Returns (new_content, changed: bool).
    Handles multiple v-table blocks per file, each with a different data variable.
    Strategy: find each v-table opening tag, capture its data var, then
    replace the corresponding slot-scope and displayData references within that block.
    """
    changed = False

    # Step 1: Replace <v-table ... :data="VARNAME" ...> (or :data first then class)
    # Capture: everything before :data, the varname, everything else (class etc), handle multiline
    # Pattern: <v-table with optional attrs including :data="VARNAME"
    # We collect (varname, full_original_tag) pairs so we can do targeted replacements.

    # Match v-table opening tags
    vtable_open_re = re.compile(
        r'<v-table\b([^>]*?):data="([^"]+)"([^>]*)>',
        re.DOTALL
    )

    def replace_vtable_open(m):
        before = m.group(1)
        varname = m.group(2)
        after = m.group(3)
        # Combine remaining attrs, drop :data and :filters (smart-table-specific)
        attrs = (before + after)
        # Remove :filters="..." attr (smart-table specific)
        attrs = re.sub(r'\s*:filters="[^"]*"', '', attrs)
        # Remove v-model:currentPage="..." (smart-table specific)
        attrs = re.sub(r'\s*v-model:currentPage="[^"]*"', '', attrs)
        # Remove :pageSize="..." (smart-table specific)
        attrs = re.sub(r'\s*:pageSize="[^"]*"', '', attrs)
        # Remove :sort-key="..."
        attrs = re.sub(r'\s*:sort-key="[^"]*"', '', attrs)
        attrs = attrs.strip()
        if attrs:
            return f'<table {attrs} data-src="{varname}">'
        else:
            return f'<table data-src="{varname}">'

    new_content = vtable_open_re.sub(replace_vtable_open, content)
    if new_content != content:
        changed = True
        content = new_content

    # Step 2: Replace </v-table> with </table>
    new_content = content.replace('</v-table>', '</table>')
    if new_content != content:
        changed = True
        content = new_content

    # Step 3: Remove slot="head" from thead tags
    new_content = re.sub(r'(<thead)\s+slot="head"', r'\1', content)
    if new_content != content:
        changed = True
        content = new_content

    # Step 4: Remove slot="head" class variant: <thead slot="head" class="...">
    # Already handled above since we just remove slot="head" attribute

    # Step 5: Remove slot="body" and slot-scope="{displayData}" from tbody
    new_content = re.sub(r'(<tbody)\s+slot="body"\s+slot-scope="\{displayData\}"', r'\1', content)
    if new_content != content:
        changed = True
        content = new_content

    new_content = re.sub(r'(<tbody)\s+slot="body"', r'\1', content)
    if new_content != content:
        changed = True
        content = new_content

    # Step 6: For each table that has data-src="VARNAME", replace "in displayData"
    # within that table block with "in VARNAME"
    # We'll do this by finding each <table data-src="VARNAME">...</table> block
    table_block_re = re.compile(
        r'(<table\b[^>]*data-src="([^"]+)"[^>]*>)(.*?)(</table>)',
        re.DOTALL
    )

    def replace_displaydata(m):
        open_tag = m.group(1)
        varname = m.group(2)
        inner = m.group(3)
        close_tag = m.group(4)
        # Replace " in displayData" with " in VARNAME" in v-for
        new_inner = re.sub(r'\bin displayData\b', f'in {varname}', inner)
        # Remove data-src attribute now that we've used it
        new_open = re.sub(r'\s*data-src="[^"]*"', '', open_tag)
        return new_open + new_inner + close_tag

    new_content = table_block_re.sub(replace_displaydata, content)
    if new_content != content:
        changed = True
        content = new_content

    # Step 7: Remove any remaining slot="head" or slot="body" attributes (leftover on plain tables)
    new_content = re.sub(r'\s+slot="(?:head|body)"', '', content)
    if new_content != content:
        changed = True
        content = new_content

    # Step 8: Remove any remaining slot-scope="{displayData}"
    new_content = re.sub(r'\s+slot-scope="\{displayData\}"', '', content)
    if new_content != content:
        changed = True
        content = new_content

    return content, changed


def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    if '<v-table' not in content and 'slot="head"' not in content and 'slot="body"' not in content:
        return False

    new_content, changed = fix_vtable_block(content)

    if changed:
        with open(filepath, 'w', encoding='utf-8', newline='') as f:
            f.write(new_content)
        print(f"Fixed: {filepath}")
        return True
    return False


# Find all vue files
vue_files = glob.glob(os.path.join(BASE, '**', '*.vue'), recursive=True)
fixed = 0
for f in vue_files:
    if process_file(f):
        fixed += 1

print(f"\nTotal fixed: {fixed} files")
