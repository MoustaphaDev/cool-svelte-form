<script context="module" lang="ts">
	export const prerender = false;
</script>

<script lang="ts">
	import Form from '$lib/components/Form.svelte';
	import Table from '$lib/components/Table.svelte';
	import type { Person } from '$lib/types';

	let personList: Person[] = [];
	const addPerson = (event: CustomEvent<Person>) => {
		personList = [...personList, event.detail];
	};
	const tableHeadings = {
		prenom: 'Prenom',
		nom: 'Nom',
		classRoom: 'Classe',
		moyenneGenerale: 'Moyenne generale',
		decision: 'Decision'
	};
	let unique = [{}]; // every {} is unique, {} === {} evaluates to false

	function restart() {
		unique = [{}];
	}
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Devoir JS" />
</svelte:head>

<div class="w-[min(90%,1024px)] mx-auto mb-20">
	{#each unique as key (key)}
		<Form
			on:addPerson={(e) => {
				addPerson(e);
				restart();
			}}
		/>
	{/each}
	<Table items={personList} {tableHeadings} />
</div>
