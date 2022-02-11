import { MUSIC_SRC } from 'constants/constants';

export const preloadPicture = (link: string, element: HTMLImageElement): void => {
  const img = new Image();
  const toyImage = element;
  img.src = link;
  img.onload = () => {
    toyImage.src = link;
  };
};

export const audio = new Audio();
audio.src = MUSIC_SRC;

export const startMusic = () => {
  audio.currentTime = 0;
  audio.play();
  audio.addEventListener('ended', () => {
    audio.play();
  });
};

export const stopMusic = () => {
  audio.pause();
};

export const startAudioAfterReload = () => {
  audio.play();
  document.removeEventListener('click', startAudioAfterReload);
};
