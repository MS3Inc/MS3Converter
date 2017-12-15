"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createSectionHeading(keyword, identifier, headingLevel) {
    identifier = identifier ? ` ${identifier}` : '';
    return `\n${'#'.repeat(headingLevel)}${keyword}${identifier}\n`;
}
exports.createSectionHeading = createSectionHeading;
function createListItem(content, nestLevel = 0, fromNewLine = true) {
    return `${fromNewLine ? '\n' : ''}${' '.repeat(nestLevel)}+ ${content}\n`;
}
exports.createListItem = createListItem;
function createSentence(content, fromNewLine = true) {
    return `${fromNewLine ? '\n' : ''}${content}\n`;
}
exports.createSentence = createSentence;
function stringTicks(string) {
    return `\`${string}\``;
}
exports.stringTicks = stringTicks;
//# sourceMappingURL=common.js.map