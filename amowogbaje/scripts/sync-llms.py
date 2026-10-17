"""Regenerates the experience + teaching sections of public/llms-full.txt from src/data/experience.json.
Run after editing the JSON:  python3 scripts/sync-llms.py"""
import json, re
d = json.load(open('src/data/experience.json', encoding='utf-8'))
def line(e):
    eng = f" ({e['engagement']})" if e.get('engagement') else ''
    return f"- {e['title']}{eng}, {e['company']}, {e['place']} — {e['dates'].replace(' – ', ' to ')}. " + ' '.join(e['points'])
soft = [e for e in d['entries'] if e['kind'] == 'software']
teach = [e for e in d['entries'] if e['kind'] == 'teaching']
exp = "## Professional experience\n" + "\n".join(line(e) for e in soft) + "\n\n"
tch = "## Teaching experience\nGideon teaches in classrooms alongside software work (some roles overlap with development roles):\n" + "\n".join(line(e).replace(', Nigeria', '') for e in teach) + "\n\n"
p = 'public/llms-full.txt'; s = open(p, encoding='utf-8').read()
s = re.sub(r"## Professional experience\n.*?(?=## Teaching experience)", lambda m: exp, s, flags=re.S)
s = re.sub(r"## Teaching experience\n.*?(?=## Education and certifications)", lambda m: tch, s, flags=re.S)
open(p, 'w', encoding='utf-8').write(s)
print('llms-full.txt experience synced')
