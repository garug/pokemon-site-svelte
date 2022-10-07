<script lang="ts">
	import { cubicInOut } from 'svelte/easing';
	import type { TransitionConfig } from 'svelte/transition';

	// provided by <Modals />
	export let isOpen: boolean;

	export let pokemon: any;

	function jump(_: Element): TransitionConfig {
		return {
			easing: cubicInOut,
			duration: 300,
			css: (t) => {
				const valor = 32;
				const translateY = valor - t * valor;
				return `transform: translateY(${translateY}px); opacity:${t}`;
			}
		};
	}
</script>

{#if isOpen}
	<div role="dialog" class="modal" transition:jump>
		<div class="contents">
			<h1>{pokemon.name}</h1>
			<div class="stats">
				<div>
					<h2>Natural</h2>
					<ul>
						<li>HP: {pokemon.attributes.hp.toFixed(0)}</li>
						<li>Attack: {pokemon.attributes.attack.toFixed(0)}</li>
						<li>defense: {pokemon.attributes.defense.toFixed(0)}</li>
						<li>Sp. Attack: {pokemon.attributes.sp_attack.toFixed(0)}</li>
						<li>Sp. defense: {pokemon.attributes.sp_defense.toFixed(0)}</li>
						<li>Speed: {pokemon.attributes.speed.toFixed(0)}</li>
					</ul>
				</div>

				<div>
					<h2>Trainings</h2>
					<ul>
						<li>HP: {pokemon.training.hp.toFixed(0)}</li>
						<li>Attack: {pokemon.training.attack.toFixed(0)}</li>
						<li>defense: {pokemon.training.defense.toFixed(0)}</li>
						<li>Sp. Attack: {pokemon.training.sp_attack.toFixed(0)}</li>
						<li>Sp. defense: {pokemon.training.sp_defense.toFixed(0)}</li>
						<li>Speed: {pokemon.training.speed.toFixed(0)}</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	.modal {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		display: flex;
		justify-content: center;
		align-items: center;

		/* allow click-through to backdrop */
		pointer-events: none;
	}

	.contents {
		background: #1a1e23;
		min-width: 240px;
		border-radius: 6px;
		padding: 16px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		pointer-events: auto;
	}

	h1 {
		text-align: center;
		font-size: 24px;
	}

	p {
		text-align: center;
		margin-top: 16px;
	}

	.stats {
		display: flex;
		gap: 8px;
	}
</style>
