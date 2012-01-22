# tile.js

* A Simple javascript replication of windows tile interactions (tilting)

* Note that this requires a browser with support for CSS 3D transforms (Currently only webkit).

* In the future, I plan to add support for other browsers (as they come to support 3d transforms), as well as some graceful degredation for older browsers.

# Example

* http://tholman.com/projects/tile-js/

# Usage

```
<script src="js/tile.js" type="text/javascript"></script>

<script>
	window.onload = function() {
		Tile("divId");
	}
</script>
```