type actionType = 'sendMessage' | 'sendPhoto' | 'sendDocument' | 
  'sendMessageArticlesForNewsSource' | 'sendMessageWithWeatherForCity'

export interface IAction {
  id: string;
  type: actionType;
  payload: any;
};
