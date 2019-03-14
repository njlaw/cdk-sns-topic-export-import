#!/usr/bin/env node
import cdk = require('@aws-cdk/cdk');
import { SnsTopicStack } from '../lib/sns-topic-stack';
import { Dependent1Stack } from '../lib/dependent1-stack';
import { Dependent2Stack } from '../lib/dependent2-stack';
import { Dependent3Stack } from '../lib/dependent3-stack';

const app = new cdk.App();
const snsTopicStack = new SnsTopicStack(app, 'SnsTopicStack');
new Dependent1Stack(app, 'Dependent1Stack', { snsTopicStack: snsTopicStack });
new Dependent2Stack(app, 'Dependent2Stack', { snsTopicStack: snsTopicStack });
new Dependent3Stack(app, 'Dependent3Stack', { snsTopicStack: snsTopicStack });
app.run();
