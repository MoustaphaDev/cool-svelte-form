<script lang="ts">
	export let value: string | number;
	export let placeholder: string;
	export let label: string;
	export let id: string;
</script>

<div class="relative z-0 w-full group mr-3">
	<label for={id} class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
		>{label}</label
	>
	<input
		type="text"
		{id}
		bind:value
		class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
		{placeholder}
		disabled
		readonly
	/>
</div>
