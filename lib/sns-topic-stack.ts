import cdk = require('@aws-cdk/cdk');
import sns = require('@aws-cdk/aws-sns');

export class SnsTopicStack extends cdk.Stack {
  public readonly snsTopic: sns.Topic;

  constructor(parent: cdk.App, name: string, props?: cdk.StackProps) {
    super(parent, name, props);

    this.snsTopic = new sns.Topic(this, 'TestTopic', {
      displayName: 'My Test Topic'
    });
  }
}
