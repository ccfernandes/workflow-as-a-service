package com.coen241.schedulerservice.model;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBDocument;
import com.coen241.schedulerservice.common.Status;
import lombok.Data;

@Data
@DynamoDBDocument
public class TaskSpec {
    private String taskId;
    private String serviceName;
    @DynamoDBAttribute(attributeName = "order")
    private int order;
}
