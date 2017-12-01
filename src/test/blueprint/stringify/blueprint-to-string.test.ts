import ApiBlueprintToString from '../../../blueprint/stringify/index';
import * as ShouldStringMetadataAndNS from './files/blueprint-metadata-and-name-section-api';
import * as ShouldStringResourceParameters from './files/blueprint-resource-parameters';
import * as ShouldStringResourceActions from './files/blueprint-resource-actions';

test('Should stringify metadata and name section of blueprint document', async () => {
  const convertedSource = ApiBlueprintToString.create(ShouldStringMetadataAndNS.source, {}).stringify();
  const expected = ShouldStringMetadataAndNS.expected;
  await expect(convertedSource).toEqual(expected);
});

test('Should stringify resources parameters of blueprint document', async () => {
  const convertedSource = ApiBlueprintToString.create(ShouldStringResourceParameters.source, {}).stringify();
  const expected = ShouldStringResourceParameters.expected;
  await expect(convertedSource).toEqual(expected);
});

test('Should stringify resources action sections of blueprint document', async () => {
  const convertedSource = ApiBlueprintToString.create(ShouldStringResourceActions.source, {}).stringify();
  const expected = ShouldStringResourceActions.expected;
  await expect(convertedSource).toEqual(expected);
});