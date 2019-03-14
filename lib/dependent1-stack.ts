import cdk = require('@aws-cdk/cdk');
import codedeploy = require('@aws-cdk/aws-codedeploy');
import iam = require('@aws-cdk/aws-iam');
import { SnsTopicStack } from './sns-topic-stack';

export interface Dependent1StackProps extends cdk.StackProps {
    snsTopicStack: SnsTopicStack;
}

export class Dependent1Stack extends cdk.Stack {
    constructor(scope: cdk.App, name: string, props: Dependent1StackProps) {
        super(scope, name, props);

        const codeDeployApp = new codedeploy.CfnApplication(this, 'CfnApplication', {
            computePlatform: 'Server',
        });

        const codeDeployServiceRole = new iam.Role(this, 'CodeDeployServiceRole', {
            assumedBy: new iam.ServicePrincipal('codedeploy.amazonaws.com'),
        });
        codeDeployServiceRole.attachManagedPolicy('arn:aws:iam::aws:policy/service-role/AWSCodeDeployRole');

        new codedeploy.CfnDeploymentGroup(this, 'CfnDeploymentGroup', {
            applicationName: codeDeployApp.applicationName,
            deploymentStyle: {
                deploymentType: 'IN_PLACE',
                deploymentOption: 'WITHOUT_TRAFFIC_CONTROL',
            },
            ec2TagSet: {
                ec2TagSetList: [
                    {
                        ec2TagGroup: [
                            { type: 'KEY_AND_VALUE', key: 'key', value: 'asdfasdf' }
                        ]
                    }
                ]
            },
            triggerConfigurations: [
                {
                    triggerName: 'defaultTrigger',
                    triggerEvents: [
                        'DeploymentStart',
                    ],
                    triggerTargetArn: props.snsTopicStack.snsTopic.topicArn,
                },
            ],
            serviceRoleArn: codeDeployServiceRole.roleArn,
        });
    }
}
