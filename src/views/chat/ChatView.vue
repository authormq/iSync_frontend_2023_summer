<!-- 聊天详情页 -->
<template>
	<div>
		<!-- <vue-advanced-chat -->
		<vue-advanced-chat ref="chat" theme="light" height="calc(100vh - 90px)" :styles="JSON.stringify(styles)"
			:current-user-id="currentUserId" :rooms="JSON.stringify(rooms)" :rooms-loaded="roomsLoaded"
			:messages="JSON.stringify(messages)" :messages-loaded="messagesLoaded" :custom-search-room-enabled="true"
			:room-info-enabled="true" :message-selection-actions="JSON.stringify(messageSelectionActions)"
			@send-message="sendMessage($event.detail[0])" @fetch-messages="fetchMessages($event.detail[0])"
			@search-room="searchRoom($event.detail[0])" @open-file="openFile($event.detail[0])" @add-room="addRoom"
			@message-selection-action-handler="messageSelectionActionHandler($event.detail[0])">
			<!-- <div v-for="(message, index) in messages" :slot="'message_' + message._id" :key="index">
 				<div>hahaha{{ message.content }}</div>
			</div> -->
		</vue-advanced-chat>
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
		this.$http.get(`/api/groups/list_by_team_id/?team_id=${this.$route.params.teamId}`).then((response) => {
			// rooms
			this.rooms = response.data.map((group, index) => ({
				index: -index,
				roomId: group.id,
				roomName: group.is_private ? (
					group.members[0].user.id == this.currentUserId ? group.members[1].user.username : group.members[0].user.username
				) : group.name,
				avatar: group.is_private ? (
					group.members[0].user.id == this.currentUserId ? group.members[1].user.avatar : group.members[0].user.avatar
				) : group.avatar,
				unreadCount: group.unreadCount,
				users: group.members.map((member) => ({
					_id: `${member.user.id}`,
					username: member.user.username
				})),
				lastMessage: group.lastMessage == null ? null : {
					_id: group.lastMessage.id,
					content: group.lastMessage.text_content,
					senderId: `${group.lastMessage.sender.user.id}`,
					username: group.lastMessage.sender.user.username,
					avatar: group.lastMessage.sender.user.avatar,
					timestamp: group.lastMessage.create_datetime.substring(11, 16),
					date: group.lastMessage.create_datetime.substring(5, 10),
					new: false,
				}
			}))
			if (this.rooms.length > 0) {
				this.currentRoomId = this.rooms[0].roomId
			}
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
						timestamp: message.create_datetime.substring(11, 16),
						date: message.create_datetime.substring(5, 10),
						new: false,
						replyMessage: message.reply_message == null ? null : {
							_id: message.reply_message.id,
							content: message.reply_message.text_content,
							senderId: `${message.reply_message.sender.user.id}`,
							username: message.reply_message.sender.user.username,
							avatar: message.reply_message.sender.user.avatar,
							timestamp: message.reply_message.create_datetime.substring(11, 16),
							date: message.reply_message.create_datetime.substring(5, 10),
							new: false,
						},
						files: message.file_content == null ? null : [{
							name: message.file_content.name.split('message/file/')[1],
							size: message.file_content.size,
							url: message.file_content.url,
							type: message.file_content.name.split('.')[1]
						}]
					}
					if (this.currentRoomId != this.rooms[i].roomId) {
						this.rooms[i].unreadCount++
					}
					else {
						this.$http.post(`/api/groups/${this.currentRoomId}/messages/read_all/`)
						this.messages = [
							...this.messages,
							this.rooms[i].lastMessage
						]
					}
					for (let j = 0; j < this.rooms.length; j++) {
						if (this.rooms[j].index > this.rooms[i].index) {
							this.rooms[j].index--
						}
					}
					this.rooms[i].index = 0
					// @
					for (let j = 0; j < data.mentioned_users.length; j++) {
						if (data.mentioned_users[j]._id == this.currentUserId || data.mentioned_users[j]._id == '0') {
							let formData = new FormData()
							formData.append('group_message', message.id)
							formData.append('receiver', this.currentUserId)
							formData.append('sender', parseInt(message.sender.user.id))
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
		const style = document.createElement('style')
		style.textContent = `
			/* 鼠标悬浮于消息时的操作选项 */
			.vac-options-container {
				/*display: none !important;*/
			}

			.vac-format-message-wrapper {
				padding-right: 40px !important;
			}

			/* 左上角搜索框 */
			.vac-box-search input {
				caret-color: rgba(199,29,35, 1) !important;
			}
			.vac-box-search input::placeholder {
				color: rgba(0,0,0,0) !important;
			}

			/* 列表房间名称 */
			.vac-room-name.vac-text-ellipsis {
				color: rgba(199,29,35, 1) !important;
			}

			/* 聊天室日期显示 */
			.vac-card-info.vac-card-date {
				background: rgba(199,29,35, 0.1) !important;
			}

			/* 聊天室顶部 聊天开始时间 */
			.vac-text-started {
				display: none !important;
			}

			/* “新消息”提示 */ 
			.vac-line-new {
				display: none !important;
			}

			/* 设置聊天室顶部 padding */
			.vac-messages-container {
				padding-top: 20px !important;
			}

			/* 发消息的 textarea */
			.vac-box-footer.vac-box-footer-border textarea {
				caret-color: rgba(199,29,35, 1) !important;
			}
			.vac-box-footer.vac-box-footer-border textarea::placeholder {
				color: rgba(0,0,0,0) !important;
			}

			/* @ 别人的消息颜色 */
			.vac-text-tag {
				color: rgba(199,29,35, 1) !important;
				font-weight: bold !important;
			}

			/* 编辑自己的消息、致使输入框有 outline */
			.vac-textarea-outline {
				border: 0 !important;
				box-shadow: none !important;
				outline: 3px solid rgba(199,29,35, 1) !important;
			}

			/* 选中消息时的 emoji（没效果） */
			.vac-emoji-reaction {
				display: none !important;
			}

			/* 选中消息的小 icon 及其容器 */
			.vac-options-container {
				width: 30px !important;
			}
			.vac-blur-container {
				width: 30px; !important;
				background: transparent !important;
			}
			
			/* 点击消息弹出菜单 */
			.vac-menu-options {
				box-shadow: 3px 3px 10px grey !important;
				color: rgba(199,29,35, 1) !important;
				font-size: 16px !important;
				font-weight: bold !important;
			}

			/* 搜索框右边的加号 */
			.vac-add-icon {
				// display: none !important;
			}

			/* 新消息的提醒颜色*/
			.vac-badge-counter.vac-room-badge {
				background: rgba(199,29,35, 1) !important;
			}

			/* 左侧列表的消息 */
			.vac-text-ellipsis {
				font-weight: 500 !important;
				color: #67717a !important;
			}
		`
		
		
		
		this.$refs.chat.shadowRoot.appendChild(style)
		// const newHTML = this.$refs.chat.shadowRoot.innerHTML.replace('placeholder="Search"', 'placeholder="检索"')
		// console.log(newHTML)
		// setTimeout(() => {
		// 	console.log('index: ', this.$refs.chat.shadowRoot.innerHTML.indexOf('Conversation started on: 08-28'))
		// }, 1000)
		// console.log('index: ', this.$refs.chat.shadowRoot.innerHTML.indexOf('Conversation started on: 08-28'))

		document.addEventListener('click', this.changeStyle)
	},
	beforeUnmount() {
		document.removeEventListener('click', this.changeStyle)
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
			currentRoomId: '',
			rooms: [],
			allRooms: [],
			roomsLoaded: false,
			messages: [],
			messagesLoaded: false,
			messageSelectionActions: [
				{
					name: 'forwardItemByItem',
					title: '逐条转发'
				},
				{
					name: 'forwardCombined',
					title: '合并转发'
				}
			],
			styles: {
				sidemenu: {
					backgroundActive: 'rgba(199,29,35, 0.2)'
				},
				message: {
					background: '#fff',
					backgroundMe: 'rgba(199,29,35, 0.2)',
				},
				icons: {
					search: 'rgba(199,29,35, 1)',
					add: 'rgba(199,29,35, 1)',
					toggle: 'rgba(199,29,35, 1)',
					menu: '#0a0a0a',
					close: 'rgba(199,29,35, 1)',
					closeImage: 'rgba(199,29,35, 1)',
					file: 'rgba(199,29,35, 1)',
					paperclip: 'rgba(199,29,35, 1)',
					closeOutline: 'rgba(199,29,35, 1)',
					closePreview: 'rgba(199,29,35, 1)',
					send: 'rgba(199,29,35, 1)',
					sendDisabled: '#9ca6af',
					emoji: 'rgba(199,29,35, 1)',
					emojiReaction: 'rgba(0, 0, 0, 0.3)',
					document: 'rgba(199,29,35, 1)',
					pencil: '#9e9e9e',
					checkmark: '#9e9e9e',
					checkmarkSeen: '#0696c7',
					eye: '#fff',
					dropdownMessage: '#fff',
					dropdownMessageBackground: 'rgba(0, 0, 0, 0.25)',
					dropdownRoom: '#9e9e9e',
					dropdownScroll: '#0a0a0a',
					microphone: 'rgba(199,29,35, 1)',
					audioPlay: '#455247',
					audioPause: '#455247',
					audioCancel: '#eb4034',
					audioConfirm: '#1ba65b'
				},
				header: {
					background: '#fff',
					colorRoomName: 'rgba(199,29,35, 1)',
					colorRoomInfo: '#9ca6af'
				},
			}
		}
	},
	methods: {
		// 改变列表样式的回调
		changeStyle () {
			let doc = null
			if (this.$refs.chat) {
				doc = this.$refs.chat.shadowRoot
			}
			let list = doc.querySelector('.vac-menu-list')
			if (list) {
				if (list.children.length === 2) {
					list.children[0].children[0].innerHTML = '引用'
					list.children[1].children[0].innerHTML = '多选'
					// list.children[1].style.display = 'none'
				} else if (list.children.length === 4) {
					list.children[0].children[0].innerHTML = '引用'
					list.children[1].children[0].innerHTML = '编辑'
					list.children[3].children[0].innerHTML = '多选'
					list.children[2].style.display = 'none'
					// list.children[3].style.display = 'none'
				}
			}
		},

		fetchMessages({ room, options = {} }) {
			this.currentRoomId = room.roomId
			const offset = options.reset ? 0 : this.messages.length
			if (options.reset) {
				this.messagesLoaded = false
				for (let i = 0; i < this.rooms.length; i++) {
					if (this.rooms[i].roomId == room.roomId) {
						this.rooms[i].unreadCount = 0
						break
					}
				}
			}
			this.$http.get(`/api/groups/${room.roomId}/messages/?limit=30&offset=${offset}`).then((response) => {
				if (response.data.results.length == 0) {
					this.messagesLoaded = true
					return
				}
				const messages = response.data.results.map((message) => ({
					_id: message.id,
					content: message.text_content,
					senderId: `${message.sender.user.id}`,
					username: message.sender.user.username,
					avatar: message.sender.user.avatar,
					timestamp: message.create_datetime.substring(11, 16),
					date: message.create_datetime.substring(5, 10),
					new: false,
					replyMessage: message.reply_message == null ? null : {
						_id: message.reply_message.id,
						content: message.reply_message.text_content,
						senderId: `${message.reply_message.sender.user.id}`,
						username: message.reply_message.sender.user.username,
						avatar: message.reply_message.sender.user.avatar,
						timestamp: message.reply_message.create_datetime.substring(11, 16),
						date: message.reply_message.create_datetime.substring(5, 10),
						new: false,
					},
					files: message.file_content == null ? null : [{
						name: message.file_content.name.split('message/file/')[1],
						size: message.file_content.size,
						url: message.file_content.url,
						type: message.file_content.name.split('.')[1]
					}]
				})).reverse()
				if (options.reset) {
					this.messages = messages
				}
				else {
					this.messages = [...messages, ...this.messages]
				}
			})
		},

		sendMessage(message) {
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
				a.remove()
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
		},

		addRoom() {
			alert('addRoom')
		},

		messageSelectionActionHandler({ roomId, action, message }) {
			console.log(message)
			switch (action.name) {
				case 'forwardItemByItem':
					alert('forwardItemByItem')
					break
				case 'forwardCombined':
					alert('forwardCombined')
					break
			}
		}
	}
}
</script>

<style scoped>
body {
	font-family: 'Quicksand', sans-serif;
}
</style>