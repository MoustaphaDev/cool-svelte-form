type EventHandler<
	E extends Event = Event,
	T extends EventTarget = HTMLElement
> = svelte.JSX.EventHandler<E, T>;
type FormEventHandler<T extends EventTarget> = EventHandler<Event, T>;

export type InputHandler = FormEventHandler<HTMLInputElement>;
export type Person = {
	departement: string;
	prenom: string;
	nom: string;
	situationMatri: string;
	prime: number;
	salaireNet: number;
};
