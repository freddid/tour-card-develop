/* eslint-disable */
/* eslint-disable prettier/prettier */
/**

* Парсит битовое значение флагов и возвращает объект с булевыми значениями флагов.
*
 * @param flagValue - Битовое значение флагов для распарсивания.
 * @param flagsDictionary - Словарь флагов с их значениями.
 * @returns Объект с булевыми значениями флагов, соответствующими переданному битовому значению.
*/

export function parseFlags<T>(
  flagValue: number,
  flagsDictionary: Record<string, number>,
): T {
  const result: T = {} as unknown as T;

  Object.keys(flagsDictionary).forEach((key) => {
    const flagBit = flagsDictionary[key];
    if (typeof flagBit === 'number') {
      // eslint-disable-next-line no-bitwise
      // @ts-ignore
      result[key] = (flagValue & flagBit) === flagBit;
    }
  });

  return result;
}
