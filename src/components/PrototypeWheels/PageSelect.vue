<template>
	<div 
		v-for="page in pages"
		:key="page.id"
		@click="select(page.id)"
	>
	{{ page.name }}
	</div>
</template>
<script>
export default {
  data() {
    return {
			projectId: '',
			pages: []
    }
  },
	mounted() {
		this.projectId = this.$route.params.projectId
		this.$http.get(`/api/projects/page/${this.projectId}/list/`).then((response) => {
			this.pages = response.data
		})
	},
	methods: {
		select(id) {
			this.$router.replace(`/projects/${this.projectId}/page/${id}`)
		}
	}
}
</script>
<style>

</style>