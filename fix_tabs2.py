"""
Corrective + proper TabView → Tabs migration for PrimeVue 4.
Pass 1: undo corruption from fix_tabs.py (TabPanel tags got renamed to
        "Tabs, TabList, Tab, TabPanels, TabPanel" in the template).
Pass 2: recursively transform any remaining <TabView> blocks in the template.
Pass 3: fix imports in the <script> section only.
"""

import re, os, glob

BASE = r"C:\xampp\htdocs\backend_dashbord\resources\js"


# ────────────────────────────────────────────────
# Low-level helpers
# ────────────────────────────────────────────────

def split_sections(content):
    """Return (before_template, template_inner, between, script_inner, after)."""
    tm = re.search(r'<template>(.*)</template>', content, re.DOTALL)
    sm = re.search(r'<script[^>]*>(.*)</script>', content, re.DOTALL)
    return tm, sm


def find_tag_end(s, start):
    i, in_str = start, None
    while i < len(s):
        c = s[i]
        if in_str:
            if c == in_str: in_str = None
        elif c in ('"', "'"):
            in_str = c
        elif c == '>':
            return i + 1
        i += 1
    return -1


def find_matching_close(content, open_start, tagname):
    depth = 0
    i = open_start
    op = re.compile(r'<' + re.escape(tagname) + r'\b')
    cl = re.compile(r'</' + re.escape(tagname) + r'\s*>')
    while i < len(content):
        om = op.search(content, i)
        cm = cl.search(content, i)
        if cm is None:
            return -1
        if om is not None and om.start() < cm.start():
            depth += 1
            i = om.end()
        else:
            depth -= 1
            if depth == 0:
                return cm.start()
            i = cm.end()
    return -1


def parse_attrs(tag_str):
    """Extract attributes from an opening tag string."""
    attrs = {}
    body = re.sub(r'^<[\w-]+\s*', '', tag_str.rstrip('>').rstrip('/').strip())
    for m in re.finditer(r'([@:v\w][\w\-.:@]*)(?:=(?:"([^"]*)"|\'([^\']*)\'))?', body):
        name = m.group(1)
        val = m.group(2) if m.group(2) is not None else (
              m.group(3) if m.group(3) is not None else True)
        attrs[name] = val
    return attrs


# ────────────────────────────────────────────────
# Pass 1: undo corruption
# ────────────────────────────────────────────────

CORRUPT_OPEN  = '<Tabs, TabList, Tab, TabPanels, TabPanel'
CORRUPT_CLOSE = '</Tabs, TabList, Tab, TabPanels, TabPanel>'

def undo_corruption(template):
    t = template.replace(CORRUPT_OPEN, '<TabPanel')
    t = t.replace(CORRUPT_CLOSE, '</TabPanel>')
    # Restore <TabView> tags that were stripped to <> by the first script's
    # fix_component_registrations (which did re.sub(r'\bTabView\s*,?\s*', '') on whole file)
    def restore_fragment(m):
        inner = m.group(1)
        # Only restore if the fragment contains TabPanel children (was a TabView)
        if re.search(r'<TabPanel\b', inner):
            return f'<TabView>{inner}</TabView>'
        return m.group(0)
    t = re.sub(r'<>(.*?)</>', restore_fragment, t, flags=re.DOTALL)
    return t


# ────────────────────────────────────────────────
# Pass 2: transform <TabView> → <Tabs> (recursive)
# ────────────────────────────────────────────────

def get_direct_tabpanels(inner):
    """Return list of (open_tag_str, inner_content_str, end_pos) for direct TabPanel children."""
    panels, i, depth = [], 0, 0
    nest_open  = re.compile(r'<(TabView|Tabs)\b')
    nest_close = re.compile(r'</(TabView|Tabs)\s*>')
    panel_open = re.compile(r'<TabPanel\b')

    while i < len(inner):
        no = nest_open.search(inner, i)
        nc = nest_close.search(inner, i)
        po = panel_open.search(inner, i)

        hits = [(m.start(), kind, m)
                for kind, m in [('no', no), ('nc', nc), ('po', po)]
                if m is not None]
        if not hits:
            break
        hits.sort()
        _, kind, first = hits[0]

        if kind == 'no':
            depth += 1; i = first.end()
        elif kind == 'nc':
            depth -= 1; i = first.end()
        else:  # panel
            if depth == 0:
                ps = first.start()
                te = find_tag_end(inner, ps)
                open_tag = inner[ps:te]
                cs = find_matching_close(inner, ps, 'TabPanel')
                if cs == -1:
                    i = first.end(); continue
                ce_m = re.search(r'</TabPanel\s*>', inner[cs:])
                ce = cs + ce_m.end()
                panels.append((open_tag, inner[te:cs], ce))
                i = ce
            else:
                i = first.end()
    return panels


def get_leading_indent(content, pos):
    line_start = content.rfind('\n', 0, pos) + 1
    indent = ''
    for ch in content[line_start:pos]:
        if ch in (' ', '\t'):
            indent += ch
        else:
            break
    return indent


