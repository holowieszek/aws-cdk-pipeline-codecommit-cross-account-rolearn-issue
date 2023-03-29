import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { IRepository } from 'aws-cdk-lib/aws-codecommit';
import {
  CodeBuildStep,
  CodePipeline,
  CodePipelineSource,
} from 'aws-cdk-lib/pipelines';

interface PipelineStackProps extends StackProps {
  repository: IRepository;
  environment: string;
  buildTriggerBranch: string;
}

export class PipelineStack extends Stack {
  constructor(scope: Construct, id: string, props: PipelineStackProps) {
    super(scope, id, props);

    const { environment, repository, buildTriggerBranch } = props;
    
    new CodePipeline(this, environment, {
      pipelineName: `BugReproduce-${environment}`,
      crossAccountKeys: true,
      synth: new CodeBuildStep('Synth', {
        input: CodePipelineSource.codeCommit(repository, buildTriggerBranch),
        commands: ['echo simplified version of the stack'],
      }),
      //codebuilds configuration, runtimes, policies
    });

    // const deploy = new FutureStack()

    // stacksteps
  }
}