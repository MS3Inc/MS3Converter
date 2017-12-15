import ConvertorOptions from './common/convertor-options-interface';
type format = 'ms3_1' | 'oas' | 'blueprint' | 'raml_08' | 'raml_10';

export declare module ms3converter {
  /**
   * Convert from a given strng content
   * @param source{string|object}  - string or object depending on a format
   * @param from{string} - source format
   * @param to{string} - destination format
   * @param options{object} - conversion options
   */
  function convertData(source: any, from: format, to: format, options?: ConvertorOptions): Promise<any>;

  /**
   * Convert from file of given path
   * @param sourcePath{string} - source path
   * @param from{string} - source format
   * @param to{string} - destination format
   * @param options{object} - conversion options
   */
  function convertDataFromFile(sourcePath: string, from: format, to: format, options?: ConvertorOptions): Promise<any>;
}