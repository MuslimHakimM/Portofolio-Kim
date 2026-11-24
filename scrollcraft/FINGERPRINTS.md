# Fingerprints

Every site you build with **scroll-craft** gets one row here, appended after it
ships. The registry exists so your next build can prove it is a different page
rather than a re-skin of one you already made.

This file is **yours**. It starts empty on purpose: the gate is about not
repeating *yourself*, so it has nothing to say until you have built something.

The rules and the gate live in the skill's
`references/uniqueness.md`. Short version:

**A new build must differ from EVERY row below on at least 4 of the 6
dimensions.** Four against each row individually, not four on average across the
table. If a planned build fails, change the plan. Never edit a row to make room
for it.

The six dimensions are: **grammar**, **nav treatment**, **hero device**,
**act-sequence shape**, **close pattern**, **signature move**.

Dimension 6 is free, because a signature move is unique by definition. So the
gate really asks for three more out of the remaining five, and a build that
changes only grammar and world will fail it.

---

## The registry

| Build | Grammar | Nav treatment | Hero device | Act-sequence shape | Close pattern | Signature move | World | Port |
|---|---|---|---|---|---|---|---|---|
| hakim-portfolio | Chaptered editorial | Floating obsidian pill chapter folio with visited dots + CV + Explore Projects | Multi-plane parallax title page (obsidian grid, studio portrait plate, overlapping Tilawah PWA card) + fine-pointer depth | 6 chapters (Title, Profile/Education, Selected Work peak, Hard-cut Archival Paper Credentials, Tech Stack ledger, Correspondence), ~11.4vh; parallax -> flow+count -> sticky inspector -> reveal+tilt -> flow ledger -> resolved close | Resolved editorial correspondence desk (WhatsApp/Email composer carrying selected project topic) + quiet colophon | Sticky Android Build Inspector (`--wipe-p` scroll curtain morphing Splash to Dashboard + scroll-drawn SVG spec callout lines + live mode controls) | Modern Obsidian (`#0B0C0F`) + Android Emerald (`#3DDC84`) with hard-cut Archival Paper (`#EFECE5`) credentials spread | 3000 |

---

## What is taken

Add a bullet here whenever a build claims something a later build should avoid
reusing: a grammar, a nav treatment, a close pattern, a signature move, an
act-count-and-length band. The shared columns are what the next build inherits
as a constraint, so writing them down is the whole point.

- **hakim-portfolio** (first build, shares nothing with prior rows): claimed `Chaptered editorial` grammar, floating pill chapter folio nav, multi-plane parallax studio portrait + device overlap hero, hard-cut archival paper credentials spread, 6-chapter ~11.4vh editorial shape, stateful correspondence desk close, and Sticky Android Build Inspector (`--wipe-p` splash-to-dashboard curtain wipe + SVG callout trace drawing).

---

## Appending a row

After shipping, add one line to the table and one bullet to **What is taken** if
the build claimed something new. Fill every column. Say what the build shares
with existing rows.

Rows are append-only. A build that has been superseded stays in the table,
because the space it occupies is still occupied.

---

## Worked example

The skill's author kept a registry of twelve builds across eight page grammars.
If you want to see what a filled-in table looks like, and which shapes tend to
collide, read `EXAMPLES.md` in the scroll-craft repository. Treat it as
illustration only: those rows are somebody else's builds and they do **not**
constrain yours.
