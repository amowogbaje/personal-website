"""Builds the per-filter CV PDFs in public/cv/ from src/data/experience.json (single source of truth).
Run:  python3 scripts/build-cvs.py      (needs: pip install reportlab)"""
import json, os, shutil
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_RIGHT
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, KeepTogether, HRFlowable

D = '/usr/share/fonts/truetype/dejavu/'
pdfmetrics.registerFont(TTFont('DV', D + 'DejaVuSans.ttf'))
pdfmetrics.registerFont(TTFont('DV-B', D + 'DejaVuSans-Bold.ttf'))
pdfmetrics.registerFont(TTFont('DV-I', D + 'DejaVuSans-Oblique.ttf'))
pdfmetrics.registerFontFamily('DV', normal='DV', bold='DV-B', italic='DV-I', boldItalic='DV-B')

data = json.load(open('src/data/experience.json', encoding='utf-8'))
CONTACT = 'hello@amowogbaje.com · +234 702 630 5945 · linkedin.com/in/amowogbaje · amowogbaje.com · github.com/amowogbaje'
LOC = 'Ile-Ife, Osun State, Nigeria (open to fully remote)'
INK, GOLD, GREY = colors.HexColor('#14171F'), colors.HexColor('#9A6B12'), colors.HexColor('#555B66')

def S(n, **k):
    base = dict(fontName='DV', fontSize=8.4, leading=11.4, textColor=INK)
    base.update(k)
    return ParagraphStyle(n, **base)
st = dict(
    name=S('name', fontName='DV-B', fontSize=19, leading=23),
    head=S('head', fontSize=9.4, leading=12.5, textColor=GOLD, fontName='DV-B'),
    contact=S('contact', fontSize=7.6, leading=10.5, textColor=GREY),
    h=S('h', fontName='DV-B', fontSize=9, leading=12, textColor=GOLD, spaceBefore=9, spaceAfter=2),
    body=S('body'),
    role=S('role', fontName='DV-B', fontSize=8.8, leading=11.8),
    dates=S('dates', fontSize=8, textColor=GREY, alignment=TA_RIGHT),
    bullet=S('bullet', leftIndent=9, bulletIndent=0, spaceAfter=1.2),
    meta=S('meta', fontName='DV-I', textColor=GREY, fontSize=7.8),
)
esc = lambda t: t.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')
bul = lambda t: Paragraph(esc(t), st['bullet'], bulletText='•')

def entry_block(e):
    row = Table([[Paragraph(f"{esc(e['title'])} — {esc(e['company'])}, {esc(e['place'])}" + (f" ({esc(e['engagement'])})" if e.get('engagement') else ''), st['role']),
                  Paragraph(esc(e['dates']), st['dates'])]], colWidths=[None, 34 * mm])
    row.setStyle(TableStyle([('LEFTPADDING', (0, 0), (-1, -1), 0), ('RIGHTPADDING', (0, 0), (-1, -1), 0),
                             ('TOPPADDING', (0, 0), (-1, -1), 4), ('BOTTOMPADDING', (0, 0), (-1, -1), 1.5),
                             ('VALIGN', (0, 0), (-1, -1), 'TOP')]))
    pts = e['points']
    return KeepTogether([row, bul(pts[0])]) , [bul(p) for p in pts[1:]]

def build(key):
    f = data['filters'][key]
    path = f'public/cv/Gideon-Amowogbaje-CV-{key.capitalize()}.pdf'
    doc = SimpleDocTemplate(path, pagesize=A4, leftMargin=15 * mm, rightMargin=15 * mm, topMargin=13 * mm,
                            bottomMargin=13 * mm, title=f"Gideon Amowogbaje — CV ({f['label']})", author='Gideon Amowogbaje')
    out = [Paragraph('GIDEON AMOWOGBAJE', st['name']), Paragraph(esc(f['headline']), st['head']),
           Spacer(1, 2), Paragraph(esc(CONTACT), st['contact']), Paragraph(esc(LOC), st['contact'])]
    sec = lambda t: [Paragraph(t.upper(), st['h']), HRFlowable(width='100%', thickness=0.4, color=colors.HexColor('#D8D2C4'), spaceAfter=3)]
    out += sec('Profile') + [Paragraph(esc(f['profile']), st['body'])]
    out += sec('Core skills')
    for s in f['skills']:
        out.append(Paragraph(f"<b>{esc(s)}:</b> {esc(data['skills'][s])}", st['body']))
        out.append(Spacer(1, 1.5))
    tag = None if key == 'complete' else key
    ents = [e for e in data['entries'] if tag is None or tag in e['tags']]
    soft = [e for e in ents if e['kind'] == 'software']
    teach = [e for e in ents if e['kind'] == 'teaching']
    groups = [('Teaching experience', teach), ('Software development experience', soft)] if key == 'teaching' else \
             [('Software development experience', soft), ('Teaching experience', teach)]
    for title, items in groups:
        if not items: continue
        out += sec(title)
        for e in items:
            first, rest = entry_block(e)
            out.append(first); out += rest
    prs = [data['projects'][p] for p in f['projects']]
    out += sec('Products & independent projects')
    for p in prs:
        out.append(KeepTogether([Paragraph(f"<b>{esc(p['name'])}</b> — {esc(p['meta'])}", st['body'])] + [bul(x) for x in p['points']] + [Spacer(1, 2)]))
    out += sec('Education & certifications') + [bul(x) for x in data['education']]
    if 'trcn' in f['extras']: out.append(bul(data['trcn']))
    if 'volunteering' in f['extras']:
        out += sec('Volunteering & interests') + [bul(x) for x in data['volunteering']]
    doc.build(out)
    print('wrote', path)

os.makedirs('public/cv', exist_ok=True)
for k in data['filters']: build(k)
shutil.copy('public/cv/Gideon-Amowogbaje-CV-Backend.pdf', 'public/resume.pdf')  # default CV = primary positioning
print('resume.pdf <- Backend CV')
