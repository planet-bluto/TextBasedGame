const FRAMERATE = 24
const print = console.log
const container = document.getElementById('container')

const DOUBLE_LINED = ["╔", "╗", "╚", "╝", "═", "║"]
const SINGLE_LINED = ["┌", "┐", "└", "┘", "─", "│"]
const HEAVY_LINED = ["┏", "┓", "┗", "┛", "━", "┃"]

var mouse_pos = [0,0]

class Entity {
	constructor(char = "*") {
		this.element = document.createElement('p')
		this.element.classList.add('entity')
		this.element.innerHTML = char

		this.styles = ["position: absolute;"]

		this.x = 0
		this.y = 0
		this.z = 0

		this.update = null
		this.lifetime = 0

		this.hover_entity = null

		this.element.onmouseenter = e => { if (this.hover_entity != null) {this.hover_entity.styles[0] = "position: absolute; pointer-events: none;"} }
		this.element.onmouseleave = e => { if (this.hover_entity != null) {this.hover_entity.styles[0] = "position: absolute; pointer-events: none; display: none;"} }

		container.appendChild(this.element)
		setInterval(() => {
			this.position = [this.x,this.y]
			this.element.style = `${this.styles.join(" ")} left: ${this.position[0]}px; top: ${this.position[1]}px; z-index: ${this.z};`
			if (this.update != null) { this.update(this.lifetime) }
			this.lifetime++
		}, FRAMERATE)
	}

	setHover(entity) {
		this.hover_entity = entity
		this.hover_entity.styles[0] = "position: absolute; pointer-events: none; display: none;"
		this.hover_entity.z = this.z + 1
	}
}

function repeat(amount, func) {
	for (let i = 0; i < amount; i++) {
		func(i)
	}
}

function grid(char, x, y) {
	let columns = []
	repeat(y, (x_i) => {
		let row = []
		repeat(x, (y_i) => {
			row.push(char)
		})
		columns.push(row.join(""))
	})
	return columns.join("<br>")
}

function ui_box(char_set, buffer_x, y, text = "") {
	let x = buffer_x * 2
	let i = 0
	let columns = []
	repeat(y, (y_i) => {
		let row = []
		repeat(x, (x_i) => {
			let pushing_char = ' '
			if (x_i == 0 && y_i == 0) {
				pushing_char = (char_set[0])
			} else if (x_i == (x-1) && y_i == 0) {
				pushing_char = (char_set[1])
			} else if (x_i == 0 && y_i == (y-1)) {
				pushing_char = (char_set[2])
			} else if (x_i == (x-1) && y_i == (y-1)) {
				pushing_char = (char_set[3])
			} else if (y_i == 0 || y_i == (y-1)) {
				pushing_char = (char_set[4])
			} else if (x_i == 0 || x_i == (x-1)) {
				pushing_char = (char_set[5])
			}

			if (x_i > 0 && y_i > 0 && x_i < (x-1) && y_i < (y-1)) {
				if (text[i] != null) {
					pushing_char = (text[i])
				}
				i++
			}

			row.push(pushing_char)
		})
		columns.push(row.join(""))
	})
	return columns.join("<br>")
}

document.body.onmousemove = e => {
	mouse_pos = [e.clientX, e.clientY]
}

function setScene(object) {
	document.title = `Chat Rooms - ${object.title}`
}