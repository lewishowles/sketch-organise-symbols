# Sketch organise symbols

This plugin tries to bring some order to symbol organisation. Symbols are organised into groups based on their name, with `form/input` and `form/select` being organised together, with `button/primary` being organised separately, for example.

## Why?

While it may seem small, a messy Symbols screen makes things harder to follow when modifying symbols directly. This plugin aims to avoid unnecessary thought going into the organising of symbols, unnecessary time spent organising them manually,

## How?

To keep things simple, this plugin looks for all layers of type `SymbolMaster` on a page named "Symbols". We then organise those symbols alphabetically based on the groups in their layer names.

Each group, as defined by a forward-slash divider (`/`) will be placed in a column, with sub-groups placed one column to the right.

For example, with four items, `form/input/prefix/base`, `form/input/prefix/sm`, `form/input/suffix/base` and `button/primary`, a layout might look like:

```
button    primary

form      input        prefix      base
                                   sm

                       suffix      base
```

## Installation

- Download and unzip the [latest release](../../releases/latest) of the plugin
- Double-click on `sketch-organise-symbols.sketchplugin`
