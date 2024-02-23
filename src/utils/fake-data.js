import { faker, SimpleFaker } from '@faker-js/faker';
import { UniqueEnforcer } from 'enforce-unique';
const unique = new UniqueEnforcer();
faker.seed(10);

export const dummyAuthor = () => {
  const author = faker.person.fullName();
  return {
    author: author,
  };
};

export const dummyBook = () => {
  const title = faker.lorem.words({ min: 1, max: 2 });
  const ISBN = 'GB29 NWBK 6016 1331 9268 ' + faker.number.int(99);
  return {
    title: title,
    ISBN: ISBN,
  };
};

export const dummyGenre = () => {
  const genre = unique.enforce(() => faker.lorem.word());
  return {
    genre: genre,
  };
};

export const dummyReader = () => {
  const name = faker.person.fullName();
  const email = faker.internet.email();
  const password = faker.internet.password({ length: 9 });
  return {
    name: name,
    email: email,
    password: password,
  };
};
