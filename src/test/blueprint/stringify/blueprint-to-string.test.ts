import ApiBlueprintToString from '../../../blueprint/stringify/bluepring-to-string';
import * as ShouldStringMetadataAndNS from './files/blueprint-metadata-and-name-section-api';

test('Should stringify metadata and name section of blueprint document', async () => {
  const convertedSource = ApiBlueprintToString.create(ShouldStringMetadataAndNS.sourceApiWithMetadataAndNameSectionFilled, {}).stringify();
  const expected = ShouldStringMetadataAndNS.expectedStringifiedApiBlueprint;
  await expect(convertedSource).toEqual(expected);
});