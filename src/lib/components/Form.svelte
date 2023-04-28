<script lang="ts">
	import RightArrow from '$lib/icons/RightArrowIcon.svelte';
	import { toast } from '$lib/toastAction';
	import type { InputHandler } from '$lib/types';
	import { createEventDispatcher } from 'svelte';
	import ReadonlyField from './ReadonlyField.svelte';
	import Select from './Select.svelte';
	// import TestDisplayValues from './TestDisplayValues.svelte';
	import TextField from './TextField.svelte';
	import Tooltip from './Tooltip.svelte';
	const dispatch = createEventDispatcher();

	let classRoom: string;
	let prenom = '';
	let nom = '';
	let noteSemestre1: number;
	let noteSemestre2: number;
	let decision: string;
	let moyenneGenerale: number;

	$: isSM1Set = Number(noteSemestre1) > 0;
	$: isSM2Set = Number(noteSemestre2) > 0;
	$: isClassroomSet = classRoom !== 'none';
	$: isFormValid =
		isSM1Set && isSM2Set && isClassroomSet && classRoom !== 'none' && prenom !== '' && nom !== '';

	$: departement =
		classRoom === 'GL' || classRoom === 'IAGE'
			? 'Génie logiciel'
			: classRoom === 'RT' || classRoom === 'RI'
			? 'Réseaux'
			: '';

	const handleSemestreInput: InputHandler = (event) => {
		const inputEl = event.target as HTMLInputElement;
		inputEl.value = inputEl.value.replace(/[^0-9.]/g, '');
		// @ts-ignore
		salaireBase = inputEl.value;
		if (Number(inputEl.value) >= 20 && Number(inputEl.value) <= 0)
			toast.error('Erreur sur les notes');
	};

	const setMoyenneGenerale = (isUpdate?: boolean) => {
		if (!isSM1Set || !isSM2Set) return toast.warning('Formulaire incomplet');

		moyenneGenerale = Number(((Number(noteSemestre1) + Number(noteSemestre2)) / 2).toFixed(2));
		decision = moyenneGenerale >= 10 ? 'Session validée' : 'Session de rattrapage';
		!isUpdate && toast.info('Moyenne calculée!');
	};

	const addPerson = () => {
		if (isFormValid) {
			toast.success('Nouvelle personne ajoutéé!');

			// setPrime(true);
			dispatch('addPerson', {
				classRoom,
				prenom,
				nom,
				moyenneGenerale,
				decision
			});

			// departement = 'none';
			// prenom = '';
			// nom = '';
			// situationMatri = 'none';
			// // @ts-ignore
			// prime = '';
			// // @ts-ignore
			// salaireBase = '';
			// // @ts-ignore
			// salaireNet = '';
			return;
		}
		toast.error('Formulaire invalide!');
		// dispatch("error", "Formulaire invalide");
	};

	const classRoomList = [
		{ value: 'GL', text: 'GL' },
		{ value: 'RT', text: 'RT' },
		{ value: 'RI', text: 'RI' },
		{ value: 'IAGE', text: 'IAGE' }
	];
	const martialStatusesList = [
		{ value: 'celib', text: 'Celibataire' },
		{ value: 'marie', text: 'Marié(e)' },
		{ value: 'veuf', text: 'Veuf' }
	];
</script>

<section
	class="mx-auto max-w-[450px] shadow-around px-10 py-20 bg-white dark:bg-gray-900  rounded-xl mb-20 mt-20 space-y-10"
>
	<h1 class="block mb-4 text-2xl font-medium text-gray-900 dark:text-gray-300">Etudiant</h1>
	<TextField id="prenom" bind:value={prenom} label="Prenom" name="prenom" />
	<TextField id="nom" bind:value={nom} label="Nom" name="nom" />
	<div>
		<Select
			id="classeRoom"
			bind:value={classRoom}
			label="Classe"
			defaultOptionText="Choix classe"
			options={classRoomList}
		/>
	</div>
	<ReadonlyField
		label="Département"
		id="departement"
		placeholder="Non calculé"
		value={departement}
	/>
	<h1 class="block mb-4 text-2xl font-medium text-gray-900 dark:text-gray-300">Moyenne</h1>
	<TextField
		id="semestre-1"
		label="Semestre 1"
		name="semestre-1"
		bind:value={noteSemestre1}
		onInput={(e) => handleSemestreInput(e)}
	/>
	<TextField
		id="semestre-2"
		label="Semestre 2"
		name="semestre-2"
		bind:value={noteSemestre2}
		onInput={(e) => handleSemestreInput(e)}
	/>
	<ReadonlyField
		label="Moyenne Générale"
		id="moyenne-generale"
		placeholder="Non calculée"
		value={moyenneGenerale}
	/>
	<div class="w-full">
		<button
			type="button"
			on:click={() => setMoyenneGenerale()}
			data-tooltip-target="calculer"
			class="mx-auto block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 border border-blue-700"
		>
			<Tooltip id="calculer" text="Calculer" />
			<RightArrow />
		</button>
	</div>
	<ReadonlyField label="Décision" id="decision" placeholder="Non définie" value={decision} />
	<div class="w-full">
		<button
			type="button"
			on:click={() => addPerson()}
			data-tooltip-target="enregistrer"
			class="mx-auto block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 border border-blue-700"
		>
			<Tooltip id="enregistrer" text="Enregistrer" />
			<RightArrow />
		</button>
	</div>
	<!-- <div class="flex items-end mb-3">
		<ReadonlyField label="Prime" value={prime ?? ''} placeholder="Non Calculé" id="prime" />
		<div class="revue-form-actions">
			<Tooltip id="calculer-prime" text="Calculer prime" />
			<button
				data-tooltip-target="calculer-prime"
				type="button"
				class="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800"
				on:click={() => setPrime()}
			>
				<RightArrow />
			</button>
		</div>
	</div>

	<div class="flex items-end mb-3">
		<ReadonlyField
			id="salaireNet"
			value={salaireNet}
			label="Salaire net"
			placeholder="Non Calculé"
		/>
		<button
			type="button"
			on:click={addPerson}
			data-tooltip-target="valider"
			class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 border border-blue-700"
		>
			<Tooltip id="valider" text="Valider" />
			<RightArrow />
		</button>
	</div> -->
	<!-- <TestDisplayValues
		items={[
			{ text: 'Departement', value: departement },
			{ text: 'Prenom', value: prenom },
			{ text: 'Nom', value: nom },
			{ text: 'Salaire base', value: salaireBase },
			{ text: 'Situation matrimoniale', value: situationMatri },
			{ text: 'Prime', value: prime },
			{ text: 'Salaire Net', value: salaireNet }
		]}
	/> -->
</section>
