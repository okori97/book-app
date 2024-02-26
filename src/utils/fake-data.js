import { faker } from '@faker-js/faker';
import { UniqueEnforcer } from 'enforce-unique';
const unique = new UniqueEnforcer();
faker.seed(10);

export const dummyAuthor = ({ author = faker.person.fullName() } = {}) => {
  return {
    author,
  };
};

export const dummyBook = ({
  title = faker.lorem.words({ min: 1, max: 2 }),
  GenreId = null,
  AuthorId = null,
  ISBN = 'GB29 NWBK 6016 1331 9268 ' + faker.number.int(99),
} = {}) => {
  return {
    title,
    ISBN,
    AuthorId,
    GenreId,
  };
};

export const dummyGenre = ({
  genre = unique.enforce(() => faker.lorem.word()),
} = {}) => {
  return {
    genre,
  };
};

export const dummyReader = ({
  name = faker.person.fullName(),
  email = faker.internet.email(),
  password = faker.internet.password({ length: 9 }),
} = {}) => {
  return {
    name,
    email,
    password,
  };
};
