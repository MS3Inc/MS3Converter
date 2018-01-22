"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const merge_library_to_ms3_1 = require("./merge-library-to-ms3");
class MS3ExtensionToApi {
    constructor(extension) {
        this.extension = extension;
        this.api = {};
        this.IdsHash = {
            examples: {},
            dataTypes: {},
            annotationTypes: {},
            securitySchemes: {},
            traits: {},
            resourcesTypes: {}
        };
        this.api = extension.settings.extends;
    }
    getExamples() { return this.extension.examples; }
    getDataTypes() { return this.extension.dataTypes; }
    getAnnotationTypes() { return this.extension.annotationTypes; }
    getDocumentation() { return this.extension.documentation; }
    getTraits() { return this.extension.traits; }
    getResources() { return this.extension.resources; }
    getResourcesTypes() { return this.extension.resourcesTypes; }
    getSecuritySchemes() { return this.extension.securitySchemes; }
    getSettings() { return this.extension.settings; }
    getComponentByPropertyName(componentName) { return this.extension[componentName]; }
    static create(extension) {
        return new MS3ExtensionToApi(extension);
    }
    merge() {
        let mergedApi = lodash_1.cloneDeep(this.api);
        if (this.extension.libraries) {
            this.extension = merge_library_to_ms3_1.default(this.extension);
        }
        if (this.api.libraries) {
            this.api = merge_library_to_ms3_1.default(this.api);
        }
        mergedApi = this.mergeExtensionIntoApi();
        return mergedApi;
    }
    mergeExtensionIntoApi() {
        const mergedApi = lodash_1.cloneDeep(this.api);
        mergedApi.settings = this.mergeSettings();
        if (this.api.examples && this.getExamples())
            mergedApi.examples = this.mergeExamples(this.getExamples(), this.api.examples);
        if (!this.api.examples && this.getExamples())
            mergedApi.examples = this.getExamples();
        if (this.api.dataTypes && this.getDataTypes())
            mergedApi.dataTypes = this.mergeDataTypes(this.getDataTypes(), this.api.dataTypes);
        if (!this.api.dataTypes && this.getDataTypes())
            mergedApi.dataTypes = this.getDataTypes();
        if (this.api.annotationTypes && this.getAnnotationTypes())
            mergedApi.annotationTypes = this.mergeAnnotationTypes(this.getAnnotationTypes(), this.api.annotationTypes);
        if (!this.api.annotationTypes && this.getAnnotationTypes())
            mergedApi.annotationTypes = this.getAnnotationTypes();
        if (this.api.documentation && this.getDocumentation())
            mergedApi.documentation = this.mergeArrayOfObjects(this.getDocumentation(), this.api.documentation, 'name');
        if (!this.api.documentation && this.getDocumentation())
            mergedApi.documentation = this.getDocumentation();
        if (this.api.traits && this.getTraits())
            mergedApi.traits = this.mergeTraits(this.getTraits(), this.api.traits);
        if (!this.api.traits && this.getTraits())
            mergedApi.traits = this.getTraits();
        if (this.api.resourcesTypes && this.getResourcesTypes())
            mergedApi.resourcesTypes = this.mergeResources(this.getResourcesTypes(), this.api.resourcesTypes);
        if (!this.api.resourcesTypes && this.getResourcesTypes())
            mergedApi.resourcesTypes = this.getResourcesTypes();
        if (this.api.resources && this.getResources())
            mergedApi.resources = this.mergeResources(this.getResources(), this.api.resources);
        if (!this.api.resources && this.getResources())
            mergedApi.resources = this.getResources();
        if (this.api.securitySchemes && this.getSecuritySchemes())
            mergedApi.securitySchemes = this.mergeSecuritySchemes(this.getSecuritySchemes(), this.api.securitySchemes);
        if (!this.api.securitySchemes && this.getSecuritySchemes())
            mergedApi.securitySchemes = this.getSecuritySchemes();
        return mergedApi;
    }
    mergeSettings() {
        const mergedSettings = lodash_1.cloneDeep(this.api.settings);
        const extensionSettings = this.getSettings();
        const apiSettings = this.api.settings;
        if (extensionSettings.baseUri)
            mergedSettings.baseUri = extensionSettings.baseUri;
        if (extensionSettings.description)
            mergedSettings.description = extensionSettings.description;
        if (extensionSettings.mediaType)
            mergedSettings.mediaType = extensionSettings.mediaType;
        if (extensionSettings.title)
            mergedSettings.title = extensionSettings.title;
        if (extensionSettings.version)
            mergedSettings.version = extensionSettings.version;
        if (extensionSettings.protocols)
            mergedSettings.protocols = lodash_1.union(extensionSettings.protocols, apiSettings.protocols);
        if (extensionSettings.securedBy)
            mergedSettings.securedBy = lodash_1.union(extensionSettings.securedBy, apiSettings.securedBy);
        if (extensionSettings.annotations)
            mergedSettings.annotations = this.mergeArrayOfObjects(extensionSettings.annotations, apiSettings.annotations, 'name');
        if (extensionSettings.baseUriParameters)
            mergedSettings.baseUriParameters = this.mergeArrayOfObjects(extensionSettings.baseUriParameters, apiSettings.baseUriParameters, 'displayName');
        return mergedSettings;
    }
    mergeExamples(extensionExamples, apiExamples) {
        if (!apiExamples || !apiExamples.length)
            return extensionExamples;
        return apiExamples.reduce((resultExamples, apiExample) => {
            const conflictingExample = lodash_1.find(resultExamples, ['title', apiExample.title]);
            if (!conflictingExample) {
                resultExamples.push(apiExample);
            }
            else {
                this.IdsHash.examples[apiExample.__id] = conflictingExample.__id;
                if (conflictingExample.annotations) {
                    conflictingExample.annotations = this.mergeArrayOfObjects(conflictingExample.annotations, apiExample.annotations, 'name');
                }
            }
            return resultExamples;
        }, lodash_1.cloneDeep(extensionExamples));
    }
    mergeDataTypes(extensionDataTypes, apiDataTypes) {
        if (!apiDataTypes || !apiDataTypes.length)
            return extensionDataTypes;
        return apiDataTypes.reduce((resultDataTypes, apiDataType) => {
            const conflictingDataType = lodash_1.find(resultDataTypes, ['name', apiDataType.name]);
            if (!conflictingDataType)
                resultDataTypes.push(apiDataType);
            else
                this.IdsHash.examples[apiDataType.__id] = conflictingDataType.__id;
            return resultDataTypes;
        }, lodash_1.cloneDeep(extensionDataTypes));
    }
    mergeAnnotationTypes(extensionAnnotationTypes, apiAnnotationTypes) {
        if (!apiAnnotationTypes || !apiAnnotationTypes.length)
            return extensionAnnotationTypes;
        return apiAnnotationTypes.reduce((resultAnnotationTypes, apiAnnotationType) => {
            const conflictingAnnotationType = lodash_1.find(resultAnnotationTypes, ['name', apiAnnotationType.name]);
            if (!conflictingAnnotationType)
                resultAnnotationTypes.push(apiAnnotationType);
            else
                this.IdsHash.annotationTypes[apiAnnotationType.__id] = conflictingAnnotationType.__id;
            return resultAnnotationTypes;
        }, lodash_1.cloneDeep(extensionAnnotationTypes));
    }
    mergeTraits(extensionTraits, apiTraits) {
        if (!apiTraits || !apiTraits.length)
            return extensionTraits;
        return apiTraits.reduce((resultTraits, apiTrait) => {
            const conflictingTrait = lodash_1.find(resultTraits, ['name', apiTrait.name]);
            if (!conflictingTrait) {
                resultTraits.push(this.resolveMethodReferences(apiTrait));
            }
            else {
                this.IdsHash.traits[apiTrait.__id] = conflictingTrait.__id;
                if (conflictingTrait.annotations) {
                    conflictingTrait.annotations = this.mergeArrayOfObjects(conflictingTrait.annotations, apiTrait.annotations, 'name');
                }
            }
            return resultTraits;
        }, lodash_1.cloneDeep(extensionTraits));
    }
    mergeResourcesTypes(extensionResourcesTypes, apiResourcesTypes) {
        if (!apiResourcesTypes || !apiResourcesTypes.length)
            return extensionResourcesTypes;
        return apiResourcesTypes.reduce((resultResourcesTypes, apiResourcesType) => {
            const conflictingResourcesType = lodash_1.find(resultResourcesTypes, ['name', apiResourcesType.title]);
            if (!conflictingResourcesType) {
                resultResourcesTypes.push(this.resolveResourcesTypeReferences(apiResourcesType));
            }
            else {
                this.IdsHash.resourcesTypes[apiResourcesType.__id] = conflictingResourcesType.__id;
                if (conflictingResourcesType.annotations) {
                    conflictingResourcesType.annotations = this.mergeArrayOfObjects(conflictingResourcesType.annotations, apiResourcesType.annotations, 'name');
                }
            }
            return resultResourcesTypes;
        }, lodash_1.cloneDeep(extensionResourcesTypes));
    }
    mergeArrayOfObjects(extensionObjectsArray, apiObjectsArray, identifier) {
        if (!apiObjectsArray || !apiObjectsArray.length)
            return extensionObjectsArray;
        return apiObjectsArray.reduce((resultArray, apiObject) => {
            const conflictingComponent = lodash_1.find(resultArray, [identifier, apiObject[identifier]]);
            if (!conflictingComponent) {
                resultArray.push(apiObject);
            }
            else if (conflictingComponent.annotations) {
                conflictingComponent.annotations = this.mergeArrayOfObjects(conflictingComponent.annotations, apiObject.annotations, 'name');
            }
            return resultArray;
        }, lodash_1.cloneDeep(extensionObjectsArray));
    }
    mergeBodies(extensionBodies, apiBodies) {
        if (!apiBodies || !apiBodies.length)
            return extensionBodies;
        return apiBodies.reduce((resultArray, apiBody) => {
            const conflictingBody = lodash_1.find(resultArray, ['contentType', apiBody.contentType]);
            if (!conflictingBody) {
                resultArray.push(apiBody);
            }
            else {
                const index = lodash_1.findIndex(resultArray, ['contentType', apiBody.contentType]);
                resultArray[index] = this.mergeTwoBodies(resultArray[index], apiBody);
            }
            return resultArray;
        }, lodash_1.cloneDeep(extensionBodies));
    }
    mergeResources(extensionResources, apiResources) {
        if (!apiResources || !apiResources.length)
            return extensionResources;
        return apiResources.reduce((resultArray, apiResource) => {
            const conflictingResource = lodash_1.find(resultArray, ['name', apiResource.name]);
            if (!conflictingResource) {
                resultArray.push(apiResource);
            }
            else {
                const index = lodash_1.findIndex(resultArray, ['name', apiResource.name]);
                resultArray[index] = this.mergeTwoResources(resultArray[index], apiResource);
            }
            return resultArray;
        }, lodash_1.cloneDeep(extensionResources));
    }
    resolveResourcesTypeReferences(resourcesType) {
        const newResourcesType = lodash_1.cloneDeep(resourcesType);
        if (resourcesType.annotations)
            newResourcesType.annotations = this.resolveSelectedIds(resourcesType.annotations, 'annotationTypes');
        if (resourcesType.selectedTraits)
            newResourcesType.selectedTraits = this.resolveSelectedIds(resourcesType.selectedTraits, 'traits');
        if (resourcesType.securedBy)
            newResourcesType.securedBy = this.resolveSelectedIds(resourcesType.securedBy, 'securitySchemes');
        if (resourcesType.methods)
            newResourcesType.methods = resourcesType.methods.map((method) => this.resolveMethodReferences(method), this);
        return newResourcesType;
    }
    resolveMethodReferences(method) {
        const newMethod = lodash_1.cloneDeep(method);
        if (method.body) {
            newMethod.body = method.body.map((body) => {
                const newBody = lodash_1.cloneDeep(body);
                if (body.selectedExamples)
                    newBody.selectedExamples = this.resolveSelectedIds(body.selectedExamples, 'examples');
                if (body.type)
                    newBody.type = this.resolveSelectedId(body.type);
                return newBody;
            }, this);
        }
        if (method.selectedTraits)
            newMethod.selectedTraits = this.resolveSelectedIds(method.selectedTraits, 'traits');
        if (method.securedBy)
            newMethod.securedBy = this.resolveSelectedIds(method.securedBy, 'securitySchemes');
        if (method.annotations)
            newMethod.annotations = this.resolveSelectedIds(method.annotations, 'annotationTypes');
        if (method.responses)
            newMethod.responses = method.responses.map((response) => {
                const newResponse = lodash_1.cloneDeep(response);
                if (response.annotations)
                    newResponse.annotations = this.resolveSelectedIds(response.annotations, 'annotationTypes');
                if (response.body) {
                    newResponse.body = response.body.map((body) => {
                        const newBody = lodash_1.cloneDeep(body);
                        if (body.selectedExamples)
                            newBody.selectedExamples = this.resolveSelectedIds(body.selectedExamples, 'examples');
                        if (body.type)
                            newBody.type = this.resolveSelectedId(body.type);
                        return newBody;
                    }, this);
                }
                return newResponse;
            }, this);
        return newMethod;
    }
    mergeMethods(extensionMethods, apiMethods) {
        return apiMethods.reduce((resultArray, apiMethod) => {
            const conflictingMethod = lodash_1.find(resultArray, ['name', apiMethod.name]);
            if (!conflictingMethod) {
                resultArray.push(this.resolveMethodReferences(apiMethod));
            }
            else {
                const index = lodash_1.findIndex(resultArray, ['name', apiMethod.name]);
                resultArray[index] = this.mergeTwoMethods(resultArray[index], apiMethod);
            }
            return resultArray;
        }, lodash_1.cloneDeep(extensionMethods));
    }
    mergeTwoBodies(extenstionBody, apiBody) {
        const mergedBody = lodash_1.cloneDeep(apiBody);
        if (extenstionBody.annotations)
            mergedBody.annotations = this.mergeArrayOfObjects(extenstionBody.annotations, apiBody.annotations, 'name');
        if (extenstionBody.type && extenstionBody.type != apiBody.type)
            mergedBody.type = this.mergeSelectedId(extenstionBody.type, apiBody.type, 'dataTypes');
        if (extenstionBody.selectedExamples)
            mergedBody.selectedExamples = this.mergeSelectedIds(extenstionBody.selectedExamples, apiBody.selectedExamples, 'examples');
        return mergedBody;
    }
    mergeTwoResources(extenstionResource, apiResource) {
        const mergedResource = lodash_1.cloneDeep(apiResource);
        if (extenstionResource.description)
            mergedResource.description = extenstionResource.description;
        if (extenstionResource.annotations)
            mergedResource.annotations = this.mergeArrayOfObjects(extenstionResource.annotations, apiResource.annotations, 'name');
        if (extenstionResource.pathVariables)
            mergedResource.pathVariables = this.mergeArrayOfObjects(extenstionResource.pathVariables, apiResource.pathVariables, 'displayName');
        if (extenstionResource.selectedTraits)
            mergedResource.selectedTraits = this.mergeSelectedIds(extenstionResource.selectedTraits, apiResource.selectedTraits, 'traits');
        if (extenstionResource.securedBy)
            mergedResource.securedBy = this.mergeSelectedIds(extenstionResource.securedBy, apiResource.securedBy, 'securitySchemes');
        if (extenstionResource.methods) {
            if (!apiResource.methods)
                mergedResource.methods = extenstionResource.methods;
            else
                mergedResource.methods = this.mergeMethods(extenstionResource.methods, apiResource.methods);
        }
        mergedResource.__id = extenstionResource.__id;
        return mergedResource;
    }
    mergeSelectedIds(extensionIds, apiIds, componentName) {
        const newExtenstionIds = extensionIds.map((extensionId) => {
            return this.IdsHash[componentName][extensionId] ? this.IdsHash[componentName][extensionId] : extensionId;
        }, this);
        const newApiIds = apiIds.map((apiId) => {
            return this.IdsHash[componentName][apiId] ? this.IdsHash[componentName][apiId] : apiId;
        }, this);
        return lodash_1.union(newExtenstionIds, newApiIds);
    }
    resolveSelectedIds(apiIds, componentName) {
        return apiIds.map((apiId) => {
            return this.IdsHash[componentName][apiId] ? this.IdsHash[componentName][apiId] : apiId;
        }, this);
    }
    resolveSelectedId(apiId) {
        return this.IdsHash.dataTypes[apiId] ? this.IdsHash.dataTypes[apiId] : apiId;
    }
    mergeSelectedId(extensionId, apiId, componentName) {
        const apiComponent = lodash_1.find(this.api[componentName], ['__id', apiId]);
        const extensionComponent = lodash_1.find(this.getComponentByPropertyName(componentName), ['__id', extensionId]);
        if (apiComponent.name == extensionComponent.name)
            return apiId;
        else
            return extensionId;
    }
    mergeTwoMethods(extenstionMethod, apiMethod) {
        const mergedMethod = lodash_1.cloneDeep(apiMethod);
        if (extenstionMethod.description)
            mergedMethod.description = extenstionMethod.description;
        if (extenstionMethod.selectedTraits)
            mergedMethod.selectedTraits = this.mergeSelectedIds(extenstionMethod.selectedTraits, apiMethod.selectedTraits, 'traits');
        if (extenstionMethod.securedBy)
            mergedMethod.securedBy = this.mergeSelectedIds(extenstionMethod.securedBy, apiMethod.securedBy, 'securitySchemes');
        if (extenstionMethod.annotations)
            mergedMethod.annotations = this.mergeArrayOfObjects(extenstionMethod.annotations, apiMethod.annotations, 'name');
        if (extenstionMethod.headers) {
            if (!apiMethod.headers)
                mergedMethod.headers = extenstionMethod.headers;
            else
                mergedMethod.headers = this.mergeArrayOfObjects(extenstionMethod.headers, apiMethod.headers, 'displayName');
        }
        if (extenstionMethod.queryParameters) {
            if (!apiMethod.queryParameters)
                mergedMethod.queryParameters = extenstionMethod.queryParameters;
            else
                mergedMethod.queryParameters = this.mergeArrayOfObjects(extenstionMethod.queryParameters, apiMethod.queryParameters, 'displayName');
        }
        if (extenstionMethod.body) {
            if (!apiMethod.body)
                mergedMethod.body = extenstionMethod.body;
            else
                mergedMethod.body = this.mergeBodies(extenstionMethod.body, apiMethod.body);
        }
        if (extenstionMethod.responses) {
            if (!apiMethod.responses)
                mergedMethod.responses = extenstionMethod.responses;
            else
                mergedMethod.responses = this.mergeResponses(extenstionMethod.responses, apiMethod.responses);
        }
        return mergedMethod;
    }
    mergeTwoSecuritySchemes(extenstionSecurityScheme, apiSecurityScheme) {
        const mergedSecuritySchemes = lodash_1.cloneDeep(apiSecurityScheme);
        if (extenstionSecurityScheme.description)
            mergedSecuritySchemes.description = extenstionSecurityScheme.description;
        if (extenstionSecurityScheme.describedBy.headers) {
            if (!apiSecurityScheme.describedBy.headers)
                mergedSecuritySchemes.describedBy.headers = extenstionSecurityScheme.describedBy.headers;
            else
                mergedSecuritySchemes.describedBy.headers = this.mergeArrayOfObjects(extenstionSecurityScheme.describedBy.headers, apiSecurityScheme.describedBy.headers, 'displayName');
        }
        if (extenstionSecurityScheme.describedBy.queryParameters) {
            if (!apiSecurityScheme.describedBy.queryParameters)
                mergedSecuritySchemes.describedBy.queryParameters = extenstionSecurityScheme.describedBy.queryParameters;
            else
                mergedSecuritySchemes.describedBy.queryParameters = this.mergeArrayOfObjects(extenstionSecurityScheme.describedBy.queryParameters, apiSecurityScheme.describedBy.queryParameters, 'displayName');
        }
        if (extenstionSecurityScheme.describedBy.responses) {
            if (!apiSecurityScheme.describedBy.responses)
                mergedSecuritySchemes.describedBy.responses = extenstionSecurityScheme.describedBy.responses;
            else
                mergedSecuritySchemes.describedBy.responses = this.mergeResponses(extenstionSecurityScheme.describedBy.responses, apiSecurityScheme.describedBy.responses);
        }
        if (extenstionSecurityScheme.settings.accessTokenUri)
            mergedSecuritySchemes.settings.accessTokenUri = extenstionSecurityScheme.settings.accessTokenUri;
        if (extenstionSecurityScheme.settings.authorizationUri)
            mergedSecuritySchemes.settings.authorizationUri = extenstionSecurityScheme.settings.authorizationUri;
        if (extenstionSecurityScheme.settings.requestTokenUri)
            mergedSecuritySchemes.settings.requestTokenUri = extenstionSecurityScheme.settings.requestTokenUri;
        if (extenstionSecurityScheme.settings.tokenCredentialsUri)
            mergedSecuritySchemes.settings.tokenCredentialsUri = extenstionSecurityScheme.settings.tokenCredentialsUri;
        if (extenstionSecurityScheme.settings.authorizationGrants)
            mergedSecuritySchemes.settings.authorizationGrants = lodash_1.union(extenstionSecurityScheme.settings.authorizationGrants, apiSecurityScheme.settings.authorizationGrants);
        if (extenstionSecurityScheme.settings.scopes)
            mergedSecuritySchemes.settings.scopes = lodash_1.union(extenstionSecurityScheme.settings.scopes, apiSecurityScheme.settings.scopes);
        if (extenstionSecurityScheme.settings.signatures)
            mergedSecuritySchemes.settings.signatures = lodash_1.union(extenstionSecurityScheme.settings.signatures, apiSecurityScheme.settings.signatures);
        mergedSecuritySchemes.__id = extenstionSecurityScheme.__id;
        return mergedSecuritySchemes;
    }
    mergeResponses(extensionResponses, apiResponses) {
        return apiResponses.reduce((resultArray, apiResponse) => {
            const conflictingResponse = lodash_1.find(resultArray, ['code', apiResponse.code]);
            if (!conflictingResponse) {
                resultArray.push(apiResponse);
            }
            else {
                const index = lodash_1.findIndex(resultArray, ['code', apiResponse.code]);
                resultArray[index] = this.mergeTwoMethods(resultArray[index], apiResponse);
            }
            return resultArray;
        }, lodash_1.cloneDeep(extensionResponses));
    }
    mergeSecuritySchemes(extensionSecuritySchemes, apiSecuritySchemes) {
        return apiSecuritySchemes.reduce((resultArray, apiSecurityScheme) => {
            const conflictingSecurityScheme = lodash_1.find(resultArray, ['name', apiSecurityScheme.name]);
            if (!conflictingSecurityScheme) {
                resultArray.push(apiSecurityScheme);
            }
            else {
                const index = lodash_1.findIndex(resultArray, ['name', apiSecurityScheme.name]);
                resultArray[index] = this.mergeTwoSecuritySchemes(resultArray[index], apiSecurityScheme);
            }
            return resultArray;
        }, lodash_1.cloneDeep(extensionSecuritySchemes));
    }
}
exports.MS3ExtensionToApi = MS3ExtensionToApi;
function mergeExtensionWithApi(extension) {
    return MS3ExtensionToApi.create(extension).merge();
}
exports.default = mergeExtensionWithApi;
//# sourceMappingURL=ms3-extension-to-api.js.map