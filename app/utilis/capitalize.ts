/**
 * 文字列の先頭のみ大文字に変換
 */
export function capitalize( str: string, isFirstCharLower?: boolean ) {
  if (typeof str !== 'string' || !str) return str;

  const tmp = str.split('_').map(str => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }).join('');

  if (isFirstCharLower) {
    return tmp.charAt(0).toLowerCase() + tmp.slice(1);
  }

  return tmp;
}
