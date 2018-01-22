"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
class MS3Sanitizer {
    constructor(API) {
        this.API = API;
    }
    sanitize() {
        this.sanitizedAPI = {
            entityTypeName: this.API.entityTypeName,
            ms3_version: this.API.ms3_version,
            settings: this.sanitizeSettings()
        };
        if (this.API.folder && this.API.folder.length)
            this.sanitizedAPI.folder = this.API.folder;
        if (this.API.dataTypes && this.API.dataTypes.length)
            this.sanitizedAPI.dataTypes = this.sanitizeDataTypes(this.API.dataTypes);
        if (this.API.resources && this.API.resources.length)
            this.sanitizedAPI.resources = this.sanitizeResources(this.API.resources);
        if (this.API.securitySchemes && this.API.securitySchemes.length)
            this.sanitizedAPI.securitySchemes = this.sanitizeSecuritySchemes(this.API.securitySchemes);
        if (this.API.resourcesTypes && this.API.resourcesTypes.length)
            this.sanitizedAPI.resourcesTypes = this.sanitizeResources(this.API.resourcesTypes);
        if (this.API.traits && this.API.traits.length)
            this.sanitizedAPI.traits = this.sanitizeTraits(this.API.traits);
        if (this.API.documentation && this.API.documentation.length)
            this.sanitizedAPI.documentation = this.sanitizeDocumentation(this.API.documentation);
        if (this.API.examples && this.API.examples.length)
            this.sanitizedAPI.examples = this.sanitizeExamples(this.API.examples);
        if (this.API.annotationTypes && this.API.annotationTypes.length)
            this.sanitizedAPI.annotationTypes = this.sanitizeAnnotationTypes(this.API.annotationTypes);
        return this.sanitizedAPI;
    }
    sanitizeObject(object) {
        return lodash_1.pickBy(object, predicate => {
            return (predicate && predicate.length) || lodash_1.isBoolean(predicate) || lodash_1.isNumber(predicate) || (lodash_1.keys(predicate).length != 0);
        });
    }
    sanitizeArrayOfObjects(array) {
        return array.map(this.sanitizeObject);
    }
    sanitizeBody(body) {
        return body.map((body) => {
            const sanitizedBody = this.sanitizeObject(body);
            if (sanitizedBody.annotations)
                sanitizedBody.annotations = this.sanitizeAnnotations(sanitizedBody.annotations);
            return sanitizedBody;
        });
    }
    sanitizeSettings() {
        const sanitizedSettings = this.sanitizeObject(this.API.settings);
        if (sanitizedSettings.baseUriParameters)
            sanitizedSettings.baseUriParameters = this.sanitizeArrayOfObjects(this.API.settings.baseURIParameters);
        if (sanitizedSettings.annotations)
            sanitizedSettings.annotations = this.sanitizeAnnotations(this.API.settings.annotations);
        return sanitizedSettings;
    }
    sanitizeAnnotations(annotations) {
        return annotations.map(annotation => {
            const sanitizedAnnotation = this.sanitizeObject(annotation);
            if (sanitizedAnnotation.properties) {
                sanitizedAnnotation.properties = this.sanitizeArrayOfObjects(sanitizedAnnotation.properties);
            }
            return sanitizedAnnotation;
        });
    }
    sanitizeDataTypes(dataTypes) {
        return dataTypes.map((dataType) => {
            const sanitizedDataType = this.sanitizeObject(dataType);
            if (sanitizedDataType.properties) {
                sanitizedDataType.properties = this.sanitizeDataTypes(sanitizedDataType.properties);
            }
            if (dataType.items) {
                sanitizedDataType.items = this.sanitizeObject(dataType.items);
            }
            delete sanitizedDataType.mode; // TODO: Remove this after 'mode' property is removed from ms3 format
            return sanitizedDataType;
        });
    }
    sanitizeResources(resources) {
        return resources.map((resource) => {
            const sanitizedResource = this.sanitizeObject(resource);
            if (sanitizedResource.pathVariables)
                sanitizedResource.pathVariables = this.sanitizeArrayOfObjects(sanitizedResource.pathVariables);
            if (sanitizedResource.annotations)
                sanitizedResource.annotations = this.sanitizeAnnotations(sanitizedResource.annotations);
            if (sanitizedResource.methods)
                sanitizedResource.methods = this.sanitizeMethods(sanitizedResource.methods);
            return sanitizedResource;
        });
    }
    sanitizeMethod(method) {
        const sanitizedMethod = this.sanitizeObject(method);
        if (sanitizedMethod.headers)
            sanitizedMethod.headers = this.sanitizeArrayOfObjects(sanitizedMethod.headers);
        if (sanitizedMethod.queryParameters)
            sanitizedMethod.queryParameters = this.sanitizeArrayOfObjects(sanitizedMethod.queryParameters);
        if (sanitizedMethod.annotations)
            sanitizedMethod.annotations = this.sanitizeAnnotations(sanitizedMethod.annotations);
        if (sanitizedMethod.body)
            sanitizedMethod.body = this.sanitizeBody(sanitizedMethod.body);
        if (sanitizedMethod.responses)
            sanitizedMethod.responses = this.sanitizeMethods(sanitizedMethod.responses);
        return sanitizedMethod;
    }
    sanitizeMethods(methods) {
        return methods.map((method) => this.sanitizeMethod(method));
    }
    sanitizeTraits(traits) {
        return traits.map((trait) => this.sanitizeMethod(trait));
    }
    sanitizeSecuritySchemes(securitySchemes) {
        return securitySchemes.map((securityScheme) => {
            const sanitizedSecurityScheme = this.sanitizeObject(securityScheme);
            if (sanitizedSecurityScheme.describedBy)
                sanitizedSecurityScheme.describedBy = this.sanitizeObject(sanitizedSecurityScheme.describedBy);
            if (sanitizedSecurityScheme.describedBy.headers)
                sanitizedSecurityScheme.describedBy.headers = this.sanitizeArrayOfObjects(sanitizedSecurityScheme.describedBy.headers);
            if (sanitizedSecurityScheme.describedBy.queryParameters)
                sanitizedSecurityScheme.describedBy.queryParameters = this.sanitizeArrayOfObjects(sanitizedSecurityScheme.describedBy.queryParameters);
            if (sanitizedSecurityScheme.describedBy.responses) {
                sanitizedSecurityScheme.describedBy.responses = sanitizedSecurityScheme.describedBy.responses.map((response) => {
                    const sanitizedResponse = this.sanitizeObject(response);
                    if (sanitizedResponse.headers)
                        sanitizedResponse.headers = this.sanitizeArrayOfObjects(sanitizedResponse.headers);
                    if (sanitizedResponse.body)
                        sanitizedResponse.body = this.sanitizeBody(sanitizedResponse.body);
                    return sanitizedResponse;
                });
            }
            if (sanitizedSecurityScheme.annotations)
                sanitizedSecurityScheme.annotations = this.sanitizeAnnotations(sanitizedSecurityScheme.annotations);
            if (sanitizedSecurityScheme.settings)
                sanitizedSecurityScheme.settings = this.sanitizeObject(sanitizedSecurityScheme.settings);
            return sanitizedSecurityScheme;
        });
    }
    sanitizeDocumentation(documentation) {
        return documentation.map((documentation) => {
            const sanitizedDocumentation = this.sanitizeObject(documentation);
            if (sanitizedDocumentation.annotations)
                sanitizedDocumentation.annotations = this.sanitizeAnnotations(sanitizedDocumentation.annotations);
            return sanitizedDocumentation;
        });
    }
    sanitizeExamples(examples) {
        return examples.map((example) => {
            const sanitizedExample = this.sanitizeObject(example);
            if (sanitizedExample.annotations)
                sanitizedExample.annotations = this.sanitizeAnnotations(sanitizedExample.annotations);
            return sanitizedExample;
        });
    }
    sanitizeAnnotationTypes(annotationTypes) {
        return this.sanitizeAnnotations(annotationTypes);
    }
    static create(api) {
        return new MS3Sanitizer(api);
    }
}
exports.default = MS3Sanitizer;
//# sourceMappingURL=ms3-sanitizer.js.map