<!-- 聊天详情页 -->
<template>
	<div>
		<!-- <vue-advanced-chat -->
		<vue-advanced-chat ref="test" theme="light" :styles="JSON.stringify(style)" height="calc(100vh - 20px)"
			:current-user-id="currentUserId" :rooms="JSON.stringify(rooms)" :rooms-loaded="roomsLoaded"
			:messages="JSON.stringify(messages)" :messages-loaded="messagesLoaded" :custom-search-room-enabled="true"
			:show-add-room="false"
			@send-message="sendMessage($event.detail[0])" @fetch-messages="fetchMessages($event.detail[0])"
			@search-room="searchRoom($event.detail[0])" @open-file="openFile($event.detail[0])" />
	</div>
</template>

<script>
import { register } from 'vue-advanced-chat'
// import  ChatWindow  from 'vue-advanced-chat'
register()
export default {
	name: 'ChatView',
	// components: { ChatWindow },
	mounted() {
		this.currentUserId = this.$cookies.get('user_id')
		this.roomsLoaded = false
		this.$http.get('/api/groups/list_by_team_id/', { params: { team_id: this.$route.params.teamId } }).then((response) => {
			// rooms
			this.rooms = response.data.map((group) => ({
				index: this.rooms.length,
				roomId: group.id,
				roomName: group.is_private ? (
					group.members[0].user.id == this.currentUserId ? group.members[1].user.username : group.members[0].user.username
				) : group.name,
				avatar: group.is_private ? (
					group.members[0].user.id == this.currentUserId ? group.members[1].user.avatar : group.members[0].user.avatar
				) : group.avatar,
				users: group.members.map((member) => ({
					_id: `${member.user.id}`,
					username: member.user.username
				}))
			}))
			this.allRooms = this.rooms
			// @all && last_message
			for (let i = 0; i < this.rooms.length; i++) {
				this.$http.get(`/api/groups/${this.rooms[i].roomId}/current_user_identity/`).then((response) => {
					if (response.status == 200) {
						if (response.data.identity != 'member') {
							this.rooms[i].users = [
								{
									_id: '0',
									username: '所有人'
								},
								...this.rooms[i].users
							]
						}
					}
				})
				this.$http.get(`/api/groups/${this.rooms[i].roomId}/last_message/`).then((response) => {
					if (response.status == 200) {
						const message = response.data
						this.rooms[i].lastMessage = {
							_id: message.id,
							content: message.text_content,
							senderId: `${message.sender.user.id}`,
							username: message.sender.user.username,
							avatar: message.sender.user.avatar,
							timestamp: message.create_datetime.substring(11, 16).replace('-', ':'),
							date: message.create_datetime.substring(5, 10),
							new: false,
						}
					}
				})
				// WebSocket
				this.ws[i] = new WebSocket(`ws://43.138.14.231:9000/ws/chat/group/${this.rooms[i].roomId}/${this.currentUserId}/`)
				this.ws[i].onmessage = (messageEvent) => {
					const data = JSON.parse(messageEvent.data)
					const message = data.message
					this.rooms[i].lastMessage = {
						_id: message.id,
						content: message.text_content,
						senderId: `${message.sender.user.id}`,
						username: message.sender.user.username,
						avatar: message.sender.user.avatar,
						timestamp: message.create_datetime.substring(11, 16).replace('-', ':'),
						date: message.create_datetime.substring(5, 10),
						new: true,
						replyMessage: message.reply_message == null ? null : {
							_id: message.reply_message.id,
							content: message.reply_message.text_content,
							senderId: `${message.reply_message.sender.user.id}`,
							username: message.reply_message.sender.user.username,
							avatar: message.reply_message.sender.user.avatar,
							timestamp: message.reply_message.create_datetime.substring(11, 16).replace('-', ':'),
							date: message.reply_message.create_datetime.substring(5, 10),
							new: false,
						},
						files: message.file_content == null ? null : [{
							name: message.file_content.name.split('message_file_')[0],
							size: message.file_content.size,
							url: message.file_content.url,
							type: message.file_content.name.split('.')[1]
						}]
					}
					this.messages = [
						...this.messages,
						this.rooms[i].lastMessage
					]
					// @
					for (let j = 0; j < data.mentioned_users.length; j++) {
						if (data.mentioned_users[j]._id == this.currentUserId || data.mentioned_users[j]._id == '0') {
							let formData = new FormData()
							formData.append('group_message', message.id)
							formData.append('receiver', this.currentUserId)
							this.$http.post('/api/news/', formData).then(() => {
								this.$bus.emit('newMessage', message)
							})
							break
						}
					}
				}
			}
			this.roomsLoaded = true
		})
		// test
		// const style = document.createElement('style')
		// 	style.textContent = '.vac-chat-container { background: yellow; }'
		// 	this.$refs.test.shadowRoot.appendChild(style)
		// 	const newHTML = this.$refs.test.shadowRoot.innerHTML.replace('No room selected', '未选中')
		// 	this.$refs.test.shadowRoot.innerHTML = newHTML
	},
	// unmounted() {
	// 	for (let i = 0; i < this.ws.length; i++) {
	// 		this.ws[i].close()
	// 	}
	// },
	data() {
		return {
			ws: [],
			currentUserId: '',
			rooms: [],
			allRooms: [],
			roomsLoaded: false,
			messages: [],
			messagesLoaded: false
		}
	},
	methods: {
		fetchMessages({ room, options }) {
			this.messagesLoaded = false
			setTimeout(() => {
				this.messages = []
				this.$http.get(`/api/groups/${room.roomId}/messages/`).then((response) => {
					this.messages = response.data.map((message) => ({
						_id: message.id,
						content: message.text_content,
						senderId: `${message.sender.user.id}`,
						username: message.sender.user.username,
						avatar: message.sender.user.avatar,
						timestamp: message.create_datetime.substring(11, 16).replace('-', ':'),
						date: message.create_datetime.substring(5, 10),
						new: false,
						replyMessage: message.reply_message == null ? null : {
							_id: message.reply_message.id,
							content: message.reply_message.text_content,
							senderId: `${message.reply_message.sender.user.id}`,
							username: message.reply_message.sender.user.username,
							avatar: message.reply_message.sender.user.avatar,
							timestamp: message.reply_message.create_datetime.substring(11, 16).replace('-', ':'),
							date: message.reply_message.create_datetime.substring(5, 10),
							new: false,
						},
						files: message.file_content == null ? null : [{
							name: message.file_content.name.split('message_file_')[0],
							size: message.file_content.size,
							url: message.file_content.url,
							type: message.file_content.name.split('.')[1]
						}]
					}))
					this.messagesLoaded = true
				})
			})
		},

		sendMessage(message) {
			this.scrollToMessage(40)
			for (let i = 0; i < this.rooms.length; i++) {
				if (this.rooms[i].roomId == message.roomId) {
					if (message.files != null) {
						const reader = new FileReader()
						reader.onload = (event) => {
							this.ws[i].send(JSON.stringify({
								'text_content': message.content,
								'mentioned_users': message.usersTag,
								'reply_message': message.replyMessage,
								'file_content': event.target.result.split('base64,')[1],
								'file_name': message.files[0].name + '.' + message.files[0].extension
							}))
						}
						reader.readAsDataURL(message.files[0].blob)
					}
					else {
						this.ws[i].send(JSON.stringify({
							'text_content': message.content,
							'mentioned_users': message.usersTag,
							'reply_message': message.replyMessage,
							'file_content': null,
							'file_name': null
						}))
					}
					break
				}
			}
		},

		openFile({ message, file }) {
			if (file.action == 'download') {
				const a = document.createElement('a')
				a.style.display = 'none'
				a.download = file.file.name
				a.href = file.file.url
				a.click()
			}
		},

		searchRoom(event) {
			const tmpRooms = this.allRooms.filter(room => room.roomName.includes(event.value))
			if (tmpRooms.length != 0) {
				this.rooms = tmpRooms
			}
			else {
				this.rooms = this.allRooms
			}
		},

		scrollToMessage(messageId) {
			let i = 0
			for (; i < this.messages.length; i++) {
				if (this.messages[i].id == messageId) {
					break
				}
			}
			const target = document.getElementById(`\\${i + 1}`)
			console.log(target)
		}
	}
}
</script>

<style scoped>
body {
	font-family: 'Quicksand', sans-serif;
}
</style>