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
