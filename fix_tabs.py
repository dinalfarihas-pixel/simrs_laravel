"""
Migrate PrimeVue 3 TabView/TabPanel → PrimeVue 4 Tabs/TabList/Tab/TabPanels/TabPanel

Old:
  <TabView>
    <TabPanel header="Title 1" v-if="cond">content</TabPanel>
    <TabPanel header="Title 2">content</TabPanel>
  </TabView>

New:
  <Tabs>
    <TabList>
      <Tab v-if="cond">Title 1</Tab>
      <Tab>Title 2</Tab>
    </TabList>
    <TabPanels>
      <TabPanel v-if="cond">content</TabPanel>
      <TabPanel>content</TabPanel>
    </TabPanels>
  </Tabs>
"""

import re, os, glob

BASE = r"C:\xampp\htdocs\backend_dashbord\resources\js"


def find_tag_end(content, start):
    """Find the position after the closing '>' of an opening tag starting at 'start'."""
    i = start
    in_str = None
    while i < len(content):
        c = content[i]
        if in_str:
            if c == in_str:
                in_str = None
        elif c in ('"', "'"):
            in_str = c
        elif c == '>':
            return i + 1
        i += 1
    return -1


def find_matching_close(content, open_start, tagname):
    """
    Given the start of an opening tag <tagname ...>, find the position of
    the start of its matching </tagname>.
    """
    depth = 0
    i = open_start
    open_pat = re.compile(r'<' + re.escape(tagname) + r'\b')
    close_pat = re.compile(r'</' + re.escape(tagname) + r'\s*>')

    while i < len(content):
        om = open_pat.search(content, i)
        cm = close_pat.search(content, i)

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


def parse_tag_attrs(tag_str):
    """
    Parse a tag string like '<TabPanel header="Foo" v-if="bar" :disabled="x">'
    Returns dict of attribute name -> value (or True for boolean attrs).
    """
    attrs = {}
    # Remove the tag name
    body = re.sub(r'^<\w[\w-]*\s*', '', tag_str.rstrip('>').rstrip('/').strip())
    # Match attributes: name="value", :name="value", @name="value", v-name="value", name
    attr_re = re.compile(r'([@:v\w][\w\-.:@]*)(?:=(?:"([^"]*)"|\'([^\']*)\'))?')
    for m in attr_re.finditer(body):
        name = m.group(1)
        val = m.group(2) if m.group(2) is not None else (m.group(3) if m.group(3) is not None else True)
        attrs[name] = val
    return attrs


def get_direct_tabpanels(inner_content):
    """
    Find all direct-child <TabPanel> elements within content.
    Returns list of (full_open_tag_str, inner_content_str, close_tag_pos_rel).
    """
    panels = []
    i = 0
    depth = 0  # depth relative to this content (0 = direct child level)

    # Tags that increase nesting depth
    nesting_open = re.compile(r'<(TabView|Tabs)\b')
    nesting_close = re.compile(r'</(TabView|Tabs)\s*>')
    panel_open = re.compile(r'<TabPanel\b')

    while i < len(inner_content):
        # Look for next relevant tag
        no = nesting_open.search(inner_content, i)
        nc = nesting_close.search(inner_content, i)
        po = panel_open.search(inner_content, i)

        candidates = [(m.start(), m) for m in [no, nc, po] if m is not None]
        if not candidates:
            break
        candidates.sort(key=lambda x: x[0])
        _, first = candidates[0]

        if first == no and no is not None and no.start() == first.start():
            depth += 1
            i = no.end()
        elif first == nc and nc is not None and nc.start() == first.start():
            depth -= 1
            i = nc.end()
        elif first == po and po is not None and po.start() == first.start():
            if depth == 0:
                # Direct child TabPanel found
                panel_start = po.start()
                tag_end = find_tag_end(inner_content, panel_start)
                open_tag = inner_content[panel_start:tag_end]

                # Find matching </TabPanel>
                close_start = find_matching_close(inner_content, panel_start, 'TabPanel')
                if close_start == -1:
                    i = po.end()
                    continue
                close_end = inner_content.index('>', close_start) + 1
                panel_inner = inner_content[tag_end:close_start]
                panels.append((open_tag, panel_inner, close_end))
                i = close_end
            else:
                i = po.end()
        else:
            i += 1

    return panels


