<script lang="ts">
	export let label = '';
</script>

<label class="toggle">
	<input on:change type="checkbox" />
	<span class="slider" />
	{label}
</label>

<style>
  .toggle {
    cursor: pointer;
    display: flex;
    align-items: center;
  }

	.slider {
		border-radius: 32px;
		transition: 0.4s;
		background-color: #7d8491;
		position: relative;
    width: 48px;
    height: 24px;
    display: inline-block;
    margin-right: 8px;
	}

	.slider::before {
		content: '';
		width: 16px;
		height: 16px;
		position: absolute;
		top: 4px;
		left: 6px;
		background-color: #fef3e6;
		border-radius: 32px;
		transition: 0.4s;
	}

  input:checked + .slider {
    background-color: #5ac4c7
  }

  input:checked + .slider::before {
    left: 26px;
  }
</style>
