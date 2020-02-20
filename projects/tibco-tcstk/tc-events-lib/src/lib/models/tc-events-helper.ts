export class RuleDeployment {
  constructor(artifactInput: any, projectName: string, rulePath: string, implementsPath: string, rulePriority: number, description: string, commitMessage: string, newStatus: string) {
    this.artifactInput = artifactInput;
    this.projectName = projectName;
    this.rulePath = rulePath;
    this.implementsPath = implementsPath;
    this.rulePriority = rulePriority;
    this.description = description;
    this.commitMessage = commitMessage;
    this.newStatus = newStatus;
  }
  artifactInput: any;
  projectName: string;
  rulePath: string;
  implementsPath: string;
  rulePriority: number;
  description: string;
  commitMessage: string;
  newStatus: string;
}