def build_tabs(panels, base_indent):
    """
    Given a list of (open_tag, inner_content) for TabPanel elements,
    build the new Tabs structure.
    """
    ind = base_indent
    tab_indent = ind + '    '
    list_indent = ind + '        '

    # Build TabList
    tab_list_lines = [f'{tab_indent}<TabList>']
    for (open_tag, inner, _) in panels:
        attrs = parse_tag_attrs(open_tag)
        header = attrs.get('header', '')
        vif = attrs.get('v-if', None)
        disabled = attrs.get(':disabled', attrs.get('disabled', None))

        tab_attrs = []
        if vif is not None and vif is not True:
            tab_attrs.append(f'v-if="{vif}"')
        if disabled is not None and disabled is not True:
            tab_attrs.append(f':disabled="{disabled}"')
        elif disabled is True:
            tab_attrs.append('disabled')

        attr_str = (' ' + ' '.join(tab_attrs)) if tab_attrs else ''
        tab_list_lines.append(f'{list_indent}<Tab{attr_str}>{header}</Tab>')

    tab_list_lines.append(f'{tab_indent}</TabList>')

    # Build TabPanels
    panel_lines = [f'{tab_indent}<TabPanels>']
    for (open_tag, inner, _) in panels:
        attrs = parse_tag_attrs(open_tag)
        vif = attrs.get('v-if', None)

        panel_attrs = []
        if vif is not None and vif is not True:
            panel_attrs.append(f'v-if="{vif}"')

        attr_str = (' ' + ' '.join(panel_attrs)) if panel_attrs else ''
        panel_lines.append(f'{list_indent}<TabPanel{attr_str}>')
        panel_lines.append(inner.rstrip('\n'))
        panel_lines.append(f'{list_indent}</TabPanel>')

    panel_lines.append(f'{tab_indent}</TabPanels>')

    result = [f'{ind}<Tabs>']
    result.extend(tab_list_lines)
    result.extend(panel_lines)
    result.append(f'{ind}</Tabs>')
    return '\n'.join(result)


def transform_content(content):
    """Transform all TabView blocks in file content."""
    changed = False
    result_parts = []
    i = 0

    tabview_open_re = re.compile(r'<TabView\b[^>]*>')

    while i < len(content):
        m = tabview_open_re.search(content, i)
        if not m:
            result_parts.append(content[i:])
            break

        result_parts.append(content[i:m.start()])

        # Determine indentation of <TabView
        line_start = content.rfind('\n', 0, m.start()) + 1
        base_indent = ''
        for ch in content[line_start:m.start()]:
            if ch in (' ', '\t'):
                base_indent += ch
            else:
                break

        tv_open_end = m.end()
        close_start = find_matching_close(content, m.start(), 'TabView')
        if close_start == -1:
            result_parts.append(content[m.start():])
            break

        close_tag_m = re.search(r'</TabView\s*>', content[close_start:])
        close_end = close_start + close_tag_m.end()

        inner = content[tv_open_end:close_start]
        panels = get_direct_tabpanels(inner)

        if panels:
            new_block = build_tabs(panels, base_indent)
            result_parts.append(new_block)
            changed = True
        else:
            result_parts.append(content[m.start():close_end])

        i = close_end

    return ''.join(result_parts), changed


def fix_imports(content):
    """Replace TabView/TabPanel imports with new Tabs imports."""
    changed = False

    # Remove TabView import
    new = re.sub(r"import TabView from 'primevue/tabview';\s*\n?", '', content)
    if new != content:
        changed = True
        content = new

    # Replace/add TabPanel import with full set
    old_tabpanel = re.compile(r"import TabPanel from 'primevue/tabpanel';")
    new_imports = (
        "import Tabs from 'primevue/tabs';\n"
        "import TabList from 'primevue/tablist';\n"
        "import Tab from 'primevue/tab';\n"
        "import TabPanels from 'primevue/tabpanels';\n"
        "import TabPanel from 'primevue/tabpanel';"
    )
    if old_tabpanel.search(content):
        content = old_tabpanel.sub(new_imports, content)
        changed = True
    elif 'TabView' not in content and '<Tabs>' in content:
        # TabPanel import wasn't there but we may need it
        pass

    return content, changed


def fix_component_registrations(content):
    """Update components: { TabView, TabPanel } → { Tabs, TabList, Tab, TabPanels, TabPanel }"""
    changed = False

    # Remove standalone TabView from components
    new = re.sub(r'\bTabView\s*,?\s*', '', content)
    # Clean up double commas or trailing commas before }
    new = re.sub(r',\s*,', ',', new)
    new = re.sub(r',\s*}', '\n            }', new)
    if new != content:
        changed = True
        content = new

    # Add Tabs, TabList, Tab, TabPanels next to TabPanel in components
    def add_new_tab_components(m):
        return 'Tabs, TabList, Tab, TabPanels, TabPanel'

    new = re.sub(r'\bTabPanel\b(?!\s*from)', add_new_tab_components, content)
    if new != content:
        changed = True
        content = new

    return content, changed


def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    if '<TabView' not in content:
        return False

    print(f"\nProcessing: {os.path.basename(filepath)}")

    content, c1 = transform_content(content)
    content, c2 = fix_imports(content)
    content, c3 = fix_component_registrations(content)

    if c1 or c2 or c3:
        with open(filepath, 'w', encoding='utf-8', newline='') as f:
            f.write(content)
        print(f"  OK")
        return True
    return False


vue_files = glob.glob(os.path.join(BASE, '**', '*.vue'), recursive=True)
fixed = 0
for f in vue_files:
    if process_file(f):
        fixed += 1

print(f"\nTotal files migrated: {fixed}")
