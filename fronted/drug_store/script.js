import './style.css'

document.body.classList.add('intro-active')

const introOverlay = document.getElementById('intro-overlay')
const blocksContainer = document.getElementById('blocks')
const textContainer = document.getElementById('textContainer')
const hintMessage = document.querySelector('.hint-message')

const hintQuotes = [
  'Hey user… this is an illegal store. Nothing opens easily here. Try clicking the most tempting thing on the page.',
  'Psst… illegal things aren’t handed out. Spot the most attractive object and tap it.',
  'Access denied… unless you click the one thing that looks too cool to ignore.',
  'Nothing moves until you touch the most eye-catching thing here. Go on.',
  'Want in? Prove it. Tap the coolest thing on this screen.',
  'Illegal store rule #1: find the most attractive thing and click it.',
  'Come on… you know what to click. The coolest thing floating here.',
  'Hint: access is hidden behind something that looks… unusually interesting.'
]

const pickRandomHint = () => hintQuotes[Math.floor(Math.random() * hintQuotes.length)]

const typeWriter = (text, element) => {
  return new Promise(resolve => {
    element.textContent = ''
    element.classList.add('visible')
    let index = 0
    const interval = setInterval(() => {
      element.textContent += text[index]
      index++
      if (index === text.length) {
        clearInterval(interval)
        resolve()
      }
    }, 35)
  })
}

setTimeout(() => {
  typeWriter(pickRandomHint(), hintMessage)
}, 3000)

let appLoaded = false
const loadApp = async () => {
  if (appLoaded) return
  appLoaded = true
  await import('/src/main.jsx')
}

const blockSize = window.innerWidth < 768 ? 25 : 40
const cols = Math.ceil(window.innerWidth / blockSize)
const rows = Math.ceil(window.innerHeight / blockSize)

const blocks = []
const fragment = document.createDocumentFragment()
for (let i = 0; i < rows; i++) {
  for (let j = 0; j < cols; j++) {
    const block = document.createElement('div')
    block.className = 'block'
    block.style.left = j * blockSize + 'px'
    block.style.top = i * blockSize + 'px'
    block.style.width = blockSize + 'px'
    block.style.height = blockSize + 'px'
    fragment.appendChild(block)
    blocks.push(block)
  }
}
blocksContainer.appendChild(fragment)

const targetText = 'INLEGAL STORE'
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*'

targetText.split('').forEach(targetChar => {
  if (targetChar === ' ') {
    const space = document.createElement('span')
    space.className = 'space'
    textContainer.appendChild(space)
  } else {
    const wrapper = document.createElement('div')
    wrapper.className = 'letter-wrapper'

    const slot = document.createElement('div')
    slot.className = 'letter-slot'

    const numLetters = 15
    for (let i = 0; i < numLetters; i++) {
      const letter = document.createElement('span')
      letter.className = 'letter'
      letter.textContent = i === numLetters - 1 ? targetChar : characters[Math.floor(Math.random() * characters.length)]
      slot.appendChild(letter)
    }

    wrapper.appendChild(slot)
    textContainer.appendChild(wrapper)
  }
})

const skull = document.createElement('span')
skull.className = 'skull'
skull.textContent = ' ☠️'
skull.style.opacity = '0'
textContainer.appendChild(skull)

const letterSlots = document.querySelectorAll('.letter-slot')
const letterWrappers = document.querySelectorAll('.letter-wrapper')
const letterHeight = window.innerWidth < 768 ? 64 : 128

const timeline = gsap.timeline()

gsap.set(blocks, { scale: 0 })
timeline.to(blocks, {
  scale: 1,
  duration: 0.02,
  stagger: {
    amount: 0.6,
    from: 'random'
  },
  ease: 'back.out(1.5)'
})

timeline.to(blocks, {
  scale: 0,
  opacity: 0,
  rotation: 90,
  duration: 0.04,
  stagger: {
    amount: 0.8,
    from: 'center'
  },
  ease: 'power2.in',
  onComplete: () => {
    blocksContainer.style.display = 'none'
  }
}, '+=0.2')

timeline.fromTo(
  letterWrappers,
  { scaleY: 0, opacity: 0 },
  {
    scaleY: 1,
    opacity: 1,
    duration: 0.4,
    stagger: 0.04,
    ease: 'back.out(1.5)'
  },
  '-=0.4'
)

letterSlots.forEach((slot, index) => {
  const numLetters = slot.children.length
  const totalDistance = (numLetters - 1) * letterHeight
  timeline.fromTo(
    slot,
    { y: 0 },
    {
      y: -totalDistance,
      duration: 2,
      ease: 'power3.out'
    },
    index === 0 ? '-=0.2' : '<'
  )
})

timeline.to(
  letterWrappers,
  {
    x: 3,
    duration: 0.03,
    yoyo: true,
    repeat: 3,
    ease: 'power2.inOut'
  },
  '-=0.3'
)

timeline.fromTo(
  skull,
  { opacity: 0, scale: 0, rotation: -180 },
  {
    opacity: 1,
    scale: 1.3,
    rotation: 0,
    duration: 0.6,
    ease: 'elastic.out(1, 0.5)'
  },
  '-=0.2'
)

timeline.to(skull, {
  scale: 1,
  duration: 0.4,
  ease: 'power2.out'
})

timeline.to('.text-container', {
  scale: 1.02,
  duration: 3,
  ease: 'sine.inOut'
})

let introReady = false
let introDismissed = false

const dismissIntro = () => {
  if (!introReady || introDismissed) return
  introDismissed = true
  loadApp()
  gsap.to(introOverlay, {
    opacity: 0,
    duration: 1.2,
    ease: 'power2.out',
    onComplete: () => {
      introOverlay.style.display = 'none'
      document.body.classList.remove('intro-active')
      document.body.style.overflow = ''
    }
  })
}

timeline.call(() => {
  introReady = true
  skull.classList.add('interactive')
})

skull.addEventListener('pointerdown', dismissIntro)
