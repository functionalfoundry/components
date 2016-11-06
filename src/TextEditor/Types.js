export type PropKeyValueTypeT = 'string' | 'variable' | 'number'

export type PropKeyValueT = {
  type: PropKeyValueTypeT,
  key: string,
  value: any,
  options: Array<string>,
}
