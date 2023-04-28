<script lang="ts">
	/**The id should be equal to the `data-tooltip-target` attribute value of the
	 * element that should display the tooltip.
	 */
	export let id: string;
	export let text: string;
</script>

<!--
@component
This is a tooltip component
To create a tooltip for an element, add to it a `data-tooltip-target`
attribute set to the id of the tooltip you want to bind to it
-->
<div
	{id}
	role="tooltip"
	class="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700"
>
	{text}
	<div class="tooltip-arrow" data-popper-arrow />
</div>
