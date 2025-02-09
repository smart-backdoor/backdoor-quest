export const fetchQuizzes = async () => {
  return [
    {
      id: 1,
      title: 'Java quiz',
      description: 'Some questions about Java',
      image: 'https://via.placeholder.com/300',
      questionsCount: 10,
      time: 15,
      category: 'Test questions',
      author: {
        name: 'Danylo',
        avatar: 'https://via.placeholder.com/40',
      },
    },
    {
      id: 2,
      title: 'Some quiz',
      description: 'Very interest quiz',
      image: 'https://via.placeholder.com/300',
      questionsCount: 15,
      time: 20,
      category: 'Question with a picture',
      author: {
        name: 'Unknown',
        avatar: 'https://via.placeholder.com/40',
      },
    },
    {
      id: 3,
      title: 'Some quiz',
      description: 'Very interest quiz',
      image: 'https://via.placeholder.com/300',
      questionsCount: 15,
      time: 20,
      category: 'Open answers',
      author: {
        name: 'Unknown',
        avatar: 'https://via.placeholder.com/40',
      },
    },
    {
      id: 4,
      title: 'Some quiz',
      description: 'Very interest quiz',
      image: 'https://via.placeholder.com/300',
      questionsCount: 15,
      time: 20,
      category: 'Open answers',
      author: {
        name: 'Unknown',
        avatar: 'https://via.placeholder.com/40',
      },
    },
  ];
};
