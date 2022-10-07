<script>
	import './styles.css';
	import { Modals, closeModal } from 'svelte-modals';
	import { fade } from 'svelte/transition';
</script>

<slot />

<Modals>
	<div slot="backdrop" transition:fade={{ duration: 300 }} class="backdrop" on:click={closeModal} />
</Modals>

<style>
	.backdrop {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.5);
	} 
</style>
