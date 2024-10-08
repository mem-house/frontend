const title = 'asdasdMemHouse';

const email = 'smirnov.andrew.1999@yandex.ru';

const repository = 'https://github.com/asmirnov-backend';

const messages = {
  app: {
    crash: {
      title: 'Oooops... Sorry, I guess, something went wrong. You can:',
      options: {
        email: `contact with author by this email - ${email}`,
        reset: 'Press here to reset the application',
      },
    },
  },
  loader: {
    fail: 'Hmmmmm, there is something wrong with this component loading process... Maybe trying later would be the best idea',
  },
  images: {
    failed: 'something went wrong during image loading :(',
  },
};

const dateFormat = 'MMMM DD, YYYY';

const loader = {
  // no more blinking in your app
  delay: 300, // if your asynchronous process is finished during 300 milliseconds you will not see the loader at all
  minimumLoading: 700, // but if it appears, it will stay for at least 700 milliseconds
};

const giphy404 = 'https://giphy.com/embed/xTiN0L7EW5trfOvEk0';

export { loader, dateFormat, messages, repository, email, title, giphy404 };
