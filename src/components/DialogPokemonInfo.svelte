<script lang="ts">
	import { jump } from "./jump";

	// provided by <Modals />
	export let isOpen: boolean;

	export let pokemon: any;
</script>

{#if isOpen}
	<div role="dialog" class="modal" transition:jump>
		<section class="contents">
			<h1>{pokemon.name}</h1>
			<article>
        <h1>Caught in</h1>
        <p>{new Date(pokemon.created_at).toLocaleDateString()}</p>
      </article>
      <article>
        <h1>Original User</h1>
        <p>{pokemon.original_user}</p>
      </article>
      <article>
        <h1>User</h1>
        <p>{pokemon.user}</p>
      </article>
    </section>
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
	}

  article {
    margin-bottom: 16px;
  }

  article h1 {
    font-size: 14px;
    margin: 0;
  }
</style>
