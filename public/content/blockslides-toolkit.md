# WHY

At my last startup, we tried to build a slide editor using Tiptap. We hit structural limits pretty quickly.

Tiptap is excellent for document editing. Slides are different.

We tried two approaches:

**One giant document**  
It looked like a Word doc filled with styled tables and images. Technically it worked. Structurally it felt wrong.

**Multiple documents**  
Now you're managing IDs across documents, ordering them, exporting them together, merging them, keeping them in sync. Users think they're editing a deck. Under the hood, you're stitching documents together.

Neither approach felt slide native.

I needed something closer to how Gamma approaches their Prose Mirrorbased editor.

After spending so much time deep in Tiptap’s internals, I understood the architecture well enough to take it in a different direction.


## THE TOOLKIT

Blockslides is a WYSIWYG slide deck editor toolkit.

It gives you a full slide editor in a single component.

### Features

**One-Component Setup**  
Drop it in and go.

**Asset-Based**  
Built for fixed dimensions like 16:9, A4, or social formats, not infinite scroll documents.

**50+ Extensions**  
Pre-built support for code blocks, math (KaTeX), layouts, and more.

## Checkout the demo:  
https://www.blockslides.com/#demo

## ROADMAP

This is the first launch.

Right now the goal is simple: make it the easiest way to ship a slide editor inside your app.

Next up:

**Exporting**  
Built-in toPPT() and additional export functions directly in the editor.

**Collaboration Cloud**  
Multiplayer editing out of the box.

**UI Improvements**  
Pre-built drag handles and richer block menus.

---

## TAKEAWAYS

If slides are essential to your product, hacking a document editor into a “deck” usually isn’t worth it.

Build something slide native and a lot of complexity disappears.

More to come.
