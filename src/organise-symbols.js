/**
 * Organise symbols based on their names, particularly groups defined in those
 * names, as defined by the use of the forward-slash ("/").
 */

const sketch = require("sketch");

// The spacing between symbols within a group.
const symbolSpacing = 100;
// The multiple of symbolSpacing to use between groups.
const groupSpacing = 200;

export default function organizeSymbols() {
	const document = sketch.getSelectedDocument();

	// There doesn't seem to be a sure-fire way of finding the symbols page if
	// it has been renamed, other than checking things like whether a page has
	// only symbols, or the most symbols, neither of which seems like a
	// guarantee. For now, we'll just look for a "Symbols" page.
	const symbolsPage = document.pages.find(page => page.name === "Symbols");

	if (!symbolsPage) {
		sketch.UI.message("No page named \"Symbols\" found!");

		return;
	}

	const symbols = symbolsPage.layers.filter(layer => layer.type === "SymbolMaster");

	if (!Array.isArray(symbols) || !symbols.length) {
		sketch.UI.message("No symbols could be found to organise.");

		return;
	}

	// Sort the layer list alphabetically before we begin.
	sortLayerList(symbols);

	const hierarchy = determineSymbolHierarchy(symbols);

	// Start positioning our symbols from the top-left corner.
	positionSymbols(hierarchy, 0, 0);

	sketch.UI.message("Symbols organised successfully!");
}

/**
 * Determine our symbol hierarchy, based on each new depth within the name being
 * a horizontal column. The resulting hierarchy can be used to procedurally
 * place symbols on a page.
 *
 * @param  {array}  symbolList
 *     The list of symbols to arrange into a hierarchy.
 */
function determineSymbolHierarchy(symbolList) {
	const hierarchy = {};

	symbolList.forEach(symbol => {
		const nameParts = symbol.name.split("/");

		let currentLevel = hierarchy;

		nameParts.forEach((part, index) => {
			// If this is the last part, we add the symbol to the parent level's
			// array.
			if (index === nameParts.length - 1) {
				if (!currentLevel._symbols) {
					currentLevel._symbols = [];
				}

				currentLevel._symbols.unshift(symbol);
			} else if (!currentLevel[part]) {
				currentLevel[part] = {};
			}

			currentLevel = currentLevel[part];
		});
	});

	return hierarchy;
}

/**
 * Position the given symbols of a group, based on a starting position. Each
 * group represents a particular depth, and each item in a group is placed
 * horizontally, with each new depth within that group placed vertically. Both
 * the next group, and the next depth, are offset by the maximum width or height
 * of a symbol that we encounter.
 *
 * @param  {object}  group
 *     The collection of symbols to arrange
 * @param  {number}  startX
 *     The starting X position for the current group
 */
function positionSymbols(group, startX = 0) {
	if (typeof group !== "object") {
		return { x: startX, maxHeight: 0 };
	}

	let x = startX;
	let maxWidthForThisGroup = 0;

	Object.keys(group).sort().forEach(subGroupName => {
		const subGroup = group[subGroupName];
		const isSymbolArray = Array.isArray(subGroup);

		if (isSymbolArray) {
			let symbolY = 0;

			// When encountering symbols within a group, we place them
			// horizontally.
			subGroup.forEach(symbol => {
				symbol.frame.x = x;
				symbol.frame.y = symbolY;

				symbolY += symbol.frame.height + symbolSpacing;

				// Track the tallest symbol at this level, which allows us to
				// properly place the next level.
				if (symbol.frame.width > maxWidthForThisGroup) {
					maxWidthForThisGroup = symbol.frame.width;
				}
			});
		} else {
			const newX = maxWidthForThisGroup > 0 ? x + maxWidthForThisGroup + groupSpacing : x;
			const nextLevelResult = positionSymbols(subGroup, newX);

			// Update the x position for subsequent groups.
			x = nextLevelResult.x;

			// Update the max width for this level.
			if (nextLevelResult.maxWidth > maxWidthForThisGroup) {
				maxWidthForThisGroup = nextLevelResult.maxWidth;
			}
		}
	});

	// Return the updated starting positions.
	return { x, maxWidth: maxWidthForThisGroup };
}

/**
 * Sort the symbols in the layer list based on their names.
 *
 * @param  {array}  layers
 *     The layers to sort.
 */
function sortLayerList(layers) {
	// Sort layers alphabetically by name
	const sortedLayers = layers.sort((a, b) => a.name.localeCompare(b.name));

	// Reorder layers in the layer list. The layer list has high indexes at the
	// top, so we reverse our sorted layers.
	sortedLayers.reverse().forEach((layer, index) => {
		layer.index = index;
	});
}
