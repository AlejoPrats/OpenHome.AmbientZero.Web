export class ModuleUpdateRequest {
  moduleId: string;
  isForcedUpdate: boolean;
  hasFile: boolean;

  constructor(moduleId: string, isForcedUpdate: boolean, hasFile: boolean) {
    this.moduleId = moduleId;
    this.isForcedUpdate = isForcedUpdate;
    this.hasFile = hasFile;
  }
}
