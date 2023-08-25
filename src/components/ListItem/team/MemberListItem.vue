<template>
  <div class="member-container">
    <img :src="data.avatar" />
    <div class="member-info">
      <div class="member-info-basic">
        <div class="member-info-username">
          {{ data.username }}
        </div>
        <div class="member-info-realname">
          {{ data.lastname }}{{ data.firstname }}
        </div>
        <div class="member-info-identity">
          {{ data.identity }}
        </div>
      </div>
      <div class="member-info-profile">
        {{ data.profile }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MemberListItem',
  props: ['data']
}
</script>

<style scoped>
.member-container {
  width: 340px;
  height: 100px;
  display: flex;
  align-items: center;
  margin: 10px;
  margin-bottom: 20px;
  box-shadow: 1px 1px 5px lightgrey;
  border-radius: 10px;
  transition: 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
  padding-left: 5px;
}
.member-container:hover {
  box-shadow: 1px 1px 5px grey;
  transform: translate(-2px, -2px) scale(1.02);
}

img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}

.member-info {
  margin-left: 10px;
}

.member-info-basic {
  display: flex;
  align-items: baseline;
  padding-top: 5px;
}

.member-info-username {
  max-width: 140px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 20px;
  font-weight: bold;
}

.member-info-realname {
  max-width: 48px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 12px;
  margin-left: 3px;
  color: grey;
}

.member-info-identity {
  align-self: flex-end;
  padding: 5px;
  margin-left: 20px;
  background-color: grey;
  color: white;
  font-size: 14px;
  border-radius: 5px; 
}

.member-info-profile {
  width: 250px;
  margin-top: 10px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>