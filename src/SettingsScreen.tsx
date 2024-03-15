import {Text} from 'react-native';
import {useBetas} from './queries/kv.native';

export const SettingsScreen = () => {
  const betas = useBetas();

  return (
    <>
      <Text>Settings</Text>
      <Text>{betas.data.length} betas loaded</Text>
    </>
  );
};
