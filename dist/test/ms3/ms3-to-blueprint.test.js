"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ms3_to_blueprint_1 = require("../../ms3/ms3-to-blueprint/ms3-to-blueprint");
const stubs = require("./source-files/ms3-settings-to-blueprint");
test('Should convert ms3 settings to  metadata and name section in blueprint document', () => {
    const convertedSource = ms3_to_blueprint_1.default.create(stubs.sourceMs3Api, { asSingleFile: true, fileFormat: 'apib' }).convert();
    const expected = stubs.expectedStringifiedApiBlueprint;
    expect(convertedSource).toEqual(expected);
});
//# sourceMappingURL=ms3-to-blueprint.test.js.map