export type format = 'json' | 'yaml';

export default interface ConvertorOptions {
  destinationPath?: string;
  asSingleFile: boolean;
  fileFormat: any | format;
}