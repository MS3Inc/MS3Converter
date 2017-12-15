"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const ms3_extension_to_api_1 = require("./ms3-extension-to-api");
const merge_library_to_ms3_1 = require("./merge-library-to-ms3");
class MS3OverlayToApi extends ms3_extension_to_api_1.MS3ExtensionToApi {
    constructor(overlay) {
        super(overlay);
        this.overlay = overlay;
        this.api = {};
    }
    getExamples() { return this.overlay.examples; }
    getDataTypes() { return this.overlay.dataTypes; }
    getAnnotationTypes() { return this.overlay.annotationTypes; }
    getDocumentation() { return this.overlay.documentation; }
    getTraits() { return this.overlay.traits; }
    getResources() { return this.overlay.resources; }
    getResourcesTypes() { return this.overlay.resourcesTypes; }
    getSecuritySchemes() { return this.overlay.securitySchemes; }
    getSettings() { return this.overlay.settings; }
    getComponentByPropertyName(componentName) { return this.overlay[componentName]; }
    merge() {
        let mergedApi = lodash_1.cloneDeep(this.api);
        if (this.api.libraries) {
            this.api = merge_library_to_ms3_1.default(this.api);
        }
        if (this.overlay.libraries) {
            this.overlay = merge_library_to_ms3_1.default(this.overlay);
        }
        mergedApi = this.mergeExtensionIntoApi();
        return mergedApi;
    }
    mergeSettings() {
        const mergedSettings = lodash_1.cloneDeep(this.api.settings);
        const overlaySettings = this.getSettings();
        const apiSettings = this.api.settings;
        if (overlaySettings.description)
            mergedSettings.description = overlaySettings.description;
        if (overlaySettings.title)
            mergedSettings.title = overlaySettings.title;
        if (overlaySettings.annotations)
            mergedSettings.annotations = this.mergeArrayOfObjects(overlaySettings.annotations, apiSettings.annotations, 'name');
        return mergedSettings;
    }
    mergeResources(overlayResources, apiResources) {
        return apiResources.map((apiBody, index) => {
            return this.mergeTwoResources(overlayResources[index], apiBody);
        });
    }
    mergeBodies(overlayBodies, apiBodies) {
        return apiBodies.map((apiBody, index) => {
            return this.mergeTwoBodies(overlayBodies[index], apiBody);
        });
    }
    mergeMethods(overlayMethods, apiMethods) {
        return apiMethods.map((apiMethod, index) => {
            return this.mergeTwoMethods(overlayMethods[index], apiMethod);
        });
    }
    mergeResponses(overlayResponses, apiResponses) {
        return apiResponses.map((apiResponses, index) => {
            return this.mergeTwoMethods(overlayResponses[index], apiResponses);
        });
    }
    mergeSecuritySchemes(overlaySecuritySchemes, apiSecuritySchemes) {
        return apiSecuritySchemes.map((apiSecurityScheme, index) => {
            return this.mergeTwoSecuritySchemes(overlaySecuritySchemes[index], apiSecurityScheme);
        });
    }
    mergeTwoResources(extenstionResource, apiResource) {
        const mergedResource = lodash_1.cloneDeep(apiResource);
        if (extenstionResource.description)
            mergedResource.description = extenstionResource.description;
        if (extenstionResource.annotations)
            mergedResource.annotations = this.mergeArrayOfObjects(extenstionResource.annotations, apiResource.annotations, 'name');
        if (extenstionResource.methods)
            mergedResource.methods = this.mergeMethods(extenstionResource.methods, apiResource.methods);
        return mergedResource;
    }
    mergeTwoMethods(overlayMethod, apiMethod) {
        const mergedMethod = lodash_1.cloneDeep(apiMethod);
        if (overlayMethod.description)
            mergedMethod.description = overlayMethod.description;
        if (overlayMethod.annotations)
            mergedMethod.annotations = this.mergeArrayOfObjects(overlayMethod.annotations, apiMethod.annotations, 'name');
        if (overlayMethod.body)
            mergedMethod.body = this.mergeBodies(overlayMethod.body, apiMethod.body);
        if (overlayMethod.responses)
            mergedMethod.responses = this.mergeResponses(overlayMethod.responses, apiMethod.responses);
        return mergedMethod;
    }
    mergeTwoSecuritySchemes(extenstionSecurityScheme, apiSecurityScheme) {
        const mergedSecuritySchemes = lodash_1.cloneDeep(apiSecurityScheme);
        if (extenstionSecurityScheme.description)
            mergedSecuritySchemes.description = extenstionSecurityScheme.description;
        if (extenstionSecurityScheme.describedBy.responses)
            mergedSecuritySchemes.describedBy.responses = this.mergeResponses(extenstionSecurityScheme.describedBy.responses, apiSecurityScheme.describedBy.responses);
        return mergedSecuritySchemes;
    }
}
function mergeOverlayWithApi(overlay) {
    return MS3OverlayToApi.create(overlay).merge();
}
exports.default = mergeOverlayWithApi;
//# sourceMappingURL=ms3-overlay-to-api.js.map