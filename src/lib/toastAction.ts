/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { toast as ModuleToast } from '@zerodevx/svelte-toast';
const success = (message: string) =>
	ModuleToast.push(message, {
		theme: {
			'--toastBackground': '#48BB78',
			'--toastBarBackground': '#2F855A'
		}
	});

const info = (message: string) =>
	ModuleToast.push(message, {
		theme: {
			'--toastBackground': '#00a6ff',
			'--toastBarBackground': '#0300c6'
		}
	});

const error = (message: string) =>
	ModuleToast.push(message, {
		theme: {
			'--toastBackground': '#F56565',
			'--toastBarBackground': '#C53030'
		}
	});

const warning = (message: string) =>
	ModuleToast.push(message, {
		// yellow: #FFC107
		theme: {
			'--toastBackground': '#ffb700',
			'--toastBarBackground': '#d79702'
		}
	});

const toast = { success, error, warning, info };
export { toast };
