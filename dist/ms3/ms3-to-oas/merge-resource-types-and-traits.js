"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
class MergeTypesAndTraits {
    constructor(API) {
        this.API = API;
    }
    getTrait(id) {
        return lodash_1.find(this.API.traits, ['__id', id]);
    }
    getResourceType(id) {
        return lodash_1.find(this.API.resourcesTypes, ['__id', id]);
    }
    mergeParameters(originalParameters, parametersFromType) {
        return parametersFromType.reduce((resultArray, resourceTypeParameter) => {
            const existsInResource = lodash_1.filter(originalParameters, ['displayName', resourceTypeParameter.displayName]);
            if (!existsInResource.length)
                resultArray.push(resourceTypeParameter);
            return resultArray;
        }, [].concat(originalParameters));
    }
    mergeBody(originalBody, bodyFromType) {
        return bodyFromType.reduce((resultArray, resourceTypeBody) => {
            const existsInResource = lodash_1.filter(originalBody, ['contentType', resourceTypeBody.contentType]);
            if (!existsInResource.length)
                resultArray.push(resourceTypeBody);
            return resultArray;
        }, [].concat(originalBody));
    }
    mergeTwoResponses(originalResoponse, responseFromType) {
        const mergedResponse = lodash_1.cloneDeep(originalResoponse);
        if (responseFromType.description && !originalResoponse.description)
            mergedResponse.description = responseFromType.description;
        if (responseFromType.headers) {
            if (!originalResoponse.headers)
                mergedResponse.headers = responseFromType.headers;
            else
                mergedResponse.headers = this.mergeParameters(originalResoponse.headers, responseFromType.headers);
        }
        if (responseFromType.body) {
            if (!originalResoponse.body)
                mergedResponse.body = responseFromType.body;
            else
                mergedResponse.body = this.mergeBody(originalResoponse.body, responseFromType.body);
        }
        return mergedResponse;
    }
    mergeResponses(originalResoponses, responsesFromType) {
        return responsesFromType.reduce((resultArray, resourceTypeResponse) => {
            const existsInResource = lodash_1.filter(originalResoponses, ['code', resourceTypeResponse.code]);
            if (!existsInResource.length) {
                resultArray.push(resourceTypeResponse);
            }
            else {
                resultArray = lodash_1.difference(resultArray, existsInResource);
                resultArray = resultArray.concat(existsInResource.map((originalResoponse) => {
                    return this.mergeTwoResponses(originalResoponse, resourceTypeResponse);
                }, this));
            }
            return resultArray;
        }, [].concat(originalResoponses));
    }
    mergeResourceType(resource) {
        const mergedResource = lodash_1.cloneDeep(resource);
        const resourceType = this.getResourceType(resource.type);
        if (resourceType.description && !resource.description)
            mergedResource.description = resourceType.description;
        if (resourceType.methods)
            mergedResource.methods = this.mergeMethods(resource.methods, resourceType.methods);
        return mergedResource;
    }
    mergeTwoMethods(originalMethod, methodFromType) {
        const mergedMethod = lodash_1.cloneDeep(originalMethod);
        if (methodFromType.description && !originalMethod.description)
            mergedMethod.description = methodFromType.description;
        if (methodFromType.headers) {
            if (!originalMethod.headers)
                mergedMethod.headers = methodFromType.headers;
            else
                mergedMethod.headers = this.mergeParameters(originalMethod.headers, methodFromType.headers);
        }
        if (methodFromType.queryParameters) {
            if (!originalMethod.queryParameters)
                mergedMethod.queryParameters = methodFromType.queryParameters;
            else
                mergedMethod.queryParameters = this.mergeParameters(originalMethod.queryParameters, methodFromType.queryParameters);
        }
        if (methodFromType.body) {
            if (!originalMethod.body)
                mergedMethod.body = methodFromType.body;
            else
                mergedMethod.body = this.mergeBody(originalMethod.body, methodFromType.body);
        }
        if (methodFromType.responses) {
            if (!originalMethod.responses)
                mergedMethod.responses = methodFromType.responses;
            else
                mergedMethod.responses = this.mergeResponses(originalMethod.responses, methodFromType.responses);
        }
        return mergedMethod;
    }
    mergeMethods(resourceMethods, resourceTypeMethods) {
        return resourceTypeMethods.reduce((resultArray, resourceTypeMethod) => {
            const originalMethod = lodash_1.find(resourceMethods, ['name', resourceTypeMethod.name]);
            if (originalMethod)
                resultArray.push(this.mergeTwoMethods(originalMethod, resourceTypeMethod));
            else
                resultArray.push(resourceTypeMethod);
            return resultArray;
        }, []);
    }
    mergeSelectedTraitsInMethods(method) {
        let mergedMethod = lodash_1.cloneDeep(method);
        if (method.selectedTraits) {
            method.selectedTraits.forEach((selectedTrait) => {
                const trait = this.getTrait(selectedTrait);
                mergedMethod = this.mergeTwoMethods(method, trait);
            }, this);
        }
        delete mergedMethod.selectedTraits;
        return mergedMethod;
    }
    mergeResourcesTypes(resource) {
        let mergedResource = lodash_1.cloneDeep(resource);
        if (resource.type)
            mergedResource = this.mergeResourceType(resource);
        delete mergedResource.type;
        if (resource.methods) {
            if (resource.selectedTraits) {
                resource.selectedTraits.forEach((selectedTrait) => {
                    const trait = this.getTrait(selectedTrait);
                    mergedResource.methods = mergedResource.methods.map((method) => {
                        const result = this.mergeTwoMethods(method, trait);
                        return result;
                    }, this);
                }, this);
            }
            delete mergedResource.selectedTraits;
            mergedResource.methods = mergedResource.methods.map(this.mergeSelectedTraitsInMethods, this);
        }
        return mergedResource;
    }
    merge() {
        const mergedApi = lodash_1.cloneDeep(this.API);
        mergedApi.resources = mergedApi.resources.map(this.mergeResourcesTypes, this);
        delete mergedApi.resourcesTypes;
        delete mergedApi.traits;
        return mergedApi;
    }
    static create(api) {
        return new MergeTypesAndTraits(api);
    }
}
function mergeTypesAndTraits(API) {
    return MergeTypesAndTraits.create(API).merge();
}
exports.default = mergeTypesAndTraits;
//# sourceMappingURL=merge-resource-types-and-traits.js.map