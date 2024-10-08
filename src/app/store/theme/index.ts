import { atom, useRecoilState } from 'recoil';

import { Themes } from '@/shared/theme/types';

import type { AtomEffectParams } from '../types';
import type { Actions } from './types';

const themeModeState = atom({
  key: 'theme-mode-state',
  default: 'dark' as Themes,
  effects: [synchronizeWithLocalStorage],
});

function synchronizeWithLocalStorage({ setSelf, onSet }: AtomEffectParams) {
  const storedTheme = localStorage.getItem('theme-mode');
  storedTheme && setSelf(storedTheme);
  onSet((value: Themes) => localStorage.setItem('theme-mode', value));
}

function useTheme(): [Themes, Actions] {
  const [themeMode, setThemeMode] = useRecoilState(themeModeState);

  function setLightTheme() {
    setThemeMode(() => Themes.LIGHT);
  }
  function setDarkTheme() {
    setThemeMode(() => Themes.DARK);
  }

  return [themeMode, { setLightTheme, setDarkTheme }];
}

export default useTheme;
