import { signup } from '../store/session'

export const generateCredentials = (desiredConfigs) => async (dispatch) => {
  if (desiredConfigs.first_name === null) {
    desiredConfigs.first_name = randomizedName()
  }

  if (desiredConfigs.last_name === null) {
    desiredConfigs.last_name = randomizedName()
  }

  if (desiredConfigs.email === null) {
    desiredConfigs.email = randomizedEmail()
  }

  if (desiredConfigs.password === null) {
    desiredConfigs.password = randomizedPassword(8)
  }

  const userToBeCreated = {
    ...desiredConfigs,
    day: '1',
    month: '1',
    year: '2023',
    gender: 'non-binary',
  }
  return dispatch(signup(userToBeCreated))
}

const names = [
  'James',
  'John',
  'Robert',
  'Michael',
  'William',
  'David',
  'Richard',
  'Joseph',
  'Thomas',
  'Charles',
  'Christopher',
  'Daniel',
  'Matthew',
  'Anthony',
  'Donald',
  'Mark',
  'Paul',
  'Steven',
  'Andrew',
  'Kenneth',
  'George',
  'Joshua',
  'Kevin',
  'Brian',
  'Edward',
  'Mary',
  'Patricia',
  'Jennifer',
  'Elizabeth',
  'Linda',
  'Barbara',
  'Susan',
  'Jessica',
  'Margaret',
  'Sarah',
  'Karen',
  'Nancy',
  'Betty',
  'Dorothy',
  'Lisa',
  'Sandra',
  'Ashley',
  'Kimberly',
  'Donna',
  'Emily',
  'Michelle',
  'Carol',
  'Helen',
  'Amy',
  'Sharon',
  'Stephanie',
  'Michelle',
  'Rebecca',
  'Laura',
  'Shirley',
  'Cynthia',
  'Angela',
  'Melissa',
  'Brenda',
  'Amy',
  'Anna',
  'Rebecca',
  'Sarah',
  'Kimberly',
  'Deborah',
  'Jessica',
  'Sharon',
  'Michelle',
  'Ashley',
  'Elizabeth',
  'Amanda',
  'Sarah',
  'Ava',
  'Isabella',
  'Emily',
  'Abigail',
  'Mia',
  'Madison',
  'Elizabeth',
  'Avery',
]

function getRandomInt(max) {
  return Math.floor(Math.random() * max)
}

function randomizedName() {
  const index = getRandomInt(names.length)
  return names[index]
}

function randomizedEmail() {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let email = ''
  for (let i = 0; i < 10; i++) {
    email += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  email += '@faceoook.com'
  return email
}

function randomizedPassword(length) {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let password = ''
  for (let i = 0; i < length; i++) {
    password += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return password
}
