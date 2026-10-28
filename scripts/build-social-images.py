"""Render code-native brand cards using existing logo assets (Pillow)."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
root = Path(__file__).resolve().parents[1]
font = '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
for kind in ['home', 'o2o']:
    im = Image.new('RGB', (1200, 630), '#0b0b0b')
    d = ImageDraw.Draw(im)
    d.rectangle((64, 56, 1136, 59), fill='#d8fc43')
    logo = Image.open(root / 'public/images/logo_w_26.png').convert('RGBA')
    logo.thumbnail((720, 240))
    im.paste(logo, (64, 118), logo)
    if kind == 'o2o':
        sub = Image.open(root / 'public/o2o/assets/o2o_w.png').convert('RGBA')
        sub.thumbnail((620, 155))
        im.paste(sub, (68, 364), sub)
        label = 'LOCAL CONNECTIONS'
    else:
        d.text((72, 406), 'DIGITAL PR & INTEGRATED MARKETING', font=ImageFont.truetype(font, 30), fill='#d8fc43')
        label = 'STRATEGY / CONTENT / CONNECTION'
    d.text((72, 552), label, font=ImageFont.truetype(font, 18), fill='#b0b0b0')
    d.text((930, 552), 'ninedr.com', font=ImageFont.truetype(font, 22), fill='#ffffff')
    im.save(root / f'public/images/social/ninedr-{kind}-20261028.png', optimize=True)