def build_tabs(panels, base_indent):
    ti  = base_indent + '    '   # inside <Tabs>
    li  = base_indent + '        '  # inside <TabList> / <TabPanels>
    lines = [f'{base_indent}<Tabs>', f'{ti}<TabList>']

    for (open_tag, _, _) in panels:
        attrs = parse_attrs(open_tag)
        header   = attrs.get('header', '')
        vif      = attrs.get('v-if')
        disabled = attrs.get(':disabled', attrs.get('disabled'))

        extra = []
        if vif and vif is not True:
            extra.append(f'v-if="{vif}"')
        if disabled and disabled is not True:
            extra.append(f':disabled="{disabled}"')
        elif disabled is True:
            extra.append('disabled')
        attr_str = (' ' + ' '.join(extra)) if extra else ''
        lines.append(f'{li}<Tab{attr_str}>{header}</Tab>')

    lines.append(f'{ti}</TabList>')
    lines.append(f'{ti}<TabPanels>')

    for (open_tag, inner, _) in panels:
        attrs = parse_attrs(open_tag)
        vif   = attrs.get('v-if')

        extra = []
        if vif and vif is not True:
            extra.append(f'v-if="{vif}"')
        attr_str = (' ' + ' '.join(extra)) if extra else ''

        lines.append(f'{li}<TabPanel{attr_str}>')
        # Recursively transform inner TabViews
        transformed_inner, _ = transform_tabviews(inner)
        lines.append(transformed_inner.rstrip('\n'))
        lines.append(f'{li}</TabPanel>')

    lines.append(f'{ti}</TabPanels>')
    lines.append(f'{base_indent}</Tabs>')
    return '\n'.join(lines)


def transform_tabviews(content):
    """Replace all <TabView> blocks with <Tabs> recursively."""
    changed = False
    parts = []
    i = 0
    tv_re = re.compile(r'<TabView\b[^>]*>')

    while i < len(content):
        m = tv_re.search(content, i)
        if not m:
            parts.append(content[i:])
            break

        parts.append(content[i:m.start()])
        base_indent = get_leading_indent(content, m.start())

        tv_open_end = m.end()
        cs = find_matching_close(content, m.start(), 'TabView')
        if cs == -1:
            parts.append(content[m.start():])
            break

        ce_m = re.search(r'</TabView\s*>', content[cs:])
        ce = cs + ce_m.end()

        inner = content[tv_open_end:cs]
        panels = get_direct_tabpanels(inner)

        if panels:
            parts.append(build_tabs(panels, base_indent))
            changed = True
        else:
            parts.append(content[m.start():ce])

        i = ce

    return ''.join(parts), changed


# ────────────────────────────────────────────────
# Pass 3: fix imports (script section only)
# ────────────────────────────────────────────────

NEW_IMPORTS = (
    "import Tabs from 'primevue/tabs';\n"
    "import TabList from 'primevue/tablist';\n"
    "import Tab from 'primevue/tab';\n"
    "import TabPanels from 'primevue/tabpanels';\n"
    "import TabPanel from 'primevue/tabpanel';"
)

def fix_script_imports(script):
    changed = False
    s = re.sub(r"import TabView from 'primevue/tabview';\s*\n?", '', script)
    if s != script:
        changed = True
        script = s

    old_re = re.compile(r"import TabPanel from 'primevue/tabpanel';")
    if old_re.search(script):
        script = old_re.sub(NEW_IMPORTS, script)
        changed = True

    # Fix components: { ... TabView ... } — remove TabView, add new ones next to TabPanel
    def rm_tabview(m):
        return re.sub(r'\bTabView\s*,?\s*', '', m.group(0))
    s2 = re.sub(r'components\s*:\s*\{[^}]*\}', rm_tabview, script, flags=re.DOTALL)
    if s2 != script:
        changed = True
        script = s2

    # Replace lone TabPanel in components: {} with full set (only inside components block)
    def expand_tabpanel(m):
        inner = m.group(0)
        if 'TabPanel' in inner and 'Tabs' not in inner:
            inner = inner.replace('TabPanel', 'Tabs, TabList, Tab, TabPanels, TabPanel', 1)
        return inner
    s3 = re.sub(r'components\s*:\s*\{[^}]*\}', expand_tabpanel, script, flags=re.DOTALL)
    if s3 != script:
        changed = True
        script = s3

    return script, changed


# ────────────────────────────────────────────────
# File processor
# ────────────────────────────────────────────────

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    needs_tab_work = ('<TabView' in content or CORRUPT_OPEN in content
                      or bool(re.search(r'<>\s*[\s\S]*?<TabPanel\b', content)))
    if not needs_tab_work:
        return False

    print(f"Processing: {os.path.basename(filepath)}")

    # Split template / script
    template_m = re.search(r'(<template>)(.*)(</template>)', content, re.DOTALL)
    script_m   = re.search(r'(<script\b[^>]*>)(.*)(</script>)', content, re.DOTALL)

    if not template_m:
        print("  no <template> found, skipping")
        return False

    t_before = content[:template_m.start(1)]
    t_open   = template_m.group(1)
    t_inner  = template_m.group(2)
    t_close  = template_m.group(3)
    t_after_end = template_m.end(3)

    # Pass 1: undo corruption
    t_inner = undo_corruption(t_inner)

    # Pass 2: transform TabViews
    t_inner, _ = transform_tabviews(t_inner)

    new_content = content[:template_m.start(1)] + t_open + t_inner + t_close + content[t_after_end:]

    # Pass 3: fix script imports
    if script_m:
        full = new_content
        s_before = full[:script_m.start(1)]
        s_open   = script_m.group(1)
        s_inner  = script_m.group(2)
        s_close  = script_m.group(3)
        s_after  = full[script_m.end(3):]

        s_inner, _ = fix_script_imports(s_inner)
        new_content = s_before + s_open + s_inner + s_close + s_after

    with open(filepath, 'w', encoding='utf-8', newline='') as f:
        f.write(new_content)
    print(f"  OK")
    return True


vue_files = glob.glob(os.path.join(BASE, '**', '*.vue'), recursive=True)
fixed = 0
for f in vue_files:
    if process_file(f):
        fixed += 1

print(f"\nTotal: {fixed} files")
