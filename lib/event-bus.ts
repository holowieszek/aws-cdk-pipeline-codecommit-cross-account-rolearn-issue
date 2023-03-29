import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CfnEventBusPolicy } from 'aws-cdk-lib/aws-events';

interface EventBusStackProps extends StackProps {
  repositoryAccount: string;
}

export class EventBusStack extends Stack {
  constructor(scope: Construct, id: string, props: EventBusStackProps) {
    super(scope, id, props);

    new CfnEventBusPolicy(this, 'GivePermToOtherAccount', {
      action: 'events:PutEvents',
      statementId: `Allow-Account-${props.repositoryAccount}-${this.node.addr.substring(2, 36)}`,
      principal: props.repositoryAccount,
    });
  }
}
