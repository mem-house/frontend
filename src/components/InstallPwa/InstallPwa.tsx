import { useEffect, useState } from 'react';

import { Button } from '@mui/material';

import { useSnackbar } from 'notistack';

// from https://dev.to/woile/simplest-react-hook-component-for-pwa-install-button-2die
const InstallPWA = () => {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setSupportsPWA(true);
      setPromptInstall(e);
    };
    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('transitionend', handler);
  }, []);

  const onClick = (evt: any) => {
    evt.preventDefault();
    if (!promptInstall) {
      return;
    }
    (promptInstall as any).prompt();
    enqueueSnackbar('Установлено', { variant: 'success' });
  };

  if (!supportsPWA) {
    return null;
  }

  return (
    <Button color="info" onClick={onClick}>
      Install App
    </Button>
  );
};

export default InstallPWA;