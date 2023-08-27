<template>
  <div class="project-container">
    <div class="plus-icon">
      <PlusIcon />
    </div>
    <div class="project-info">
      <div class="project-name">
        新建{{what}}
      </div>
    </div>
  </div>
</template>

<script>
import PlusIcon from '../../Svg/PlusIcon.vue'
export default {
  name: 'NewProject',
  components: { PlusIcon },
  props: {
    what: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.project-container {
  width: 240px;
  height: 230px;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 0 5px lightgrey;
  margin: 15px;
  /* margin-right: 25px; */
  cursor: pointer;

  transition: 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.project-container:hover {
  transform: translate(-2px, -2px) scale(1.02);
  box-shadow: 0 0 5px grey;
}

.plus-icon {
  width: 140px;
  height: 140px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  padding: 5px;
  padding-top: 20px;
  /* border: 5px dashed lightgrey; */
}

img {
  display: block;
  margin: 0 auto;
  width: 200px;
  height: 150px;
}

.project-info {
  width: 200px;
  margin: 0 auto;
  /* margin-top: 10px; */
}

.project-name {
  color: rgba(199, 29, 35, 1);
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  padding-top: 10px;
}

.project-creator {
  margin: 5px 0;  
  color: grey
}

.project-time {
  font-size: 14px;
  color: lightgrey;
}
</style>