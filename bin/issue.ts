#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { IssueStack } from '../lib/issue-stack';

const app = new cdk.App();
new IssueStack(app, 'IssueStack');
