import { createRef } from 'react';

export const navigationRef = createRef();

export function navigate(name) {
  navigationRef.current.navigate(name);
}

export function reset(index, name) {
  navigationRef.current.reset({ index, routes: [{ name }] });
}
