# cdk-sns-topic-export-import

This demonstates an issue I am having with implicit exports and imports.  Basically a refernce to a resource from another stack in a property override does not seem to trigger the import.

# sns-topic-stack

Contains a single sns.Topic resource that it implicitly exports via `public readonly snsTopic`

# dependent1-stack

Implicitly imports the SNS topic by referring to it in a `codedeploy.CfnDeploymentGroup`

**works**

# dependent2-stack

Implicity attempts to import the SNS topic by referring to it in a property override of an `codedeploy.ServerDeploymentGroup`

***does not work***

Does not actually import the SNS topic

# dependent3-stack

Combines dependent1 and 2 stacks above.  The reference in a property override works because the import is triggered by its presence in the `codedeploy.CfnDeploymentGroup`.

**works**

## cdk deploy output

# sns-topic-stack

```SnsTopicStack: deploying...
SnsTopicStack: creating CloudFormation changeset...
 0/3 | 16:50:22 | CREATE_IN_PROGRESS   | AWS::CloudFormation::Stack | SnsTopicStack User Initiated
 0/3 | 16:50:27 | CREATE_IN_PROGRESS   | AWS::SNS::Topic    | TestTopic (TestTopic339EC197)
 0/3 | 16:50:27 | CREATE_IN_PROGRESS   | AWS::CDK::Metadata | CDKMetadata
 0/3 | 16:50:28 | CREATE_IN_PROGRESS   | AWS::SNS::Topic    | TestTopic (TestTopic339EC197) Resource creation Initiated
 0/3 | 16:50:30 | CREATE_IN_PROGRESS   | AWS::CDK::Metadata | CDKMetadata Resource creation Initiated
 1/3 | 16:50:30 | CREATE_COMPLETE      | AWS::CDK::Metadata | CDKMetadata
 2/3 | 16:50:38 | CREATE_COMPLETE      | AWS::SNS::Topic    | TestTopic (TestTopic339EC197)
 3/3 | 16:50:41 | CREATE_COMPLETE      | AWS::CloudFormation::Stack | SnsTopicStack

 ✅  SnsTopicStack

Outputs:
SnsTopicStack.ExportsOutputRefTestTopic339EC19745EDBDDB = arn:aws:sns:us-east-1:***********:SnsTopicStack-TestTopic*******-************

Stack ARN:
arn:aws:cloudformation:us-east-1:****:stack/SnsTopicStack/****
```

# dependent1-stack

```Dependent1Stack: deploying...
Dependent1Stack: creating CloudFormation changeset...
 0/5 | 16:52:47 | CREATE_IN_PROGRESS   | AWS::CloudFormation::Stack       | Dependent1Stack User Initiated
 0/5 | 16:52:53 | CREATE_IN_PROGRESS   | AWS::CodeDeploy::Application     | CfnApplication
 0/5 | 16:52:53 | CREATE_IN_PROGRESS   | AWS::CodeDeploy::Application     | CfnApplication Resource creation Initiated
 1/5 | 16:52:53 | CREATE_COMPLETE      | AWS::CodeDeploy::Application     | CfnApplication
 1/5 | 16:52:53 | CREATE_IN_PROGRESS   | AWS::CDK::Metadata               | CDKMetadata
 1/5 | 16:52:54 | CREATE_IN_PROGRESS   | AWS::IAM::Role                   | CodeDeployServiceRole (CodeDeployServiceRole897ED2CE)
 1/5 | 16:52:54 | CREATE_IN_PROGRESS   | AWS::IAM::Role                   | CodeDeployServiceRole (CodeDeployServiceRole897ED2CE) Resource creation Initiated
 1/5 | 16:52:56 | CREATE_IN_PROGRESS   | AWS::CDK::Metadata               | CDKMetadata Resource creation Initiated
 2/5 | 16:52:57 | CREATE_COMPLETE      | AWS::CDK::Metadata               | CDKMetadata
 3/5 | 16:53:08 | CREATE_COMPLETE      | AWS::IAM::Role                   | CodeDeployServiceRole (CodeDeployServiceRole897ED2CE)
 3/5 | 16:53:11 | CREATE_IN_PROGRESS   | AWS::CodeDeploy::DeploymentGroup | CfnDeploymentGroup
 3/5 | 16:53:11 | CREATE_IN_PROGRESS   | AWS::CodeDeploy::DeploymentGroup | CfnDeploymentGroup Resource creation Initiated
 4/5 | 16:53:11 | CREATE_COMPLETE      | AWS::CodeDeploy::DeploymentGroup | CfnDeploymentGroup
 5/5 | 16:53:13 | CREATE_COMPLETE      | AWS::CloudFormation::Stack       | Dependent1Stack

 ✅  Dependent1Stack

Stack ARN:
arn:aws:cloudformation:us-east-1:****:stack/Dependent1Stack/****
```

