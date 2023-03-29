#!/usr/bin/env node
import { App } from 'aws-cdk-lib';
import { RepositoryStack } from '../lib/repository-stack';
import { PipelineStack } from '../lib/pipeline-stack';
import { EventBusStack } from '../lib/event-bus';
const app = new App();

/* -------------------------------------------------------------------------- */
/*                                CONFIGURATION                               */
/* -------------------------------------------------------------------------- */
const repositoryAccount = '111111111111';
const developmentAccount = '222222222222';
const repositoryName = 'codecommit-repository';
const region = 'eu-central-1';

const repositoryConfig = {
  env: {
    account: repositoryAccount,
    region,
  },
  repositoryName,
};

const environmentConfig = {
  env: {
    account: developmentAccount,
    region: region
  }
};

/* -------------------------------------------------------------------------- */
/*                                   STACKS                                   */
/* -------------------------------------------------------------------------- */
const repositoryStack = new RepositoryStack(app, `BugReproduce-Repository-dev`, repositoryConfig);

new PipelineStack(app, `BugReproduce-Pipeline-dev`, {
  ...environmentConfig,
  repository: repositoryStack.repository,
  environment: 'dev',
  buildTriggerBranch: 'develop'
});

new EventBusStack(app, `EventBusPolicy-${repositoryAccount}-${region}-${developmentAccount}`, { ...environmentConfig, repositoryAccount: repositoryConfig.env.account });