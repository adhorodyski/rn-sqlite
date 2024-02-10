import {NativeModules} from 'react-native';

const {CalendarModule} = NativeModules;

interface CalendarModule {
  createCalendarEvent: (name: string, content: string) => Promise<string>;
  getConstants: () => {
    DEFAULT_EVENT_NAME: string;
  };
}

export default CalendarModule as CalendarModule;
