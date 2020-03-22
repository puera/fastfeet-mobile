export function statusBarConfig(backgroundColor, styleBar) {
  return {
    type: '@user/COLOR',
    payload: { backgroundColor, styleBar },
  };
}
