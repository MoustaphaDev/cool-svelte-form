<script script lang="ts">
	import { SvelteToast, type SvelteToastOptions } from '@zerodevx/svelte-toast';
	import NProgress from 'nprogress';
	import { navigating } from '$app/stores';

	import 'flowbite/dist/flowbite.css';
	import '../app.css';
	// NProgress css
	import 'nprogress/nprogress.css';
	import DarkModeSwitcher from '$lib/components/DarkModeSwitcher.svelte';

	NProgress.configure({
		// Full list: https://github.com/rstacruz/nprogress#configuration
		minimum: 0.16,
		easing: 'linear',
		speed: 500,
		trickle: true,
		trickleRate: 0.05,
		trickleSpeed: 500,
		container: '#divContainer',
		renderOnInit: true,
		removeOnFinish: false,
		startOnInit: true
	});

	$: {
		if ($navigating) {
			NProgress.start();
		}
		if (!$navigating) {
			NProgress.done();
		}
	}

	// Optionally set default options here
	const options: SvelteToastOptions = {
		pausable: true,
		theme: {}
	};
</script>

<main>
	<SvelteToast {options} />
	<slot />
</main>
<div class="dark:bg-gray-900 shadow-around px-4 py-4 rounded-2xl fixed top-5 left-5 w-fit h-fit">
	<DarkModeSwitcher />
</div>
<svelte:head>
	<script>
		// On page load or when changing themes, best to add inline in `head` to avoid FOUC
		if (
			localStorage.getItem('color-theme') === 'dark' ||
			(!('color-theme' in localStorage) &&
				window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	</script>
	<style>
		@import url('https://fonts.googleapis.com/css2?family=Dosis:wght@300;400;500;600;700;800&display=swap');
		html {
			overflow-x: hidden;
		}
	</style>
</svelte:head>
