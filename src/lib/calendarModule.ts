import {NativeModules} from 'react-native';

const {CalendarModule} = NativeModules;

interface CalendarModule {
  createCalendarEvent: (name: string, location: string) => void;
}

export default CalendarModule as CalendarModule;
