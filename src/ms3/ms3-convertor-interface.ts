import ConvertorInterface from '../common/convertor-interface';

export default interface Ms3ConvertorInterface extends ConvertorInterface {
  convert(): Promise<any>;
  writeToDisc(): void;

}