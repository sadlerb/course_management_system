const courses = [
  {
    id: 1,
    title: "React for Dummies",
    externalLink: "https://www.google.com",
    completed: false,
    tags: ["react", "react redux", "react router", "styled components"],
    rating: 4.5,
    comments: [
      {
        user_name: "John Doe",
        user_id: 1,
        date_created: "01/07/23",
        user_comment:
          "Great course. I learned a lot, but I had some trouble keeping up during pratical stuff",
        user_rating: 5,
      },
      {
        user_name: "Mary Jane",
        user_id: 2,
        date_created: "01/02/23",
        user_comment:
          "The best way to learn!",
        user_rating: 5,
      },
    ],
  },
  {
    id: 2,
    title: "The Emperor's New Vue",
    externalLink: "http://www.google.com",
    completed: true,
    tags: ["vue", "vue router", "css"],
    rating: 4.5,
    comments: [
      {
        user_name: "John Doe",
        user_id: 1,
        date_created: "01/07/23",
        user_comment:
          "Great course. I learned a lot, but I had some trouble keeping up during pratical stuff",
        user_rating: 5,
      },
    ],
  },
  {
    id: 3,
    title: "Put the CSS in SCSS",
    externalLink: "http://www.google.com",
    completed: false,
    tags: ["css", "scss"],
    rating: 4.5,
    comments: [
      {
        user_name: "John Doe",
        user_id: 1,
        date_created: "01/07/23",
        user_comment:
          "Great course. I learned a lot, but I had some trouble keeping up during pratical stuff",
        user_rating: 5,
      },
    ],
  },
  {
    id: 4,
    title: "Journy to the Centre of PHP",
    externalLink: "http://www.google.com",
    completed: true,
    tags: ["PHP", "database"],
    rating: 4.5,
    comments: [
      {
        user_name: "John Doe",
        user_id: 1,
        date_created: "01/07/23",
        user_comment:
          "Great course. I learned a lot, but I had some trouble keeping up during pratical stuff",
        user_rating: 5,
      },
    ],
  },
];

export default courses;
