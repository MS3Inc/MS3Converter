import * as MS3 from './../ms3-v1-api-interface';
import { cloneDeep, forEach, map } from 'lodash';
import { Library } from './../ms3-v1-library-interface';
import { Trait } from './../ms3-v1-api-interface';

class MergeLibraryToMs3 {
  libraries: Library[];
  constructor(private API: MS3.API) {}

  checkDuplicates(targetArr: any, item: any, counter: number = 1): any {
    const prop = item.name ? 'name' : 'title';
    const traitNames = map(targetArr, (trait: any) => trait[prop]);
    if (traitNames.indexOf(item[prop]) != -1) {
      item[prop] = `${item[prop]}-${counter}`;
      counter++;
      return this.checkDuplicates(targetArr, item, counter);
    }
    targetArr.push(item);
  }

  mergeProjectParts(project: MS3.API): void {
    this.libraries.reduce( (project: MS3.API, lib: Library): MS3.API => {
      lib.traits.forEach((trait) => this.checkDuplicates(project.traits, trait));
      lib.resourcesTypes.forEach((resourceType) => this.checkDuplicates(project.resourcesTypes, resourceType));
      lib.securitySchemes.forEach((secSchema) => this.checkDuplicates(project.securitySchemes, secSchema));
      lib.annotationTypes.forEach((annotationType) => this.checkDuplicates(project.annotationTypes, annotationType));
      lib.dataTypes.forEach((dataType) => this.checkDuplicates(project.dataTypes, dataType));
      lib.examples.forEach((example) => this.checkDuplicates(project.examples, example));
      return project;
    }, project);
  }

  convert(): MS3.API {
    const project = cloneDeep(this.API);
    this.libraries = project.libraries.map((lib): Library => lib.library);
    delete project.libraries;
    this.mergeProjectParts(project);
    return project;
  }

  static create(api: MS3.API) {
    return new MergeLibraryToMs3(api);
  }
}

export default function mergeLibraryToMs3(API: MS3.API): MS3.API {
  return MergeLibraryToMs3.create(API).convert();
}