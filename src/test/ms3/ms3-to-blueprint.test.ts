import MS3ToBlueprint from '../../ms3/ms3-to-blueprint';
import * as stubs from './source-files/ms3-settings-to-blueprint';

test('Should convert ms3 settings to  metadata and name section in blueprint document', () => {
  const convertedSource = MS3ToBlueprint.create(stubs.sourceMs3Api, {asSingleFile: true, fileFormat: 'apib'}).convert();
  const expected = stubs.expectedStringifiedApiBlueprint;
  expect(convertedSource).toEqual(expected);
});