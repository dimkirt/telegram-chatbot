import { IIntention } from './intention.interface';


export class IntentionRepository {
  private readonly intentions: IIntention[];

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
        id: '5e921aea1806ebd59a2896ad',
        keyword: 'news_google',
        match: 'EXACT',
        users: [],
        chats: [],
        action: '5e921ad3849247016c3e2e93',
      },
      {
        id: '5e921aea1806ebd59a2896ae',
        keyword: 'weather_thessaloniki',
        match: 'EXACT',
        users: [],
        chats: [],
        action: '5e921b6932c12cb3ed20602a',
      },
      {
        id: '5e921aea1806ebd59a2896af',
        keyword: 'sad',
        match: 'INCLUDE',
        users: [],
        chats: [],
        action: '5e921c230779b7f4724e3f66',
      },
      {
        id: '5e921aea1806ebd59a2896ag',
        keyword: 'meli',
        match: 'INCLUDE',
        users: [],
        chats: [],
        action: '5e921d6874243209e3d405f1',
      },
    ];
  }

  find(): Promise<IIntention[]> {
    return Promise.resolve(this.intentions);
  }

  findOne(id: string): Promise<IIntention> | undefined {
    const intention = this.intentions.find((el) => el.id === id);
    if (intention) {
      return Promise.resolve(intention);
    }
  }
}
