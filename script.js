const cmd = document.querySelector('#cmd')
const technologies = document.querySelector('#technologies')
const progLanguages = document.querySelector('.progLanguages')
const select = document.querySelector('select')
const img = document.querySelector('#avatar')
const btnWorkExperience = document.querySelector('#addWorkExperience')
const removeBtnWorkExperience = document.querySelector('#removeWorkExperience')
const label = document.querySelector('label')
const pre = document.querySelector('pre')
const arrayData = [] 
const style = display()



const cycle = (block, display) => {
    const name = document.querySelectorAll(block)
    for (let i = 0; i < name.length; i++) {
            name[i].style.display = display
    }
}

function display() {
    return {
        block() {
            const input = document.querySelectorAll('input')
            cycle('textarea', 'block')
            cycle('p', 'none')
            cycle('li', 'none')

            for (let i = 1; i < input.length; i++) {
                if (input[i].className === 'custom-input') {
                    input[i].style.display = 'inline-block'
                } else {
                    input[i].style.display = 'block'
                }
            }
            removeBtnWorkExperience.style.display = 'inline-block'
            label.style.display = 'block'
            select.style.display = 'block'
            btnWorkExperience.style.display = 'inline-block'
            img.style.display = 'none'
            pre.style.display = 'none'
            

            cmd.setAttribute('disabled', 'disabled')
        },
        none() {
            cycle('textarea', 'none')
            cycle('input', 'none')
            cycle('p', 'block')
            cycle('li', '')

            removeBtnWorkExperience.style.display = 'none'
            label.style.display = 'none'
            select.style.display = 'none'
            btnWorkExperience.style.display = 'none'
            img.style.display = 'block'
            pre.style.display = 'block'

            arrayData.forEach((data, key) => {
                const block = document.querySelector(`.${data.name}`) 
                if (block === null) {
                    arrayData.splice(key, 1)
                } else {
                    if (data.up) {
                        block.innerHTML = data.value.toUpperCase()
                    } else if (data.name === 'email' || data.name === 'skype') {
                        block.innerHTML = `${data.name}: ${data.value}`
                    } else {
                        block.innerHTML = data.value
                    }
                }
            } )

            cmd.removeAttribute('disabled')
        }
    }
}


const getInput = () => {
    const input = document.querySelectorAll('input')
    if (input[1].style.display === '' || input[1].style.display === 'none' ) {

        style.block()
    } else {
        style.none()
    }
    
}

function recording(value, name, up = false) {
    console.log(value)
    let element = false
    let key = null
    arrayData.forEach((data, i) => {
        if (data.name === name ) {
            element = true
            key = i
        }
    }) 
    if (element) {
        arrayData[key].value = value
    } else {
        const data = {
            value: value,
            name: name,
            up: up,
        }
        arrayData.push(data)
    }
    console.log(arrayData)
}

function recordingImage (event, name) {
    const img = document.querySelector(`#${name}`)
    img.style.backgroundImage = `url('${URL.createObjectURL(event.target.files[0])}')`
}

function technology(counter) {
    progLanguages.innerHTML = ''
    for (let i = 0; i < counter; i++) {
        value = chekName(counter, `li${i}`)
        progLanguages.innerHTML += `
        <input id="li${i}" type="text" onchange="recording(this.value, 'li${i}', true)" style="display: block" value="${value}">
        <li class="li${i}" style="display: none">test</li>
        `
    }
}

const chekName = (key, name) => {
    for (let i = 0; i < key; i++) {
        let value = ''
        for (let j = 0; j < arrayData.length; j++) {
            if (arrayData[j].name === name) {
                value = arrayData[j].value
                return value
            }
        }
    }
    return ''
} 

let key = 1

const addWorkExperience = (remove) => {
    const achievements = document.querySelector('.achievements') 

    if (remove) {
        key !== 0 ? key -= 1 : null
    } else {
        key < 5 ? key += 1 : null
    }
    
    
        achievements.innerHTML = '<h5>WORK EXPERIENCE</h5>'
        for (let i = 0; i < key; i++) {
            const valueExperience = chekName(key, `experience${i}`)
            const valueWhoWorked = chekName(key, `whoWorked${i}`)
            const valueNameProject = chekName(key, `nameProject${i}`)
            const valueWhenWorked = chekName(key, `whenWorked${i}`)
            achievements.innerHTML += `
            <div class="workExperience">
                <h6>
                    <p style="display: none" class="heading whoWorked${i}">FRONT-END DEVELOPER</p>
                    <p style="display: none" class="heading nameProject${i}">GUEST NOW</p>
                    <p style="display: none" class="heading whenWorked${i}">2015-2018</p>
                    <input id="whoWorked${i}" value="${valueWhoWorked}" class="custom-input" style="display: inline-block" type="text" onchange="recording(this.value, 'whoWorked${i}', true)" placeholder="who worked">
                    <input id="nameProject${i}" value="${valueNameProject}" class="custom-input" style="display: inline-block" type="text" onchange="recording(this.value, 'nameProject${i}', true)" placeholder="name project">
                    <input id="whenWorked${i}" value="${valueWhenWorked}" class="custom-input" style="display: inline-block" type="text" onchange="recording(this.value, 'whenWorked${i}', true)" placeholder="when worked">
                </h6>
                <p style="display: none" class="experience${i}">Creatio At Guest now you can purchase tickets to existing events,
                create your own, invite more people by e mail or sharing links, manage
                date and place of the event.
                Responsibilities: creating platform from scratch; support
                Tools & Technologies: HTML, React.js, Bootstrap</p>
                <textarea id="experience${i}" style="display: block;" cols="55" rows="4" onchange="recording(this.value, 'experience${i}')">${valueExperience}</textarea>
            </div>
        `
        }
}

for (let i = 0; i < 13; i++) {
    technologies.innerHTML += `<option value="${i + 1}">${i + 1}</option>`
}

// function loadProfile(email) {
//     const profile = {}
//     profile.name = email
//     profile.information = arrayData

// }
