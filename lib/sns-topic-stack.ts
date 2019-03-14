import cdk = require('@aws-cdk/cdk');
import s3 = require('@aws-cdk/aws-s3');
import sns = require('@aws-cdk/aws-sns');

export class SnsTopicStack extends cdk.Stack {
  public readonly snsTopic: sns.Topic;
  public readonly snsTopicArn: cdk.Output;

  constructor(parent: cdk.App, name: string, props?: cdk.StackProps) {
    super(parent, name, props);

    this.snsTopic = new sns.Topic(this, 'TestTopic', {
      displayName: 'My Test Topic'
    });

    this.snsTopicArn = new cdk.Output(this, 'ExportsoutputRefTestTopic', {
      export: `${this.name}:TestTopicArn`,
      value: this.snsTopic.topicArn,
    });

    new s3.Bucket(this, 'DummyBucket');
  }
}
