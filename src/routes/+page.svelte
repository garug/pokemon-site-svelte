<script lang="ts">
	import axios from 'axios';
	import { openModal } from 'svelte-modals';
	import { env } from "$env/dynamic/public";

	import Modal from '../components/DialogPokemon.svelte';
	import DialogPokemonInfo from '../components/DialogPokemonInfo.svelte';
	import Toggle from '../components/Toggle.svelte';

	let pokemon: any[] = [];

	let totalElements = 0;

	$: lastPage = Math.max(1, Number((totalElements / 10).toFixed(0)));

	let pagination = {
		page: 1,
		shiny: false,
		search: '',
		user: ''
	};

	type PaginationProperties = keyof typeof pagination;

	let loading = false;

	let timer: NodeJS.Timeout;

	function debounceSearch<T extends PaginationProperties>(
		key: T,
		value: typeof pagination[T],
		time = 500
	) {
		clearTimeout(timer);
		timer = setTimeout(() => {
			pagination.page = 1;
			pagination[key] = value;
		}, time);
	}

	async function copyId(id: string) {
		try {
			navigator.clipboard.writeText(id);
		} catch (err) {
			console.error('Could not copy text:', err);
		}
	}

	$: {
		loading = true;

		const params = new URLSearchParams({
			page: String(pagination.page),
			name: pagination.search,
			user: pagination.user,
			shiny: String(pagination.shiny)
		});

		axios
			.get(`${env.PUBLIC_API_KEY}/pokemon?${params.toString()}`)
			.then((response) => {
				totalElements = Number(response.headers['pagination-count']);
				pokemon = response.data;
			})
			.catch((e) => console.error('error on request'))
			.finally(() => (loading = false));
	}
</script>

<main class="page">
	<section class="filters">
		<h1>Filters</h1>
		<form class="filter-form">
			<input
				on:keyup={({ currentTarget: { value } }) => debounceSearch('search', value)}
				type="text"
				placeholder="Species"
			/>
			<input
				on:keyup={({ currentTarget: { value } }) => debounceSearch('user', value)}
				type="text"
				placeholder="User"
			/>
			<Toggle on:change={({ currentTarget: { checked } }) => debounceSearch('shiny', checked, 0)} label="Shiny?"/>
		</form>
	</section>
	<section class="result">
		{#if loading}
			<p>Loading</p>
		{:else}
			<table class="result-table">
				<thead>
					<tr>
						<th>ID</th>
						<th />
						<th>Power</th>
						<th>Species</th>
						<th>Dex Nº</th>
						<th>Marks</th>
					</tr>
				</thead>
				<tbody>
					{#each pokemon as poke}
						<tr
							class="pokemon-line"
							on:click={() => openModal(DialogPokemonInfo, { pokemon: poke })}
						>
							<td>
								{poke.id}
								<button class="small" on:click={() => copyId(poke.id)}>copy</button></td
							>
							<td class="pokemon-icon">
								<img
									src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/${poke.id_dex}.png`}
									alt={`Icon of ${poke.name}`}
								/>
							</td>
							<td>
								{poke.total.toFixed(0)}
								<button
									class="small"
									on:click|stopPropagation={() => openModal(Modal, { pokemon: poke })}
								>
									i
								</button>
							</td>
							<td>{poke.name}</td>
							<td>{poke.id_dex}</td>
							<td>
								{#if poke.marks?.shiny}✨{/if}
							</td>
						</tr>
					{/each}
				</tbody>
				<tr />
			</table>
			<div class="pagination">
				<p class="pagination-info">
					{pagination.page * 10 - 9} - {Math.min(pagination.page * 10, totalElements)} of {totalElements}
				</p>
				<button disabled={pagination.page === 1} on:click={() => debounceSearch('page', 1, 0)}
					>first</button
				>
				<button
					disabled={pagination.page === 1}
					on:click={() => debounceSearch('page', pagination.page - 1, 0)}>prev</button
				>
				<button
					disabled={pagination.page === lastPage}
					on:click={() => debounceSearch('page', pagination.page + 1, 0)}>next</button
				>
				<button
					disabled={pagination.page === lastPage}
					on:click={() => debounceSearch('page', lastPage, 0)}>last</button
				>
			</div>
		{/if}
	</section>
</main>

<style>
	/* Table */
	table {
		width: 100%;
	}

	th,
	td {
		padding: 8px;
	}

	tbody tr:not(:last-child) {
		border-bottom: 1px solid #282b37;
	}

	thead tr {
		border-bottom: 4px solid #282b37;
	}

	/* Form */
	input[type='text'] {
		padding: 8px 16px;
		border-radius: 8px;
		background: #282b37;
	}

	.page {
		flex-wrap: wrap;
	}

	/* Filters */
	.filters {
		width: 300px;
		margin-bottom: 32px;
	}

	.filter-form {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	/* Result */
	.result-table {
		margin-bottom: 16px;
		vertical-align: middle;
	}

	.result-table td {
		vertical-align: middle;
	}

	.result {
		flex-grow: 1;
	}

	.pokemon-icon {
		padding-left: 0;
		padding-right: 0;
	}

	.pokemon-icon img {
		width: 68px;
		height: 56px;
		object-fit: cover;
	}

	.pokemon-line:hover {
		cursor: pointer;
		background: rgba(0, 0, 0, 0.1);
	}

	.pagination {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 8px;
	}
</style>
