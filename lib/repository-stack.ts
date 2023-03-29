import { Construct } from 'constructs';
import {
  Stack,
  StackProps,
} from 'aws-cdk-lib';
import { IRepository, Repository } from 'aws-cdk-lib/aws-codecommit';

interface RepositoryStackProps extends StackProps {
  repositoryName: string;
}

export class RepositoryStack extends Stack {
  public readonly repository: IRepository;

  constructor(scope: Construct, id: string, props: RepositoryStackProps) {
    super(scope, id, props);

    const { repositoryName } = props;

    this.repository = Repository.fromRepositoryName(this, id, repositoryName);
  }
}
