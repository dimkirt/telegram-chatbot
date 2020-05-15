import { IAction } from './action.interface';

export class ActionRepository {
  private actions: IAction[];

  constructor() {
    this.actions = [
      {
        id: '5e921abb8db116d84ba09c79',
        type: 'sendMessage',
        payload: {
          message: {
            text: 'NETI',
            reply: true,
          },
        },
      },
      {
        id: '5e921b83dedbf4473708acde',
        type: 'sendMessage',
        payload: {
          message: {
            text: 'Ναι μπαμπά;',
            reply: true,
          },
        },
      },
      {
        id: '5e921ad3849247016c3e2e93',
        type: 'sendMessageArticlesForNewsSource',
        payload: {
          source: 'google-news',
        },
      },
      {
        id: '5e921b6932c12cb3ed20602a',
        type: 'sendMessageWithWeatherForCity',
        payload: {
          city: 'Thessaloniki',
          country: 'gr',
        },
      },
      {
        id: '5e921c230779b7f4724e3f66',
        type: 'sendPhoto',
        payload: {
          photo: {
            caption: 'ＳＡＤ　ＢＯＹＺ',
            photoUrl: 'https://imgur.com/LeyYNEa',
          },
        },
      },
      {
        id: '5e921d6874243209e3d405f1',
        type: 'sendDocument',
        payload: {
          document: {
            caption: null,
            documentUrl: 'https://imgur.com/0K9r9n0.gif',
          },
        },
      },
    ];
  }

  findOne(id: string): Promise<IAction> | undefined {
    const action = this.actions.find((el) => el.id === id);
    if (action) {
      return Promise.resolve(action);
    }
  }
}
