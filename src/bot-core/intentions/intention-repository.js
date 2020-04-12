class IntentionRepository {
  constructor() {
    this.intentions = [
      {
        id: '5e921aea1806ebd59a2896ac',
        keyword: 'pop',
        match: 'EXACT',
        users: [
          {
            username: 'dimkirt',
            action: '5e921b83dedbf4473708acde',
          },
        ],
        chats: [],
        action: '5e921abb8db116d84ba09c79',
      },
      {
        keyword: 'news_google',
        match: 'EXACT',
        users: [],
        chats: [],
        action: '5e921ad3849247016c3e2e93',
      },
      {
        keyword: 'weather_thessaloniki',
        match: 'EXACT',
        users: [],
        chats: [],
        action: '5e921b6932c12cb3ed20602a',
      },
      {
        keyword: 'sad',
        match: 'INCLUDE',
        users: [],
        chats: [],
        action: '5e921c230779b7f4724e3f66',
      },
      {
        keyword: 'meli',
        match: 'INCLUDE',
        users: [],
        chats: [],
        action: '5e921d6874243209e3d405f1',
      },
    ];
  }

  find() {
    return Promise.resolve(this.intentions);
  }

  findOne({ id }) {
    return Promise.resolve(this.intentions.find((el) => el.id === id));
  }
}

module.exports = {
  IntentionRepository,
};
