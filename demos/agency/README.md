# AthleteBridge agency demo: photo list

Put all images in `agency/images/`. Pages still load if a file is missing (cards fall back to the coloured initials tile).

## Already in place

| File | Used for | Source |
|---|---|---|
| `ethan.jpg` | Hero card and roster: Ethan Cole (football) | Football gallery photo |
| `jordan.jpg` | Hero card and roster: Jordan Reed (basketball) | Basketball portrait |
| `marco.jpg` | Hero card and roster: Marco Santos (boxing) | Boxing close-up |
| `elena.jpg` | Roster: Elena Park (athletics) | Runner gallery photo |

## Still needed (priority)

These four roster players still show initials tiles. Each needs one portrait.

| File to add | Player | What the photo should show | Size |
|---|---|---|---|
| `daniel.jpg` | Daniel Mensah, midfielder, Ghana, age 22 | Young Black footballer in club kit, head and shoulders, stadium or training-ground background | 600×600 |
| `chidi.jpg` | Chidi Okafor, forward, Nigeria, age 19 | Teenage striker, confident pose, gold or yellow kit if possible (card colour is gold) | 600×600 |
| `kwame.jpg` | Kwame Asante, defender, Ghana, age 21 | Defender in blue kit, strong stance, arms folded or ball at feet | 600×600 |
| `emeka.jpg` | Emeka Eze, forward, Nigeria, age 23 | Striker in teal or green kit, mid-action or celebrating | 600×600 |

Photo tips: square crop, face in the top third, no text or logos baked into the image, JPG under 80 KB.

### How to wire a new portrait
1. Save the file in `agency/images/`.
2. In `agency/index.html`, find the player in the `const P=[...]` list.
3. Add `img:"daniel.jpg"` to that player's object (the `k:[...]` colours can stay as a fallback).

Example:
`{n:"Daniel Mensah",s:"Football",...,img:"daniel.jpg"}`

## Done (generated or reused from your photos)

| File | Use |
|---|---|
| `favicon.png` | Browser tab icon ("AB" mark) |
| `service-1.jpg` to `service-4.jpg` | Photos on the four service cards (reused athlete photos) |

## Optional extras

| File | Use | Size |
|---|---|---|
| `og-image.jpg` | Preview image when the link is shared on WhatsApp or social media | 1200×630 |
| `hero-bg.jpg` | Optional stadium or pitch photo behind the hero (currently a line-drawn pitch) | 1600×900 |
| `tunde.jpg`, `samuel.jpg` | Only if you want the two players I removed back (Tunde Bello, goalkeeper, Nigeria, 24; Samuel Lumasa, midfielder, Uganda, 18) | 600×600 |

The service photos are reused athlete shots; swap in better-matched photos (same filenames) whenever you have them.

## Spare photos from your earlier set (unused anywhere)

1. Football: the "The Final Blow – Coming Soon" banner. It has poster text baked in, so it doesn't suit the agency page.
2. Basketball: the locker-room shot with the ball and a logo that looks like a real NBA team's. Avoid it.
3. Boxing: the wide jab shot with a faint "BOXER" sign. It's usable as `hero-bg.jpg` or a service image if you like.
4. Running: the "Find Your Pacer" banner. It has text baked in, so it doesn't suit the agency page.
