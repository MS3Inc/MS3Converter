"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ms3_sanitizer_1 = require("./../ms3/ms3-sanitizer");
test('MS3 API settings should be sanitized successfully', () => {
    const project = {
        settings: {
            securedBy: [],
            baseUriParameters: [],
            protocols: [
                'HTTP'
            ],
            annotations: [],
            title: 'params',
            description: 'dsdsd',
            baseUri: 'http://params',
            version: '',
            mediaType: ''
        },
        ms3_version: '1.0.1',
        entityTypeName: 'api'
    };
    const expectedResult = {
        settings: {
            protocols: [
                'HTTP'
            ],
            title: 'params',
            description: 'dsdsd',
            baseUri: 'http://params'
        },
        ms3_version: '1.0.1',
        entityTypeName: 'api'
    };
    expect(ms3_sanitizer_1.default.create(project).sanitize()).toEqual(expectedResult);
});
//# sourceMappingURL=ms3-sanitize-settings.test.js.map