<template>
  <!-- 默认状态的文档卡片 -->
  <div class="page-container">
    <div>这里放一个文件图标</div>
    <div class="page-info">
      <div class="page-name">
        <!-- {{ proto.name }} -->
        hhh
      </div>
      <button>删除</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageListItem',
  props: ['proto'],
}
</script>

<style scoped>
.page-container {
  width: 240px;
  height: 230px;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 0 5px lightgrey;
  margin: 15px;
  cursor: pointer;

  transition: 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.page-container:hover {
  transform: translate(-2px, -2px) scale(1.02);
  box-shadow: 0 0 5px grey;
}

img {
  display: block;
  margin: 0 auto;
  width: 200px;
  height: 150px;
}

.page-info {
  width: 200px;
  margin: 0 auto;
  margin-top: 10px;
}

.page-info input {
  display: none;
  width: 140px;
  height: 18px;
  border: 2px solid rgba(199, 29, 35, 1);
  caret-color: rgba(199, 29, 35, 1);
  font-size: 18px;
  padding: 5px;
  border-radius: 10px;
}

.page-name {
  color: rgba(199, 29, 35, 1);
  font-size: 20px;
  font-weight: bold;
  position: relative;
}

</style>