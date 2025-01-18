# Overview

This section explains the exchanges, queues, and bindings configured in the Node Eats application, describing how messages flow through the system to enable asynchronous communication between services.

# Exchanges

## order_exchange

Type: Direct
Handles routing of order-related messages. For example, an event with the routing key order.created is routed to the order_created queue.

## payment_exchange

Type: Topic
Manages payment-related events. For instance, events with routing keys like payment.completed or payment.failed are routed to the appropriate queues.

## notification_exchange

Type: Fanout
Broadcasts notification events to all bound queues, such as sending email or push notifications.

# Queues

## order_created

Stores messages related to the creation of orders.
Use Case: Consumed by a service that sends order confirmation emails or updates the order management system.

## order_paid

Stores messages for orders marked as paid.
Use Case: Consumed by a service that triggers shipment processes or updates order statuses.

## payment_failed

Stores messages for failed payment events.
Use Case: Consumed by a service that alerts users about payment issues or retries the payment process.

## email_notifications

Stores messages related to email notifications.
Use Case: Consumed by a service that sends emails to users for various events like order updates or promotional messages.

# Bindings

## order_exchange → order_created

Routing Key: order.created
When an order is created, an event with the routing key order.created is published to the order_exchange. This binding ensures the message is routed to the order_created queue for processing.

## order_exchange → order_paid

Routing Key: order.paid
When an order is marked as paid, an event with the routing key order.paid is published to the order_exchange. The message is routed to the order_paid queue to trigger subsequent payment confirmation actions.

## payment_exchange → payment_failed

Routing Key: payment.failed
When a payment fails, an event with the routing key payment.failed is published to the payment_exchange. This ensures the message is routed to the payment_failed queue for handling retries or notifying the user.

## notification_exchange → email_notifications

Events such as order updates or promotional campaigns are published to the notification_exchange. This binding routes the messages to the email_notifications queue for email delivery.

# Message Flow

## Order Creation:

The order_exchange routes the order.created event to the order_created queue.
A consumer processes the message, updating the database or sending a confirmation email.

## Order Payment:

The order_exchange routes the order.paid event to the order_paid queue.
A consumer processes the payment confirmation and triggers the delivery process.

## Payment Failures:

The payment_exchange routes payment.failed events to the payment_failed queue.
A consumer alerts the user and optionally retries the payment.

## Notifications:

The notification_exchange broadcasts events to all bound queues, such as email_notifications.
The respective consumers handle user notifications efficiently.
