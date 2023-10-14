import React from 'react';
import { atom, useRecoilValueLoadable } from 'recoil';

export const asyncAtom = atom({
  key: 'asyncAtom',
  default: async () => {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    return data;
  },
});

function AsyncData() {
  const asyncDataLoadable = useRecoilValueLoadable(asyncAtom);

  if (asyncDataLoadable.state === 'loading') {
    return <div>Loading...</div>;
  }

  if (asyncDataLoadable.state === 'hasError') {
    return <div>Error: {asyncDataLoadable.contents.message}</div>;
  }

  return <div>Data: {JSON.stringify(asyncDataLoadable.contents)}</div>;
}
