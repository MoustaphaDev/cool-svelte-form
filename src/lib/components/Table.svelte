<script lang="ts">
	// import TestDisplayValues from './TestDisplayValues.svelte';
	export let items: { [k: string]: any }[];
	/**
	 * @var {array} tableHeadings
	 * Insert docs later
	 */
	export let tableHeadings: { [k: string]: string };
</script>

<!-- 
	@component
	Insert docs later
	
 -->
{#if items.length > 0}
	<!-- content here -->
	<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
		<table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
			<thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
				<tr>
					<th scope="col" class="px-6 py-3" />
					{#each Object.entries(tableHeadings) as [_, v]}
						<th scope="col" class="px-6 py-3">{v}</th>
					{/each}
				</tr>
			</thead>
			<tbody class="body">
				{#each items as item, i}
					{@const isLastElement = i === items.length - 1}
					<tr
						class="odd:dark:bg-gray-800 even:dark:bg-gray-700 odd:bg-white even:bg-gray-50{!isLastElement &&
							' border-b dark:border-gray-700'}"
					>
						<th
							scope="row"
							class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
							>{i + 1}</th
						>
						{#each Object.entries(tableHeadings) as [k]}
							<td class="px-6 py-4">{item[k]}</td>
						{/each}
						<!-- <td class="px-6 py-4">{person.nom}</td>
						<td class="px-6 py-4">{person.situationMatri}</td>
						<td class="px-6 py-4">{person.salaireNet}</td> -->
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{/if}

<!-- <TestDisplayValues {items} /> -->
