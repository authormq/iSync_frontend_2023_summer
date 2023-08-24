<!-- 团队信息 -->
<template>
  <!-- 顶部盒子 -->
  <div class="top-box">
    <!-- 头像放左边 -->
    <div class="team-avatar">{{ teamAvatar }}</div>
    <!-- 基本信息放右边 -->
    <div class="top-right-box">
      <div class="team-name">团队名称：{{ teamName }}</div><input type="text">
      <div class="team-founder">团队创建者：{{ teamFounder }}</div><input type="text">
      <div class="team-found-time">团队创建时间：{{ teamFoundTime }}</div><input type="text">
    </div>
  </div>
  <!-- 中部盒子 -->
  <div class="middle-box">
    <!-- 左边显示团队人数 -->
    <div class="team-population">
      <div>团队人数</div>
      <div>{{ teamPopulation }}</div>
    </div>
    <!-- 右边显示团队项目数 -->
    <div class="team-project-count">
      <div>团队项目数</div>
      <div>{{ teamProjectCount }}</div>
    </div>
  </div>
  <!-- 下方盒子 -->
  <div class="bottom-box">
    <div>团队简介</div>
    <div class="team-introduction">{{ teamIntroduction }}</div>
  </div>
</template>

<script>
export default {
  name: 'InfoView',
  data() {
    return {
      teamAvatar: '/src/assets/3.jpg',
      teamName: '这是团队名称',
      teamFounder: '这是团队创建者',
      teamFoundTime: '这是团队创建时间',
      teamPopulation: '这是团队人数',
      teamProjectCount: '这是团队项目数',
      teamIntroduction:'这是团队简介'
    }
  }
}
</script>

<style scoped></style>