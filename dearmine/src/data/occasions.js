// Each occasion drives: the home card, the create-form copy, and which
// experience component renders on the final surprise page.
export const OCCASIONS = [
  {
    id: 'birthday',
    emoji: '🎂',
    label: 'Birthday',
    blurb: 'Balloons, cake, candles — the whole celebration.',
    accent: '#E8536F',
    messagePlaceholder: 'Wishing you a year as wonderful as you are...',
  },
  {
    id: 'proposal',
    emoji: '💍',
    label: 'Proposal',
    blurb: 'Ask the big question, with a little mischief.',
    accent: '#D8A657',
    messagePlaceholder: 'From the day we met, I knew you were the one...',
  },
  {
    id: 'anniversary',
    emoji: '💑',
    label: 'Anniversary',
    blurb: 'A timeline of your days together, counted with love.',
    accent: '#C2447A',
    messagePlaceholder: 'Every year with you feels like the first...',
  },
  {
    id: 'sorry',
    emoji: '🥺',
    label: 'Sorry',
    blurb: 'An envelope, a letter, and an honest apology.',
    accent: '#8C6BAE',
    messagePlaceholder: "I'm sorry for what I said. You mean the world to me...",
  },
  {
    id: 'love-letter',
    emoji: '💌',
    label: 'Love Letter',
    blurb: 'A private letter, sealed and opened just for them.',
    accent: '#E8536F',
    messagePlaceholder: 'My dearest, there are a thousand things I want to tell you...',
  },
  {
    id: 'valentine',
    emoji: '🌹',
    label: 'Valentine',
    blurb: 'Roses, hearts, and a moment made for two.',
    accent: '#D6335A',
    messagePlaceholder: 'Happy Valentine\u2019s Day to the love of my life...',
  },
  {
    id: 'friendship',
    emoji: '🤗',
    label: 'Friendship',
    blurb: 'A warm little page for your favourite person.',
    accent: '#D8A657',
    messagePlaceholder: "Not everyone gets a friend like you. I'm lucky it's me...",
  },
  {
    id: 'congratulations',
    emoji: '🎉',
    label: 'Congratulations',
    blurb: 'Confetti for the win they worked hard for.',
    accent: '#4FA37B',
    messagePlaceholder: 'You did it! So proud of everything you\u2019ve achieved...',
  },
  {
    id: 'just-because',
    emoji: '💖',
    label: 'Just Because',
    blurb: 'No occasion needed — just a reminder they\u2019re special.',
    accent: '#E8536F',
    messagePlaceholder: 'No reason, just wanted you to know you\u2019re on my mind...',
  },
]

export function getOccasion(id) {
  return OCCASIONS.find((o) => o.id === id)
}
