import { signup } from "../store/session";

export const generateCredentials = (desiredConfigs) => async (dispatch) => {
  if (desiredConfigs.first_name === null) {
    desiredConfigs.first_name = randomizedName();
  }

  if (desiredConfigs.last_name === null) {
    desiredConfigs.last_name = randomizedName();
  }

  if (desiredConfigs.email === null) {
    desiredConfigs.email = randomizedEmail();
  }

  if (desiredConfigs.password === null) {
    desiredConfigs.password = randomizedPassword();
  }

  const userToBeCreated = {
    ...desiredConfigs,
    day: "1",
    month: "1",
    year: "2023",
    gender: "non-binary",
  };

  return dispatch(signup(userToBeCreated));
};

const names = [
  "James",
  "John",
  "Robert",
  "Michael",
  "William",
  "David",
  "Richard",
  "Joseph",
  "Thomas",
  "Charles",
  "Christopher",
  "Daniel",
  "Matthew",
  "Anthony",
  "Donald",
  "Mark",
  "Paul",
  "Steven",
  "Andrew",
  "Kenneth",
  "George",
  "Joshua",
  "Kevin",
  "Brian",
  "Edward",
  "Mary",
  "Patricia",
  "Jennifer",
  "Elizabeth",
  "Linda",
  "Barbara",
  "Susan",
  "Jessica",
  "Margaret",
  "Sarah",
  "Karen",
  "Nancy",
  "Betty",
  "Dorothy",
  "Lisa",
  "Sandra",
  "Ashley",
  "Kimberly",
  "Donna",
  "Emily",
  "Michelle",
  "Carol",
  "Helen",
  "Amy",
  "Sharon",
  "Stephanie",
  "Michelle",
  "Rebecca",
  "Laura",
  "Shirley",
  "Cynthia",
  "Angela",
  "Melissa",
  "Brenda",
  "Amy",
  "Anna",
  "Rebecca",
  "Sarah",
  "Kimberly",
  "Deborah",
  "Jessica",
  "Sharon",
  "Michelle",
  "Ashley",
  "Elizabeth",
  "Amanda",
  "Sarah",
  "Ava",
  "Isabella",
  "Emily",
  "Abigail",
  "Mia",
  "Madison",
  "Elizabeth",
  "Avery",
];

const emails = [
  "james01@gmail.com",
  "john02@gmail.com",
  "robert03@gmail.com",
  "michael04@gmail.com",
  "william05@gmail.com",
  "david06@gmail.com",
  "richard07@gmail.com",
  "joseph08@gmail.com",
  "thomas09@gmail.com",
  "charles10@gmail.com",
  "christopher11@gmail.com",
  "daniel12@gmail.com",
  "matthew13@gmail.com",
  "anthony14@gmail.com",
  "donald15@gmail.com",
  "mark16@gmail.com",
  "paul17@gmail.com",
  "steven18@gmail.com",
  "andrew19@gmail.com",
  "kenneth20@gmail.com",
  "george21@gmail.com",
  "joshua22@gmail.com",
  "kevin23@gmail.com",
  "brian24@gmail.com",
  "edward25@gmail.com",
  "mary26@gmail.com",
  "patricia27@gmail.com",
  "jennifer28@gmail.com",
  "elizabeth29@gmail.com",
  "linda30@gmail.com",
  "barbara31@gmail.com",
  "susan32@gmail.com",
  "jessica33@gmail.com",
  "margaret34@gmail.com",
  "sarah35@gmail.com",
  "karen36@gmail.com",
  "nancy37@gmail.com",
  "betty38@gmail.com",
  "dorothy39@gmail.com",
  "lisa40@gmail.com",
  "sandra41@gmail.com",
  "ashley42@gmail.com",
  "kimberly43@gmail.com",
  "donna44@gmail.com",
];

const passwords = [
  "james01",
  "john02",
  "robert03",
  "michael04",
  "william05",
  "david06",
  "richard07",
  "joseph08",
  "thomas09",
  "charles10",
  "christopher11",
  "daniel12",
  "matthew13",
  "anthony14",
  "donald15",
  "mark16",
  "paul17",
  "steven18",
  "andrew19",
  "kenneth20",
];

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function randomizedName() {
  const index = getRandomInt(names.length);
  return names[index];
}

function randomizedEmail() {
  const index = getRandomInt(emails.length);
  return emails[index];
}

function randomizedPassword() {
  const index = getRandomInt(passwords.length);
  return passwords[index];
}