# dependent2-stack

```Dependent2Stack: deploying...
Dependent2Stack: creating CloudFormation changeset...

 ❌  Dependent2Stack failed: ValidationError: Template format error: Unresolved resource dependencies [TestTopic339EC197] in the Resources block of the template
Template format error: Unresolved resource dependencies [TestTopic339EC197] in the Resources block of the template
```

# dependent3-stack

```Dependent3Stack: deploying...
Dependent3Stack: creating CloudFormation changeset...
 0/8 | 16:54:05 | CREATE_IN_PROGRESS   | AWS::CloudFormation::Stack       | Dependent3Stack User Initiated
 0/8 | 16:54:10 | CREATE_IN_PROGRESS   | AWS::CodeDeploy::Application     | CfnApplication
 0/8 | 16:54:10 | CREATE_IN_PROGRESS   | AWS::IAM::Role                   | CodeDeployServiceRole (CodeDeployServiceRole897ED2CE)
 0/8 | 16:54:11 | CREATE_IN_PROGRESS   | AWS::IAM::Role                   | CodeDeployServiceRole (CodeDeployServiceRole897ED2CE) Resource creation Initiated
 0/8 | 16:54:11 | CREATE_IN_PROGRESS   | AWS::IAM::Role                   | ServerDeploymentGroup/Role (ServerDeploymentGroupRole20385A83)
 0/8 | 16:54:11 | CREATE_IN_PROGRESS   | AWS::CodeDeploy::Application     | CfnApplication Resource creation Initiated
 1/8 | 16:54:11 | CREATE_COMPLETE      | AWS::CodeDeploy::Application     | CfnApplication
 1/8 | 16:54:11 | CREATE_IN_PROGRESS   | AWS::CDK::Metadata               | CDKMetadata
 1/8 | 16:54:11 | CREATE_IN_PROGRESS   | AWS::IAM::Role                   | ServerDeploymentGroup/Role (ServerDeploymentGroupRole20385A83) Resource creation Initiated
 1/8 | 16:54:13 | CREATE_IN_PROGRESS   | AWS::CDK::Metadata               | CDKMetadata Resource creation Initiated
 2/8 | 16:54:13 | CREATE_COMPLETE      | AWS::CDK::Metadata               | CDKMetadata
 2/8 | 16:54:14 | CREATE_IN_PROGRESS   | AWS::CodeDeploy::Application     | ServerApplication (ServerApplicationB576C96D)
 2/8 | 16:54:14 | CREATE_IN_PROGRESS   | AWS::CodeDeploy::Application     | ServerApplication (ServerApplicationB576C96D) Resource creation Initiated
 3/8 | 16:54:14 | CREATE_COMPLETE      | AWS::CodeDeploy::Application     | ServerApplication (ServerApplicationB576C96D)
 4/8 | 16:54:25 | CREATE_COMPLETE      | AWS::IAM::Role                   | CodeDeployServiceRole (CodeDeployServiceRole897ED2CE)
 5/8 | 16:54:25 | CREATE_COMPLETE      | AWS::IAM::Role                   | ServerDeploymentGroup/Role (ServerDeploymentGroupRole20385A83)
 5/8 | 16:54:28 | CREATE_IN_PROGRESS   | AWS::CodeDeploy::DeploymentGroup | CfnDeploymentGroup
 5/8 | 16:54:28 | CREATE_IN_PROGRESS   | AWS::CodeDeploy::DeploymentGroup | CfnDeploymentGroup Resource creation Initiated
 6/8 | 16:54:28 | CREATE_COMPLETE      | AWS::CodeDeploy::DeploymentGroup | CfnDeploymentGroup
 6/8 | 16:54:37 | CREATE_IN_PROGRESS   | AWS::CodeDeploy::DeploymentGroup | ServerDeploymentGroup (ServerDeploymentGroupC750EEF8)
 6/8 | 16:54:38 | CREATE_IN_PROGRESS   | AWS::CodeDeploy::DeploymentGroup | ServerDeploymentGroup (ServerDeploymentGroupC750EEF8) Resource creation Initiated
 7/8 | 16:54:38 | CREATE_COMPLETE      | AWS::CodeDeploy::DeploymentGroup | ServerDeploymentGroup (ServerDeploymentGroupC750EEF8)
 8/8 | 16:54:40 | CREATE_COMPLETE      | AWS::CloudFormation::Stack       | Dependent3Stack

 ✅  Dependent3Stack

Stack ARN:
arn:aws:cloudformation:us-east-1:****:stack/Dependent3Stack/****
```
