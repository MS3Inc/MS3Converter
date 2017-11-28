export function createSectionHeading(keyword: string, identifier: string,  headingLevel: number) {
  identifier = identifier ? ` ${identifier}` : '';
  return `\n${'#'.repeat(headingLevel)}${keyword}${identifier}\n`;
}

export function createListItem(content: string, nestLevel: number = 0, fromNewLine: boolean = true ) {
  return `${fromNewLine ? '\n' : ''}${' '.repeat(nestLevel)}+ ${content}\n`;
}

export function createSentence(content: string, fromNewLine: boolean = true ) {
  return `${fromNewLine ? '\n' : ''}${content}\n`;
}

export function stringTicks(string: string) {
  return `\`${string}\``;
}