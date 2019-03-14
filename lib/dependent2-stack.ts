import cdk = require('@aws-cdk/cdk');
import codedeploy = require('@aws-cdk/aws-codedeploy');
import iam = require('@aws-cdk/aws-iam');
import { SnsTopicStack } from './sns-topic-stack';

export interface Dependent2StackProps extends cdk.StackProps {
    snsTopicStack: SnsTopicStack;
}

export class Dependent2Stack extends cdk.Stack {
    constructor(scope: cdk.App, name: string, props: Dependent2StackProps) {
        super(scope, name, props);

        const codeDeployApp = new codedeploy.ServerApplication(this, 'ServerApplication');

        const codeDeployServiceRole = new iam.Role(this, 'CodeDeployServiceRole', {
            assumedBy: new iam.ServicePrincipal('codedeploy.amazonaws.com'),
        });
        codeDeployServiceRole.attachManagedPolicy('arn:aws:iam::aws:policy/service-role/AWSCodeDeployRole');

        const deploymentGroup = new codedeploy.ServerDeploymentGroup(this, 'ServerDeploymentGroup', {
            application: codeDeployApp,
            ec2InstanceTags: new codedeploy.InstanceTagSet({
                        key: [ 'asdfasdf' ]
                    }
                ),            
        });

        const resource = deploymentGroup.node.findChild('Resource') as codedeploy.CfnDeploymentGroup;
        resource.addPropertyOverride('TriggerConfigurations', [
            {
                TriggerName: 'defaultTrigger',
                TriggerEvents: [
                    'DeploymentStart',
                ],
                TriggerTargetArn: props.snsTopicStack.snsTopicArn.makeImportValue(),
            }
        ]);
    }
}
