/**
 * Organise symbols based on their names, particularly groups defined in those
 * names, as defined by the use of the forward-slash ("/").
 */

const sketch = require("sketch");

// The vertical spacing between symbols within a group.
const symbolSpacing = 100;
// The horizontal spacing used between related paths and larger path branches.
const groupSpacing = {
	COMPONENT: 800,
	RELATED: 200,
	SECTION: 400,
};

// A reference to our page containing our symbols.
let symbolsPage;

export default function organizeSymbols() {
	const document = sketch.getSelectedDocument();

	// There doesn't seem to be a sure-fire way of finding the symbols page if
	// it has been renamed, other than checking things like whether a page has
	// only symbols, or the most symbols, neither of which seems like a
	// guarantee. For now, we'll just look for a "Symbols" page.
	symbolsPage = document.pages.find(page => page.name === "Symbols");

	if (!symbolsPage) {
		sketch.UI.message("No page named \"Symbols\" found. For now, the plugin requires a page with the default name.");

		return;
	}

	const symbols = symbolsPage.layers.filter(layer => layer.type === "SymbolMaster");

	if (!Array.isArray(symbols) || !symbols.length) {
		sketch.UI.message("It doesn't look like there were any symbols to organise.");

		return;
	}

	// Start by sorting our layer list to keep both the layer list and canvas
	// predictable.
	sortLayerList(symbols);

	const groups = determineSymbolGroups();

	positionSymbolGroups(groups);

	sketch.UI.message("Symbols organised successfully.");
}

/**
 * Sort the symbols in the layer list based on their names.
 *
 * @param  {array}  layers
 *     The layers to sort.
 */
function sortLayerList(layers) {
	// Assign sorted indices explicitly so the layer list stays predictable.
	const sortedLayers = layers.sort((a, b) => a.name.localeCompare(b.name));

	// Re-order our layer list to match the sort.
	sortedLayers.forEach((layer, index) => layer.index = index);
}


/**
 * Group all symbols by their path, keeping sibling symbols together.
 */
function determineSymbolGroups() {
	// We retrieve our symbols again because they've just been sorted.
	const symbols = symbolsPage.layers.filter(layer => layer.type === "SymbolMaster");

	const groups = [];

	symbols.forEach(symbol => {
		const symbolNameParts = symbol.name.split("/");
		const symbolPath = symbolNameParts.slice(0, -1).join("/");

		// See if we can find an existing group for this symbol with the same
		// path.
		let group = groups.find(group => group.path === symbolPath);

		if (!group) {
			group = { path: symbolPath, symbols: [] };

			groups.push(group);
		}

		group.symbols.push({ name: symbol.name, frame: symbol.frame });
	});

	return groups.sort((a, b) => a.path.localeCompare(b.path));
}

/**
 * Chooses spacing that reflects how closely two symbol paths are related.
 *
 * @param  {string}  currentPath
 *   The path of the group that has just been positioned.
 * @param  {string}  nextPath
 *   The path of the next group to position.
 * @returns {number} The horizontal spacing between the groups.
 */
function getGroupSpacing(currentPath, nextPath) {
	const currentParts = currentPath.split("/");
	const nextParts = nextPath.split("/");
	const comparisonLength = Math.min(currentParts.length, nextParts.length);
	let sharedDepth = 0;

	for (let index = 0; index < comparisonLength; index += 1) {
		if (currentParts[index] !== nextParts[index]) {
			break;
		}

		sharedDepth += 1;
	}

	if (sharedDepth === 0) {
		return groupSpacing.COMPONENT;
	}

	if (sharedDepth === 1) {
		return groupSpacing.SECTION;
	}

	return groupSpacing.RELATED;
}

/**
 * Position our symbol groups, placing each new group in a new column.
 *
 * @param  {array}  groups
 *     The collection of symbol groups to place.
 */
function positionSymbolGroups(groups) {
	let x = 0;

	groups.forEach((group, groupIndex) => {
		if (typeof group !== "object" || !Object.hasOwn(group, "symbols")) {
			return;
		}

		// Keep track of our widest symbol to properly align the next group.
		let maxWidthForThisGroup = 0;
		// When placing symbols within a group, we organise them vertically,
		// starting at y position 0.
		let currentYPosition = 0;

		group.symbols.forEach(symbol => {
			// Position our symbol at our current horizontal x position.
			symbol.frame.x = x;
			// Position our symbol at our calculated y position, taking into
			// account other symbols in this group.
			symbol.frame.y = currentYPosition;

			currentYPosition += symbol.frame.height + symbolSpacing;

			// Track the widest symbol at this level, which allows us to
			// properly place the next level.
			if (symbol.frame.width > maxWidthForThisGroup) {
				maxWidthForThisGroup = symbol.frame.width;
			}
		});

		// Once we're finished with the group, we can update the x position
		// ready for the next.
		const nextGroup = groups[groupIndex + 1];

		if (maxWidthForThisGroup > 0 && nextGroup) {
			x += maxWidthForThisGroup + getGroupSpacing(group.path, nextGroup.path);
		}
	});
}
