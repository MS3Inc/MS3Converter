"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./../ms3/ms3-to-oas/index");
const project = {
    settings: {
        title: 'params',
        baseUri: 'http://params/{test}',
        description: 'API description',
        baseUriParameters: [{
                enum: ['1', '2', '3'],
                default: 'MyDefault',
                displayName: 'test',
                description: 'description2'
            }]
    },
    ms3_version: '1.0.1',
    entityTypeName: 'api'
};
test('MS3 settings should be converted to OAS30 servers successfully', () => __awaiter(this, void 0, void 0, function* () {
    const expectedResult = {
        openapi: '3.0',
        info: {
            title: 'params',
            description: 'API description',
            version: '3.0',
        },
        servers: [{
                url: 'http://params/{test}',
                variables: [{
                        test: {
                            enum: ['1', '2', '3'],
                            default: 'MyDefault',
                            description: 'description2'
                        }
                    }]
            }],
        components: {},
        paths: {}
    };
    expect(JSON.parse(yield index_1.default.create(project).convert())).toEqual(expectedResult);
}));
//# sourceMappingURL=ms3-to-OAS30-servers.test.js.map