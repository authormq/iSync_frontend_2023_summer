<!-- 聊天详情页 -->
<template>
  <div>
    <vue-advanced-chat
			height="calc(100vh - 20px)"
			:current-user-id="currentUserId"
			:rooms="JSON.stringify(rooms)"
			:rooms-loaded="true"
			:messages="JSON.stringify(messages)"
			:messages-loaded="messagesLoaded"
			@send-message="sendMessage($event.detail[0])"
			@fetch-messages="fetchMessages($event.detail[0])"
		/>
  </div>
</template>

<script>
import { register } from 'vue-advanced-chat'
register()
export default {
  name: 'ChatView',
	mounted() {
		this.currentUserId = this.$cookies.get('user_id')
		this.$http.get('/api/groups/list_by_team_id/', {params: {team_id: 1}}).then((response) => {
			this.rooms = response.data.map((group) => ({
				roomId: group.id,
				roomName: group.name,
				avatar: group.avatar,
				users: group.members.map((member) => ({
					_id: `${member.user.id}`,
					username: member.user.username
				}))
			}))
			for (let i = 0; i < this.rooms.length; i++) {
				this.ws[i] = new WebSocket(`ws://43.138.14.231:9000/ws/chat/group/${this.rooms[i].roomId}/${this.currentUserId}/`)
				this.ws[i].onmessage = (messageEvent) => {
					const data = JSON.parse(messageEvent.data)
					const message = data.message
					this.messages = [
						...this.messages,
						{
							_id: this.messages.length,
							content: message.text_content,
							senderId: `${message.sender.user.id}`,
							username: message.sender.user.username,
							avatar: message.sender.user.avatar,
							timestamp: message.create_datetime.substring(11, 16).replace('-', ':'),
							date: message.create_datetime.substring(5, 10).replace('-', ':')
						}
					]
				}
			}
		})
	},
	unmounted() {
		for (let i = 0; i < this.ws.length; i++) {
			this.ws[i].close()
		}
	},
  data() {
    return {
			ws: [],
      currentUserId: '',
      rooms: [],
      messages: [],
      messagesLoaded: false
    }
  },
  methods: {
		fetchMessages({ options = {} }) {
			setTimeout(() => {
				// if (options.reset) {
				// 	this.messages = this.addMessages(true)
				// } else {
				// 	this.messages = [...this.addMessages(), ...this.messages]
				// 	this.messagesLoaded = true
				// }
				this.$http.get('/api/groups/8/messages/').then((response) => {
					this.messages = response.data.map((message) => ({
						_id: this.messages.length,
						content: message.text_content,
						senderId: `${message.sender.user.id}`,
						username: message.sender.user.username,
						avatar: message.sender.user.avatar,
						seen: true,
						timestamp: message.create_datetime.substring(11, 16).replace('-', ':'),
						date: message.create_datetime.substring(5, 10).replace('-', ':')
					}))
					this.messagesLoaded = true
				})
			})
		},

		sendMessage(message) {
			this.ws.send(JSON.stringify({
				'text_content': message.content,
				'mentioned_user_id': 1,
				'mentioned_all': false
			}))
		},
	}
}
</script>

<style scoped>
body {
	font-family: 'Quicksand', sans-serif;
}

</style>